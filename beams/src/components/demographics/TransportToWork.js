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

    const { chartData } = this.getChartData(isCompare, contents2, contents);

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
            loading={0} COLORS={COLORS} chartData={chartData}/>
      </div>
      );
    }
  }

  getChartData(isCompare, contents2, contents) {

    var chartData = [];
    var chartData2 = [];
    var chartDataF = [];
    var chartData2F = [];

    contents.map(content => (content.items.map((item) => (chartDataF.push({ name: item.label, value: item.value })))));

    chartDataF = chartDataF.filter(item => item.name !== 'Did not go to work'
      && item.name !== 'Car (Pas.)'
      && item.name !== 'Worked at home');

    for (var j = 0; j < chartDataF.length; j++) {
      if (chartDataF[j].name === "Car (driver)") {
        chartDataF[j].name = "Car";
      }
      if (chartDataF[j].name === "Walked only") {
        chartDataF[j].name = "Walked";
      }
    }

    chartData = chartDataF.splice(0, 3);

    if (isCompare && contents2[0] != null) {
      contents2.map(content => (content.items.map((item) => (chartData2F.push({ name: item.label, value: item.value })))));

      chartData2F = chartData2F.filter(item => item.name !== 'Did not go to work'
        && item.name !== 'Car (Pas.)'
        && item.name !== 'Worked at home');

      for (var i = 0; i < chartData2F.length; i++) {
        if (chartData2F[i].name === "Car (driver)") {
          chartData2F[i].name = "Car";
        }
        if (chartData2F[i].name === "Walked only") {
          chartData2F[i].name = "Walked";
        }
      }

      chartData2 = chartData2F.splice(0, 3);

      //Align items between both data sets, and remove found data from second set
      chartData.forEach(item => {
        var x = chartData2.find(childItem => childItem.name === item.name);

        //Only remove this item if it exists
        if(x !== undefined)
        {
          chartData2 = chartData2.filter(childItem => childItem.name !== item.name);
          item['value2'] = x.value;
        }
      });

      //Add rest of second data set into first data set
      chartData2.forEach(item => {
        chartData.push({ name: item.name, value2: item.value })
      });

      //Full arrays; no slice
      contents.map(content => (content.items.map((item) => (chartDataF.push({ name: item.label, value: item.value })))));
      contents2.map(content => (content.items.map((item) => (chartData2F.push({ name: item.label, value: item.value })))));

      //Fill missing items
      chartData.forEach(item => {
        if(item.value === undefined){
          item.value = chartDataF.find(childItem => childItem.name === item.name).value;
        }

        if(item.value2 === undefined){
          item.value2 = chartData2F.find(childItem => childItem.name === item.name).value;
        }
      });
    } 
    
    return { chartData };
  }
}

export default Transport;
