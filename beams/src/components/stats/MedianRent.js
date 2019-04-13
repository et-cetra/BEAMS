import React from 'react';
import '../../pages/SuburbPage.css'
import { getStats } from '../../utils.js'
import StatsSection from './StatsSection';

class MedianRent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            contents: []
        };
    }

    async componentDidMount() {
        const rentStats = await getStats(this.props.suburb, this.props.suburb_state, "MedianRentListingPrice");
        this.setState({
            isLoaded: true,
            contents: rentStats.series.seriesInfo,
        });
    }

    render() {
        const { error, isLoaded, contents } = this.state;
        const COLORS = this.props.COLORS;

        const chartData = [];

        contents.forEach(item => {
            var monthSection = Math.ceil(item.month/3).toString();
            chartData.push({name: item.year.toString() + " Q" + monthSection, 
                value: item.values["medianRentListingPrice"]});
        });

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return (
            <div>
                <StatsSection loading={1} COLORS={COLORS} chartData={[]}/>
            </div>
            );
        } else {
            return (
            <div>
                <StatsSection loading={0} COLORS={COLORS} chartData={chartData}/>
            </div>
            );
        }
    }
}

export default MedianRent;
