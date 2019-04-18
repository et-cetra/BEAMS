import React from 'react';
import FamilyFriendly from './highlights/FamilyFriendly';
import RetirementFriendly from './highlights/RetirementFriendly';
import HospitalFriendly from './highlights/HospitalFriendly';
import CulturallyDiverse from './highlights/CulturallyDiverse';
import CommuteFriendly from './highlights/CommuteFriendly';
import PrimaryFriendly from './highlights/PrimaryFriendly';
import SecondaryFriendly from './highlights/SecondaryFriendly';
import './Highlights.css'

class Highlights extends React.Component {

    // Main component to hold small highlight components together

    render() {
        return (
            <div>
                <FamilyFriendly suburb={this.props.suburb} suburb_state={this.props.suburb_state}/>
                <RetirementFriendly suburb={this.props.suburb} suburb_state={this.props.suburb_state}/>
                <HospitalFriendly suburb={this.props.suburb} suburb_state={this.props.suburb_state}/>
                <CulturallyDiverse suburb={this.props.suburb} suburb_state={this.props.suburb_state}/>
                <PrimaryFriendly suburb={this.props.suburb} suburb_state={this.props.suburb_state}/>
                <SecondaryFriendly suburb={this.props.suburb} suburb_state={this.props.suburb_state}/>
                <CommuteFriendly suburb={this.props.suburb} suburb_state={this.props.suburb_state}/>
            </div>
        );
    }
}

export default Highlights;
