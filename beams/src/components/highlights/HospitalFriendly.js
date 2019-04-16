import React from 'react';
import { jsonHospitalResponse } from '../../data/HospitalsData';
import Chip from '@material-ui/core/Chip';

class HospitalFriendly extends React.Component {

    isHospitalFriendly() {
        var hospitalArray = jsonHospitalResponse.data.hospitals;
        var arrayLength = hospitalArray.length;
        const suburb = this.props.suburb;
        for (var i = 0; i < arrayLength; i++) {
            var counter = 0;
            if (hospitalArray[i].Suburb == suburb) {
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
                <Chip label="Health Care Friendly"/>
            );
        } else {
            return (
                <div></div>
            )
        }
    }
}

export default HospitalFriendly;
