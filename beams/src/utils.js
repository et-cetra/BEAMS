import { jsonSchoolResponse } from './data/SchoolsData';
import { jsonSEResponse } from './data/SEData'
import {jsonCrimeData} from './data/CrimeData';
import {jsonPostcodes} from './data/PostcodeData';

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

export const getBedroomStats = async (suburb, suburb_state, num_rooms) => {
    const res = await fetch(`http://localhost:5000/Bedroom/${num_rooms}/${suburb}/${suburb_state}`);
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
    //old token: 7a7b0d71ed28c75d56b185fc5896f148
    const url = `https://gnews.io/api/v2/?q=${suburb}&max=7&country=au&in=title&token=8f3f76d77d1f76848710dfabbd37b25a`;
    const res = await fetch(url);
    const result = await res.json();
    return result;
}

// Given the news article returned from newsapi.org
// Returns sentiment analysis scores on the news article
// Positive in scores[0], neutral in scores[1] and negative in scores[2]
// From the testing, the api doesnt seem to have any negative scoring, so maybe treat half the neutrals as negative idk.

export const getSentiment = async (newsArticles) => {
    const deepai = require('deepai'); // OR include deepai.min.js as a script tag in your HTML
    deepai.setApiKey('2adbe484-819f-45e9-a270-602439ab410e');

    var scoreTotal = {positive: 0, neutral: 0, negative: 0};
    var regex = /[.]/g;
    var string = "";
    for (var iNews = 0; iNews < newsArticles.articles.length; iNews++)
      string += newsArticles.articles[iNews].title.replace(regex, "") + ". ";
    console.log(string);
    var resp = await deepai.callStandardApi("sentiment-analysis", {
            text: string
    });
    console.log(resp);
    for (var iResp = 0; iResp < resp.output.length; iResp++) {
        if (resp.output[iResp] === "Positive") {
            scoreTotal.positive++;
        } else if (resp.output[iResp] === "Neutral") {
            scoreTotal.neutral++;
        } else if (resp.output[iResp] === "Negative") {
            scoreTotal.negative++;
        }
    }
    console.log(scoreTotal);
    return scoreTotal;
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
    const location = await getLocation(suburb, suburb_state);
    const coords = location.results[0].locations[0].latLng;

    const url = `http://api.geonames.org/findNearbyPlaceNameJSON?formatted=true&lat=${coords.lat}&lng=${coords.lng}&username=beamsunsw&style=full&radius=300&maxRows=5&cities1500`;
    const res = await fetch(url);
    const result = await res.json();
    var arr = [];

    result.geonames.forEach(item => {
      if(item.name !== suburb) arr.push({"suburb": item.name, "suburb_state": Object.values(item.adminCodes1)[0]});
    });

    return arr.slice(0,3);
}

export const getPostcode = (suburb, suburb_state) => {
  const postcodeArray = jsonPostcodes.data.postcodes;
  const arrayLength = postcodeArray.length;
  let postcode = 0;

  for (var i = 0; i < arrayLength; i++) {
    if(suburb && (postcodeArray[i].suburb.toLowerCase() === suburb.toLowerCase()) && (postcodeArray[i].suburb_state.toLowerCase() === suburb_state.toLowerCase())) {
      postcode = postcodeArray[i].postcode;
      break;
    }
  }

  return postcode;
}
