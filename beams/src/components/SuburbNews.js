import React from 'react';
import '../components/SuburbNews.css'
import { getNews } from '../utils';
import { Paper } from '@material-ui/core';

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
