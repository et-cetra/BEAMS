import React from 'react';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import GradeIcon from '@material-ui/icons/Grade'
import { getCrimeRate } from '../../utils.js'

class Crime extends React.Component {
    state = {
        crimeRate: 0.2
    };

    async resolveCrimeRate() {
        const crimeRate = await getCrimeRate(this.props.suburb, this.props.suburb_state);
        return crimeRate;
    }

    async componentDidMount() {
        const result = await this.resolveCrimeRate(this.props.suburb, this.props.suburb_state);
        this.setState({
            crimeRate: result
        });
    }


    render() {
        const crimeRate = this.state.crimeRate;
        if (crimeRate < 0.2) {
            return (
                <Chip avatar={<Avatar><GradeIcon/></Avatar>} label="Low Crime Rate"
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
