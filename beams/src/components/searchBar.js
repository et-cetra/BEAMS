import React, { Component } from 'react';

import Script from 'react-load-script';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      query: ''
    };

    this.handleScriptLoad = this.handleScriptLoad.bind(this);
    this.handlePlaceSelect = this.handlePlaceSelect.bind(this);
  }

  handleScriptLoad() {
    // Declare Options For Autocomplete
    var options = {
      types: ['(cities)'],
    };

    // Initialize Google Autocomplete
    /*global google*/ // To disable any eslint 'google not defined' errors
    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete'),
      options,
    );

    // Fire Event when a suggested name is selected
    this.autocomplete.addListener('place_changed', this.handlePlaceSelect);
  }
  
  handlePlaceSelect() {

    // Extract City From Address Object
    let addressObject = this.autocomplete.getPlace();
    let address = addressObject.address_components;

    // Check if address is valid
    if (address) {
      // Set State
      this.setState(
        {
          city: address[0].long_name,
          query: addressObject.formatted_address,
        }
      );
    }
  }

  render() {
    return (
      <div>
        <Script
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyDIMGCB2qSD9qIB0mrZu0uGEmZlc9e8m-Y&libraries=places"
          onLoad={this.handleScriptLoad}
        />
        <input id="search-bar" placeholder="Search for suburb by name" value={this.state.query}
        />
      </div>
    );
  }
}

export default Search;