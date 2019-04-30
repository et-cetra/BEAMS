import React from 'react';
import { getSurrounding } from '../utils';

class NearbySuburbs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      surrounding: [],
    };
  }

  async componentDidMount() {
      const surrouding = await getSurrounding(this.props.suburbs[0].suburb, this.props.suburbs[0].suburb_state);

      this.setState({
        isLoaded: true,
        surrouding: surrouding,
    })
  }

  render() {
    const surrounding = this.state.surrounding;

    if (!this.state.isLoaded) {
      return <div>Loading...</div>
    } else {
      console.log(surrounding.results)
      return (
        <div>
        
        </div>
      );
    }
  }
}

export default NearbySuburbs;
