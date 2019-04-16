import React from 'react';
import { getLocation, getArea } from '../utils.js';

class Area extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            areaData: [],
        };
    }

    async componentDidMount() {
        const gLocation = await getLocation(this.props.suburb, this.props.suburb_state);
        const coords = gLocation.results[0].locations[0].latLng;
        const gArea = await getArea(coords.lat, coords.lng);

        this.setState({
            isLoaded: true,
            areaData: gArea,
        });
    }

    render() {
        const { error, isLoaded, areaData } = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                <p>Area is {Object.keys(areaData)} m x m</p>
                </div>
            )
        }
    }

}

export default Area;
