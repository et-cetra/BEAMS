import  React  from 'react';
import '../../pages/SuburbPage.css'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Grid, CircularProgress, Fade, Chip, Paper, Button, Popper, Typography } from '@material-ui/core';
import ExtraIcon from '@material-ui/icons/ChevronRight';

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
  
    const formattedValue = StatsSection.nFormatter(payload.value, 2);
    return (
      <text style={{fontSize: 14}} x={x} y={y} textAnchor="end" fill="#666">{formattedValue}</text>
    );
  }
}

class StatsSection extends React.Component {
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
  //Function used to format numbers concisely
  static nFormatter(num, digits) {
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

  thousandsFormatter(x) {
    return "$" + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  customTooltip = ({ active, payload, label }) => {
    if (active) {
      var newValues = [];
      payload.forEach((item) => {
        newValues.push({value: this.thousandsFormatter(item.value), 
          name: item.name,
          color: item.color,
        })
      });

      return (
        <Paper className="TooltipWindow">
          <b>{label}</b>
            {newValues.map((item) => (
              <div key={item.name+item.value}>
                <span style={{color: item.color}} className="TooltipLabel">{`${item.name}`}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span style={{color: item.color, float: "right"}} className="TooltipLabel">{`${item.value}`}</span>
                <br/>
              </div>
            ))}
        </Paper>
      );
    }
  
    return null;
  };

  getLegend = (value, entry, index) => {
    var COLORS = this.props.COLORS;
    //Swap colours so graph syncs
    
    return <Chip variant="outlined" label={value} color="default"
      style={{color: COLORS[index], marginTop: "3px", marginBottom: "3px"}}/>;
  }

  singleChart = (chartData, COLORS) => {
    const { anchorEl, open, placement } = this.state;
    const id = open ? 'simple-popper' : null;

    return(
      <div>

      <div className="ExtraIconStats">
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
      <ResponsiveContainer height={430} width="95%">
      <LineChart className="LineChart" connectNulls
      data={chartData} margin={{top: 50, right: 20, left: 20, bottom: 10}}>
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey="name" tick={<AxisTickX/>} tickLine={false}/>
        <YAxis tick={<AxisTickY/>} tickLine={false}/>
        <Tooltip content={this.customTooltip}/>
        <Legend verticalAlign="bottom" align="center" iconSize={0} formatter={this.getLegend}/>
        <Line connectNulls type="monotone" dataKey="Highest" stroke={COLORS[1]} strokeDasharray="3 3"/>
        <Line connectNulls type="monotone" dataKey="Median" stroke={COLORS[0]}/>
        <Line connectNulls type="monotone" dataKey="Lowest" stroke={COLORS[2]} strokeDasharray="3 3"/>
      </LineChart>
      </ResponsiveContainer>
      </div>
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
        <Tooltip content={this.customTooltip}/>
        <Legend verticalAlign="bottom" align="center" iconSize={0} formatter={this.getLegend}/>
        <Line connectNulls type="monotone" dataKey={s1Name} stroke={COLORS[0]}/>
        <Line connectNulls type="monotone" dataKey={s2Name} stroke={COLORS[1]}/>
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
          <Grid className="StatsGridContainer" container direction="column"
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
          <Grid item>
            {isCompare ? this.multiChart(chartData, COLORS) : this.singleChart(chartData, COLORS)}
          </Grid>
          </Fade>
          </Grid>
        </div>
      );
    }
  }

  getPopperContent = () => {
    const type = this.props.type;
    const chartData = this.props.chartData;
    var formattedText = this.formattedText;
    var median = this.getMedian(chartData);
    const r = this.props.bedrooms;
    console.log("R", r);

    //total average, 1 room, 2 room, 3 room
    //manually calculated from 12 cities across australia using quartile medians
    const medianPricesRentL = [450, 320, 430, 605];
    const medianPricesRentM = [575, 390, 520, 725];
    const medianPricesRentH = [655, 540, 645, 880];

    //total average, --skip--, 2 room, 3 room, 4 room
    const medianPricesSoldL = [630000, 0, ];
    const medianPricesSoldM = [1030000, 0,  ];
    const medianPricesSoldH = [1530000, 0,  ];

    
    switch(type){
       case "HouseSoldPrice":
        if(median <= medianPricesSoldL[r])
          return formattedText("Affordable House Prices", 
           "Home prices are considered affordable in this area. This may be in expense of socioeconomic status, and/or may be a rural region.")
        else if(median > medianPricesSoldL[r] && median <= medianPricesSoldM[r])
          return formattedText("Low-Median House Prices", 
            "House prices are within the low-medium standard for this area. The suburb is often relatively distant from state cities, but is starting to grow with new transport, education and workplace solutions. Recommended for students or new families within a budget.")
        else if(median > medianPricesSoldM[r] && median <= medianPricesSoldH[r])
          return formattedText("Standard House Prices", 
            "Home prices are within the standard for this area. The suburb is often expanding with an adequate amount of facilities and transport solutions. Suitable for most settled families, or those looking for a higher standard of living.")
        else 
          return formattedText("Expensive House Prices", 
            "Home prices are considered beyond the high standard for this area. This is usually the case for suburban areas near cities with a high socioeconomic status, and plenty of facilities for suburb growth. Suitable for settled families looking for long-term residency, or those who may afford a premium standard of living.")

      case "MedianRent":
        if(median <= medianPricesRentL[r])
          return formattedText("Affordable Rent Prices", 
            "Rent prices are considered affordable in this area. This may be in expense of socioeconomic status, and/or may be a rural region.")
        else if(median > medianPricesRentL[r] && median <= medianPricesRentM[r])
          return formattedText("Standard Rent Prices", 
            "Rent prices are within the median standard for this area. The suburb is often relatively distant from state cities, but is often expanding with an adequate amount of facilities and transport solutions. Recommended for students or new families within a budget.")
        else if(median > medianPricesRentM[r] && median <= medianPricesRentH[r])
        return formattedText("High Standard Rent Prices", 
          "Rent prices are within the medium-high standard for this area. The suburb is often expanding with an adequate amount of facilities and transport solutions. Suitable for students or workers who require facilities nearby and prefer an urban setting.")
          else 
            return formattedText("Expensive Rent Prices", 
              "Rent prices are considered beyond the high standard for this area. This is usually the case for suburban areas near cities with a high socioeconomic status, and plenty of facilities for suburb growth. Suitable for small families, students or workers who prefer to live in close to cities. Usually a population-dense urban environment.")
  
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

  //Get the latest median value
  getMedian(chartData) {
    for(var i = chartData.length - 1; i >= 0; i--){
      if(chartData[i].Median != null){
        return chartData[i].Median;
      }
    }

    return 0;
  }
}

export default StatsSection;
