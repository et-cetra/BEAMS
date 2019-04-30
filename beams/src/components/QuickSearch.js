import React from 'react';
import SearchIcon from "@material-ui/icons/Search";
import AddLocationIcon from "@material-ui/icons/AddLocation";
import { Grid, Paper, InputBase, Card, ListItem } from '@material-ui/core';
import './QuickSearch.css'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

class QuickSearch extends React.Component {

    constructor(props) {
        super(props);
        this.state = { city: '', query: '', address: ''};
    }

    handleChange = address => {
        this.setState({ address });
    };

    handleSelect = address => {
        if (address === '') {
          this.props.onStartOver();
        } else {
          this.props.onSuburbSelect(address, this.props.priorities);
          this.setState({ address: '' })
          geocodeByAddress(address)
              .then(results => getLatLng(results[0]))
              //.then(latLng => console.log('Success', latLng))
              .catch(error => console.error('Error', error));
        }
    };

    searchIcon = (QuickSearchIcon) => {
      return <SearchIcon className={QuickSearchIcon} fontSize="large" color="inherit"/>
    };

    addIcon = (QuickSearchIcon) => {
      return <AddLocationIcon className={QuickSearchIcon} fontSize="large" color="inherit"/>
    };

    render() {
      const isSuburbPage = this.props.isSuburbPage;
      var QuickSearch, QuickSearchBox, QuickSearchIcon, AutocompleteCard,
        SearchResultsQuick, bg1, bg2, textDummy;

      if(!isSuburbPage){
        QuickSearch = "QuickSearch";
        QuickSearchBox = "QuickSearchBox";
        QuickSearchIcon = "QuickSearchIcon";
        AutocompleteCard = "AutocompleteCard";
        SearchResultsQuick = "SearchResultsQuick";
        bg1 = '#EE6A15';
        bg2 = '#04091E';
        textDummy = 'Search for Suburb...';
      } else {
        QuickSearch = "SubQuickSearch";
        QuickSearchBox = "SubQuickSearchBox";
        QuickSearchIcon = "SubQuickSearchIcon";
        AutocompleteCard = "SubAutocompleteCard";
        SearchResultsQuick = "SubSearchResultsQuick";
        bg1 = '#EE6A15';
        bg2 = '#FFFFFF';
        textDummy = `Compare ${this.props.suburb} with...`;
      }

      return (
        <Paper elevation={0} className={QuickSearchBox}>
        <Grid container direction="row" alignItems="center">
            <Grid item xs={1}>
              {isSuburbPage ? this.addIcon(QuickSearchIcon) : this.searchIcon(QuickSearchIcon)}
            </Grid>
            <PlacesAutocomplete
            value={this.state.address}
            onChange={this.handleChange}
            onSelect={this.handleSelect}
            searchOptions={{types: ['(cities)'], componentRestrictions: {country: 'au'}}}>
                {({ getInputProps, suggestions, getSuggestionItemProps }) => (
                <div>
                <InputBase {...getInputProps({
                    placeholder: textDummy,
                    className: QuickSearch,
                  })}/>
                <Card className={AutocompleteCard}>
                    {suggestions.map(suggestion => {
                    const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                    const style = suggestion.active ?
                    { backgroundColor: bg1, cursor: 'pointer' } : { backgroundColor: bg2, cursor: 'pointer' };
                    return (
                    <ListItem className={SearchResultsQuick} {...getSuggestionItemProps(suggestion, { className, style })}>
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

