import React from "react";
import {HashRouter as Router, Route} from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage"


// How we connect our pages
export default function Routes() {
    return (
        <Router>
            <App>
                <Route exact path="/" component={HomePage}/>
                
            </App>
        </Router>
    );
}