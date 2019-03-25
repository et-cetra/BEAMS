import React from 'react';
import '../App.css';

// Request for Population Ages in Maroubra: https://api.domain.com.au/v1/demographics?level=Suburb&id=27512&types=AgeGroupOfPopulation&year=2016 


class Demographics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            contents: []
        };
    }


    async componentDidMount() {
        const hood_id = await Demographics.getSuburbID(this.props.suburb, this.props.suburb_state);
        console.log("hoodid", hood_id);
        const res = await fetch(`https://api.domain.com.au/v1/demographics?level=Suburb&id=${hood_id}&types=AgeGroupOfPopulation&year=2016`, {
            headers: new Headers({
                'Authorization': "Bearer d2c27dd919c9c14e22e81b079238b62a"
            })
        });
        const result = await res.json();
        console.log("result", result);
        this.setState({
            isLoaded: true,
            contents: result.demographics
        });


    }

    static getSuburbID = async (suburb, suburb_state) => {
        console.log("demo sub", suburb);
        console.log("demo state", suburb_state);
        const res = await fetch(`https://api.domain.com.au/v1/addressLocators?searchLevel=Suburb&suburb=${suburb}&state=${suburb_state}`, {
            headers: new Headers({
                'Authorization': "Bearer b733a9ad77600df583ad204717eb23e3"
            })
        });
        const result = await res.json();
        console.log("address comps", result);
        return result[0].ids[0].id;
    }

    render() {
        const { error, isLoaded, contents } = this.state;
        console.log("contents are", contents);
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    Age groups of this Suburb from most common to least!
                    {contents.map(
                        content => (
                            content.items.map((item, i) => (
                                <li key={`item-${i}`}>
                                    <b>{item.label}:</b> {item.value} persons
                        </li>))
                        ))
                    }
                </div>
            );
        }
    }
}

export default Demographics;