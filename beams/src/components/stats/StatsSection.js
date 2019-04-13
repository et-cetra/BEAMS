import React from 'react';
import '../../pages/SuburbPage.css'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Grid, Card, Paper, CircularProgress, Fade } from '@material-ui/core';

class StatsSection extends React.Component {
    render() {
      const COLORS = this.props.COLORS;
      const chartData = this.props.chartData;
      
      if(this.props.loading){
        return (
          <div className="StatsTab">
            <Paper square>
            <Grid className="StatsGridContainer" container spacing={16}>
              <Grid item><CircularProgress size={60} color="secondary"/></Grid>
            </Grid>
            </Paper>
          </div>
        );
      }
      else{
        return (
          <div className="StatsTab">
            <Grid className="StatsGridContainer" container spacing={16} direction="column"
            justify="flex-start" alignItems="flex-start">
            <Fade in timeout={600}>
            <Grid item xs={7}>

            <LineChart width={700} height={400} className="LineChart"
            data={chartData} margin={{top: 40, right: 30, left: 20, bottom: 5}}>
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#E62927" activeDot={{ r: 8 }} />
            </LineChart>

            </Grid>
            </Fade>
            <Fade in timeout={600}>
            <Grid className="StatsInfoContainer" item xs={5}>
            <Card>This is where info goes</Card>
            </Grid>
            </Fade>
            </Grid>
          </div>
      );
    }
  }
}

export default StatsSection;
