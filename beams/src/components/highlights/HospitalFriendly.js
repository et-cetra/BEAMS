import React from 'react';
import { jsonHospitalResponse } from '../../data/HospitalsData';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import LocalHospitalSharp from '@material-ui/icons/LocalHospital';

class HospitalFriendly extends React.Component {

    isHospitalFriendly() {
        var hospitalArray = jsonHospitalResponse.data.hospitals;
        var arrayLength = hospitalArray.length;
        const suburb = this.props.suburb;
        for (var i = 0; i < arrayLength; i++) {
            var counter = 0;
            if (hospitalArray[i].Suburb === suburb) {
                counter++;
            }
        }
        if (counter > 2) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        if (this.isHospitalFriendly) {
            return (
                <Chip avatar={<Avatar><LocalHospitalSharp/></Avatar>} label="Health Care Friendly" 
                className="ChipsHighlight" color={this.props.compareColor}/>
            );
        } else {
            return (
                <div></div>
            )
        }
    }
}

export default HospitalFriendly;
