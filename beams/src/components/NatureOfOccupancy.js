import React from 'react';
import '../App.css';
import { getDemographics } from '../utils.js'

class NatureOfOccupancy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            contents: []
        };
    }

    async componentDidMount() {
        const suburbInfo = await getDemographics(this.props.suburb, this.props.suburb_state, "NatureOfOccupancy");
        console.log("Nature Of Occupancy suburbInfo", suburbInfo);

        this.setState({
            isLoaded: true,
            contents: suburbInfo.demographics
        });

    }

    render() {
        const { error, isLoaded, contents } = this.state;
        console.log("contents are marital", contents);
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                   <h4>Nature Of Occupancy:</h4>
                    {contents.map(
                        content => (
                            content.items.map((item, i) => (
                                <li key={`item-${i}`}>
                                    <b>{item.label}:</b> {item.value} persons
                        </li>))
                        ))
                    }
                </div>
            );
        }
    }
}

export default NatureOfOccupancy;
