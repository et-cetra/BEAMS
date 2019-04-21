import React from 'react';
import './HomePage.css'
import './DevPage.css'
import { Grid, Typography, Grow } from '@material-ui/core';
import HomeSearch from '../components/HomeSearch';
import avatar from '../assets/avatar2.png'
import bei from'../assets/bei.png'
import mariya from'../assets/mariya.png'

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
                  <img src={avatar} style={{width:100}}/>
                  <h3>Mozamel Anwary</h3>

                  <p>The University of New South Wales</p>
                  <a href="https://github.com/atude"><i class="fa fa-github"></i></a>
              </div>
              </div>
              <div class="w3-col m2 w3-center"><p></p>
              <div className="card">
                  <img src={bei} style={{width:100}}/>
                  <h3>Bei Chen</h3>

                  <p>The University of New South Wales</p>
                  <a href="https://github.com/bei98"><i class="fa fa-github"></i></a>
              </div>
              </div>
              <div class="w3-col m2 w3-center"><p></p>
              <div className="card">
                  <img src={avatar} style={{width:100}}/>
                  <h3>Paul Grace</h3>

                  <p>The University of New South Wales</p>
                  <a href="https://github.com/PaulGrace1200"><i class="fa fa-github"></i></a>
              </div>
              </div>
              <div class="w3-col m2 w3-center"><p></p>
              <div className="card">
                  <img src={avatar} style={{width:100}}/>
                  <h3>Sumayyah Ho</h3>

                  <p>The University of New South Wales</p>
                  <a href="https://github.com/z5210234"><i class="fa fa-github"></i></a>
              </div>
              </div>
              <div class="w3-col m2 w3-center"><p></p>
              <div className="card">
                  <img src={mariya} style={{width:100}}/>
                  <h3>Mariya Shmalko</h3>

                  <p>The University of New South Wales</p>
                  <a href="https://github.com/et-cetra"><i class="fa fa-github"></i></a>
              </div>
              </div>

            </div>
        </div>
      );
    }
  }

export default DevPage;
