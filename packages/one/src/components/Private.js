import React, { Component } from "react";
import { connect } from "react-redux";
import { navigate } from "@reach/router";


class Private extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { component: Component, ...rest } = this.props
  
        const { location, authenticated, loginCheckInProgress } = this.props;
        let noOnLoginPage = location.pathname !== `/`
        

         if (!loginCheckInProgress && !authenticated && noOnLoginPage) {
            navigate("/");
           console.log(
             "here",
             loginCheckInProgress,
             authenticated,
             location.pathname
           );
           return null;
         }
        
        return <Component {...rest} />;
    }
}

function mapStateToProps(state) {
    return {
      authenticated: state.oneUser.authenticated,
      loginCheckInProgress: state.oneUser.loginCheckInProgress
    };
}

export default connect(mapStateToProps)(Private);
