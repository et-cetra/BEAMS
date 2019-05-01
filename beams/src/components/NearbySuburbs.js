import React from 'react';
import '../pages/SuburbPage.css'
import { getSurrounding } from '../utils';
import { Chip, CircularProgress, Avatar, Link } from '@material-ui/core';

class NearbySuburbs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      surrounding: [],
    };
  }

  async componentDidMount() {
      const surrounding = await getSurrounding(this.props.suburbs[0].suburb, this.props.suburbs[0].suburb_state);

      this.setState({
        isLoaded: true,
        surrounding: surrounding,
    })
  }

  render() {
    const surrounding = this.state.surrounding;
    const priorities = this.props.priorities;
    console.log("surrounding", surrounding);
    const route = (idx) => "/suburb/" + surrounding[idx].suburb + "/" + surrounding[idx].suburb_state;
    const city = (idx) => surrounding[idx].suburb + " " + surrounding[idx].suburb_state + ", Australia";
    console.log("city route", city, route);

    if (!this.state.isLoaded) {
      return <div style={{float: "right"}}><CircularProgress size={30} style={{color: "white"}}/></div>;
    } else {
      return (
        <div>
          {surrounding.map((item, index) => (
            <Link style={{cursor: "pointer"}} color="textPrimary" underline="none"
            to={route} onClick={() => this.props.onSuburbSelect(city(index), priorities)}>
            <Chip avatar={<Avatar style={{width: 41, height: 41}}>{item.suburb_state}</Avatar>} className="ChipNearby"
             key={item.id} label={`${item.suburb}`} style={{color: "#333F48"}}/>
             </Link>
          ))}
        </div>
      );
    }
  }
}

export default NearbySuburbs;
