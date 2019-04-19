import React from 'react';
import '../App.css';
import { getNews, getSentiment, getSurrounding } from '../utils';
import { Paper } from '@material-ui/core';
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
        const sentiment =  await getSentiment(this.state.articles);
        const surrouding = await getSurrounding(this.props.suburb, this.props.suburb_state);
        console.log(sentiment);
    }

    render() {
        let articles = this.state.articles;
        if (!this.state.isLoaded) {
            return <div>Loading...</div>
        } else {
            return (
                <div className="vertical-menu">
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
