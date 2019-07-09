import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import styles from "./spectre.min.module.css"
import inputStyles from './inputfile.module.css';
import iconStyles from './typicons.min.module.css';
import Slider from "react-slick";
import Lock from '../../svgIcons/lock.js';

import {uploadDocumentAndCreateSubmission} from './actions'
import { graphql, StaticQuery } from 'gatsby';
import Img from "gatsby-image";
import {stepChange} from './actions'
import AboutSVG from './AboutSvgComp'


const HeroIl = () => (
    <StaticQuery
        query={graphql`query heroIl3Query {
  heroIl: 
  allFile(
            filter: { relativePath: { eq: "indexhero.png" } }
          ) {
            edges {
              node {
                name
                childImageSharp {
                  fluid {
                    base64
                    tracedSVG
                    aspectRatio
                    src
                    srcSet
                    srcWebp
                    srcSetWebp
                    sizes
                    originalImg
                    originalName
                  }
                }
              }
            }
          }

}`}
        render={data => {
            return (<Img
                title={`evergov`}
                alt={`illustration of evergov`}
                style={{ width: '280px', height: '200px' }}

                fluid={data.heroIl.edges[0].node.childImageSharp.fluid} />)
        }} />
)
class Landing extends React.Component {
    constructor(props) {
        super(props);
        
        this.onChange = this.onChange.bind(this);
    }

    onChange(e){
        const { dispatch, anonUserID} = this.props;

        const files = Array.from(e.target.files)

        if (files){
            dispatch(uploadDocumentAndCreateSubmission(files[0], anonUserID))
        }
       
    }

    render() {
        const {createSubInProgress} = this.props;

        let btnLabel = 'Snap to get started'
        if(createSubInProgress){
            btnLabel = 'Uploading ...'
        }

        var settings = {
            dots: true,
            adaptiveHeight: false,
            autoplay: true,
            infinite: true,
            speed: 700,
            slidesToShow: 1,
            slidesToScroll: 1
        };

        return (<div style={{ width: '100%', display: 'flex', height: '100vh', flexDirection: 'column',justifyContent: 'space-between'}}>
     
            <div className={`${styles.hero} ${styles.heroLg}`} >
  
                    <Slider {...settings}>

                        <div >
                            <div style={{display: 'flex', justifyContent: 'center'}}>
                          <AboutSVG />
                            </div>
                        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', 'alignItems': 'center' }}>
                            <div style={{fontSize: '1.75rem', fontWeight: 'bold', margin: '8px 0'}} className={`${styles.btn} ${styles.btnLink} ${styles.h1} ${styles.textCenter}`}>evergov</div><div className={styles.textUppercase} style={{ fontSize: '0.55rem',letterSpacing: '0.1rem', fontWeight: 'bold' }}> Quick Pay </div>
                            <div style={{ margin: '8px 0',}} className={`${styles.p}`}>
                                Hassle free government services
                            </div>
                            </div>
                        </div>
                  
                
                            <div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <HeroIl />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', 'alignItems': 'center' }}>
                        <div style={{ margin: '8px 0', fontWeight: 'bold'}} className={`${styles.h3} ${styles.btnLink}`}>
                                   Snap & Forget
                                </div>
                                <div style={{ margin: '8px 0',  textAlign: 'center' }} className={`${styles.p}`}>
                                    All you need to do is to snap your bill or ticket, we will take care of understanding your picture and handling the payment
                                </div>
                            </div>
                            </div>
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
                            <Lock />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', 'alignItems': 'center' }}>
                        <div style={{ margin: '8px 0', fontWeight: 'bold', paddingLeft: '12px' }} className={`${styles.h3} ${styles.btnLink}`}>
                            Safe & Secure
                                </div>
                            <div style={{ margin: '8px 0', paddingLeft: '12px', textAlign: 'center' }} className={`${styles.p}`}>
                              Your details are always safe and secure with evergov
                                </div>
                    </div>
                    </div>
                    
                    </Slider> 
               
            </div>
            <div style={{width: '100%', borderTop: '1px solid #d4d4d4', padding: '24px',}}>
                <input onChange={this.onChange} className={`${inputStyles.inputfile} ${styles.btn} ${styles.btnPrimary} ${styles.btnLg}`}  type="file" id="inputfile" accept="image/*" capture/>
               
                <label htmlFor="inputfile"> <span className={`${iconStyles.typcn} ${iconStyles.typcnCameraOutline}` }></span>{btnLabel}</label>
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

export default connect(mapStateToProps)(Landing);