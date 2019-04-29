const axios = require('axios')
const querystring = require('querystring')
const {Cache} = require('./cache.js')

const ttl = 60 * 60 * 2; // cache for 2 Hours
const cache = new Cache(ttl); // Create a new cache service instance

async function getAccessToken(clientId, secret) {
    var data = querystring.stringify({
        grant_type: 'client_credentials',
        scope: 'api_demographics_read api_addresslocators_read api_locations_read api_suburbperformance_read'
    });
    console.log("**** TOKEN REQUEST ****");
    const result = await axios.post('https://auth.domain.com.au/v1/connect/token', data, {
        headers: {
            'Authorization': `Basic ${base64(`${clientId}:${secret}`)}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    });
    // await result;
    const { access_token } = result.data;
    return access_token;
}

function base64(str) {
    return Buffer.from(str).toString('base64')
}

getSuburbId = async (token, suburb, state) => {
    const key = suburb+state;
    return cache.get(key, () => getSuburbIdRaw(token, suburb, state));
}

getSuburbIdRaw = async (token, suburb, state) => {
    const headers = {
        'Authorization': `Bearer ${token}`
    };
    try {
        const res = await axios.get(`https://api.domain.com.au/v1/addressLocators?searchLevel=Suburb&suburb=${suburb}&state=${state}`, {
            headers: headers
        });
        await res;
        return res.data;
    } catch (err) {
        console.log("getSuburbId FAILED:", err);
    }
}

getDemographics = async (token, hood_id, state) => {
    const key = hood_id + state;
    return cache.get(key, () => getDemographicsRaw(token, hood_id));
}

getDemographicsRaw = async (token, hood_id) => {
    const headers = {
        'Authorization': `Bearer ${token}`
    };
    try {
        const res = await axios.get(`https://api.domain.com.au/v1/demographics?level=Suburb&id=${hood_id}&year=2018`, {
            headers: headers
        });
        await res;
        return res.data;
    } catch (err) {
        console.log("getDemographics FAILED:", err);
    }
}

getStats = async (token, hood_id, state, type) => {
    const key = hood_id + state + type;
    return cache.get(key, () => getStatsRaw(token, hood_id, state, type));
}

getStatsRaw = async (token, hood_id, state) => {
    const headers = {
        'Authorization': `Bearer ${token}`
    };
    try {
        const res = await axios.get(`https://api.domain.com.au/v1/suburbPerformanceStatistics?state=${state}&suburbId=${hood_id}&propertyCategory=house&chronologicalSpan=3&tPlusFrom=1&tPlusTo=8`, {
            headers: headers
        });
        await res;
        return res.data;
    } catch (err) {
        console.log("getStats FAILED:", err);
    }
}

getSchools = async (token, lat, lng) => {
    const key = lat + lng;
    return cache.get(key, () => getSchoolsRaw(token, lat, lng));
}

getSchoolsRaw = async (token, lat, lng) => {
    const headers = {
        'Authorization': `Bearer ${token}`
    };
    try {
        const res = await axios.get(`https://api.domain.com.au/v1/locations/schools/?coordinate=${lat}%2C${lng}`, {
            headers: headers
        });
        await res;
        return res.data;
    } catch (err) {
        console.log("getSchools FAILED:", err);
    }
}

module.exports = {
    getAccessToken: getAccessToken,
    getSuburbId: getSuburbId,
    getDemographics: getDemographics,
    getStats: getStats,
    getSchools: getSchools,
};