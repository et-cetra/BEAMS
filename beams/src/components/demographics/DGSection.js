import React from 'react';
import '../../pages/SuburbPage.css'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Grid, Paper, CircularProgress, Fade } from '@material-ui/core';

class DGSection extends React.Component {
    render() {
      const COLORS = this.props.COLORS;
      const chartData = this.props.chartData;

      const renderTextSize = ({value, entry, index}) => {        
        return <span style={{ textSize: 10 }}>{value}</span>;
      };

      const renderCustomizedLabel = ({
        cx, cy, midAngle, innerRadius, outerRadius, percent, index,
      }) => {

        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 1.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
      
        return (
          <text x={x} y={y} fill={COLORS[index % COLORS.length]} 
          textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
          </text>
        );
      };
      
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
        return (
          <div className="DGTab">
            <Paper square>
            <Grid className="DGGridContainer" container spacing={16} direction="row"
            justify="flex-start" alignItems="flex-start">
            <Fade in timeout={600}>
            <Grid item xs={7}>

            <ResponsiveContainer height={350} width="100%">
            <PieChart className="PieChart" 
            onMouseEnter={this.onPieEnter}>
                <Pie data={chartData} innerRadius="55%" outerRadius="70%" cx="48%"  
                animationBegin={0} animationDuration={50} fill="#8884d8" paddingAngle={4}
                dataKey="value" label={renderCustomizedLabel} labelLine={false}>
                {chartData.map((entry, index) =>
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                )}
                </Pie>
                <Legend align="center" layout="horizontal"
                verticalAlign="bottom" iconType="circle" iconSize={8}/>
                <Tooltip/>
            </PieChart>
            </ResponsiveContainer>

            </Grid>
            </Fade>
            <Fade in timeout={600}>
            <Grid className="DGInfoContainer" item xs={5}>
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
