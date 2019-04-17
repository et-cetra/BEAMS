import React from 'react';
import '../../pages/SuburbPage.css'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Grid, Paper, CircularProgress, Fade, Chip } from '@material-ui/core';

class DGSection extends React.Component {
    
    getLegend = (value, entry, index) => {
      const COLORS = this.props.COLORS;
      if(index >= this.props.chartData.length) return;
      else 
        return <Chip variant="outlined" label={value} color="inherit"
          style={{color: COLORS[index], marginTop: "3px", marginBottom: "3px"}}/>;
    }

    singlePie = (chartData, COLORS) => {
      return(
        <ResponsiveContainer height={400} width="100%">
        <PieChart className="PieChart" onMouseEnter={this.onPieEnter}>
            <Pie data={chartData} innerRadius="55%" outerRadius="72%" cx="50%"  
            animationBegin={0} animationDuration={50} fill="#8884d8" paddingAngle={4}
            dataKey="value" label={this.renderCustomizedLabel} labelLine={false}>
            {chartData.map((entry, index) =>
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
            )}
            </Pie>
            <Legend align="center" layout="horizontal" formatter={this.getLegend}
            verticalAlign="bottom" iconSize={0}/>
            <Tooltip/>
        </PieChart>
        </ResponsiveContainer>
      );
    }

    multiPie = (chartData, COLORS, suburbs) => {
      const cxR = "50%";
      const cyR = 150;
      return(
        <div style={{width: "100%"}}>
        <div className="CompareDGText">
            <Chip className="CompareDGTextL" label={suburbs[0].suburb}/>
            <Chip className="CompareDGTextR" label={suburbs[1].suburb}/>
        </div>
        <ResponsiveContainer height={400} width="100%">
          <PieChart className="PieChart" onMouseEnter={this.onPieEnter}>
            <Pie data={chartData} innerRadius="55%" outerRadius="72%" cx={cxR} cy={cyR}
            animationBegin={0} animationDuration={50} fill="#8884d8" paddingAngle={4}
            dataKey="value" label={this.renderCustomizedLabel} labelLine={false}
            startAngle={80} endAngle={-80}>
            {chartData.map((_entry, index) =>
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
            )}
            </Pie>
            <Pie data={chartData} innerRadius="55%" outerRadius="72%" cx={cxR} cy={cyR}
              animationBegin={0} animationDuration={50} fill="#8884d8" paddingAngle={4}
              dataKey="value2" label={this.renderCustomizedLabel} labelLine={false}
              startAngle={100} endAngle={260}>
              {chartData.map((_entry, index) =>
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
              )}
            </Pie>
            <Tooltip/>
            <Legend cx={20} wrapperStyle={{marginLeft: "4%"}} align="center" layout="horizontal" formatter={this.getLegend}
            verticalAlign="bottom" iconSize={0}/>
          </PieChart>          
        </ResponsiveContainer>
        </div>
      );
    }

    renderCustomizedLabel = ({
      cx, cy, midAngle, innerRadius, outerRadius, percent, index,
    }) => {

      const COLORS = this.props.COLORS;
      const RADIAN = Math.PI / 180;
      var radius = innerRadius + (outerRadius - innerRadius) * 1.5;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
      return (
        <text x={x} y={y} fill={COLORS[index % COLORS.length]} 
        textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      );
    }

    render() {
      const COLORS = this.props.COLORS;
      const chartData = this.props.chartData;
      const isCompare = this.props.isCompare;
      const suburbs = this.props.suburbs;

      if(this.props.loading){
        return (
          <div className="DGTab">
            <Paper square>
            <Grid className="DGGridContainer" container spacing={16} direction="row"
            justify="center" alignItems="center">
              <Grid item><CircularProgress size={60} color="secondary"/></Grid>
            </Grid>
            </Paper>
          </div>
        );
      }
      else{
        console.log(chartData);
        return (
          <div className="DGTab">
            <Paper square>
            <Grid className="DGGridContainer" container spacing={16} direction="row"
            justify="center" alignItems="stretch">
            <Fade in timeout={600}>
            <Grid item xs={7}>

              {isCompare ? this.multiPie(chartData, COLORS, suburbs) 
                : this.singlePie(chartData, COLORS)}

            </Grid>
            </Fade>
            <Fade in timeout={600}>

            <Grid item xs={5} className="DGInfoContainer">
            <br/><br/>
            info goes here (no css yet)
            </Grid>
            </Fade>
            </Grid>
            </Paper>
          </div>
      );
    }
  }
}

export default DGSection;
