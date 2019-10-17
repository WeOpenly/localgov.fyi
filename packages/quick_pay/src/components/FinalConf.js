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
import { trackQPevent } from '../common/tracking';


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
                title={`papergov`}
                alt={`illustration of papergov`}
                style={{ width: '300px', height: '180px' }}

                fluid={data.heroIl.edges[0].node.childImageSharp.fluid} />)
        }} />
)


class FinalConf extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
      const { anonUserID } = this.props;
      this.props.trackEvent('final_confirmation_page', anonUserID, {})
    }


    render() {
        return (<div className={styles.columns}>
                <div className={`${styles.column} ${styles.col12}`}>
          
                <div className={styles.empty} style={{background: '#fff'}}>
                    <div className={styles.emptyIcon}>
                        <HeroIl />
                    </div>
                    <p className={`${styles.emptyTitle} ${styles.h3}`}>You're all set!</p>
                    <h6 style={{paddingBottom: '4px'}}> Sit back & relax, we will take it from here!</h6>

                    <p className={styles.emptySubtitle}> 📨 We just sent a confirmation email for your payment 

                    
                      </p>
                    <br />
                    <div className={`${styles.toast} ${styles.toastPrimary}`} style={{ background: '#ece6ff', color: '#66758c',borderRadius: '5px', padding: '6px 8px'  }}>
                        🚨 Make sure to check your spam folder incase you don't see it in your inbox 🚨
                    </div>
                </div>

                </div>
            </div>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(FinalConf);