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
import AboutSVG from './AboutSvgComp'
import Step3 from './Step3'

const HeroIl = () => (
    <StaticQuery
        query={graphql`query heroIl3Query {
  heroIl: 
  allFile(
            filter: { relativePath: { eq: "STEP2.png" } }
          ) {
            edges {
              node {
                name
                childImageSharp {
                  fluid (
  traceSVG: {
    color: "#f0d3fe"
    turnPolicy: TURNPOLICY_MINORITY
    blackOnWhite: true
  }
) {
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
            speed: 1500,
            slidesToShow: 1,
            slidesToScroll: 1
        };

        return (<div style={{ width: '100%', display: 'flex', flexDirection: 'column',justifyContent: 'center', 'scrollX': 'hidden'}}>
            <div style={{ fontWeight: 'bold', margin: '24px 0' }} className={`${styles.h6} ${styles.textCenter}`}> ⚡ Lightning fast service payments</div>
            <div style={{margin: '8px 0 0 0 '}}>
              
                    <Slider {...settings}>

                        <div >
                            <div style={{display: 'flex', justifyContent: 'center'}}>
                          <AboutSVG />
                            </div>
                        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', 'alignItems': 'center' }}>
  
                            <div style={{ margin: '8px 0', color: '#66758c', fontSize: '0.7rem'}} className={`${styles.p}`}>
                            Snap your bills or tickets
                            </div>
                            </div>
                        </div>
                  
                
                            <div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <HeroIl />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', 'alignItems': 'center' }}>
   
                            <div style={{ margin: '8px 16px', color: '#66758c', textAlign: 'center', fontSize: '0.7rem' }} className={`${styles.p}`}>
                                   Check your details & pay securely
                                </div>
                            </div>
                            </div>
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'center',  }}>
                            <Step3 />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', 'alignItems': 'center' }}>
         
                            <p style={{ margin: '8px 16px', color: '#66758c', textAlign: 'center', fontSize: '0.7rem' }} className={`${styles.emptySubtitle}`}>
                              You can rest, while we take care of cumbersome processes
                        </p>
                    </div>
                    </div>
                    
                    </Slider> 
            </div>
            <div style={{width: '100%', borderTop: '1px solid #d4d4d4', padding: '24px', marginTop: '56px'}}>
                <input onChange={this.onChange} className={`${inputStyles.inputfile} ${styles.btn} ${styles.btnPrimary} ${styles.btnLg}`}  type="file" id="inputfile" accept="image/*" capture/>
               
                <label htmlFor="inputfile"> <span className={`${iconStyles.typcn} ${iconStyles.typcnCameraOutline}` }></span>{btnLabel}</label>
                    </div>

            <div style={{ width: '100%', padding: '24px 24px 56px 24px', borderBottom: '1px solid #d4d4d4', margin: '24px 0'}}>

               
                <div className={styles.card} style={{ boxShadow: '0 .25rem 1rem rgba(48,55,66,.15)'}}>
                    <div className={`${styles.cardHeader}`}>
                    <div className={`${styles.cardTitle} ${styles.h5} ${styles.textCenter}`}>
                        😍 Users love evergov
                    </div>
                    </div>
                    <div className={styles.cardBody}>
                        <blockquote>

                            <p> I didn’t expect the process to be so fast- go to the website, snap a picture of the ticket, click OK - done in 30 seconds! </p>
                          
                              <cite>- Abby</cite>
                </blockquote>

                        <blockquote>

                            <p>The advance of technology is based on making it fit in so that you don't really even notice it, so it's part of everyday life.</p>
                              <cite>- Bill Gates</cite>
                </blockquote>
                    </div>
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

export default connect(mapStateToProps)(Landing);