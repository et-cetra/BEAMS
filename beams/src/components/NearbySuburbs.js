import React from 'react';
import '../pages/SuburbPage.css'
import { getSurrounding } from '../utils';
import { Chip, CircularProgress, Avatar } from '@material-ui/core';

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

    if (!this.state.isLoaded) {
      return <div style={{float: "right"}}><CircularProgress size={30} style={{color: "white"}}/></div>;
    } else {
      return (
        <div>
          {surrounding.map((item) => (
            <Chip avatar={<Avatar style={{width: 36, height: 36, fontSize: "10px"}}>{item.suburb_state}</Avatar>} className="ChipNearby" 
             key={item.id} label={`${item.suburb}`} style={{color: "#333F48"}}/>
          ))}
        </div>
      );
    }
  }
}

export default NearbySuburbs;
