import React from 'react'
import './SuburbPage.css'

import { Grid, Fade, Slide, Grow } from '@material-ui/core'

import WrapperHeader from '../components/wrappers/WrapperHeader'
import WrapperDG from '../components/wrappers/WrapperDG'
import WrapperStats from '../components/wrappers/WrapperStats'
import WrapperMaps from '../components/wrappers/WrapperMaps'
import WrapperNews from '../components/wrappers/WrapperNews'
import WrapperSchools from '../components/wrappers/WrapperSchools'


class SuburbPage extends React.Component {
  /* Color scheme, used for graphs */
  COLORS = () => {return(['#213084', '#E62927', '#EE6A15', '#333F48', '#04091E'])}

  getSingleSuburb = (suburbs, onSuburbCompare) => {
    const COLORS = this.COLORS();

    return (
      <div className="SingleWholeContainer">
      <WrapperHeader isCompare={false} suburbs={suburbs} onSuburbCompare={onSuburbCompare}/>
      <Fade in timeout={750}>
      <Grid container spacing={16}
      direction="row"
      justify="flex-start"
      alignItems="flex-start">

        <Slide direction="up" in timeout={800}>
        <Grid item xs={7}>

        {/*LHS grid container*/}
        <Grid className="LeftContainer">
          <WrapperStats suburbs={suburbs} COLORS={COLORS}/>
          <WrapperDG suburbs={suburbs} COLORS={COLORS}/>
          <Grid item className="SchoolsContainer">
            <WrapperSchools suburbs={suburbs} isCompare={false}/>
          </Grid>
        </Grid>
        </Grid>
        </Slide>

        <Slide direction="up" in timeout={1000}>
        <Grid item xs={5}>

        {/*RHS grid container*/}
        <Grid className="RightContainer">
          <Grid item className="MapsContainer">
            <WrapperMaps suburb={suburbs[0].suburb}/>
            <WrapperNews suburb={suburbs[0].suburb}/>
          </Grid>
        </Grid>
        </Grid>
        </Slide>

      </Grid>
      </Fade>
      </div>
    )
  }

  getMultiSuburb = (suburbs) => {
    const COLORS = this.COLORS();

    return(
      <div className="MultiWholeContainer" >
      <WrapperHeader isCompare={true} suburbs={suburbs}/>
      <Grow in timeout={750}>
        <Grid container spacing={16} direction="column" justify="flex-start" alignItems="stretch">
          <Grid item>
            <WrapperStats isCompare={true} suburbs={suburbs} COLORS={COLORS}/>
          </Grid>
          <Grid item>
            <WrapperDG isCompare={true} suburbs={suburbs} COLORS={COLORS}/>
          </Grid>
          <Grid item>
            <WrapperSchools suburbs={suburbs} isCompare={true}/>
          </Grid>
        </Grid>
      </Grow>
      </div>
    )
  }

  render() {
    const isCompare = this.props.isCompare;
    const suburbs = this.props.suburbs;

    if (suburbs[0].suburb != null) {
      const onSuburbCompare = this.props.onSuburbCompare;
      return (
        <div className="ParentContainer">        
          {/*Single vs Multi Suburb Display*/}
          {isCompare ? this.getMultiSuburb(suburbs) : this.getSingleSuburb(suburbs, onSuburbCompare)}     
        </div>
      );
  } else {
    return (
      <div>
        <p>
        Error: No valid suburb selected.
        Please go home and select a valid suburb.
        </p>
        <button className="button" onClick={this.props.onStartOver}>Home</button>
      </div>
    )
  }
}
}

export default SuburbPage;
