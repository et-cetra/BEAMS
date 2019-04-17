import React from 'react';
import { getDemographics } from '../../utils.js'
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Train from '@material-ui/icons/Train';

class ConvenientTransport extends React.Component {
    state = {
        isConvenient: false
    };

    // If Australians is < 50% give tag 'Culturally Diverse'

    async isConvenient() {
        const suburbInfo = await getDemographics(this.props.suburb, this.props.suburb_state, "TransportToWork");
        var commuteArray = suburbInfo.demographics[0].items;
        var arrayLength = commuteArray.length;
        for (var i = 0; i < arrayLength; i++) {
            if (commuteArray[i].label == "Car (driver)" || commuteArray[i].label == "Walked only") {
                const carAndWalk = commuteArray[i].value;
                const total = suburbInfo.demographics[0].total;
                if ((carAndWalk / total) <= 0.4) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    }

    async componentDidMount() {
        const result = await this.isConvenient();
        this.setState({
            isConvenient: result
        });
    }

    render() {
        if (this.state.isConvenient) {
            return (
                <Chip avatar={<Avatar><Train/></Avatar>} label="Convenient Transport" className="ChipsHighlight"/>
            );
        } else {
            return (
                <div></div>
            )
        }
    }
}

export default ConvenientTransport;
