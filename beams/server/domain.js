const axios = require('axios')
const querystring = require('querystring')

async function getAccessToken(clientId, secret) {
    var data = querystring.stringify({
        grant_type: 'client_credentials',
        scope: 'api_demographics_read api_addresslocators_read'
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
    console.log("Connect: ", result.data);
    return access_token;
}

function base64(str) {
    return Buffer.from(str).toString('base64')
}

getSuburbId = async (token, suburb, state) => {
    console.log("demo sub", suburb);
    console.log("demo state", state);
    console.log("token", token);
    const headers = {
        'Authorization': `Bearer ${token}`
    };
    console.log("headers", headers);
    try {
        const res = await axios.get(`https://api.domain.com.au/v1/addressLocators?searchLevel=Suburb&suburb=${suburb}&state=${state}`, {
            headers: headers
        });
        await res;
        console.log("address comps", res.data);
        return res.data;
    } catch (err) {
        console.log("getSuburbId FAILED:", err);
    }
}

getDemographics = async (token, hood_id, type) => {
    const headers = {
        'Authorization': `Bearer ${token}`
    };
    try {
        const res = await axios.get(`https://api.domain.com.au/v1/demographics?level=Suburb&id=${hood_id}&types=${type}&year=2016`, {
            headers: headers
        });
        await res;
        return res.data;
    } catch (err) {
        console.log("getDemographics FAILED:", err);
    }
}

getSchools = async (token, lat, lng) => {
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
    getSchools: getSchools,
};