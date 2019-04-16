import React from 'react';
import FamilyFriendly from './highlights/FamilyFriendy';
import HospitalFriendly from './highlights/HospitalFriendly';
import CulturallyDiverse from './highlights/CulturallyDiverse';

class Highlights extends React.Component {


    // If above 0-4 is above 5% give tag 'Family Friendly'
    // If more than 40% of transport is not walking or car give tag 'Convenient Transport'
    // If there are less than 40% of Australians give tag 'Culturally Diverse'
    // If 2 or more government primary schools in the area, give tag 'Primary Education Friendly'
    // If 2 or more government high schools in the area, give tag 'High School Education Friendly'

    // Main component to hold small highlight components together


    render() {
        return (
            <div>
                <FamilyFriendly suburb={this.props.suburb} suburb_state={this.props.suburb_state}/>
                <HospitalFriendly suburb={this.props.suburb} suburb_state={this.props.suburb_state}/>
                <CulturallyDiverse suburb={this.props.suburb} suburb_state={this.props.suburb_state}/>

            </div>
        );
    }
}

export default Highlights;
