import { jsonSchoolResponse } from './data/SchoolsData';
import { jsonSEResponse } from './data/SEData'

export const getSuburbId = async (suburb, suburb_state) => {
    // const res = await fetch(`http://b3ams.com.au:5000/suburb/${suburb}/${suburb_state}`);
    const res = await fetch(`http://localhost:5000/suburb/${suburb}/${suburb_state}`);
    const result = await res.json();
    return result[0].ids[0].id;
}

export const getDemographics = async (suburb, suburb_state, type) => {
    // const res = await fetch(`http://b3ams.com.au:5000/${type}/${suburb}/${suburb_state}`);
    const res = await fetch(`http://localhost:5000/${type}/${suburb}/${suburb_state}`);
    const result = await res.json();
    return result;
}

export const getStats = async (suburb, suburb_state) => {
    // const res = await fetch(`http://b3ams.com.au:5000/${type}/${suburb}/${suburb_state}`);
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
    const url = `https://newsapi.org/v2/everything?q=${suburb}%20australia&sources=abc-news-au,cbs-news,fox-sports,nbc-news,the-new-york-times,the-washington-times&language=en&sortBy=popularity&apiKey=bf2f2f717b5144da9abca234ee7f31c7`;
    const res = await fetch(url);
    const result = await res.json();
    return result;
}

// Given the news article returned from newsapi.org
// Returns sentiment analysis scores on the news article
// Positive in scores[0], neutral in scores[1] and negative in scores[2]
// From the testing, the api doesnt seem to have any negative scoring, so maybe treat half the neutrals as negative idk.
// An idea for rating conversion: each positive = +2 stars, each neutral = -0.5 stars. Then divide by 5.
export const getSentiment = async (newsArticles) => {
    const deepai = require('deepai'); // OR include deepai.min.js as a script tag in your HTML
    deepai.setApiKey('2adbe484-819f-45e9-a270-602439ab410e');

    var scoreTotal = 0;

    var limit = 5;
    if (newsArticles.articles.length < limit) 
        limit = newsArticles.articles.length;

    for (let i = 0; i < limit; i++) {
        var resp = await deepai.callStandardApi("sentiment-analysis", {
                text: newsArticles.articles[i].description,
        });

        for (let iResp = 0; iResp < resp.output.length; iResp++) {
            if (resp.output[iResp] === "Positive") {
                scoreTotal++;
            } else if (resp.output[iResp] === "Neutral") {
                scoreTotal += 0.5;
            } else {
                scoreTotal--;
            }
        }
    }

    //
    // Scoretotal > 0 = positive
    // < 0 = negative
    //

    //Calc and return score
    return scoreTotal/limit;
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