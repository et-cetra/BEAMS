import React from 'react';
import { getDemographics } from '../../utils.js'
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import ChildFriendly from '@material-ui/icons/ChildFriendly'

class FamilyFriendly extends React.Component {
    state = {
        isFamilyFriendly: false
      };

    // If above 0-4 is above 5% give tag 'Family Friendly'

    async isFamilyFriendly() {
        const suburbInfo = await getDemographics(this.props.suburb, this.props.suburb_state, "AgeGroupOfPopulation");
        var agesArray = suburbInfo.demographics[0].items;
        var arrayLength = agesArray.length;
        for (var i = 0; i < arrayLength; i++) {
            if (agesArray[i].label == "0 to 4") {
                const zeroToFour = agesArray[i].value;
                const total = suburbInfo.demographics[0].total;
                if ((zeroToFour / total) > 0.05) {
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
                <Chip avatar={<Avatar><ChildFriendly/></Avatar>} label="Family Friendly" className="ChipsHighlight"/>
            );
        } else {
            return (
                <div></div>
            )
        }
    }
}

export default FamilyFriendly;
