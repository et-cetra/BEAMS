import React from 'react';
import SearchIcon from "@material-ui/icons/Search";
import { Grid, Paper, InputBase, Card, ListItem } from '@material-ui/core';
import './QuickSearch.css'
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete';

class QuickSearch extends React.Component {

    constructor(props) {
        super(props);
        this.state = { city: '', query: '', address: ''};
    }

    handleChange = address => {
        this.setState({ address });
    };

    handleSelect = address => {
        console.log('Address:', address);
        this.props.onSelect(address);
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => console.log('Success', latLng))
            .catch(error => console.error('Error', error));
    };


    render() {
      return (
        <Paper className="QuickSearchBox">
        <Grid container direction="row" alignItems="center">
            <Grid item xs={1}>
                <SearchIcon className="QuickSearchIcon" fontSize="large" color="inherit"/>
            </Grid>
            <PlacesAutocomplete
            value={this.state.address}
            onChange={this.handleChange}
            onSelect={this.handleSelect}
            searchOptions={{types: ['(cities)'], componentRestrictions: {country: 'au'}}}>
                {({ getInputProps, suggestions, getSuggestionItemProps }) => (
                <div>
                <InputBase {...getInputProps({
                    placeholder: 'Search for Suburb, Postcode...',
                    className: 'QuickSearch',
                  })}/>
                <Card className="AutocompleteCard">
                    {suggestions.map(suggestion => {
                    const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                    const style = suggestion.active ? 
                    { backgroundColor: '#EE6A15', cursor: 'pointer' } : { backgroundColor: '#04091E', cursor: 'pointer' };
                    return (
                    <ListItem className="SearchResultsQuick" {...getSuggestionItemProps(suggestion, { className, style })}>
                        <span>{suggestion.description}</span>
                    </ListItem>
                    );
                })}
                </Card>                  
                </div>
            )}</PlacesAutocomplete>
        </Grid>
        </Paper>
      );
    }
  }

export default QuickSearch;

