import React, { Component } from "react";
import { connect } from "react-redux";
import { navigate } from "@reach/router";


class Private extends Component {
    constructor(props) {
        super(props);
    }

    render() {
      const { component: Component, ...rest } = this.props

      const { location, authenticated, authInProgress } = this.props;
      let noOnLoginPage = location.pathname !== `/`
        

      if (!authInProgress && !authenticated && noOnLoginPage) {
        navigate("/");
        return null;
      }
        
      return <Component {...rest} />;
    }
}

function mapStateToProps(state) {
    return {
      authenticated: state.oneUser.authenticated,
      authInProgress: state.oneUser.authInProgress
    };
}

export default connect(mapStateToProps)(Private);
