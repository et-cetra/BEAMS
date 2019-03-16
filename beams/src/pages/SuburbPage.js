import React from 'react';


class SuburbPage extends React.Component {
    render() {
        const suburb = this.props.suburb;
      return (
        <div className="App">
          Here is the suburb page for {suburb}!
        </div>
      );
    }
  }

export default SuburbPage;
