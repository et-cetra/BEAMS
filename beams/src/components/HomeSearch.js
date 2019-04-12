import React from 'react';
import SearchIcon from "@material-ui/icons/Search";
import { Grid, Paper, InputBase, Card, ListItem, Divider } from '@material-ui/core';
import './HomeSearch.css'
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete';

class HomeSearch extends React.Component {

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
        <Paper className="HomeSearchBox">
        <Grid container direction="row" alignItems="center">
            <Grid item xs={1}>
                <SearchIcon className="HomeSearchIcon" fontSize="large"/>
            </Grid>
            <PlacesAutocomplete
            value={this.state.address}
            onChange={this.handleChange}
            onSelect={this.handleSelect}
            searchOptions={{types: ['(cities)'], componentRestrictions: {country: 'au'}}}>
                {({ getInputProps, suggestions, getSuggestionItemProps, i }) => (
                <div>
                <InputBase {...getInputProps({
                    placeholder: 'Search for Suburb, Postcode...',
                    className: 'HomeSearch',
                  })}/>
                <Card className="AutocompleteCardHome">
                    {suggestions.map(suggestion => {
                    const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                    const style = suggestion.active ? 
                    { backgroundColor: '#fca064', cursor: 'pointer' } : { backgroundColor: '#FFFFFF', cursor: 'pointer' };
                    
                    return (
                    <div key={suggestion.id}>
                        <ListItem className="SearchResultsHome" {...getSuggestionItemProps(suggestion, { className, style })}>
                            <span>{suggestion.description}</span>
                        </ListItem>
                        <Divider></Divider>
                    </div>
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

export default HomeSearch;

