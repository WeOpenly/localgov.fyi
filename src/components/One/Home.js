


import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import styles from "./spectre.min.module.css"
import iconStyles from './typicons.min.module.css';
import { graphql, StaticQuery } from 'gatsby';
import Img from "gatsby-image";



class CameraCapture extends React.Component {
    constructor(props) {
        super(props);

    }


    componentDidMount() {

    }


    render() {

        return (<div className={`${styles.container} ${styles.gridLg}`} >
    <div className={`${styles.column}`}>
        <div className={`${styles.hero} ${styles.heroLg}`}>
            <div className={`${styles.heroBody}`}>
                hero
                                </div>
        </div>
    </div>
</div>)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        trackEvent: (ev, id, data) => {
            dispatch(trackQPevent(ev, id, data));
        }
    }
}


const mapStateToProps = function (state, ownProps) {
    return {
        ...state.quickPay
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CameraCapture);