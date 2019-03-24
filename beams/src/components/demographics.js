import React from 'react';
import '../App.css';

// Request for Population Ages in Maroubra: https://api.domain.com.au/v1/demographics?level=Suburb&id=27512&types=AgeGroupOfPopulation&year=2016 

// 1. Need to change suburb name to ID

class Demographics extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          contents: []
        };
      }

    componentDidMount() {
        fetch('https://api.domain.com.au/v1/demographics?level=Suburb&id=27512&types=AgeGroupOfPopulation&year=2016', {
            headers: new Headers({
                'Authorization': "Bearer d9df4786fdd30dd7810d1f05c441836a"
              })
        })
            .then(res => res.json())
            .then(
            (result) => {
                console.log("result", result);
                this.setState({
                isLoaded: true,
                contents: result.demographics
                });
            },
            (error) => {
                this.setState({
                isLoaded: true,
                error
                });
            }
        )
    }

    render() {
        const { error, isLoaded, contents } = this.state;
        console.log("contents are", contents);
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <ul>
                    {contents.map(
                        content => (
                        content.items.map((item, i) => (
                        <li key={`item-${i}`}>
                            {item.label}: {item.value}
                        </li>))
                    ))
                    }
                </ul>
            );
        }
    }
}

export default Demographics;