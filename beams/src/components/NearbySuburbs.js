import React from 'react';
import '../components/SuburbNews.css';
import { getSurrounding } from '../utils';

// Request for Population Ages in Maroubra: https://api.domain.com.au/v1/demographics?level=Suburb&id=27512&types=AgeGroupOfPopulation&year=2016

class NearbySuburbs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      surrounding: [],
    };
  }

  async componentDidMount() {
      const surrouding = await getSurrounding(this.props.suburb, this.props.suburb_state);

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
