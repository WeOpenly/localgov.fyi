import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import styles from "./spectre.min.module.css"
import iconStyles from './typicons.min.module.css';
import { graphql, StaticQuery } from 'gatsby';
import Img from "gatsby-image";
import { navigate } from "@reach/router";
import {logout} from './actions';


class OneDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout(){
        const {dispatch} = this.props;
        dispatch(logout())
    }

    render() {
        return (
            <Fragment>
               <div>
                   welcome to dashboard
                   <a onClick={this.logout}>
                       logout</a>
                   </div>
            </Fragment>)
    }
}

const mapStateToProps = function (state, ownProps) {
    return {
        ...state.oneUser
    };
};

export default connect(mapStateToProps)(OneDashboard);