import React from 'react';
import { getDemographics } from '../../utils.js'
import Chip from '@material-ui/core/Chip';

class CulturallyDiverse extends React.Component {
    state = {
        isCulturallyDiverse: false
    };

    // If Australians is < 50% give tag 'Culturally Diverse'

    async isCulturallyDiverse() {
        const suburbInfo = await getDemographics(this.props.suburb, this.props.suburb_state, "CountryOfBirth");
        var cobArray = suburbInfo.demographics[0].items;
        var arrayLength = cobArray.length;
        for (var i = 0; i < arrayLength; i++) {
            if (cobArray[i].label == "Australia") {
                const aus = cobArray[i].value;
                const total = suburbInfo.demographics[0].total;
                console.log("percentage", aus / total);
                if ((aus / total) <= 0.4) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    }

    async componentDidMount() {
        const result = await this.isCulturallyDiverse();
        this.setState({
            isCulturallyDiverse: result
        });
    }

    render() {
        if (this.state.isCulturallyDiverse) {
            return (
                <Chip label="Culturally Diverse" className="ChipsHighlight"/>
            );
        } else {
            return (
                <div></div>
            )
        }
    }
}

export default CulturallyDiverse;
