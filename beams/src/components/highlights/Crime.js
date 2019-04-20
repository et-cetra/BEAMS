import React from 'react';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import GradeIcon from '@material-ui/icons/Grade'
import { getCrimeRate } from '../../utils.js'

class Crime extends React.Component {
    state = {
        crimeRate: 0.2
    };

    async resolveCrimeRate(suburb, suburb_state) {
        const crimeRate = await getCrimeRate(suburb, suburb_state);
        return crimeRate;
    }

    async componentDidMount() {
        const crimeRate = await this.resolveCrimeRate();
        this.setState({
            crimeRate: crimeRate
        });
    }


    render() {
        const crimeRate = this.state.crimeRate;
        console.log("Crime crime rate", crimeRate);
        if (crimeRate >= 0.2) {
            return (
                <Chip avatar={<Avatar><GradeIcon/></Avatar>} label="Crime is High"
                className="ChipsHighlight" color={this.props.compareColor}/>
            );
        } else {
            return (
                <div></div>
            )
        }
    }
}

export default Crime;
