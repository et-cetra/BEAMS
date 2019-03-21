import React from 'react';
import '../App.css';
import Demographics from '../components/demographics'

class SuburbPage extends React.Component {
    render() {
        const suburb = this.props.suburb;
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
          <button className="button" onClick={this.props.onStartOver}>Home</button>
          <Demographics>Demographics = </Demographics>
        </div>
      );
    }
  }

export default SuburbPage;
