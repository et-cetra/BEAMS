import React from 'react';
import { Link } from 'react-router-dom'

class SuburbPage extends React.Component {
    render() {
        const suburb = this.props.suburb;
      return (
        <div className="App">
          <h4>Here is the suburb page for {suburb}!</h4>
          <button onClick={this.props.onStartOver}>Home</button>
        </div>
      );
    }
  }

export default SuburbPage;
