import React from 'react';
import { getStats, getDemographics, getSchools } from '../../utils.js'
import { RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';

class RadarSection extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        isLoaded: false,
        allData: []
    };
  } 

  normalizeData() {

  }

  async componentDidMount() {
    const allStats = await getStats(this.props.suburbs[0].suburb, this.props.suburbs[0].suburb_state);
    
    this.setState({
      allData: allStats.series.seriesInfo
    })
  }

  render() {
    const allData = this.state.allData;

    const avSoldPriceSub = 840000;
    const avEducation = 5;

    var soldPriceAv = 0;
      (allData[7] != undefined) && (soldPriceAv = avSoldPriceSub - allData[7].values.medianSoldPrice);

    console.log(soldPriceAv);

    const radarData = [
      {
        category: 'Pricing', value: soldPriceAv, total: avSoldPriceSub,
      },
      {
        category: 'Education', value: soldPriceAv, total: avEducation,
      },
    ];


    const COLORS = this.props.COLORS;
    return(
      <RadarChart outerRadius="75%" width={400} height={350} data={radarData}>
        <PolarGrid/>
        <PolarAngleAxis dataKey="category"/>
        <Radar dataKey="value" stroke={COLORS[0]} fill={COLORS[0]} fillOpacity={0.7}/>
      </RadarChart>
    )
  }
}

export default RadarSection;
