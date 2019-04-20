import React from 'react';
import '../components/SuburbNews.css';
import { getNews } from '../utils';
import { Paper, Typography } from '@material-ui/core';

// Request for Population Ages in Maroubra: https://api.domain.com.au/v1/demographics?level=Suburb&id=27512&types=AgeGroupOfPopulation&year=2016

class SuburbNews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            articles: []
        };
    }

    async componentDidMount() {
        const allArticles = await getNews(this.props.suburb, this.props.suburb_state);
        this.setState({
            isLoaded: true,
            articles: allArticles
        })

    }

    render() {
        let articles = this.state.articles;

        if (!this.state.isLoaded) {
          return <div>Loading...</div>
        } else {

          if(articles.articles.length === 0)
          return (
            <Typography style={{ fontSize: 18 }} variant="h5" color="inherit">No news available at this time</Typography>
          );

          return (
              <div className="VerticalMenu">
                  {articles.articles.map((article, i) =>
                      <div key={i}>
                      <Paper className="PaperBox">
                      <a href={article.url} key={article.id} target="_blank" rel="noopener noreferrer">
                          <b className="Title">{article.title}</b>
                          <br/>
                      </a>
                          <p className="Content">{article.description}</p>
                          <i className="Date">{article.publishedAt.split('T')[0]}</i>
                      </Paper>
                      <br></br>
                      </div>
                  )}
              </div>
            );
        }
    }
}

export default SuburbNews;
