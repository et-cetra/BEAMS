import React from 'react';
import { getLocation, getSchools } from '../../utils.js';
import Chip from '@material-ui/core/Chip';
import Schools from '../demographics/Schools';

class SecondaryFriendly extends React.Component {
    state = {
        isSecondaryFriendly: false
    };

    // If 2 or more government high schools in the area, give tag 'High School Education Friendly'

    async isSecondaryFriendly() {
        const gLocation = await getLocation(this.props.suburb, this.props.suburb_state);
        const coords = gLocation.results[0].locations[0].latLng;
        const gSchools = await getSchools(coords.lat, coords.lng);
        var arrayLength = gSchools.length;
        var secondaryCount = 0;
        for (var i = 0; i < arrayLength; i++) {
            if (gSchools[i].educationLevel === "Secondary") {
                secondaryCount++;
                if (secondaryCount > 2) {
                    return true;
                }
            }
        }
        return false;
    }

    async componentDidMount() {
        const result = await this.isSecondaryFriendly();
        this.setState({
            isSecondaryFriendly: result
        });
    }

    render() {
        if (this.state.isSecondaryFriendly) {
            return (
                <Chip label="Secondary Education Friendly" className="ChipsHighlight"/>
            );
        } else {
            return (
                <div></div>
            )
        }
    }
}

export default SecondaryFriendly;
