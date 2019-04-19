import React from 'react';
// import { jsonSchoolResponse } from '../../data/SchoolsData';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import GradeIcon from '@material-ui/icons/Grade'
import { getSchoolRating } from '../../utils.js'

class SchoolFriendly extends React.Component {

    render() {
        const schoolRating = getSchoolRating(this.props.suburb, this.props.suburb_state);
        console.log("School rating", schoolRating);
        if (schoolRating >= 1000) {
            return (
                <Chip avatar={<Avatar><GradeIcon/></Avatar>} label="Advantaged Education"
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
