import React from 'react';
import '../../pages/SuburbPage.css'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Grid, Card, CircularProgress, Fade } from '@material-ui/core';

class StatsSection extends React.Component {
    render() {
      const COLORS = this.props.COLORS;
      const chartData = this.props.chartData;
      
      if(this.props.loading){
        return (
          <div className="StatsTab">
            <Grid className="StatsGridContainer" container spacing={16} direction="row"
            justify="center" alignItems="center">
              <Grid item><CircularProgress size={60} color="secondary"/></Grid>
            </Grid>
          </div>
        );
      }
      else{
        return (
          <div className="StatsTab">
            <Grid className="StatsGridContainer" container direction="column"
            justify="center" alignItems="stretch">
            <Fade in timeout={600}>
            <Grid>

            <ResponsiveContainer height={450} width="95%">
            <LineChart className="LineChart"
            data={chartData} margin={{top: 40, right: 20, left: 20, bottom: 10}}>
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#E62927" activeDot={{ r: 8 }} />
            </LineChart>
            </ResponsiveContainer>

            </Grid>
            </Fade>
            <Fade in timeout={600}>
            <Grid className="StatsInfoContainer">
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
