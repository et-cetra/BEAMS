import React from 'react';
import '../../App.css';
import '../../pages/SuburbPage.css';
import { getLocation, getSchools } from '../../utils.js';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography, CircularProgress, Chip, Card, FormControlLabel, FormControl, FormLabel, RadioGroup, Radio, FormGroup, MuiThemeProvider, createMuiTheme, Avatar } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import mSchools from '../../assets/ic_schools.png'
import { HumanMaleFemale, HumanMale, HumanFemale, Bible, Bank, CalculatorVariant, BookOpenPageVariant, Certificate, StarCircle } from 'mdi-material-ui'

class Schools extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        error: null,
        isLoaded: false,
        schoolData: [],
        schoolData2: [],

        chGender: "All",
        chType: "All",
        chEducationLevel: "All",
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

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  getThemeColor(tag) {
    var theme;

    switch(tag){
      case "Girls": theme = createMuiTheme({typography: {useNextVariants: true}, palette: {primary: {main: '#E91E63'}}}); break;
      case "Boys": theme = createMuiTheme({typography: {useNextVariants: true}, palette: {primary: {main: '#2196F3'}}}); break;
      case "Co-ed": theme = createMuiTheme({typography: {useNextVariants: true}, palette: {primary: {main: '#9C27B0'}}}); break;
      case "Private": theme = createMuiTheme({typography: {useNextVariants: true}, palette: {primary: {main: '#673AB7'}}}); break;
      case "Catholic": theme = createMuiTheme({typography: {useNextVariants: true}, palette: {primary: {main: '#673AB7'}}}); break;
      case "Primary": theme = createMuiTheme({typography: {useNextVariants: true}, palette: {primary: {main: '#FF5722'}}}); break;
      case "Secondary": theme = createMuiTheme({typography: {useNextVariants: true}, palette: {primary: {main: '#009688'}}}); break;

      default: theme = createMuiTheme({typography: {useNextVariants: true}, palette: {primary: {main: '#3F51B5'}}});
    }
  
      return theme;
  }

  getChipIcon = (tag) => {
    switch(tag){
      case "Girls": return (<Avatar><HumanFemale/></Avatar>);
      case "Boys": return (<Avatar><HumanMale/></Avatar>);
      case "Co-ed": return (<Avatar><HumanMaleFemale/></Avatar>);
      case "Private": return (<Avatar><Certificate/></Avatar>);
      case "Government": return (<Avatar><Bank/></Avatar>);
      case "Catholic": return (<Avatar><Bible/></Avatar>);
      case "Primary": return (<Avatar><BookOpenPageVariant/></Avatar>);
      case "Secondary": return (<Avatar><CalculatorVariant/></Avatar>);

      default: return (<Avatar><StarCircle/></Avatar>);
    }
  }

  getSingleList = (schoolData) => {  
    if(schoolData.length === 0) 
      return (
        <div>
        <br/><br/><br/><br/>
        <Typography align="center" variant="button" style={{fontSize: "15px"}}>
          No schools found nearby
        </Typography>
        <br/><br/><br/><br/>
        </div>
      );
    return(
      <div>
      {schoolData.map((item) => (
        <div key={item.id} style={{paddingTop: "5px"}}>
        <Card className="SchoolCard">
          <a href={item.websiteUrl} target="_blank" rel="noopener noreferrer">
            <Typography className="SchoolText" inline variant="h5" style={{fontSize: "15px"}}>
            {item.name}
            </Typography>
          </a>
          <MuiThemeProvider theme={this.getThemeColor(item.type)}>
          <Chip avatar={this.getChipIcon(item.type)} color="primary" className="SchoolTags" label={item.type}/>
          </MuiThemeProvider>
          <MuiThemeProvider theme={this.getThemeColor(item.educationLevel)}>
          <Chip avatar={this.getChipIcon(item.educationLevel)} color="primary" className="SchoolTags" label={item.educationLevel}/>
          </MuiThemeProvider>
          <MuiThemeProvider theme={this.getThemeColor(item.gender)}>
          <Chip avatar={this.getChipIcon(item.gender)} color="primary" className="SchoolTags" label={item.gender}/>
          </MuiThemeProvider>
        </Card>
        </div>
      
      ))}
      </div>
    );
  }

  getMergedList = (schoolData, schoolData2, suburb, suburb2) => {
    return(
     <div>
      <div className="SchoolCardMergedContainer" style={{float: "left"}}>
      <Chip label={suburb} color="primary" className="SchoolsListChip"/>
      {schoolData.map((item) => (
        <div key={item.id} style={{paddingTop: "5px"}}>
        <Card className="SchoolCard">
          <a href={item.websiteUrl} target="_blank" rel="noopener noreferrer">
            <Typography className="SchoolText" inline variant="h5" style={{fontSize: "15px"}}>
            {item.name}
            </Typography>
          </a>
          <MuiThemeProvider theme={this.getThemeColor(item.type)}>
          <Chip avatar={this.getChipIcon(item.type)} color="primary" className="SchoolTags" label={item.type}/>
          </MuiThemeProvider>
          <MuiThemeProvider theme={this.getThemeColor(item.educationLevel)}>
          <Chip avatar={this.getChipIcon(item.educationLevel)} color="primary" className="SchoolTags" label={item.educationLevel}/>
          </MuiThemeProvider>
          <MuiThemeProvider theme={this.getThemeColor(item.gender)}>
          <Chip avatar={this.getChipIcon(item.gender)} color="primary" className="SchoolTags" label={item.gender}/>
          </MuiThemeProvider>
        </Card>
        </div>
      
      ))}
      </div>

      <div className="SchoolCardMergedContainer" style={{float: "right"}}>
      <Chip label={suburb2} color="secondary" className="SchoolsListChip"/>
      {schoolData2.map((item) => (
        <div key={item.id} style={{paddingTop: "5px"}}>
        <Card className="SchoolCard">
          <a href={item.websiteUrl} target="_blank" rel="noopener noreferrer">
            <Typography className="SchoolText" inline variant="h5" style={{fontSize: "15px"}}>
            {item.name}
            </Typography>
          </a>
          <MuiThemeProvider theme={this.getThemeColor(item.type)}>
          <Chip avatar={this.getChipIcon(item.type)} color="primary" className="SchoolTags" label={item.type}/>
          </MuiThemeProvider>
          <MuiThemeProvider theme={this.getThemeColor(item.educationLevel)}>
          <Chip avatar={this.getChipIcon(item.educationLevel)} color="primary" className="SchoolTags" label={item.educationLevel}/>
          </MuiThemeProvider>
          <MuiThemeProvider theme={this.getThemeColor(item.gender)}>
          <Chip avatar={this.getChipIcon(item.gender)} color="primary" className="SchoolTags" label={item.gender}/>
          </MuiThemeProvider>
        </Card>
        </div>
      ))}
      </div>
    </div>
    );
  }

  render() {
    const { error, isLoaded, chGender, chType, chEducationLevel } = this.state;
    var { schoolData, schoolData2 } = this.state;
    const isCompare = this.props.isCompare;
    const suburbs = this.props.suburbs;
    const suburb = suburbs[0].suburb;
    var suburb2;

    if(chGender === "Girls") schoolData = schoolData.filter(item => item.gender === "Girls");
    if(chGender === "Boys") schoolData = schoolData.filter(item => item.gender === "Boys");
    if(chType === "Public") schoolData = schoolData.filter(item => item.type === "Government");
    if(chType === "Private") schoolData = schoolData.filter(item => item.type === "Private");
    if(chEducationLevel === "Primary") schoolData = schoolData.filter(item => item.educationLevel === "Primary");
    if(chEducationLevel === "Secondary") schoolData = schoolData.filter(item => item.educationLevel === "Secondary");

    if(isCompare) {
      suburb2 = suburbs[1].suburb;

      if(chGender === "Girls") schoolData2 = schoolData2.filter(item => item.gender === "Girls");
      if(chGender === "Boys") schoolData2 = schoolData2.filter(item => item.gender === "Boys");
      if(chType === "Public") schoolData2 = schoolData2.filter(item => item.type === "Government");
      if(chType === "Private") schoolData2 = schoolData2.filter(item => item.type === "Private");
      if(chEducationLevel === "Primary") schoolData2 = schoolData2.filter(item => item.educationLevel === "Primary");
      if(chEducationLevel === "Secondary") schoolData2 = schoolData2.filter(item => item.educationLevel === "Secondary");
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div><CircularProgress size={60} color="primary"/></div>;
    } else {
      return (
        <Card className="SchoolPanel" style={{boxShadow: 'none'}}>
          <ExpansionPanelSummary style={{marginLeft: '-24px', cursor: "inherit"}}>
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
          
          <ExpansionPanel className="ExpansionPanelSchools" style={{boxShadow: 'none'}}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}><Typography variant="button">Filters</Typography></ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div>
              <FormGroup row className="SchoolControls">
              <FormControl component="fieldset">
                <div className="SchoolControlBlock">
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup row aria-label="Gender" name="gender1" value={this.state.chGender} onChange={this.handleChange('chGender')}>
                  <FormControlLabel value="All" control={<Radio/>} label="All"/>
                  <FormControlLabel value="Girls" control={<Radio/>} label="Girls"/>
                  <FormControlLabel value="Boys" control={<Radio/>} label="Boys"/>
                </RadioGroup>
                </div>
              </FormControl>  
              <FormControl component="fieldset">
                <div className="SchoolControlBlock">
                <FormLabel component="legend">Type</FormLabel>
                <RadioGroup row aria-label="Type" name="type1" value={this.state.chType} onChange={this.handleChange('chType')}>
                  <FormControlLabel value="All" control={<Radio/>} label="All"/>
                  <FormControlLabel value="Public" control={<Radio/>} label="Public"/>
                  <FormControlLabel value="Private" control={<Radio/>} label="Private"/>
                </RadioGroup>
                </div>
              </FormControl>  
              <FormControl component="fieldset">
                <div className="SchoolControlBlock">
                <FormLabel component="legend">Education Level</FormLabel>
                <RadioGroup row aria-label="Education Level" name="level1" value={this.state.chEducationLevel} onChange={this.handleChange('chEducationLevel')}>
                  <FormControlLabel value="All" control={<Radio/>} label="All"/>
                  <FormControlLabel value="Primary" control={<Radio/>} label="Primary (K-6)"/>
                  <FormControlLabel value="Secondary" control={<Radio/>} label="Secondary (7-12)"/>
                </RadioGroup>
                </div>
              </FormControl>  
              </FormGroup>
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <div className="ScrollMenu">
          {!isCompare ? this.getSingleList(schoolData) 
            : this.getMergedList(schoolData, schoolData2, suburb, suburb2)}
          </div>
          </Card>
      );
    }
  }
}

export default Schools;
