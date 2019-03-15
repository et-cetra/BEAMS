
// Imports
import React, { Component } from 'react';

// Import React Scrit Libraray to load Google object
import Script from 'react-load-script';

class Search extends Component {
  // Define Constructor
  constructor(props) {
    super(props);

    // Declare State
    this.state = {
      city: '',
      query: ''
    };

    // Bind Functions
    this.handleScriptLoad = this.handleScriptLoad.bind(this);
    this.handlePlaceSelect = this.handlePlaceSelect.bind(this);

    // Binding function for onChange
    this.handleInputChange = this.handleInputChange.bind(this);

  }

  handleScriptLoad() {
    var input = document.getElementById('autocomplete');
    var options = {
      types: ['(cities)'],
    };

    /*global google*/
    this.autocomplete = new google.maps.places.Autocomplete(
      input,
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

  handleInputChange(event) {
    this.setState({ query: event.target.query });
  }

  render() {
    return (
      <div>
        <Script
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyDIMGCB2qSD9qIB0mrZu0uGEmZlc9e8m-Y&libraries=places"
          onLoad={this.handleScriptLoad}
        />
        <input 
          type="text" 
          placeholder="Search by suburb name" 
          value={this.state.query} 
          onChange={this.handleInputChange}
         />
      </div>
    );
  }
}

export default Search;