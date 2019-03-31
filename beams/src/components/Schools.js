import React from 'react';
import '../App.css';

class Schools extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            schoolData: [],
            coord: null,
        };
    }

    componentDidMount() {
        this.setState({isLoading: true});
        const suburb = this.props.suburb;
        let geourl = `https://geocoder.api.here.com/6.2/geocode.json?
        app_id=vUpVkzX0ApdBiPkUSO8Z&app_code=cQiI_V1cbk4G0ley5IsGNg&searchtext=${suburb}`;
        fetch(geourl)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    coord: data,
                })
            });

        // let coord = '-33.8, 151.05'
        let url = `https://api.domain.com.au/v1/locations/schools/?coordinate=${this.state.coord}`;
        fetch(url, {
            headers: new Headers({
                'Authorization': "c4339a7dadc5c74044ad250cc22fabe9"
            })
        })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    isLoaded: true,
                    schoolData: data,
                })
            });
    }

    render() {
        let schoolData = this.state.schoolData;

        if (!this.state.isLoaded) {
            return <div>Loading...</div>

        } else {
            return (
                <div className="Schools">
                    <h1>Educational Facilities around</h1>
                    <ul>
                        {schoolData.map(item => (
                            <li key = {item.id}>
                                <a href= {item.websiteUrl} target="_blank">{item.name}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
    }

}

export default Schools;
