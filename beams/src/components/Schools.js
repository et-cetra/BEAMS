import React from 'react';
import '../App.css';
import { getCoords } from '../utils';

class Schools extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            schoolData: [],
            coord: null,
        };
    }
/*
    async componentDidMount() {
        const suburbInfo = await getDemographics(this.props.suburb, this.props.suburb_state, "AgeGroupOfPopulation");
        console.log("Demographics suburbInfo", suburbInfo);

        this.setState({
            isLoaded: true,
            contents: suburbInfo.demographics
        });

    }*/

    async componentDidMount() {
        const suburbCoords = await getCoords(this.props.suburb, this.props.suburb_state);        
        // let coord = '-33.8, 151.05'
        let url = `https://api.domain.com.au/v1/locations/schools/?coordinate=${this.state.coord}`;
       

        this.setState({
            isLoading: true,
            
        });
    }

    render() {
        if (!this.state.isLoaded) {
            return <div>Loading...</div>

        } else {
            return (
                <div className="Schools">
                    <h1>Educational Facilities around</h1>
                    <ul>
                    </ul>
                </div>
            );
        }
    }

}

export default Schools;
