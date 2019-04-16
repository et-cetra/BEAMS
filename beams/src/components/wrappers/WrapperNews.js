import React from 'react';
import 'typeface-roboto';

import '../../pages/SuburbPage.css'
import { Typography } from '@material-ui/core';
import SuburbNews from '../SuburbNews.js'

import mNews from '../../assets/ic_news.png'

class WrapperNews extends React.Component {
    render() {
      const suburb = this.props.suburb;
      return(
      <div>
      {/*News*/}
      <img src={mNews} className="IconDef" alt="news" />
      <Typography align="inherit" inline className="SideText" style={{ fontSize: 26 }} variant="h1" color="inherit">
        Local News
      </Typography>
      <div className="NewsMain">
        <SuburbNews suburb={suburb} />
      </div>
      </div>
      );
    }
}

export default WrapperNews;
