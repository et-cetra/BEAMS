import  React  from 'react';
import '../../pages/SuburbPage.css'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Grid, CircularProgress, Fade, Chip } from '@material-ui/core';

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

    //Function used to make Y axis concise
    function nFormatter(num, digits) {
      var si = [
        { value: 1, symbol: "" },
        { value: 1E3, symbol: "k" },
        { value: 1E6, symbol: "M" },
        { value: 1E9, symbol: "G" },
        { value: 1E12, symbol: "T" },
        { value: 1E15, symbol: "P" },
        { value: 1E18, symbol: "E" }
      ];
      var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
      var i;
      for (i = si.length - 1; i > 0; i--) {
        if (num >= si[i].value) {
          break;
        }
      }
      return "$" + (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
    }      
    //End number formatter

    const formattedValue = nFormatter(payload.value, 2);
    return (
      <text style={{fontSize: 14}} x={x} y={y} textAnchor="end" fill="#666">{formattedValue}</text>
    );
  }
}

class StatsSection extends React.Component {
    getLegend = (value, entry, index) => {
      var COLORS = this.props.COLORS;
      //Swap colours so graph syncs
     
      return <Chip variant="outlined" label={value} color="default"
        style={{color: COLORS[index], marginTop: "3px", marginBottom: "3px"}}/>;
    }

    singleChart = (chartData, COLORS) => {
      return(
        <ResponsiveContainer height={450} width="95%">
        <LineChart className="LineChart"
        data={chartData} margin={{top: 40, right: 20, left: 20, bottom: 10}}>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="name" tick={<AxisTickX/>} tickLine={false}/>
          <YAxis tick={<AxisTickY/>} tickLine={false}/>
          <Tooltip />
          <Legend verticalAlign="bottom" align="center" iconSize={0} formatter={this.getLegend}/>
          <Line type="monotone" dataKey="Highest" stroke={COLORS[0]} strokeDasharray="3 3"/>
          <Line type="monotone" dataKey="Median" stroke={COLORS[1]}/>
          <Line type="monotone" dataKey="Lowest" stroke={COLORS[2]} strokeDasharray="3 3"/>
        </LineChart>
        </ResponsiveContainer>
      );
    }

    multiChart = (chartData, COLORS) => {
      const s1Name = `Median (${this.props.suburbs[0].suburb})`
      const s2Name = `Median (${this.props.suburbs[1].suburb})`
      return(
        <ResponsiveContainer height={450} width="95%">
        <LineChart className="LineChart"
        data={chartData} margin={{top: 40, right: 20, left: 20, bottom: 10}}>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="name" tick={<AxisTickX/>} tickLine={false}/>
          <YAxis tick={<AxisTickY/>} tickLine={false}/>
          <Tooltip />
          <Legend verticalAlign="bottom" align="center" iconSize={0} formatter={this.getLegend}/>
          <Line type="monotone" dataKey={s1Name} stroke={COLORS[0]}/>
          <Line type="monotone" dataKey={s2Name} stroke={COLORS[1]}/>
        </LineChart>
        </ResponsiveContainer>
      );
    }

    render() {
      const COLORS = this.props.COLORS;
      const chartData = this.props.chartData;
      const isCompare = this.props.isCompare;
      
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
              {isCompare ? this.multiChart(chartData, COLORS) : this.singleChart(chartData, COLORS)}
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
