import React from 'react';
import { jsonSchoolResponse } from '../../data/SchoolsData';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import SchoolIcon from '@material-ui/icons/School'

class SchoolFriendly extends React.Component {

    isSchoolFriendly() {
        const schoolArray = jsonSchoolResponse.data.schools;
        const arrayLength = schoolArray.length;
        const suburb = this.props.suburb;
        let counter = 0;
        for (var i = 0; i < arrayLength; i++) {
            if (schoolArray[i].Suburb && suburb && (schoolArray[i].Suburb.toLowerCase() === suburb.toLowerCase()) && schoolArray[i].ICSEA > 1000) {
                counter++;
            }
        }
        if (counter > 4) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        const isSchoolFriendly = this.isSchoolFriendly();
        if (isSchoolFriendly) {
            return (
                <Chip avatar={<Avatar><SchoolIcon/></Avatar>} label="Education Friendly"
                className="ChipsHighlight" color={this.props.compareColor}/>
            );
        } else {
            return (
                <div></div>
            )
        }
    }
}

export default SchoolFriendly;
