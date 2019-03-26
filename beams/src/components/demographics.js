import React from 'react';
import '../App.css';
import {getSuburbID} from '../utils.js'

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
        const hood_id = await getSuburbID(this.props.suburb, this.props.suburb_state);
        console.log("hood id", hood_id);
        const res = await fetch(`https://api.domain.com.au/v1/demographics?level=Suburb&id=${hood_id}&types=AgeGroupOfPopulation&year=2016`, {
            headers: new Headers({
                'Authorization': "Bearer b740a6f697d0ed25a66db5423ca760d7"
            })
        });
        const result = await res.json();
        console.log("result", result);
        this.setState({
            isLoaded: true,
            contents: result.demographics
        });

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