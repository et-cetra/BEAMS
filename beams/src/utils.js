export const getSuburbID = async (suburb, suburb_state) => {
    // console.log("demo sub", suburb);
    // console.log("demo state", suburb_state);
    
    const res = await fetch(`https://api.domain.com.au/v1/addressLocators?searchLevel=Suburb&suburb=${suburb}&state=${suburb_state}`, {
        headers: new Headers({
            'Authorization': "Bearer cdb2721e13e363a91ac94b78128f154c"
        })
    });
    const result = await res.json();
    console.log("address comps", result);
    return result[0].ids[0].id;
}