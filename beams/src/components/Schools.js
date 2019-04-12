import React from 'react';
import '../App.css';
import '../pages/SuburbPage.css';
import { getLocation, getSchools } from '../utils.js';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import mSchools from '../assets/ic_schools.png'

class Schools extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            schoolData: [],
        };
    }

    async componentDidMount() {
        const gLocation = await getLocation(this.props.suburb, this.props.suburb_state);
        const coords = gLocation.results[0].locations[0].latLng;
        const gSchools = await getSchools(coords.lat, coords.lng);

        this.setState({
            isLoaded: true,
            schoolData: gSchools,
        });
    }

    state = {
        primary: false,
        secondary: false,
    };
    
    handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
    };

    render() {
        const { error, isLoaded, schoolData } = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
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
                        {Object.keys(schoolData).length} schools nearby
                    </Typography>

                </ExpansionPanelSummary>
                {/* Attempt at form control 
                <div>
                    <FormControlLabel control={
                    <Checkbox checked={this.state.secondary} onChange={this.handleChange('secondary')}
                    value="secondary" color="secondary"/>
                    } label="Secondary" />

                    <FormControlLabel control={
                    <Checkbox checked={this.state.primary} onChange={this.handleChange('primary')}
                    value="primary" color="primary"/>
                    } label="Primary" />
                </div>
                */}
                <div className="ScrollMenu">
                    {schoolData.map(
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
                }
                </div>
                </ExpansionPanel>
            );
        }
    }
}

export default Schools;
