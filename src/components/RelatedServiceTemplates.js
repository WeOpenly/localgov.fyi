import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import Spinner from 'react-spinkit';
import {isMobileOnly} from 'react-device-detect';
import {StaticQuery, graphql, Link} from "gatsby";
import {navigate} from '@reach/router';

import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ConnLocationCard from './UserRequests/LocationCard';
import ServiceTemplateCard from './ServiceTemplateCard';
import {fade} from "@material-ui/core/styles/colorManipulator";

import {trackClick} from "../components/common/tracking";

const styles = theme => ({
 related_ser_list:{
     display: 'flex',
     justifyContent: 'space-between',
 },
 related_ser_list_mob: {
     display: 'flex',
     flexDirection: 'column',
     alignItems: 'center'
 }
});

const SuggestBoxLoader = props => (
    <div style={{
        display: 'flex',
        justifyContent: 'center'
    }}><Spinner name="ball-beat" color="white"/></div>
);

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
            name: 'Pay Property taxes',
            link: 'pay-property-taxes/'
        }, {
            name: 'Pay Parking Citation',
            link: 'pay-parking-citation/'
        }, {
            name: 'Renew Business License',
            link: 'renew-business-license/'
        }, {
            name: 'Pay Utility Bill',
            link: 'pay-utility-bill/'
        }, 
          {
            name: 'Pay Water Bill',
            link: 'pay-water-bill/'
        },
    ]
    
    if(props.currentNameSlug)
        sers = sers.filter((ser) => ser.link.indexOf(props.currentNameSlug) === -1)

    return (
       <Fragment>
            {sers.map((item, idx) => {
                if (idx === sers.length-1 && props.showAdd)
                    return (<ConnLocationCard />)
                return (
                    <ServiceTemplateCard key={item.name} name={item.name} slug={item.link}/>
                )
            })}
        </Fragment>
    )
}

// const serTemp = (     <StaticQuery         query={graphql ` query
// allSerGlossaryItems{ allFile(filter : { sourceInstanceName: { eq:
// "service_glossary" } }, limit: 6 ) { edges { node { childServiceGlossaryJson
// {service_name} name } } } }`}         render={data => {         return
// <SerTemplateCards data={data}/>;     }}/> )

class RelatedServiceTemplates extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMobileOnly: false
        };

    }

    componentDidMount() {
        this.setState({isMobileOnly: isMobileOnly});
    }

    render() {
        const {classes, currentNameSlug, showAdd} = this.props;

        return (
            <Fragment>
                <Grid
                    container
                    spacing={8}
                    className={!this.state.isMobileOnly
                    ? classes.related_ser_list
                    : classes.related_ser_list_mob}>
                    
                   <SerTemplateCards currentNameSlug={currentNameSlug} showAdd={showAdd} />
                  </Grid>
            </Fragment>
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

const ConnRelatedServiceTemplates = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(RelatedServiceTemplates));

export default ConnRelatedServiceTemplates;
