import React from 'react';
import { getPostcode } from '../utils.js'

class DomainLink extends React.Component {
    state = {
        postcode: 0
    };

    async resolvePostcode() {
        const postcode = await getPostcode(this.props.suburb, this.props.suburb_state);
        return postcode;
    }

    async componentDidMount() {
        const result = await this.resolvePostcode(this.props.suburb, this.props.suburb_state);
        this.setState({
            postcode: result
        });
    }

    render() {
        const postcode = this.state.postcode
        const suburb = this.props.suburb.toLowerCase()
        const suburb_state = this.props.suburb_state.toLowerCase()
        //https://www.domain.com.au/sale/merrylands-nsw-2160/inspection-times/?excludeunderoffer=1&ssubs=1
        var link = "https://www.domain.com.au/sale/"+ suburb + "-" + suburb_state + "-" + postcode + "/inspection-times/?excludeunderoffer=1&ssubs=1"


        return (
            <a href="{link}">View property listings on domain.com</a>
        )
    }
}

export default DomainLink;
