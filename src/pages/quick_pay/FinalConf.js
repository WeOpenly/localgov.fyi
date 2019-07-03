import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import styles from "./spectre.min.module.css"
import inputStyles from './inputfile.module.css';
import iconStyles from './typicons.min.module.css';
import { graphql, StaticQuery } from 'gatsby';
import Img from "gatsby-image";
import {uploadDocumentAndCreateSubmission} from './actions'
import {stepChange} from './actions'

const HeroIl = () => (
    <StaticQuery
        query={graphql`query heroIl2Query {
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
                style={{ width: '320px', height: '200px' }}

                fluid={data.heroIl.edges[0].node.childImageSharp.fluid} />)
        }} />
)


class FinalConf extends React.Component {
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
        return (<div className={styles.columns}>
                <div className={`${styles.column} ${styles.col12}`}>
          
                <div className={styles.empty}>
                    <div className={styles.emptyIcon}>
                        <HeroIl />
                    </div>
                    <p className={`${styles.emptyTitle} ${styles.h3}`}>You're all set!</p>
                    <h6 style={{paddingBottom: '4px'}}> Sit back & relax, we will take it from here!</h6>

                    <p className={styles.emptySubtitle}> 📨 We will soon send an email confirming your transaction! <br/>
                        <small>🚨 Make sure to check your spam folder incase you don't see it in your inbox 🚨</small></p>
                    
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

export default connect(mapStateToProps)(FinalConf);