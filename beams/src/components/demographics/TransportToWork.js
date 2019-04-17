import React from 'react';
import '../../pages/SuburbPage.css'
import { getDemographics } from '../../utils.js'
import DGSection from './DGSection';

class Transport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        error: null,
        isLoaded: false,
        contents: [],
        contents2: [],
    };
  }

  async componentDidMount() {        
    const suburbs = this.props.suburbs;
    const suburbInfo = await getDemographics(suburbs[0].suburb, suburbs[0].suburb_state, "TransportToWork");

    this.setState({
      isLoaded: true,
      contents: suburbInfo.demographics,
    });

    if(this.props.isCompare){
      const suburbInfo2 = await getDemographics(suburbs[1].suburb, suburbs[1].suburb_state, "TransportToWork");
      this.setState({
        contents2: suburbInfo2.demographics,
      });
    } 
  }

  render() {
    const { error, isLoaded, contents, contents2 } = this.state;
    const COLORS = this.props.COLORS;
    const isCompare = this.props.isCompare;

    const { chartData, chartData2 } = this.getChartData(isCompare, contents2, contents);

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return (
      <div>
          <DGSection loading={1} COLORS={COLORS} chartData={[]}/>
      </div>
      );
    } else {
      return (
      <div>
          <DGSection isCompare={isCompare} suburbs={this.props.suburbs} 
            loading={0} COLORS={COLORS} chartData={chartData} chartData2={chartData2}/>
      </div>
      );
    }
  }

  getChartData(isCompare, contents2, contents) {
    var chartData = [];
    var chartData2 = [];
    //Dont add if not loaded
    if (isCompare && contents2[0] != null) {
      contents2.map(content => (content.items.map((item) => (chartData2.push({ name: item.label, value: item.value })))));
      chartData2 = chartData2.filter(item => item.name !== 'Did not go to work'
        || item.name !== 'Car (Pas.)'
        || item.name !== 'Worked at home');
      for (var i = 0; i < chartData2.length; i++) {
        if (chartData2[i].name === "Car (driver)") {
          chartData2[i].name = "Car";
        }
        if (chartData2[i].name === "Walked only") {
          chartData2[i].name = "Walked";
        }
      }
      chartData2 = chartData2.splice(0, 3);
    }
    contents.map(content => (content.items.map((item) => (chartData.push({ name: item.label, value: item.value })))));
    chartData = chartData.filter(item => item.name !== 'Did not go to work'
      || item.name !== 'Car (Pas.)'
      || item.name !== 'Worked at home');
    for (var i = 0; i < chartData.length; i++) {
      if (chartData[i].name === "Car (driver)") {
        chartData[i].name = "Car";
      }
      if (chartData[i].name === "Walked only") {
        chartData[i].name = "Walked";
      }
    }
    chartData = chartData.splice(0, 3);
    return { chartData, chartData2 };
  }
}

export default Transport;
