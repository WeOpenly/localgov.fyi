import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import styles from "./spectre.min.module.css"
import iconStyles from './typicons.min.module.css';
import { graphql, StaticQuery } from 'gatsby';
import Img from "gatsby-image";
import NotFoundSvg from "../illus/NotFoundSvg";


class OneNotFound extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (<div className={styles.columns}>
            <div className={`${styles.column} ${styles.col12}`}>

                <div className={styles.empty}>
                    <div className={styles.emptyIcon}>
                        <NotFoundSvg />
                    </div>
                    <p className={`${styles.emptyTitle} ${styles.h3}`}> This page no longer exists or hasn't been created yet</p>
                    <br />
                </div>

            </div>
        </div>
        )
    }
}



const mapStateToProps = function (state, ownProps) {
    return {
        ...state.quickPay
    };
};

export default connect(mapStateToProps)(OneNotFound);