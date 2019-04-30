import React from 'react';
import { getPostcode } from '../utils.js'
import WrapperStats from './wrappers/WrapperStats'

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
        const suburb = (this.props.suburb.toLowerCase()).replace(/ /g,"-");
        const suburb_state = this.props.suburb_state.toLowerCase()
        const salerent = this.props.salerent
        if (WrapperStats.state.value === 1) salerent = "sale";

        {/*
        const ptype = this.props.property_type.toLowerCase()
        const bedrooms = this.props.bedrooms
        */}

        //e.g. https://www.domain.com.au/sale/parramatta-nsw-2150/?ptype=apartment&bedrooms=2

        var link = "https://www.domain.com.au/" + salerent + "/"+ suburb + "-" + suburb_state + "-" + postcode
        // uncomment below when beds and property type done
        // var link = "https://www.domain.com.au/"+ buyrent + "/"+ suburb + "-" + suburb_state + "-" + postcode + "/?ptype=" + ptype + "&bedrooms=" + "bedrooms"


        return (
            <a href={link}>View property listings on domain.com</a>
        )
    }
}

export default DomainLink;
