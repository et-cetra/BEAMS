export const getSuburbId = async (suburb, suburb_state) => {
    // console.log("demo sub", suburb);
    // console.log("demo state", suburb_state);

    // const res = await fetch(`http://b3ams.com.au:5000/suburb/${suburb}/${suburb_state}`);
    const res = await fetch(`http://localhost:5000/suburb/${suburb}/${suburb_state}`);
    const result = await res.json();
    console.log("address comps", result);
    return result[0].ids[0].id;
}

export const getDemographics = async (suburb, suburb_state, type) => {
    // const res = await fetch(`http://b3ams.com.au:5000/${type}/${suburb}/${suburb_state}`);
    const res = await fetch(`http://localhost:5000/${type}/${suburb}/${suburb_state}`);
    const result = await res.json();
    return result;
}

export const getCoords = async (suburb, suburb_state) => {
    const res = await fetch(`https://api.opencagedata.com/geocode/v1/json?
    q=${suburb}+${suburb_state}&countrycode=au&key=faed9c880db04cb38409b2074687c62e`);
    const result = await res.json();
    return result;
}

export const getSchools = async (coords) => {
    const res = await fetch(`https://api.domain.com.au/v1/locations/schools/
    ?coordinate=${coords}`);
    const result = await res.json();
    //get just schools here
    return result;
}