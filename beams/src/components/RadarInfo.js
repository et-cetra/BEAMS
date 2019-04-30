import React from 'react';
import '../pages/SuburbPage.css'
import { Paper, Fade,  Button, Popper } from '@material-ui/core';
import ExtraIcon from '@material-ui/icons/ChevronRight';

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
      open: state.placement !== placement || !state.open,
      placement,
    }));
  };

  render() {
    const id = open ? 'simple-popper' : null;
    const { anchorEl, open, placement } = this.state;
    return (
        <div className="ExtraIcon">
      <Button aria-describedby={id} variant="contained" onClick={this.handleClick('right-start')}
      size="medium" color="secondary" aria-label="Guide">
        Info<ExtraIcon />
        <Popper id={id} open={open} anchorEl={anchorEl} placement={placement} transition className="PopperContainer">
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper className="PopperInfo">
                <p>Information for this chart is sourced from state crime records, ICSEA school ratings and ABS.</p>
                <p><b>Affordability</b> is found through low, median and highest prices within suburbs.</p>
                <p><b>Education Quality</b> is caluclated through the ICSEA school rating.
                The ICSEA scale is an index of community socio-educational advantage for school attendees.</p>
                <p><b>Safety</b> is the crime rate of the suburb for the most recent 12 month period.</p>
                <p><b>Socio-Economics</b> rating is given by ABS.</p>
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
