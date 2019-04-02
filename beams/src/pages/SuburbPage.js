import React from 'react';
import '../App.css';
import AgeGroupOfPop from '../components/AgeGroupOfPop'
import MaritalStatus from '../components/MaritalStatus'
import CountryOfBirth from '../components/CountryOfBirth';

// for graph
import { Bar } from 'britecharts-react';
const barData = require('../components/bar/barChart.fixtures.js').default;
const withResponsiveness = require('../components/helpers/withResponsiveness.js').default;
const ResponsiveBarChart = withResponsiveness(Bar);

class SuburbPage extends React.Component {
    render() {
      if (this.props.suburb != null) {
        const suburb = this.props.suburb;
        const suburb_state = this.props.suburb_state;
        const url = `https://www.google.com/maps/embed/v1/place?key=AIzaSyDIMGCB2qSD9qIB0mrZu0uGEmZlc9e8m-Y&q=${suburb}`;
      return (
        <div className="App">
          <h4>Here is the suburb page for {suburb}!</h4>
          <p>
            <iframe
                width="600"
                height="450"
                frameborder="0"
                src={url} allowFullScreen>
            </iframe>
            </p>
          <p><AgeGroupOfPop suburb_state={suburb_state} suburb={suburb}/></p>
          <p><MaritalStatus suburb_state={suburb_state} suburb={suburb}/></p>
          <p><CountryOfBirth suburb_state={suburb_state} suburb={suburb}/></p>
          <button className="button" onClick={this.props.onStartOver}>Home</button>
          <p></p>
          <ResponsiveBarChart
              data={barData.withLetters()}
          />
        </div>
      );
    } else {
      return (
        <div>
          <p>
          Error: No valid suburb selected.
          Please go home and select a valid suburb.
          </p>
          <button className="button" onClick={this.props.onStartOver}>Home</button>
        </div>
      )
    }
  }
  }

export default SuburbPage;
