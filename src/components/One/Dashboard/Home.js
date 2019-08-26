import React, { Component } from "react";
import { connect } from "react-redux";
import { navigate } from "@reach/router";
import PropTypes from "prop-types";


class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
  
       return "home"
    }
}



const mapStateToProps = function (state, ownProps) {
  return {
    oneUser: state.oneUser,
    oneServices: state.oneServices
  };
};

export default connect(mapStateToProps)(Home);