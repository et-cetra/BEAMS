import React from 'react';
import '../pages/SuburbPage.css'
import { Paper, Fade,  Button, Popper, Typography, ClickAwayListener } from '@material-ui/core';
import Help from '@material-ui/icons/Help';

class Info extends React.Component {

  state = {
    anchorEl: null,
    open: false,
    placement: null,
  };

  handleClick = placement => event => {
    const { currentTarget } = event;
    this.setState(state => ({
      anchorEl: currentTarget,
      open: state.placement !== placement || !state.open, placement,
    }));
  };

  render() {
    const id = open ? 'simple-popper' : null;
    const { anchorEl, open, placement } = this.state;
    return (
      <div className="ExtraIconRadar">
      <Button aria-describedby={id} variant="text" onClick={this.handleClick('top-end')}
      size="small" color="secondary" aria-label="Guide">
        <Help/>
        <Popper id={id} open={open} anchorEl={anchorEl} placement={placement} transition className="PopperContainer">
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper className="PopperInfo">
                <Typography>Information for this chart is derived from state crime records, ICSEA school ratings, ABS.
                stats and housing data.<br/><br/>
                <b>Affordability</b> is determined through low, median and highest price ranges within suburbs.<br/><br/>
                <b>Education Quality</b> is determined with the ICSEA school rating.
                The ICSEA scale is an index of community socio-educational advantage for school attendees.<br/><br/>
                <b>Safety</b> is determined by the crime rate of the suburb within the most recent 12 month period.<br/><br/>
                <b>Socio-Economic Status</b> is provided by the SEIFA rating of each suburb provided by the ABS.
                </Typography>
              </Paper>
            </Fade>
          )}
        </Popper>
      </Button>
      </div>
      );
    }
  }

export default Info;
