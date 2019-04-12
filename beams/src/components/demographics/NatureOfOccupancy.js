import React from 'react';
import '../../pages/SuburbPage.css'
import { getDemographics } from '../../utils.js'
import DGSection from './DGSection';

class NatureOfOccupancy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            contents: []
        };
    }

    async componentDidMount() {
        const suburbInfo = await getDemographics(this.props.suburb, this.props.suburb_state, "NatureOfOccupancy");
        this.setState({
            isLoaded: true,
            contents: suburbInfo.demographics
        });
    }

    render() {
        const { error, isLoaded, contents } = this.state;
        const COLORS = this.props.COLORS;
        
        const chartData = [];
        contents.map(content => (content.items.map((item, i) => (
            chartData.push({name: item.label, value: item.value, color: COLORS[i]})
        ))));

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div/>;
        } else {
            return (
            <div>
                <DGSection COLORS={COLORS} chartData={chartData}/>
            </div>
            );
        }
    }
}

export default NatureOfOccupancy;
