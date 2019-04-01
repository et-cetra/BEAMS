import React from 'react';
import '../App.css';
import { array } from 'prop-types';

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

    render() {
        var url = 'https://newsapi.org/v2/top-headlines?' +
                  'country=au&' +
                  'apiKey=bf2f2f717b5144da9abca234ee7f31c7';
                  
        //   'q=' + this.props.suburb + '&' 
        var req = new Request(url);
        var articles = [];
        fetch(req)
            .then(function(response) {
                response.json().then(function(data) {
                    console.log(data);
                    return (
                        <div>
                            Local News is:
                            {data.articles.map(
                                article => 
                                <li key={article.id}>
                                <b>{article.author} wrote {article.title}</b>
                                </li>)
                            }
                        </div>
                    );
                });
            })
        return (<div>Just to fill in</div>)
    }

    // render() {
    //     const { error, isLoaded, articles } = this.state;
    //     console.log("Demographics contents are", articles);
    //     if (error) {
    //         return <div>Error: {error.message}</div>;
    //     } else if (isLoaded) {
    //         return <div>Loading... NEWS</div>;
    //     } else {
    //         return (
    //             <div>
    //                 Age groups of this Suburb from most common to least!
    //                 {articles.map(
    //                     article => 
    //                             <li key={`item-${article.id}`}>
    //                                 <b>{article.author}:</b> {article.articles} persons
    //                     </li>)
                        
    //                 }
    //             </div>
    //         );
    //     }
    // }
}

export default SuburbNews;
