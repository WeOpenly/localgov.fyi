import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { navigate } from "@reach/router";

import { Router, Link, Match } from "@reach/router";


import styles from "../spectre.min.module.css"
import iconStyles from '../typicons.min.module.css';


class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            displayName,
            photoURL,
            onMenuClick
        } = this.props;

        return (<Fragment >
     
            <section className={styles.navbarSection} style={{ marginTop: '1.2rem'}}>
                <div style={{display: "flex", justifyContent: 'center'}}>
                   
                <Link
                    to="/one"
                  className={`${styles.btn} ${styles.btnMd}  ${styles.btnLink}`}
                    style={{ textDecoration: 'none', color: '#5627ff' }}
                >
                        <h3>  evergov  <sub
                            className={styles.textUppercase}
                            style={{
                                color: '#455060',
                                fontSize: "0.5rem",
                                paddingTop: "4px",
                                letterSpacing: "0.1rem",
                                fontWeight: "bold"
                            }}
                        >
                            One
                    </sub>   </h3>

                      
                </Link>
                    <div onClick={onMenuClick} className={`${styles.btn} ${styles.btnClear}`} />

                </div>
                <div style={{marginTop: '4rem'}}>

              
                <div className={`${styles.navItem} ${styles.textBold}`} onClick={()=> navigate('/dashboard')}>
                        <div className={`${styles.btn} ${styles.btnMd}  ${styles.btnLink}`}>
                        <span
                            className={`${iconStyles.typcn} ${
                                iconStyles.typcnHome
                                }`}
                            style={{
                                fontSize: "0.8rem",
                                padding: '0 1rem 0 0',
                                cursor: "pointer"
                            }}
                        />Dashboard
                    </div>
                </div>
               
                    <div className={styles.divider} />
                    <div className={`${styles.navItem}`} onClick={() => navigate('/dashboard/services')} >
                        <div className={`${styles.btn} ${styles.btnMd}  ${styles.btnLink}`}>
                        <span
                            className={`${iconStyles.typcn} ${
                                iconStyles.typcnPuzzle
                                }`}
                            style={{
                                fontSize: "0.8rem",
                                padding: '0 1rem 0 0',
                                cursor: "pointer"
                            }}
                        />
                        Services
                   
                    </div>
                       
                </div>
                    <div className={styles.divider} />
                    <div className={`${styles.navItem}`} onClick={() => navigate('/dashboard/receipts')}>
                        <div className={`${styles.btn} ${styles.btnMd}  ${styles.btnLink}`}>
                        <span
                            className={`${iconStyles.typcn} ${
                                iconStyles.typcnDocumentText
                                }`}
                            style={{
                                fontSize: "0.8rem",
                                padding: '0 1rem 0 0',
                                cursor: "pointer"

                            }}
                        />
                        Receipts
 </div>
                </div>
                    <div className={styles.divider} />
                    <div className={`${styles.navItem}`} >
                        <div className={`${styles.btn} ${styles.btnMd}  ${styles.btnLink}`}>
                    <span
                        className={`${iconStyles.typcn} ${
                            iconStyles.typcnSupport
                            }`}
                        style={{
                            fontSize: "0.8rem",
                            padding: '0 1rem 0 0',
                            cursor: "pointer"

                        }}
                    />
                    Support
 </div>
 </div>
                    <div className={styles.divider} />
                <div className={`${styles.navItem}`} >
                        <div className={`${styles.btn} ${styles.btnMd}  ${styles.btnLink}`}>
                        <span
                            className={`${iconStyles.typcn} ${
                                iconStyles.typcnMessages
                                }`}
                            style={{
                                fontSize: "0.8rem",
                                padding: '0 1rem 0 0',
                                cursor: "pointer"

                            }}
                        />
                        FAQ
 </div>

                </div>
                </div>
            </section>
    <section className={styles.navbarSection}>
                
  
       </section>
          
            <section className={styles.navbarSection} style={{ marginBottom: '1.8rem' }}>
                <div className={styles.divider} style={{padding: '0.3rem'}}/>
                <div
                    className={`${styles.tile} ${
                        styles.tileCentered
                        }`} style={{ overflow: 'visible'}}
                >
                    <div className={`${styles.tileIcon} `}>
                        <figure
                            className={`${styles.avatar} ${
                                styles.avatarLg
                                }`}
                            data-initial="EG"
                            style={{ backgroundColor: "#3500f3" }}
                        >
                            <img src={photoURL} alt={displayName} />
                        </figure>
                    </div>

                    <div className={styles.tileContent} >
                        <div style={{ maxWidth: '120px' }}>
                            <h6>{displayName}</h6>
                          
                            <Link to="/dashboard/account">
                                <small>Settings</small>
                            </Link>
                           
                        </div>
                  
                    </div>
                </div>
           

            </section>
            </Fragment>
            )
    }
}



const mapStateToProps = function (state, ownProps) {
    return {
        oneUser: state.oneUser,
        oneServices: state.oneServices
    };
};

export default connect(mapStateToProps)(Home);