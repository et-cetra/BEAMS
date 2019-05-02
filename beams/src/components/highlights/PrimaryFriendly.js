import React from 'react';
import { getLocation, getSchools } from '../../utils.js';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import SchoolIcon from '@material-ui/icons/School'


class PrimaryFriendly extends React.Component {
    state = {
        isPrimaryFriendly: false
    };

    // If 2 or more government primary schools in the area, give tag 'Primary Education Friendly'

    async isPrimaryFriendly() {
        const gLocation = await getLocation(this.props.suburb, this.props.suburb_state);
        const coords = gLocation.results[0].locations[0].latLng;
        const gSchools = await getSchools(coords.lat, coords.lng);
        var arrayLength = gSchools.length;
        if (arrayLength === 0) {
            return false;
        }
        var primaryCount = 0;
        for (var i = 0; i < arrayLength; i++) {
            if (gSchools[i].educationLevel === "Primary") {
                primaryCount++;
                if (primaryCount > 2) {
                    return true;
                }
            }
        }
        return false;
    }

    async componentDidMount() {
        const result = await this.isPrimaryFriendly();
        this.setState({
            isPrimaryFriendly: result
        });
    }

    render() {
        if (this.state.isPrimaryFriendly) {
            return (
                <Chip avatar={<Avatar><SchoolIcon/></Avatar>} label="Primary Education Friendly"
                className="ChipsHighlight" color={this.props.compareColor}/>
            );
        } else {
            return (
                <div></div>
            )
        }
    }
}

export default PrimaryFriendly;
