import React from 'react';
import '../../pages/SuburbPage.css'
import { getStats, getBedroomStats } from '../../utils.js'
import StatsSection from './StatsSection';

class HouseSoldPrice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            contents: []
        };
    }

    async componentDidMount() {
      const bedrooms = this.props.bedrooms;
      var rentStats = await getStats(this.props.suburbs[0].suburb, this.props.suburbs[0].suburb_state);

      if (bedrooms != 0) {
        rentStats = await getBedroomStats(this.props.suburbs[0].suburb, this.props.suburbs[0].suburb_state, bedrooms);
      }


      if(this.props.isCompare){
        var rentStats2 = await getStats(this.props.suburbs[1].suburb, this.props.suburbs[1].suburb_state);
        if (bedrooms != 0) {
          console.log("lol");
          rentStats = await getBedroomStats(this.props.suburbs[1].suburb, this.props.suburbs[1].suburb_state, bedrooms);
        }
        this.setState({
          isLoaded: true,
          contents: rentStats.series.seriesInfo,
          contents2: rentStats2.series.seriesInfo,
      });
      } else {
        this.setState({
            isLoaded: true,
            contents: rentStats.series.seriesInfo,
        });
      }
    }

    render() {
      const { error, isLoaded, contents, contents2 } = this.state;
      const COLORS = this.props.COLORS;
      const suburbs = this.props.suburbs;
      const isCompare = this.props.isCompare;
      const chartData = [];
      var s1Name, s2Name;

      if(isCompare)
      {
        s1Name = `Median (${suburbs[0].suburb})`
        s2Name = `Median (${suburbs[1].suburb})`
      }

      for(var i = 0; i < contents.length; i++)
      {
        var item = contents[i];
        var monthSection = Math.ceil(item.month/3).toString();

        if(isCompare)
        {
          var item2 = contents2[i];
          chartData.push({name: item.year.toString() + " Q" + monthSection,
              [s1Name] : item.values["medianSoldPrice"],
              [s2Name] : item2.values["medianSoldPrice"],
          });
        } else {
          chartData.push({name: item.year.toString() + " Q" + monthSection,
              Median: item.values["medianSoldPrice"],
              Lowest: item.values["lowestSoldPrice"],
              Highest: item.values["highestSoldPrice"],
          });
        }
      }

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
              <StatsSection loading={0} COLORS={COLORS} chartData={chartData} isCompare={isCompare}
              suburbs={suburbs} type="HouseSoldPrice"/>
          </div>
          );
      }
    }
}

export default HouseSoldPrice;
