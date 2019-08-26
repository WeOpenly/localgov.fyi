import React, { Component } from "react";
import { connect } from "react-redux";
import { navigate } from "@reach/router";
import PropTypes from "prop-types";


class Receipts extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return "receipts"
    }
}



const mapStateToProps = function (state, ownProps) {
    return {
        ...state.oneServices
    };
};

export default connect(mapStateToProps)(Receipts);