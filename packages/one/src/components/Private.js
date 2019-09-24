import React, { Component } from "react";
import { connect } from "react-redux";
import { navigate } from "@reach/router";
import PropTypes from "prop-types";
import styles from "./spectre.min.module.css";
import { auth } from "firebase";
import { checkLogin } from "./actions";


class Private extends Component {
    constructor(props) {
        super(props);
    }




    render() {
        const { component: Component, ...rest } = this.props
        console.log('private', this.props)
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
