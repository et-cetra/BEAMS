import React from 'react';
import '../../App.css';
import '../../pages/SuburbPage.css';
import { getLocation, getSchools } from '../../utils.js';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography, CircularProgress, Chip } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import mSchools from '../../assets/ic_schools.png'

class Schools extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        error: null,
        isLoaded: false,
        schoolData: [],
        schoolData2: [],
    };
  }

  async componentDidMount() {
    const gLocation = await getLocation(this.props.suburbs[0].suburb, this.props.suburbs[0].suburb_state);
    const coords = gLocation.results[0].locations[0].latLng;
    const gSchools = await getSchools(coords.lat, coords.lng);

    this.setState({
      isLoaded: true,
      schoolData: gSchools,
    });

    if(this.props.isCompare){
      const gLocation2 = await getLocation(this.props.suburbs[1].suburb, this.props.suburbs[1].suburb_state);
      const coords2 = gLocation2.results[0].locations[0].latLng;
      const gSchools2 = await getSchools(coords2.lat, coords2.lng);

      this.setState({
        isLoaded: true,
        schoolData2: gSchools2,
      });
    }
  }

  state = {
    primary: false,
    secondary: false,
  };
  
  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  getSingleList = (schoolData) => {
    return(
      schoolData.map(
      (item, i) => (
      <ExpansionPanel key={item.id}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
        <Typography>{item.name}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography>
        <b>Type</b> {item.type} <br/>
        <b>Education Level</b> {item.educationLevel} <br/>
        <b>Gender</b> {item.gender}
        </Typography>
      </ExpansionPanelDetails>                       
      </ExpansionPanel>))
    );
  }

  getMergedList = (schoolData, schoolData2, suburb, suburb2) => {
    return(
      <div>
      {schoolData.map(
        (item, i) => (
        <ExpansionPanel key={item.id}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
          <Chip label={suburb} color="primary" className="SchoolsListChip"/>
          <Typography className="SchoolsListText" inline>{item.name}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
          <b>Type</b> {item.type} <br/>
          <b>Education Level</b> {item.educationLevel} <br/>
          <b>Gender</b> {item.gender}
          </Typography>
        </ExpansionPanelDetails>                       
        </ExpansionPanel>))}

      {schoolData2.map(
        (item, i) => (
        <ExpansionPanel key={item.id}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
          <Chip label={suburb2} color="secondary" className="SchoolsListChip"/>
          <Typography className="SchoolsListText" inline>{item.name}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
          <b>Type</b> {item.type} <br/>
          <b>Education Level</b> {item.educationLevel} <br/>
          <b>Gender</b> {item.gender}
          </Typography>
        </ExpansionPanelDetails>                       
        </ExpansionPanel>))}
      </div>
    );
  }

  render() {
    const { error, isLoaded, schoolData, schoolData2 } = this.state;
    const isCompare = this.props.isCompare;
    const suburbs = this.props.suburbs;
    const suburb = suburbs[0].suburb;
    var suburb2;
    if(isCompare) suburb2 = suburbs[1].suburb;

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div><CircularProgress size={60} color="primary"/></div>;
    } else {
      return (
        <ExpansionPanel className="SchoolPanel" style={{boxShadow: 'none'}}>
          <ExpansionPanelSummary style={{marginLeft: '-24px'}} expandIcon={<ExpandMoreIcon/>}>
            <img src={mSchools} className="IconDef" alt="ic_school"/>
            <Typography align="inherit" inline className="SchoolsText" 
            style={{ fontSize: 24 }} variant="h1" color="inherit">
              Local Schools
            </Typography>
            <br/><br/>
            <Typography align="inherit" inline className="SchoolsTextSub" 
            style={{ fontSize: 16 }} variant="h1" color="textSecondary">

            {!isCompare ? 
              `${schoolData.length} schools nearby`
              :
              `${schoolData.length} schools near ${suburb}, ${schoolData2.length} schools near ${suburb2}`
            }

            </Typography>
          </ExpansionPanelSummary>

          <div className="ScrollMenu">
          {!isCompare ? this.getSingleList(schoolData) 
            : this.getMergedList(schoolData, schoolData2, suburb, suburb2)}
          </div>
          </ExpansionPanel>
      );
    }
  }
}

export default Schools;
