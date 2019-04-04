import React from 'react';
import '../App.css';
import { getLocation, getSchools } from '../utils.js';

class Schools extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            schoolData: [],
        };
    }

    async componentDidMount() {
        const gLocation = await getLocation(this.props.suburb, this.props.suburb_state);
        const coords = gLocation.results[0].locations[0].latLng;
        const gSchools = await getSchools(coords.lat, coords.lng);

        this.setState({
            isLoaded: true,
            schoolData: gSchools,
        });
    }

    render() {
        const { error, isLoaded, schoolData } = this.state;
        console.log("School Data", schoolData);
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                Schools of this Suburb
                {schoolData.map(
                    (item, i) => (
                    <li key={`item-${i}`}>
                        <b>{item.name}</b>
                        <br></br>
                        <b>Type:</b> {item.type}, <b>Education Level:</b> {item.educationLevel}, <b>Gender:</b> {item.gender}
                    </li>))
                }
            </div>
            );
        }
    }
    

}

export default Schools;
