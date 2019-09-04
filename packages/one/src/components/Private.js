import React, { Component } from "react";
import { connect } from "react-redux";
import { navigate } from "@reach/router";
import PropTypes from "prop-types";


class Private extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { as: Comp, ...props } = this.props;
        return props.authenticated ? <Comp {...props} /> : null;
    }
}

function mapStateToProps(state) {
    return { authenticated: state.oneUser.authenticated };
}

export default connect(mapStateToProps)(Private);
