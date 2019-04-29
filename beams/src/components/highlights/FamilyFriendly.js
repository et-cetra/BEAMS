import React from 'react';
import { getDemographics } from '../../utils.js'
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import ChildFriendly from '@material-ui/icons/ChildFriendly'

class FamilyFriendly extends React.Component {
    state = {
        isFamilyFriendly: false
      };

    // If 0-19 is above 20% give tag 'Family Friendly'

    async isFamilyFriendly() {
        const suburbInfo = await getDemographics(this.props.suburb, this.props.suburb_state);
        var agesArray = suburbInfo.demographics[0].items;
        var arrayLength = agesArray.length;
        var youngTotal = 0;
        var zeroFound = 0;
        var fiveFound = 0;
        const total = suburbInfo.demographics[0].total;

        for (var i = 0; i < arrayLength; i++) {
            if (agesArray[i].label === "0 to 4") {
                youngTotal = youngTotal + agesArray[i].value;
                zeroFound = 1;
            } else if (agesArray[i].label === "5 to 19") {
                youngTotal = youngTotal + agesArray[i].value;
                fiveFound = 1;
            }
            if (zeroFound && fiveFound) {
                if ((youngTotal / total) > 0.20) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    }

    async componentDidMount() {
        const result = await this.isFamilyFriendly();
        this.setState({
            isFamilyFriendly: result
        });
    }

    render() {
        if (this.state.isFamilyFriendly) {
            return (
                <Chip avatar={<Avatar><ChildFriendly/></Avatar>} label="Family Friendly"
                className="ChipsHighlight" color={this.props.compareColor}/>
            );
        } else {
            return (
                <div></div>
            )
        }
    }
}

export default FamilyFriendly;
