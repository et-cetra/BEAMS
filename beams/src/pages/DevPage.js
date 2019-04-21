import React from 'react';
import './HomePage.css'
import './DevPage.css'
import { Grid, Typography, Grow } from '@material-ui/core';
import HomeSearch from '../components/HomeSearch';

import avatar from '../assets/avatar2.png'

class DevPage extends React.Component {
    render() {
      return (
        <div>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>

            <div class="grid-container">

            <div class="card">
              <img src={avatar} style={{width:100}}/>
              <h3>Example</h3>
              <p>The University of New South Wales</p>
              <a href="#"><i class="fa fa-linkedin"></i></a>
              <a href="#"><i class="fa fa-facebook"></i></a>
              <p><button>Contact</button></p>
            </div>

            <div class="card">
              <img src={avatar} style={{width:100}}/>
              <h3>Bei Chen</h3>
              <p>The University of New South Wales</p>
              <a href="#"><i class="fa fa-linkedin"></i></a>
              <a href="#"><i class="fa fa-facebook"></i></a>
              <p><button>Contact</button></p>
            </div>

            </div>



        </div>
      );
    }
  }

export default DevPage;
