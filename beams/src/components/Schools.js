import React from 'react';
import '../App.css';
import { getCoords, getSchools } from '../utils';

class Schools extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            coords: [],
            schoolData: [],
        };
    }

    async componentDidMount() {
        const gCoords = await getCoords(this.props.suburb, this.props.suburb_state);        
        const gSchools = await getSchools(gCoords);


        this.setState({
            isLoading: true,
            coords: gCoords,
            schoolData: gSchools,
        });
    }

    render() {
        console.log(this.props.suburb);
        console.log(this.props.suburb_state);
        console.log("xd ", this.state.coords);
        console.log("&&&& ", this.state.schoolData);

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
