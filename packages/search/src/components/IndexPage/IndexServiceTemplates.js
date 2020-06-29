import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";

import ServiceTemplateCard from '../ServiceTemplateCard';

import { trackClick } from "../common/tracking";

import styles from "../spectre.min.module.css";
import iconStyles from "../typicons.min.module.css";



const xah_randomize_array = ((arr) => {
    /* [ Fisher-Yates shuffle. can be used on array-like object
  Modify array inplace.
  http://xahlee.info/js/javascript_random_array.html
  version 2017-09-18
  ] */
    let i = arr.length - 1;
    let j;
    while (i >= 1) {
        // random element up to i, include i
        j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
        i--;
    }
    return arr;
});

const SerTemplateCards = (props) => {
    let sers = [

        {
            name: 'Pay Property Taxes ',
            link: 'pay-property-taxes/'
        }, {
            name: 'Pay Parking Citation',
            link: 'pay-parking-citation/'
        }, {
            name: "Register to Vote",
            link: "register-to-vote"
        }, {
            name: 'Pay Utility Bill',
            link: 'pay-utility-bill/'
        }, {
            name: 'Pay Traffic Ticket',
            link: 'pay-for-traffic-citation/'
        }, {
            name: 'Renew Business License',
            link: 'renew-business-license/'
        },
    ]

    if (props.currentNameSlug)
        sers = sers.filter((ser) => ser.link.indexOf(props.currentNameSlug) === -1)

    // if (props.compact)
    //     sers = sers.slice(0, 4)

    return (
      <Fragment>
        {sers.map((item, idx) => {
          return (
            <ServiceTemplateCard
              isMobile={props.isMobile}
              compact={props.compact}
              key={item.name}
              name={item.name}
              slug={item.link}
            />
          );
        })}
      </Fragment>
    );
}

// const serTemp = (     <StaticQuery         query={graphql ` query
// allSerGlossaryItems{ allFile(filter : { sourceInstanceName: { eq:
// "service_glossary" } }, limit: 6 ) { edges { node { childServiceGlossaryJson
// {service_name} name } } } }`}         render={data => {         return
// <SerTemplateCards data={data}/>;     }}/> )

class IndexServiceTemplates extends Component {
    constructor(props) {
        super(props);

    }


    render() {
        const { classes, currentNameSlug, showAdd, compact, isMobile } = this.props;
        
        return (
          <div style={{ margin: "4rem 0" }} className={`${styles.columns}`}>
            <div
              style={{ margin: "2rem 0 2rem 0" }}
              className={`${styles.column} ${styles.col12} ${styles.textCenter}`}
            >
              <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
                <SerTemplateCards
                  isMobile={isMobile}
                  compact={compact}
                  currentNameSlug={currentNameSlug}
                />
              </div>
            </div>
          </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        trackClick: (click_type, resultType, id, title, listIndex) => {
            dispatch(trackClick(click_type, resultType, id, title, listIndex));
        }
    }
}

const mapStateToProps = function (state, ownProps) {
    return {
        ...state,
        ...ownProps
    };
};

const ConnIndexServiceTemplates = connect(mapStateToProps, mapDispatchToProps)(IndexServiceTemplates);

export default ConnIndexServiceTemplates;
