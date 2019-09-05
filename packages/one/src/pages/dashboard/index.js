import React, { Fragment } from 'react';

import { Router, Link } from "@reach/router";
import Private from '../../components/Private';

import DashBoardIndex from '../../components/Dashboard/Index';

class OneDashboard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
  
        return (
                  <Router>
                    <Private path="/dashboard/*" component={DashBoardIndex} />
                  </Router>
        );
    }
}


export default OneDashboard;