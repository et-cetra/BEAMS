import React from 'react';
import '../../pages/SuburbPage.css'
import { getStats, getSEData, getSchoolRating, getCrimeRate } from '../../utils.js'
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'
import { CircularProgress } from '@material-ui/core'

class RadarSection extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        priceRating: 5,
        educationRating: 5,
        seRating: 5,
        wellbeingRating: 5,
        priceRating2: 5,
        educationRating2: 5,
        seRating2: 5,
        wellbeingRating2: 5,
        isLoaded: false,
    };
  }

  normalizeData(data, highest, lowest) {
    if(data === undefined || data === null || data === 0) return 5;
      return (((data - lowest) * 100.0 / (highest - lowest)) / 10.0);
  }

  async componentDidMount() {
    const suburbs = this.props.suburbs;
    const highestMedianPrice = 2800000;

    const statData = await getStats(suburbs[0].suburb, suburbs[0].suburb_state);
    const educationData = await getSchoolRating(suburbs[0].suburb, suburbs[0].suburb_state);
    const crimeData = await getCrimeRate(suburbs[0].suburb, suburbs[0].suburb_state);

    const priceRating = this.normalizeData(highestMedianPrice - statData.series.seriesInfo[6].values.medianSoldPrice, highestMedianPrice, 0);
    const educationRating = this.normalizeData(educationData, 1300, 100);
    const seRating = await getSEData(suburbs[0].suburb, suburbs[0].suburb_state);
    const wellbeingRating = this.normalizeData(0.65 - crimeData, 0.65, 0);

    this.setState({
      priceRating: priceRating,
      educationRating: educationRating,
      seRating: seRating,
      wellbeingRating: wellbeingRating,
      isLoaded: true,
    });

    if(this.props.isCompare){
      this.setState({isLoaded: false});

      const statData2 = await getStats(suburbs[1].suburb, suburbs[1].suburb_state);
      const educationData2 = await getSchoolRating(suburbs[1].suburb, suburbs[1].suburb_state);
      const crimeData2 = await getCrimeRate(suburbs[1].suburb, suburbs[1].suburb_state);

      const priceRating2 = this.normalizeData(highestMedianPrice - statData2.series.seriesInfo[6].values.medianSoldPrice, highestMedianPrice, 0);
      const educationRating2 = this.normalizeData(educationData2, 1300, 100);
      const seRating2 = await getSEData(suburbs[1].suburb, suburbs[1].suburb_state);
      const wellbeingRating2 = this.normalizeData(0.65 - crimeData2, 0.65, 0);

      this.setState({
        priceRating2: priceRating2,
        educationRating2: educationRating2,
        seRating2: seRating2,
        wellbeingRating2: wellbeingRating2,
        isLoaded: true,
      });
    }

    this.props.onCalc(this.state);
  }

  renderTicks = (props) => {
    const { payload, x, y, index } = props;

    return (
      <text x={x} y={index === 0 ? y-5 : y+20} textAnchor={'middle'} className="RadarTicks">
        {payload.value}
      </text>
    );
  }

  render() {
    const { isLoaded, priceRating, educationRating, seRating, wellbeingRating } = this.state;
    const { priceRating2, educationRating2, seRating2, wellbeingRating2 } = this.state;
    const COLORS = this.props.COLORS;
    const isCompare = this.props.isCompare;
    const radarData = [
      {category: 'Socioeconomic Status', value: seRating, value2: seRating2, total: 10},
      {category: 'Affordability', value: priceRating, value2: priceRating2, total: 10},
      {category: 'Education Quality', value: educationRating, value2: educationRating2, total: 10},
      {category: 'Safety', value: wellbeingRating, value2: wellbeingRating2, total: 10},
    ];

    if(isLoaded) {
      return(
        <div>
        <RadarChart outerRadius="75%" width={400} height={400} data={radarData} cy="50%">
          <PolarGrid/>
          <PolarAngleAxis dataKey="category" tick={this.renderTicks}/>
          <PolarRadiusAxis domain={[0, 10]} angle={90} tick={false}/>
          <Radar dataKey="value" stroke={COLORS[0]} fill={COLORS[0]} fillOpacity={0.5} dot={true}/>
          {isCompare && <Radar dataKey="value2" stroke={COLORS[1]} fill={COLORS[1]} fillOpacity={0.5} dot={true}/>}
        </RadarChart>
        </div>
      );
    } else {
      return(
        <CircularProgress size={60} color="primary"/>
      );
    }

  }
}

export default RadarSection;
