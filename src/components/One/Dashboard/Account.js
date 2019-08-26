import React, { Component } from "react";
import { connect } from "react-redux";
import { navigate } from "@reach/router";
import PropTypes from "prop-types";

import styles from "../spectre.min.module.css"
import iconStyles from '../typicons.min.module.css';
class Account extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles.columns} style={{ marginTop: "1rem" }}>
                <div className={`${styles.column} ${styles.col4}`} />
                <div className={`${styles.column} ${styles.col4}`}>
                    <div className={styles.panel} style={{
                        border: "1px solid rgba(86, 39, 255, .2)",
                        background: "#fff",
                        padding: '0.2rem',
                        borderRadius: "0.3rem",
                        boxShadow: "0 .1rem 0.1rem rgba(48,55,66,.10)"
                    }}>
                        <div className={`${styles.panelHeader} ${styles.textCenter}`}>
                            <figure className={`${styles.avatar} ${styles.avatarLg}`}><img src={this.props.photoURL} alt="Avatar"/></figure>
                            
                            <h5 style={{paddingTop: "0.5rem"}} className={styles.panelTitle}>{this.props.displayName}</h5>
                        </div>
                        <nav className={styles.panelNav}>
                            <ul className={`${styles.tab} ${styles.tabBlock}`}>
                                <li className={`${styles.tabItem} ${styles.active}`}><a href="#panels">Profile</a></li>
                            </ul>
                           
                        </nav>
                        <div style={{
                            marginTop: '0.5rem'}} className={styles.panelBody}>
                            <div className={`${styles.tile} ${styles.tileCentered}`}>
                                <div className={styles.tileContent}>
                                    <h6 className={styles.tileTitle} >E-mail</h6>
                                    <div className={styles.tileSubtitle}>{this.props.email}</div>
                                </div>
                              
                            </div>
                            <div className={`${styles.tile} ${styles.tileCentered}`}>
                                <div className={styles.tileContent}>
                                    <h6 className={styles.tileTitle} >Evergov Plan</h6>
                                    <div className={styles.tileSubtitle}>lite</div>
                                </div>

                            </div>
                            <div className={`${styles.tile} ${styles.tileCentered}`}>
                                <div className={styles.tileContent}>
                                    <h6 className={styles.tileTitle} >Account Type</h6>
                                    <div className={styles.tileSubtitle}>{this.props.isBusiness ? `Business` : `Individual`} </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.panelFooter}>
                        </div>
                    </div>
                </div>
                <div className={`${styles.column} ${styles.col4}`} />
            </div>
    )
    }
}



const mapStateToProps = function (state, ownProps) {
    return {
        ...state.oneUser.userDetails,
        isBusiness: state.oneUser.isBusiness,
    };
};

export default connect(mapStateToProps)(Account);