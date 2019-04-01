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

export const getNews = async (suburb, suburb_state) => {
    //Use suburb and suburb state somewhere xd idk
    //   'q=' + this.props.suburb + '&' 
    const url = 'https://newsapi.org/v2/top-headlines?'+'country=au&'+'apiKey=bf2f2f717b5144da9abca234ee7f31c7'
    const res = await fetch(url);
    const result = await res.json();
    return result;
}