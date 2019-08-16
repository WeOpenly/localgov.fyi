


import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import styles from "./spectre.min.module.css"
import iconStyles from './typicons.min.module.css';
import { graphql, StaticQuery } from 'gatsby';
import Img from "gatsby-image";
import AboutIl from '../../svgIcons/AboutIl.js';
import { loginGoog} from './actions';

class OneHome extends React.Component {
    constructor(props) {
        super(props);
        this.loginGoog = this.loginGoog.bind(this);
    }

    loginGoog(){
        const {dispatch} = this.props;
        dispatch(loginGoog());
    }

    render() {
        const { loginInProgress } = this.props;

        return (
            <Fragment>
            <header className={styles.navbar} style={{ background: '#fff', padding: '10px 16px', boxShadow: '0 2px 4px rgba(50,50,93,.04)' }}>
                <section className={styles.navbarSection}>
                    <a href="/" style={{ fontSize: '1.2rem' }} className={`${styles.btn} ${styles.btnLink} ${styles.h1}`}>evergov</a><sub className={styles.textUppercase} style={{ fontSize: '0.5rem', paddingTop: '4px', letterSpacing: '0.1rem', fontWeight: 'bold' }} >One</sub>
                </section>

                <section className={styles.navbarSection}>
                    <a href="/" style={{ fontSize: '14px' }} className={`${styles.btn} ${styles.btnLink}`}>Terms</a>
                    <a href="/" style={{ fontSize: '14px' }} className={`${styles.btn} ${styles.btnLink}`}>Privacy</a>
                </section>
            </header>
        <div className={`${styles.container} ${styles.gridLg}`} >
            <div className={`${styles.columns}`} style={{ margin: '32px 0 64px 0' }}>
                <div className={`${styles.column} ${styles.colSm6} ${styles.colXs12}`}>
                
                        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '64px' }}>
                            <h1> Gov Services made delightfully easy </h1>
                            <p>
                                We give you a single place to add manage all your
                                gov services (property taxes, utility bills & more). It takes
                                just a couple of minutes to get you going..
                                </p>

                            <div>
                            <div className={styles.inputGroup}>
              
                                <input type="email" className={styles.formInput} placeholder="your@email.com"/>
                                        <button onClick={this.loginGoog} className={`${styles.btn} ${styles.btnPrimary} ${styles.inputGroupButton}`} >Get Started</button>
                                </div>
                            </div>
                            
                        </div>
                    
                        </div>
                <div className={`${styles.column} ${styles.colSm6} ${styles.hideXs}`} style={{marginTop: '32px'}}>
                            <AboutIl />
                        </div>
            </div>
            <div className={`${styles.columns}`} style={{ margin: '64px 0 64px 0' }}>
            <div className={`${styles.column} ${styles.colXs12}`} >
                <h3> We'll do the heavy lifting for you </h3>
                <p>
                    We handle the renewals, auto payments and more on your behalf.
                                </p>

            </div>
            </div>
            <div className={`${styles.columns}`} style={{ margin: '64px 0 64px 0' }}>
                <div className={`${styles.column} ${styles.colSm3} ${styles.colXs12}`} >
                    <div className={styles.card} style={{
                        border: 0,
                        boxShadow: '0 .25rem 1rem rgba(48,55,66,.15)'}}>
                        <div className={styles.cardImage}>
                         
                        </div>
                        <div className={styles.cardHeader}>
                            <div className={`${styles.cardTitle} ${styles.h5}`}>
                                All in one place
                            </div>
                            <div className={`${styles.cardSubitle} ${styles.textGray}`}>
                                  We handle the renewals, auto payments and more on your behalf.
                            </div>
                                
                            </div>
          
                        </div>
                  
                </div>
                <div className={`${styles.column} ${styles.colSm3}  ${styles.colXs12}`} >
                    <div className={styles.card} style={{
                        border: 0,
                        boxShadow: '0 .25rem 1rem rgba(48,55,66,.15)'
                    }}>
                        <div className={styles.cardImage}>

                        </div>
                        <div className={styles.cardHeader}>
                            <div className={`${styles.cardTitle} ${styles.h5}`}>
                                All in one place
                            </div>
                            <div className={`${styles.cardSubitle} ${styles.textGray}`}>
                                We handle the renewals, auto payments and more on your behalf.
                            </div>

                        </div>

                    </div>
                </div>
                <div className={`${styles.column} ${styles.colSm3}  ${styles.colXs12}`} >
                    <div className={styles.card} style={{
                        border: 0,
                        boxShadow: '0 .25rem 1rem rgba(48,55,66,.15)'
                    }}>
                        <div className={styles.cardImage}>

                        </div>
                        <div className={styles.cardHeader}>
                            <div className={`${styles.cardTitle} ${styles.h5}`}>
                                All in one place
                            </div>
                            <div className={`${styles.cardSubitle} ${styles.textGray}`}>
                                We handle the renewals, auto payments and more on your behalf.
                            </div>

                        </div>

                    </div>
                </div>
                </div>
            </div>
            </Fragment>)
    }
}

const mapStateToProps = function (state, ownProps) {
    return {
        ...state.one
    };
};

export default connect(mapStateToProps)(OneHome);