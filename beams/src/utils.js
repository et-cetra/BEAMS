import { jsonSchoolResponse } from './data/SchoolsData';
import { jsonSEResponse } from './data/SEData'
import {jsonCrimeData} from './data/CrimeData';

export const getSuburbId = async (suburb, suburb_state) => {
    const res = await fetch(`http://localhost:5000/suburb/${suburb}/${suburb_state}`);
    const result = await res.json();
    return result[0].ids[0].id;
}

export const getDemographics = async (suburb, suburb_state) => {
    const res = await fetch(`http://localhost:5000/AllDemos/${suburb}/${suburb_state}`);
    const result = await res.json();
    return result;
}

export const getStats = async (suburb, suburb_state) => {
    const res = await fetch(`http://localhost:5000/AllStats/${suburb}/${suburb_state}`);
    const result = await res.json();
    return result;
}

export const getLocation = async (suburb, suburb_state) => {
    const res = await fetch(`http://open.mapquestapi.com/geocoding/v1/address?key=RLok66AiiE73bgmFH5KWI2FvKWqj7AiM&outFormat=json&location=${suburb}+${suburb_state}`);
    const result = await res.json();
    return result;
}

export const getSchools = async (lat, lng) => {
    const res = await fetch(`http://localhost:5000/Coords/${lat}/${lng}`);
    const result = await res.json();
    return result;
}

export const getNews = async (suburb, suburb_state) => {
    const url = `https://gnews.io/api/v2/?q=${suburb}&max=7&country=au&in=title&token=7a7b0d71ed28c75d56b185fc5896f148`;
    const res = await fetch(url);
    const result = await res.json();
    console.log(result);
    return result;
}

export const getSchoolRating = (suburb, suburb_state) => {
    const schoolArray = jsonSchoolResponse.data.schools;
    const arrayLength = schoolArray.length;
    let counter = 0;
    let ICSEA_sum = 0;
    for (var i = 0; i < arrayLength; i++) {
        if (schoolArray[i].Suburb && suburb && (schoolArray[i].Suburb.toLowerCase() === suburb.toLowerCase()) && (schoolArray[i].State.toLowerCase() === suburb_state.toLowerCase())) {
            ICSEA_sum = ICSEA_sum + schoolArray[i].ICSEA;
            counter++;
        }
    }
    if (counter === 0) {
        return 1000;
    } else {
        return ICSEA_sum/counter;
    }
}

export const getSEData = async (suburb, suburb_state) => {
  const seArray = jsonSEResponse.values;
  var id = 0;

  try{
    //Shitty ABS json data is inconsistent ffs so need to do this quicky hacky to find right suburb
    id = seArray.find(item => item.name === suburb
      || (item.name.split("(")[0] === `${suburb} ` &&
        ((item.name.split(" ").pop().split("(").pop() === `${suburb_state})`)
        || (item.name.split(" ").pop().split("(").pop() === `${suburb_state.charAt(0).toUpperCase() + suburb_state.slice(1).toLowerCase()})`)
        || (item.name.split(" ").pop().split("(").pop() === `${suburb_state.charAt(0).toUpperCase() + suburb_state.slice(1).toLowerCase()}).`)
    ))).id;

    const url = `http://stat.data.abs.gov.au/sdmx-json/data/SEIFA_SSC/${id}.IRSAD.RWAD/all?detail=DataOnly&dimensionAtObservation=AllDimensions`
    const res = await fetch(url);
    var result = await res.json();
    result = result.dataSets[0].observations['0:0:0:0'][0];

    return result;
  } catch {
    return 5;
  }
}

export const getCrimeRate = async (suburb, suburb_state) => {
    const crimeArray = jsonCrimeData.data.crimes;
    const arrayLength = crimeArray.length;
    let crimeRate = 0;
    let numCrimes = 0;
    let found = false;

    // Get total population
    const suburbInfo = await getDemographics(suburb, suburb_state);
    const population = suburbInfo.demographics[0].total;

    for (var i = 0; i < arrayLength; i++) {
        if(suburb && (crimeArray[i].suburb.toLowerCase() === suburb.toLowerCase()) && (crimeArray[i].suburb_state.toLowerCase() === suburb_state.toLowerCase())) {
            found = true;
            numCrimes = crimeArray[i].numCrimes;
        }
    }

    if(found === false)
    {
      switch(suburb_state){
        case "NT": return 0.0897;
        case "TAS": return 0.0508;
        case "WA": return 0.0457;
        case "QLD": return 0.1073;
        default: return 0.65/2;
      }
    }

    crimeRate = numCrimes / population;
    return crimeRate;
}

export const getSurrounding = async (suburb, suburb_state) => {
    console.log(suburb + " " + suburb_state);
    const location = await getLocation(suburb, suburb_state);
    const coords = location.results[0].locations[0].latLng;
    var radius = 1000; 
    var returned_results = [];
    var duplicate = 0;

    
    while (returned_results.length < 3) {
        const url = 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+coords.lat+','+coords.lng+'&radius='+radius+'&type=locality&fields=&key=AIzaSyDIMGCB2qSD9qIB0mrZu0uGEmZlc9e8m-Y'
        const res = await fetch(url);
        const response = await res.json();
        for (var iResp = 0; iResp < response.results.length; iResp++) {
            duplicate = 0;
            for (var iReturn = 0; iReturn < returned_results.length; iReturn++) {
                if (returned_results[iReturn].suburb == response.results[iResp].name)
                    duplicate = 1;
            }

            // If the suburb is not already pushed and it is not the same searched suburb
            // Call google places PlaceDetails endpoint to get the suburb state
            // And push into the returned_results array
            if (duplicate == 0 && suburb != response.results[iResp].name) {
                const details_url = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?placeid=" + response.results[iResp].place_id + "&fields=address_components&key=AIzaSyDIMGCB2qSD9qIB0mrZu0uGEmZlc9e8m-Y"
                const details_res = await fetch(details_url);
                const details_response = await details_res.json();
                var details_suburb_state = " ";
                for (var iDetails = 0; iDetails < details_response.result.address_components.length; iDetails++)
                    if (details_response.result.address_components[iDetails].types[0] == "administrative_area_level_1")
                        details_suburb_state = details_response.result.address_components[iDetails].short_name;
                returned_results.push({suburb: response.results[iResp].name, suburb_state: details_suburb_state});
            }
        }
        radius += 500;
    }
    return returned_results;
}

export const getSentiment = async (newsArticles) => {
    // console.log(newsArticles);
    // const text = "I hate chocolate";
    // const url = "https://cors-anywhere.herokuapp.com/https://api.theysay.io/v1/sentiment?text="+text+"&level=document";
    // const res = await fetch(url, {
    //     'Access-Control-Allow-Origin': '*',
    //     'Origin': 'Vary',
    // });
    // const resp = res.json();
    // console.log(resp);
    // //https://cors-anywhere.herokuapp.com/

    var x = new XMLHttpRequest();
    x.open('GET', 'https://cors-anywhere.herokuapp.com/https://api.theysay.io/v1/sentiment?text="+text+"&level=document');
    x.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    x.onload = function() {
        alert(x.responseText);
    };
    x.send();

}