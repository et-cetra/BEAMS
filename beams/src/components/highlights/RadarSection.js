import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';

class RadarSection extends React.Component {

  normalizeData() {

  }

  async getData() {

  }

  render() {

    const data = [
      {
        subject: 'Math', A: 120, B: 110, fullMark: 150,
      },
      {
        subject: 'Chinese', A: 98, B: 130, fullMark: 150,
      },
      {
        subject: 'English', A: 86, B: 130, fullMark: 150,
      },
      {
        subject: 'Geography', A: 99, B: 100, fullMark: 150,
      },
      {
        subject: 'Physics', A: 85, B: 90, fullMark: 150,
      },
    ];


    const COLORS = this.props.COLORS;
    return(
      <RadarChart outerRadius="75%" width={400} height={350} data={data}>
        <PolarGrid/>
        <PolarAngleAxis dataKey="subject"/>
        <Radar dataKey="A" stroke={COLORS[0]} fill={COLORS[0]} fillOpacity={0.7}/>
      </RadarChart>
    )
  }
}

export default RadarSection;
