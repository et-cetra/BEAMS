import React from 'react';
import '../App.css';
import { getNews } from '../utils';

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
        console.log("!&@!#%* ", articles);

        if (!this.state.isLoaded) {
            return <div>Loading...</div>
        } else {
            return (                
                <div class="vertical-menu">
                    <a class="header">Local News:</a>
                    {articles.articles.map(
                        article => <div><a href={article.url} key={article.id}>
                            <p><b>{article.title}</b></p>
                            <p>{article.description}</p><br></br><br></br>                        
                        </a>
                        </div>
                    )}
                </div>
            );
        }
    }
}

export default SuburbNews;
