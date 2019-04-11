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

    render() {
        const { error, isLoaded, schoolData } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <ExpansionPanel style={{boxShadow: 'none', width: "100%"}}>
                <ExpansionPanelSummary style={{marginLeft: '-24px'}} expandIcon={<ExpandMoreIcon/>}>
                    <img src={mSchools} className="IconDef"/>
                    <Typography align="inherit" inline="true" className="SchoolsText" 
                    style={{ fontSize: 24 }} variant="h1" color="inherit">
                        Local Schools
                    </Typography>
                    <br/>
                    <br/>
                    <Typography align="inherit" inline="true" className="SchoolsTextSub" 
                    style={{ fontSize: 16 }} variant="h1" color="#333F48">
                        {Object.keys(schoolData).length} schools nearby
                    </Typography>
                </ExpansionPanelSummary>
                <div className="ScrollMenu">
                    {schoolData.map(
                        (item, i) => (
                        <ExpansionPanel>
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
