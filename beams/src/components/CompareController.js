import React from 'react'
import '../pages/HomePage.css'
import SuburbPage from "../pages/SuburbPage"

class CompareController extends React.Component {
    render() {
      console.log("CompareController, render", this.props);
      if (this.props.suburbs.length === 1) {
        return (
          <div>
            <SuburbPage onSuburbCompare={this.props.onSuburbCompare} suburbs={this.props.suburbs} onSuburbSelect={this.props.onSuburbSelect} onStartOver={this.props.onStartOver} isCompare={false}/>
          </div>
        )
      } else {
        return (
          <div>
            <SuburbPage onSuburbCompare={this.props.onSuburbCompare} suburbs={this.props.suburbs} onSuburbSelect={this.props.onSuburbSelect} onStartOver={this.props.onStartOver} isCompare={true}/>
          </div>
        )
      }
    }
  }

export default CompareController;