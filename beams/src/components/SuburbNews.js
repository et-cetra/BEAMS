import React from 'react';
import '../components/SuburbNews.css';
import { getNews, getSentiment } from '../utils';
import { Paper, Typography, CircularProgress, Grid } from '@material-ui/core';
import { EmoticonHappyOutline, EmoticonSadOutline, EmoticonNeutralOutline, DramaMasks } from 'mdi-material-ui'; 

class SuburbNews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      articles: [],
      sentimentRating: [],
    };
  }

  async componentDidMount() {
    const allArticles = await getNews(this.props.suburb, this.props.suburb_state);
    const sentimentRating = await getSentiment(allArticles);

    this.setState({
      isLoaded: true,
      articles: allArticles,
      sentimentRating: sentimentRating,
    })
  }

render() {
  const { articles, sentimentRating } = this.state;
  console.log(sentimentRating);

  if (!this.state.isLoaded) {
    return <CircularProgress size={25} color="secondary"/>
  } else {

    if(articles.count_results === 0)
    return (
      <Typography style={{ fontSize: 18 }} variant="h5" color="inherit">No news available at this time</Typography>
    );

    return (
      <div>
        <div className="SentimentParentContainer">
        <Paper>
        <DramaMasks className="DramaIcon"/>
        <Typography style={{fontSize: "14px", float: "left"}} variant="button" className="SentimentText">News sentiment</Typography>
        <Grid className="SentimentContainer" container direction="row" justify="space-between">
          <Grid item className="SentimentSub">
            <EmoticonHappyOutline fontSize="large" style={{color: "#4CAF50"}} className="SentimentIcons"/>
            <Typography style={{fontSize: "24px"}} className="SentimentNum">{sentimentRating.positive}</Typography> 
          </Grid>
          <Grid item className="SentimentSub">
            <EmoticonNeutralOutline fontSize="large" className="SentimentIcons"/>
            <Typography style={{fontSize: "24px"}} className="SentimentNum">{sentimentRating.neutral}</Typography> 
          </Grid>
          <Grid item className="SentimentSub">
            <EmoticonSadOutline fontSize="large" style={{color: "#F44336"}} className="SentimentIcons"/>
            <Typography style={{fontSize: "24px"}} className="SentimentNum">{sentimentRating.negative}</Typography> 
          </Grid>
        </Grid>
        </Paper>
        </div>
        <div className="VerticalMenu">
          {articles.articles.map((article, i) =>
            <div key={i}>
              <Paper className="PaperBox">
              <a href={article.link} key={article.id} target="_blank" rel="noopener noreferrer">
                <b className="Title">{article.title}</b>
                <br/>
              </a>
                <p className="Content">{article.desc}</p>
                <i className="Date">{article.date.split(' ').slice(0,4).join(' ')}</i>
              </Paper>
              <br></br>
            </div>
          )}
        </div>
      </div>
      );
    }
  }
}

export default SuburbNews;
