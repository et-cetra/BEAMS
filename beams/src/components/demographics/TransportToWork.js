import React from 'react';
import '../../pages/SuburbPage.css'
import { getDemographics } from '../../utils.js'
import DGSection from './DGSection';

class Transport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            contents: []
        };
    }

    async componentDidMount() {
        const suburbInfo = await getDemographics(this.props.suburb, this.props.suburb_state, "TransportToWork");
        this.setState({
            isLoaded: true,
            contents: suburbInfo.demographics
        });
    }

    render() {
        const { error, isLoaded, contents } = this.state;
        const COLORS = this.props.COLORS;

        var chartData = [];
        contents.map(content => (content.items.map((item) => (
            chartData.push({name: item.label, value: item.value})
        ))));

        chartData.forEach((item) => {
            if(item.name === "Car (driver)"){
                item.name = "Car";
            }

            if(item.name === "Walked only"){
                item.name = "Walked";
            }
        });

        chartData = chartData.filter(item => item.name !== 'Did not go to work');
        chartData = chartData.filter(item => item.name !== 'Car (Pas.)');
        chartData = chartData.filter(item => item.name !== 'Worked at home');

        chartData = chartData.splice(0,3);

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return (
            <div>
                <DGSection loading={1} COLORS={COLORS} chartData={[]}/>
            </div>
            );
        } else {
            return (
            <div>
                <DGSection loading={0} COLORS={COLORS} chartData={chartData}/>
            </div>
            );
        }
    }
}

export default Transport;
