import React, { Component } from "react";
import { connect } from "react-redux";
import { navigate } from "@reach/router";
import PropTypes from "prop-types";


class Private extends Component {
    constructor(props) {
        super(props);
    }



    render() {
        const { component: Component, ...rest } = this.props
        const {location, authenticated} = this.props;
        let noOnLoginPage = location.pathname !== `/`

        if (!authenticated && noOnLoginPage) {
            navigate("/")
            return null
        }
        
        return <Component {...rest} />
    }
}

function mapStateToProps(state) {
    return { authenticated: state.oneUser.authenticated };
}

export default connect(mapStateToProps)(Private);
