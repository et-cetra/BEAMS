import React from 'react';
import './HomePage.css'
import { Grid, Typography, Grow, Fab, Slide, FormGroup, FormControlLabel, Checkbox, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import {Link} from "react-router-dom"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import HomeSearch from '../components/HomeSearch';
import PeopleIcon from '@material-ui/icons/People';
import { MapSearch } from 'mdi-material-ui'


class HomePage extends React.Component {
  state = {
    prioritiesA: false,  
    prioritiesB: false,
    prioritiesC: false,
    prioritiesD: false,
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    var { prioritiesA, prioritiesB, prioritiesC, prioritiesD } = this.state;    
    var priorities = [];
    priorities.push({'Socioeconomic Status':  prioritiesA});
    priorities.push({'Affordability':  prioritiesB});
    priorities.push({'Education Quality':  prioritiesC});
    priorities.push({'Safety':  prioritiesD});

    return (
      <div>
      <div className='HomeContainer'>
      <Grow in timeout={750}>
      <Grid container spacing={24} direction="column" justify="space-evenly" alignItems="center">
        <Grid item>
        <Typography style={{ fontSize: 30 }} variant='overline' align='center'>
          All your suburb data in one place. Made simple.
        </Typography>
        <br></br>
        </Grid>
        <Grid item>
          <HomeSearch onSelect={(city) => this.props.onSelect(city, this.props.history, priorities)}/>
        </Grid>
        <Grid item>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
              <MapSearch className="AdvSearchIcon"/>
              <Typography style={{paddingTop: "2px"}} variant="button">Idk what to call this tbh?? filters??</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
            <FormGroup row>
              <FormControlLabel control={<Checkbox checked={prioritiesA} color="primary"
              onChange={this.handleChange('prioritiesA')} value="prioritiesA"/>} label="Socioeconomic Status"/>
              <FormControlLabel control={<Checkbox checked={prioritiesB} color="primary" 
              onChange={this.handleChange('prioritiesB')} value="prioritiesB"/>} label="Affordability"/>
              <FormControlLabel control={<Checkbox checked={prioritiesC} color="primary" 
              onChange={this.handleChange('prioritiesC')} value="prioritiesC"/>} label="Education Quality"/>
              <FormControlLabel control={<Checkbox checked={prioritiesD} color="primary"
              onChange={this.handleChange('prioritiesD')} value="prioritiesD"/>} label="Safety"/>
            </FormGroup>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Grid>
      </Grid>
      </Grow>
      </div>
      <Slide in timeout={1000} direction="up">
      <div className="footer">
        <Fab variant="extended"
        size="medium"
        style={{ backgroundImage: "linear-gradient(to right,#EE6A15 0%,#E62927 100%)"}} >
          <PeopleIcon style={{paddingRight: "10px", color: "whitesmoke"}}/>
          <Link to="/developers"><Typography style={{fontSize: "16px", color: "whitesmoke"}}>Beams &copy; 2019</Typography></Link>
        </Fab>
      </div>
      </Slide>
      </div>
    );
  }
}

export default HomePage;
