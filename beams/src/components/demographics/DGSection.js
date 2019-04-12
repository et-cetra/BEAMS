import React from 'react';
import '../../pages/SuburbPage.css'
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { Grid, Card, Paper } from '@material-ui/core';

class DGSection extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
      const COLORS = this.props.COLORS;
      const chartData = this.props.chartData;

      const renderCustomizedLabel = ({
        cx, cy, midAngle, innerRadius, outerRadius, percent, index,
      }) => {

        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5 + 25;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
      
        return (
          <text x={x} y={y} fill={COLORS[index % COLORS.length]} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
          </text>
        );
      };

      return (
        <div>
          <Paper square>
          <Grid className="SuburbContainer" container spacing={12} direction="row"
          justify="flex-start" alignItems="flex-start">

          <Grid item xs={7}>
          <PieChart width={500} height={320}
          className="PieChart" onMouseEnter={this.onPieEnter}>
              <Pie cx={110} data={chartData} innerRadius={67} outerRadius={90} isAnimationActive={false}
              fill="#8884d8" paddingAngle={4} dataKey="value" label={renderCustomizedLabel} labelLine={false}>
              {chartData.map((entry, index) =>
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
              )}
              </Pie>
              <Legend cy={400} width={200} height={100} align="right"
              layout="vertical" verticalAlign="middle" iconType="circle" iconSize={10}/>
              <Tooltip/>
          </PieChart>
          </Grid>

          <Grid className="DemographicsInfoContainer" item xs={5}>
          <Card>This is where info goes</Card>
          </Grid>
          </Grid>
          </Paper>
        </div>
    );
  }
}

export default DGSection;
