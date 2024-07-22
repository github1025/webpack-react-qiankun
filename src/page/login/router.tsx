

import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect
} from 'react-router-dom'

import Index from './index'
class RouterWrapper extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router >
                <Route path="/" component={Index} />
            </Router>
        )
    }

    componentDidMount() {
    }
}

export default RouterWrapper;