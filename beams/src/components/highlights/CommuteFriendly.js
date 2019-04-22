import React from 'react';
import { getDemographics } from '../../utils.js'
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Train from '@material-ui/icons/Train';

class CommuteFriendly extends React.Component {
    state = {
        isCommuteFriendly: false
    };

    // If driving and walking is less than 40% of transport commute then Convenient Transport

    async isCommuteFriendly() {
        const suburbInfo = await getDemographics(this.props.suburb, this.props.suburb_state, "TransportToWork");
        var commuteArray = suburbInfo.demographics[0].items;
        var arrayLength = commuteArray.length;
        var carAndWalk = 0;
        var carFound = 0;
        var walkFound = 0;
        const total = suburbInfo.demographics[0].total;

        for (var i = 0; i < arrayLength; i++) {
            if (commuteArray[i].label === "Car (driver)") {
                carAndWalk = carAndWalk + commuteArray[i].value;
                carFound = 1;
            } else if (commuteArray[i].label === "Walked only") {
                carAndWalk = carAndWalk + commuteArray[i].value;
                walkFound = 1;
            }
            if (carFound && walkFound) {
                break;
            }
        }
        if ((carAndWalk / total) <= 0.50) {
            return true;
        } else {
            return false;
        }
    }

    async componentDidMount() {
        const result = await this.isCommuteFriendly();
        this.setState({
            isCommuteFriendly: result
        });
    }

    render() {
        if (this.state.isCommuteFriendly) {
            return (
                <Chip avatar={<Avatar><Train/></Avatar>} label="Commute Friendly" className="ChipsHighlight"
                color={this.props.compareColor}/>
            );
        } else {
            return (
                <div></div>
            )
        }
    }
}

export default CommuteFriendly;
