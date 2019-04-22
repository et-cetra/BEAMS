import React from 'react';
import '../../pages/SuburbPage.css'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Grid, Paper, CircularProgress, Fade, Chip, Button, Popper, Typography } from '@material-ui/core';
import ExtraIcon from '@material-ui/icons/ChevronRight';

class DGSection extends React.Component {

  state = {
    anchorEl: null,
    open: false,
    placement: null,
  };

  handleClick = placement => event => {
    const { currentTarget } = event;
    this.setState(state => ({
      anchorEl: currentTarget,
      open: state.placement !== placement || !state.open,
      placement,
    }));
  };

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
    const { anchorEl, open, placement } = this.state;
    const id = open ? 'simple-popper' : null;

    return(
      <div style={{paddingLeft: "50px", paddingRight: "50px", paddingTop: "20px"}}>
      
      <div className="ExtraIcon">
      <Button aria-describedby={id} variant="contained" onClick={this.handleClick('right-start')}
      size="medium" color="secondary" aria-label="Guide">
        Info<ExtraIcon />
        <Popper id={id} open={open} anchorEl={anchorEl} placement={placement} transition className="PopperContainer">
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper className="PopperInfo">
                {this.getPopperContent()}
              </Paper>
            </Fade>
          )}
        </Popper>
      </Button>
      </div>

      <ResponsiveContainer height={400} width="100%">
      <PieChart className="PieChart" onMouseEnter={this.onPieEnter}>
          <Pie data={chartData} innerRadius="55%" outerRadius="72%" cx="50%"  
          isAnimationActive={false} fill="#8884d8" paddingAngle={4}
          dataKey="value" label={this.renderCustomizedLabel} labelLine={false}>
          {chartData.map((entry, index) =>
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
          )}
          </Pie>
          <Legend align="right" layout="vertical" formatter={this.getLegend}
          verticalAlign="middle" iconSize={0}/>
          <Tooltip content={this.customTooltip}/>
      </PieChart>
      </ResponsiveContainer>
      </div>
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
  
    if((percent * 100).toFixed(0) === 0) 
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

    if(this.props.loading){
      return (
        <div className="DGTab">
          <Paper square>
          <Grid className="DGGridContainer" container direction="column"
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
  
          <Grid className="DGGridContainer" container spacing={0} direction="row"
          justify="center" alignItems="stretch">
          <Fade in timeout={600}>
          <Grid item xs={12}>

            {isCompare ? this.multiPie(chartData, COLORS, suburbs) 
              : this.singlePie(chartData, COLORS)}

          </Grid>
          </Fade>
          </Grid>
          </Paper>
        </div>
      );
    }
  }

  getPopperContent = () => {
    const type = this.props.type;
    const chartData = this.props.chartData;
    var total = chartData.reduce((partialTotal, a) => partialTotal + a.value, 0);
    var processedValue = this.processedValue;
    var formattedText = this.formattedText;

    switch(type){
      //Age
      case "AgeGroupOfPopulation":
        if(processedValue("0 to 4", chartData, total) + processedValue("5 to 19", chartData, total) >= 50)
        return formattedText("Family Prominent", 
          "This area mainly consists of growing families. Recommended for growing and settled families.")
        else if(processedValue("60+", chartData, total) >= 25)
        return formattedText("Elderly Prominent", 
          "This area mainly consists of retirees and elderly families, usually secluded from cities. Recommended for settled families or retirees.")
        else if(processedValue("20 to 39", chartData, total) >= 50)
        return formattedText("Work and Education Focused Population", 
          "This area has a high mid-age population, usually in an urban setting and densely populated. Recommended for high-education students and those searching for competitive careers.")
        else
          return formattedText("Balanced", 
            "This area is balanced in terms of the distribution of age groups. Optimal for most demographics.")
      
      //Diversity
      case "CountryOfBirth":
        if(processedValue(chartData[0].name, chartData, total) <= 40)
          return formattedText("Multicultural", 
            "This area has a diverse range of cultures and is accustomed for people of all backgrounds.")
        else if(processedValue(chartData[0].name, chartData, total) >= 65)
          return formattedText(`High Proportion of People from ${chartData[0].name}`, 
            `This area has a focused amount of people from ${chartData[0].name}. People with this background may find the area more suitable and homely to them.`)
        else 
          return formattedText("Standard", 
            "This area has an average variety of cultures, similar to most other Australian suburbs.")
        

      //Occupancy
      case "NatureOfOccupancy":
        if(processedValue("Rented", chartData, total) >= 50)
          return formattedText("Business Value", 
            "This area shows potential benefits from investing in properties. Recommended for investors.")
        else if (processedValue("Fully Owned", chartData, total) >= 40)
          return formattedText("Community Oriented", 
            "This area is suitable for long-term residency, and is likely to have high community focus. Recommended for families or retirees.")
        else if (processedValue("Purchasing", chartData, total) >= 40)
          return formattedText("Growth Prospectives", 
            "This area is likely to undergo growth and development in the near future. Recommended for new and growing families.")
        else 
          return formattedText("Balanced", 
            "This area is balanced in terms of the nature of occupancy. Optimal for most demographics.")

      //Transport
      case "TransportToWork":
        if(processedValue("Walked", chartData, total) >= 50)
          return formattedText("Accessible Facilities", 
            "This area has most facilities nearby in walking distance. Transport requirements are minimal. Recommended for students and workers.")
        else if(processedValue("Train", chartData, total) >= 35 || processedValue("Bus", chartData, total) >= 35 || processedValue("Train & Bus", chartData, total) >= 35)
          return formattedText("Public Transport Ready", 
            "This area has most facilities in distant areas, however has adequate public transport infrastructure for travel. Optimal for students or workers travelling to urban facilities.")
        else if(processedValue("Car", chartData, total) >= 75)
          return formattedText("Distant facilities", 
            "This area has most facilities in distant areas and requires a motor vehicle for travel. Not recommended for students or workers. Public transport demands long trip times.")
        else if(processedValue("Car", chartData, total) >= 65)
          return formattedText("Motor Vehicle Recommended", 
            "This area has most facilities in distant areas, however has adequate methods for travel on road. Optimal for workers. May not be optimal for students, or those without motor vehicles.")
        else 
          return formattedText("Standard", 
            "This area has sufficient transport methods for the general population. Optimal for most demographics.")

        default: return;
    }
  }

  formattedText = (heading, text) => {
    return (
      <div>
        <Typography><b>{heading}</b></Typography>
        <br/>
        <Typography>{text}</Typography>
      </div>
    );
  }

  processedValue(name, chartData, total) {
    var x = chartData.find(item => item.name === name);
    if(x === undefined) return 0;
    x = x.value;
    return (x / total * 100);
  }
}

export default DGSection;
