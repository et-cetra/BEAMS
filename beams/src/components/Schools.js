import React from 'react';
import '../App.css';
import { getLocation, getSchools } from '../utils.js';

class Schools extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            schoolData: [],
        };
    }

    async componentDidMount() {
        const gLocation = await getLocation(this.props.suburb, this.props.suburb_state); 
        const coords = gLocation.results[0].locations[0].latLng;
        const gSchools = await getSchools(coords.lat, coords.lng);

        this.setState({
            isLoading: true,
            schoolData: gSchools,
        });
    }

    render() {
        console.log(this.props.suburb);
        console.log(this.props.suburb_state);
        console.log("&&&& ", this.state.schoolData);

        if (!this.state.isLoaded) {
            return <div>Loading...</div>

        } else {
            return (
                <div>
                    Marital Status of this Suburb from most common to least!
                    <li>
                        School 1
                    </li>
                    <li>
                        School 2
                    </li>
                    <li>
                        School 3
                    </li>
                </div>
            );
        }
    }

}

export default Schools;
