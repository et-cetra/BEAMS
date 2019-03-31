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
    const res = await fetch(`https://geocoder.api.here.com/6.2/geocode.json?
    app_id=vUpVkzX0ApdBiPkUSO8Z&app_code=cQiI_V1cbk4G0ley5IsGNg
    &city=${suburb}+${suburb_state}&country=australia`);
    const result = await res.json();
    console.log("!!! " + suburb + suburb_state, result);

    return result;
}