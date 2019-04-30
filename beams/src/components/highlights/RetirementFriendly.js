import React from 'react';
import { getDemographics } from '../../utils.js'
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import PeopleIcon from '@material-ui/icons/People'

class RetirementFriendly extends React.Component {
    state = {
        isFamilyFriendly: false
      };

    // If 60+ is above 15% give tag 'Retirement Friendly'

    async isRetirementFriendly() {
        const suburbInfo = this.props.stats;
        var agesArray = suburbInfo.demographics[0].items;
        var arrayLength = agesArray.length;
        const total = suburbInfo.demographics[0].total;
        for (var i = 0; i < arrayLength; i++) {
            if (agesArray[i].label === "60+") {
                if ((agesArray[i].value / total) > 0.15) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    }

    async componentDidMount() {
        const result = await this.isRetirementFriendly();
        this.setState({
            isRetirementFriendly: result
        });
    }

    render() {
        if (this.state.isRetirementFriendly) {
            return (
                <Chip avatar={<Avatar><PeopleIcon/></Avatar>} label="Retirement Friendly" className="ChipsHighlight"
                color={this.props.compareColor}/>
            );
        } else {
            return (
                <div></div>
            )
        }
    }
}

export default RetirementFriendly;
