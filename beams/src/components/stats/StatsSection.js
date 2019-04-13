import  React  from 'react';
import '../../pages/SuburbPage.css'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Grid, CircularProgress, Fade } from '@material-ui/core';

class AxisTickX extends React.Component {
  render() {
    const {
      x, y, payload,
    } = this.props;

    return (
      <text style={{fontSize: 14}} x={x} y={y} dy={16} textAnchor="middle" fill="#666">{payload.value}</text>
    );
  }
}

class AxisTickY extends React.Component {
  render() {
    const {
      x, y, payload,
    } = this.props;

    return (
      <text style={{fontSize: 14}} x={x} y={y} textAnchor="end" fill="#666">{payload.value}</text>
    );
  }
}

class StatsSection extends React.Component {
    render() {
      const COLORS = this.props.COLORS;
      const chartData = this.props.chartData;
      
      if(this.props.loading){
        return (
          <div className="StatsTab">
            <Grid className="StatsGridContainer" container  direction="column"
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
              <XAxis dataKey="name" tick={<AxisTickX/>} tickLine={false}/>
              <YAxis tick={<AxisTickY/>} tickLine={false}/>
              <Tooltip />
              <Legend verticalAlign="bottom" iconType="circle" iconSize={8}/>
              <Line type="monotone" dataKey="Highest" stroke={COLORS[0]} strokeDasharray="3 3"/>
              <Line type="monotone" dataKey="Median" stroke={COLORS[2]}/>
              <Line type="monotone" dataKey="Lowest" stroke={COLORS[1]} strokeDasharray="3 3"/>
            </LineChart>
            </ResponsiveContainer>

            </Grid>
            </Fade>
            <Fade in timeout={600}>
            <Grid className="StatsInfoContainer">
            info goes here (no css yet)
            </Grid>
            </Fade>
            </Grid>
          </div>
      );
    }
  }
}

export default StatsSection;
