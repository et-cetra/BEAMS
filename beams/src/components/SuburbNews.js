import React from 'react';
import '../App.css';

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
                  'q=' + this.props.suburb + '&' +
                  'apiKey=bf2f2f717b5144da9abca234ee7f31c7';
        var req = new Request(url);
        fetch(req)
            .then(function(response) {
                console.log(response.json());
                this.setState({
                    isLoaded: true,
                    articles: response.articles
                });
                if (!isLoaded) {
                    return <div>Loading local news...</div>
                } else {
                    return (
                        <div>
                            Latest local news:
                            {articles.map(
                                article => (
                                    <li key={article.id}>
                                        <b>{article.author}:</b> wrote {article.title}
                                    </li>
                                ))
                            }
                        </div>
                    )
                }
            })

    }

    // render() {
    //     const { error, isLoaded, contents } = this.state;
    //     console.log("Demographics contents are", contents);
    //     if (error) {
    //         return <div>Error: {error.message}</div>;
    //     } else if (!isLoaded) {
    //         return <div>Loading...</div>;
    //     } else {
    //         return (
    //             <div>
    //                 Age groups of this Suburb from most common to least!
    //                 {contents.map(
    //                     content => (
    //                         content.items.map((item, i) => (
    //                             <li key={`item-${i}`}>
    //                                 <b>{item.label}:</b> {item.value} persons
    //                     </li>))
    //                     ))
    //                 }
    //             </div>
    //         );
    //     }
    // }
}

export default SuburbNews;
