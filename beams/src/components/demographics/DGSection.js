import React from 'react';
import '../../pages/SuburbPage.css'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Grid, Paper, CircularProgress, Fade, Chip } from '@material-ui/core';

class DGSection extends React.Component {

    customTooltip = ({ active, payload }) => {
      if (active) {
        return (
          <Paper className="TooltipWindow">
            <div>
              <span className="TooltipLabel">{`${payload[0].name}`}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <span style={{float: "right"}} className="TooltipLabel">{`${payload[0].value} people`}</span>
            </div>
          </Paper>
        );
      }
    
      return null;
    };
    
    getLegend = (value, entry, index) => {
      const COLORS = this.props.COLORS;
      return <Chip variant="outlined" label={value} color="primary"
        style={{color: COLORS[index], marginTop: "3px", marginBottom: "3px", marginLeft: "-4px", marginRight: "-4px"}}/>;
    }

    getLegend2 = (value, entry, index) => {
      const COLORS = this.props.COLORS;
      if(index >= this.props.chartData.length) return;
      return <Chip variant="outlined" label={value} color="default"
        style={{color: COLORS[index], marginTop: "3px", marginBottom: "3px", marginLeft: "-4px", marginRight: "-4px"}}/>;
    }

    singlePie = (chartData, COLORS) => {
      return(
        <ResponsiveContainer height={400} width="100%">
        <PieChart className="PieChart" onMouseEnter={this.onPieEnter}>
            <Pie data={chartData} innerRadius="55%" outerRadius="72%" cx="50%"  
            isAnimationActive={false} fill="#8884d8" paddingAngle={4}
            dataKey="value" label={this.renderCustomizedLabel} labelLine={false}>
            {chartData.map((entry, index) =>
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
            )}
            </Pie>
            <Legend align="center" layout="horizontal" formatter={this.getLegend}
            verticalAlign="bottom" iconSize={0}/>
            <Tooltip content={this.customTooltip}/>
        </PieChart>
        </ResponsiveContainer>
      );
    }

    multiPie = (chartData, COLORS, suburbs) => {
      return(
        <div style={{width: "100%"}}>
          <div className="CompareDGText">
              <Chip className="CompareDGTextL" color="primary" label={suburbs[0].suburb}/>
              <Chip className="CompareDGTextR" color="secondary" label={suburbs[1].suburb}/>
          </div>
            <ResponsiveContainer height={375} width="100%">
              <PieChart className="PieChart" onMouseEnter={this.onPieEnter}>
                <Pie data={chartData} innerRadius="55%" outerRadius="72%" cx="25%"
                isAnimationActive={false} fill="#8884d8" paddingAngle={3}
                dataKey="value" label={this.renderCustomizedLabel} labelLine={false}
                >
                {chartData.map((_entry, index) =>
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                )}
                </Pie>

                <Pie data={chartData} innerRadius="55%" outerRadius="72%" cx="75%"
                isAnimationActive={false} fill="#8884d8" paddingAngle={3}
                dataKey="value2" label={this.renderCustomizedLabel} labelLine={false}
                startAngle={180} endAngle={-180}>
                {chartData.map((_entry, index) =>
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                )}
                </Pie>

                <Tooltip content={this.customTooltip}/>
                <Legend wrapperStyle={{marginLeft: "36px"}} align="center" layout="horizontal" formatter={this.getLegend2}
                verticalAlign="bottom" iconSize={0}/>
              </PieChart>          
            </ResponsiveContainer>

            {/* <Grid item xs={0}>
            <ResponsiveContainer height={375} width="100%">
              <PieChart className="PieChart" onMouseEnter={this.onPieEnter}>
                <Pie data={chartData2} innerRadius="55%" outerRadius="72%" cx="50%"
                isAnimationActive={false} fill="#8884d8" paddingAngle={4}
                dataKey="value" label={this.renderCustomizedLabel} labelLine={false}
                startAngle={180} endAngle={-180}>
                {chartData2.map((_entry, index) =>
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                )}
                </Pie>
                <Tooltip/>
                <Legend align="center" layout="horizontal" formatter={this.getLegend2}
                verticalAlign="bottom" iconSize={0}/>
              </PieChart>          
            </ResponsiveContainer> 
            </Grid>*/}
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
    
      if((percent * 100).toFixed(0) == 0) 
      return (
        <text x={x} y={y} fill={COLORS[index % COLORS.length]} 
        textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" style={{fontSize: "12px"}}>
          {"< 1%"}
        </text>
      );
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
      var itemSize = 7;
      if(isCompare) itemSize = 12;

      if(this.props.loading){
        return (
          <div className="DGTab">
            <Paper square>
            <Grid className="DGGridContainer" container spacing={0} direction="row"
            justify="center" alignItems="stretch">
              <Grid item xs={itemSize}><CircularProgress size={60} color="secondary"/></Grid>
            </Grid>
            </Paper>
          </div>
        );
      }
      else{
        return (
          <div className="DGTab">
            <Paper square>
            <Grid className="DGGridContainer" container spacing={0} direction="row"
            justify="center" alignItems="stretch">
            <Fade in timeout={600}>
            <Grid item xs={itemSize}>

              {isCompare ? this.multiPie(chartData, COLORS, suburbs) 
                : this.singlePie(chartData, COLORS)}

            </Grid>
            </Fade>
            <Fade in timeout={600}>

            {!isCompare ?
              <Grid item xs={5} className="DGInfoContainer">
              <br/><br/>
              info goes here (no css yet)
              </Grid>
              :
              <Grid item xs={3}/>
            }
            </Fade>
            </Grid>
            </Paper>
          </div>
      );
    }
  }
}

export default DGSection;
