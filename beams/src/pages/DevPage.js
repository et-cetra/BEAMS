import React from 'react';
import './SuburbPage.css'
import './DevPage.css'
import { Grid, Typography, Grow } from '@material-ui/core';
import HomeSearch from '../components/HomeSearch';
import avatar from '../assets/avatar2.png'
import bei from'../assets/bei.png'
import moz from'../assets/moz.png'
import mariya from'../assets/mariya.png'
import paul from'../assets/paul.png'
import sumayyah from'../assets/sumayyah.png'

//card ref
// https://www.w3schools.com/w3css/tryit.asp?filename=tryw3css_templates_website&stacked=h
// linkedin <a href="https://www.linkedin.com/in/bei-chen-994922142/"><i class="fa fa-linkedin"></i></a>

class DevPage extends React.Component {
    render() {
      return (
        <div>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
            <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>


            <div class="w3-row-padding">
              <div class="w3-col m2 w3-center"><p></p>
              <div className="card">
                  <img src={moz} style={{width:100}}/>
                  <h3>Mozamel Anwary</h3>

                  <div class="org">The University of New South Wales</div><p></p>
                  <div class="role">
                  Developer
                  </div>
                  <a href="https://github.com/atude"><i class="fa fa-github"></i></a>
                  <div class="description">
                  Responsible for all infographics and theme (with Material UI) and colours on this site.
                  </div>

              </div>
              </div>
              <div class="w3-col m2 w3-center"><p></p>
              <div className="card">
                  <img src={bei} style={{width:100}}/>
                  <h3>Bei Chen</h3>

                  <div class="org">The University of New South Wales</div><p></p>
                  <div class="role">
                  Developer
                  </div>
                  <a href="https://github.com/bei98"><i class="fa fa-github"></i></a>
                  <div class="description">
                  Responsible for creation of the developer&#39;s page.
                  </div>

              </div>
              </div>
              <div class="w3-col m2 w3-center"><p></p>
              <div className="card">
                  <img src={paul} style={{width:100}}/>
                  <h3>Paul Grace</h3>

                  <div class="org">The University of New South Wales</div><p></p>
                  <div class="role">
                  Developer
                  </div>
                  <a href="https://github.com/PaulGrace1200"><i class="fa fa-github"></i></a>
                  <div class="description">
                  Responsible for all news related components on suburb pages.
                  </div>

              </div>
              </div>
              <div class="w3-col m2 w3-center"><p></p>
              <div className="card">
                  <img src={sumayyah} style={{width:100}}/>
                  <h3>Sumayyah Ho</h3>

                  <div class="org">The University of New South Wales</div><p></p>
                  <div class="role">
                  Developer
                  </div>
                  <a href="https://github.com/z5210234"><i class="fa fa-github"></i></a>
                  <div class="description">
                  Responsible for suburb highlights and schools information on suburb pages.
                  </div>

              </div>
              </div>
              <div class="w3-col m2 w3-center"><p></p>
              <div className="card">
                  <img src={mariya} style={{width:100}}/>
                  <h3>Mariya Shmalko</h3>

                  <div class="org">The University of New South Wales</div><p></p>
                  <div class="role">
                  Developer
                  </div>
                  <a href="https://github.com/et-cetra"><i class="fa fa-github"></i></a>
                  <div class="description">
                  Responsible for back-end infrastructure (with Node JS) and demographic data on suburb pages.
                  </div>

              </div>
              </div>

            </div>
        </div>
      );
    }
  }

export default DevPage;
