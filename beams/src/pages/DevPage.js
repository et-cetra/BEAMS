import React from 'react';
import './SuburbPage.css'
import './DevPage.css'
import avatar from '../assets/avatar2.png'
import bei from'../assets/bei.png'
import moz from'../assets/moz.png'
import mariya from'../assets/mariya.png'
import { Grid, Paper, Typography, Slide, Grow } from '@material-ui/core';
import paul from'../assets/paul.png'
import sumayyah from'../assets/sumayyah.png'

//card ref
// https://www.w3schools.com/w3css/tryit.asp?filename=tryw3css_templates_website&stacked=h
// linkedin <a href="https://www.linkedin.com/in/bei-chen-994922142/"><i class="fa fa-linkedin"></i></a>

class DevPage extends React.Component {
    render() {
      return (
          <div>
            <Grow in timeout={1000}><Typography align="center" style={{fontSize: "26px"}} variant="overline">Our Team</Typography></Grow>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
            <Grid container spacing={24} direction="row" alignItems="center" justify="center">
              <Slide in direction="up" timeout={1000}><Grid item><p></p>
              <Paper className="card">
                  <img alt="moz" src={moz} style={{width:100}}/>
                  <h3>Mozamel Anwary</h3>

                  <div class="org">University of New South Wales</div><p></p>
                  <div class="role">
                  Lead Front End Developer
                  </div>
                  <a href="https://github.com/atude"><i class="fa fa-github"></i></a>
                  <div class="description">
                  Responsible for front-end design, including infographics and Material UI implementation throughout BEAMS.
                  </div>
              </Paper>
              </Grid></Slide>
              <Slide in direction="up" timeout={1250}><Grid item><p></p>
              <Paper className="card">
                  <img alt="bei" src={bei} style={{width:100}}/>
                  <h3>Bei Chen</h3>

                  <div class="org">University of New South Wales</div><p></p>
                  <div class="role">
                  Feature Developer
                  </div>
                  <a href="https://github.com/bei98"><i class="fa fa-github"></i></a>
                  <div class="description">
                  Responsible for creation of the developer&#39;s page.
                  </div>

              </Paper>
              </Grid></Slide>
              <Slide in direction="up" timeout={1500}><Grid item><p></p>
              <Paper className="card">
                  <img alt="paul" src={paul} style={{width:100}}/>
                  <h3>Paul Grace</h3>

                  <div class="org">University of New South Wales</div><p></p>
                  <div class="role">
                  Feature Developer
                  </div>
                  <a href="https://github.com/PaulGrace1200"><i class="fa fa-github"></i></a>
                  <div class="description">
                  Responsible for AI sentiment implementation and suburb-related features.
                  </div>

              </Paper>
              </Grid></Slide>
              <Slide in direction="up" timeout={1750}><Grid item><p></p>
              <Paper className="card">
                  <img alt="sumo" src={sumayyah} style={{width:100}}/>
                  <h3>Sumayyah Ho</h3>

                  <div class="org">University of New South Wales</div><p></p>
                  <div class="role">
                  Feature Developer
                  </div>
                  <a href="https://github.com/z5210234"><i class="fa fa-github"></i></a>
                  <div class="description">
                  Responsible for suburb highlights and schools information on suburb pages.
                  </div>

              </Paper>
              </Grid></Slide>
              <Slide in direction="up" timeout={2000}><Grid item><p></p>
              <Paper className="card">
                  <img alt="mariya" src={mariya} style={{width:100}}/>
                  <h3>Mariya Shmalko</h3>

                  <div class="org">University of New South Wales</div><p></p>
                  <div class="role">
                  Team Leader, Lead Back End Developer
                  </div>
                  <a href="https://github.com/et-cetra"><i class="fa fa-github"></i></a>
                  <div class="description">
                  Responsible for back-end infrastructure, data manipulation and several features on suburb pages.
                  </div>

              </Paper>
              </Grid></Slide>

            </Grid>
        </div>
      );
    }
  }

export default DevPage;
