import React from 'react';
import { getStats, getDemographics, getSchoolRating} from '../../utils.js'
import { RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';

class RadarSection extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        isLoaded: false,
        priceRating: 0,
        educationRating: 0,
        seRating: 0,
    };
  } 

  normalizeData(data, highest, lowest) {
      return (((data - lowest) * 100.0 / (highest - lowest)) / 10.0);
  }

  async componentDidMount() {
    const suburbs = this.props.suburbs;

    const statData = await getStats(suburbs[0].suburb, suburbs[0].suburb_state);
    const educationData = await getSchoolRating(suburbs[0].suburb, suburbs[0].suburb_state);
    const seRating = await getDemographics(suburbs[0].suburb, suburbs[0].suburb_state, "-------HOUSING DATA");

    const priceRating = this.normalizeData(statData.series.seriesInfo[7].values.medianSoldPrice, 850000 * 1.5, 850000 / 1.5);
    const educationRating = this.normalizeData(educationData, 1300, 100);
    
    this.setState({
      priceRating: priceRating,
      educationRating: educationRating,
    })
  }

  render() {
    const { priceRating, educationRating } = this.state;

    console.log("hi", educationRating);
    const radarData = [
      {category: 'Affordability', value: priceRating, total: 10},
      {category: 'Education Quality', value: educationRating, total: 10},
      {category: 'Socioeconomic Status', value: 0, total: 10},
    ];

    const COLORS = this.props.COLORS;
    return(
      <RadarChart outerRadius="75%" width={380} height={350} data={radarData}>
        <PolarGrid/>
        <PolarAngleAxis dataKey="category"/>
        <Radar dataKey="value" stroke={COLORS[0]} fill={COLORS[0]} fillOpacity={0.7}/>
      </RadarChart>
    )
  }
}

export default RadarSection;
