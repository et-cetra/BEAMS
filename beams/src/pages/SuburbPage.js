import React from 'react';

class SuburbPage extends React.Component {
    render() {
        const suburb = this.props.suburb;
        const url = `https://www.google.com/maps/embed/v1/place?key=AIzaSyDIMGCB2qSD9qIB0mrZu0uGEmZlc9e8m-Y&q=${suburb}`;
      return (
        <div className="App">
          <h4>Here is the suburb page for {suburb}!</h4>
            <iframe
                width="600"
                height="450"
                frameborder="0"
                src={url} allowfullscreen>
            </iframe>
          <button onClick={this.props.onStartOver}>Home</button>
        </div>
      );
    }
  }

export default SuburbPage;
