import React from 'react';
import { Grid, Grow, Typography } from '@material-ui/core';
import SuburbPage from './SuburbPage'
import Demographics from '../components/Demographics';

class ComparePage extends React.Component {
    render() {
        return (
            <Grow in timeout={750}>
                <Grid container direction="row" justify="space-evenly" alignItems="center">
                    <Grid item xs={6} sm={6} lg={6}>
                        <SuburbPage suburb={this.props.suburbs[0]} reset={this.props.reset} onStartOver={this.props.onStartOver} />

                        {/* This is how you use demographics component */}
                        <Demographics suburb={this.props.suburbs[0].suburb} suburb_state={this.props.suburbs[0].suburb_state} />
                    </Grid>
                    <Grid item xs={6} sm={6} lg={6}>
                        <SuburbPage suburb={this.props.suburbs[1]} reset={this.props.reset} onStartOver={this.props.onStartOver} />

                        <Demographics suburb={this.props.suburbs[1].suburb} suburb_state={this.props.suburbs[1].suburb_state} />
                    </Grid>
                </Grid>
            </Grow>
        );
    }
}
export default ComparePage;