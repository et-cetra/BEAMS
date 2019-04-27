import React from 'react';
import '../../pages/SuburbPage.css'
import { getDemographics } from '../../utils.js'
import DGSection from './DGSection';

class AgeGroupOfPop extends React.Component {
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
    // const suburbInfo = await getDemographics(suburbs[0].suburb, suburbs[0].suburb_state, "AgeGroupOfPopulation");
    const suburbInfo = await getDemographics(suburbs[0].suburb, suburbs[0].suburb_state);

    this.setState({
      isLoaded: true,
      contents: suburbInfo.demographics[0].items[0],
    });

    if(this.props.isCompare){
      // const suburbInfo2 = await getDemographics(suburbs[1].suburb, suburbs[1].suburb_state, "AgeGroupOfPopulation");
      const suburbInfo2 = await getDemographics(suburbs[1].suburb, suburbs[1].suburb_state);
      this.setState({
        contents2: suburbInfo2.demographics,
      });
    }
  }

  render() {
    const { error, isLoaded, contents, contents2 } = this.state;
    const COLORS = this.props.COLORS;
    const isCompare = this.props.isCompare;

    console.log("contents", this.state.content);

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
            loading={0} COLORS={COLORS} chartData={chartData} type="AgeGroupOfPopulation"/>
      </div>
      );
    }
  }

  getChartData(isCompare, contents2, contents) {
    var chartData = [];
    var chartData2 = [];

    contents.map(content => (content.items.map((item) => (chartData.push({ name: item.label, value: item.value })))));

    if (isCompare && contents2[0] != null) {
      contents2.map(content => (content.items.map((item) => (chartData2.push({ name: item.label, value: item.value })))));

      chartData.forEach(item => {
        var x = chartData2.filter(childItem => childItem.name === item.name);
        item['value2'] = x[0].value;
      });
    }

    return { chartData };
  }
}

export default AgeGroupOfPop;
