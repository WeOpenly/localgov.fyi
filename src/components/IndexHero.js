import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import Spinner from 'react-spinkit';
import {isMobileOnly} from 'react-device-detect';
import {StaticQuery, graphql, Link} from "gatsby";

import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import TrendingUp from '@material-ui/icons/TrendingUp';

import {fade} from "@material-ui/core/styles/colorManipulator";
import Search from './Search/Search';
import HeaderAccountMenu from '../components/HeaderAccountMenu';

import {getLocation} from '../components/Search/actions';
import {trackClick} from "../components/common/tracking";

const styles = theme => ({
    index_hero_landingSearch: {
        color: "#fff",
        backgroundImage: `linear-gradient(to left bottom, #6f47ff, #5d38f2, #4829e4, #3017d7, #0000ca)`
    },
    index_landingSearchMobile: {
        color: "#fff",
        backgroundImage: `linear-gradient(to left bottom, #6f47ff, #5d38f2, #4829e4, #3017d7, #0000ca)`
    },
    index_hero_header: {
        margin: theme.spacing.unit * 5,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    index_hero_title: {
        color: '#fff'
    },
    index_hero_search_desc: {
        color: '#fff',
        paddingBottom: theme.spacing.unit * 4,
        paddingTop: theme.spacing.unit * 4,
        textAlign: 'center'
    },
    index_hero_search_desc_mob: {
        color: '#fff',
        paddingTop: theme.spacing.unit,
        textAlign: 'center'
    },
    index_hero_desc_container: {
        display: 'flex',
        margin: theme.spacing.unit,
        flexDirection: 'column'
    },
    index_hero_search_box: {
        minHeight: 128,
        paddingBottom: theme.spacing.unit * 4,
        paddingTop: theme.spacing.unit * 2
    },
    index_hero_search_box_mob: {
        paddingBottom: theme.spacing.unit
    },
    index_her_ser_templates_header:{
          paddingBottom: theme.spacing.unit ,
        paddingTop: theme.spacing.unit * 2,

        display: 'flex',
        justifyContent: 'center',
    },
    index_her_ser_templates_header_icon:{
          color: fade('#fff', 0.75),
        marginRight: 8,
    },
index_hero_ser_templates:{
    paddingBottom: theme.spacing.unit * 3
},
index_hero_ser_spinner:{
    display: 'flex',
    justifyContent: 'center',
}
});

const SuggestBoxLoader = props => (<div style={{display:'flex', justifyContent: 'center'}}><Spinner name="ball-beat" color="white"/></div>);

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

const SerTemplateCards = () => {
    const sers = [{
        name: 'Pay Property taxes',
        link: 'pay-property-taxes/'
    },
    {
        name: 'Pay Parking Citation',
        link: 'pay-parking-citation/'
    },
    {
        name: 'Renew Business License',
        link: 'renew-business-license/'
    },
    {
        name: 'Pay Utility Bill',
        link: 'pay-utility-bill/'
    },
]
    
    return (
        <div
            style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap'
        }}>
            {sers.map((item, idx) => {
                return (
                    <Button
                        variant="text"
                        size="large"
                        style={{
                        color: "#fff",
                        width: '100',
                        margin: '8',
                        textAlign: 'center',
                        textTransform: 'capitalize'
                    }}
                        to={`services/${item.link}`} component={Link} >
                        {item.name}
                    </Button>
                )
            })}
        </div>
    )
}

// const serTemp = (
//     <StaticQuery
//         query={graphql ` query allSerGlossaryItems{ allFile(filter : { sourceInstanceName: { eq: "service_glossary" } }, limit: 6 ) { edges { node { childServiceGlossaryJson {service_name} name } } } }`}
//         render={data => {
//         return <SerTemplateCards data={data}/>;
//     }}/>
// )

class IndexHero extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMobileOnly: false
        };

    }

    componentDidMount() {
        this.setState({isMobileOnly: isMobileOnly});

        if (this.props.location.pathname === '/') {
            this
                .props
                .getLocation();
        }
    }

    render() {
        const {data, classes, search} = this.props;
        console.log(data, "data");

        return (
            <Fragment>
                <Grid
                    container
                    spacing={8}
                    className={!this.state.isMobileOnly
                    ? classes.index_hero_landingSearch
                    : classes.index_landingSearchMobile}>

                    <Grid item xs={12} className={classes.index_hero_header}>
                        <Typography variant="display1" className={classes.index_hero_title}>
                            Localgov.fyi
                        </Typography>
                        <HeaderAccountMenu location={this.props.location}/>
                    </Grid>

                    <Grid item xs={1} sm={1} md={2}/>
                    <Grid item xs={10} sm={10} md={8} className={classes.index_hero_desc_container}>
                        <Typography
                            variant="display2"
                            component="span"
                            className={!this.state.isMobileOnly
                            ? classes.index_hero_search_desc
                            : classes.index_hero_search_desc_mob}>
                            All your government services in a single place
                        </Typography>
                        <div
                            className={!this.state.isMobileOnly
                            ? classes.index_hero_search_box
                            : classes.index_hero_search_box_mob}>
                            {search.locationLoading
                                ? (<SuggestBoxLoader/>)
                                : <Search/>}
                        </div>
                        <div
                            className={!this.state.isMobileOnly
                            ? classes.index_hero_ser_templates
                            : classes.index_hero_ser_templates_mob}>
                            <div className={classes.index_her_ser_templates_header}>
                            <Button size="small" variant="disabled" style={{         color: fade('#fff', 0.75), letterSpacing: '4px'}}  disableFocusRipple disableRipple disableTouchRipple
                            > <TrendingUp
                                className={classes.index_her_ser_templates_header_icon}
                                fontSize="small"/>
                            Trending </Button>
                                </div>
                            <SerTemplateCards />
                        </div>
                    </Grid>
                    <Grid item xs={1} sm={1} md={2}/>

                </Grid>
            </Fragment>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        trackClick: (click_type, resultType, id, title, listIndex) => {
            dispatch(trackClick(click_type, resultType, id, title, listIndex));
        },
        getLocation: () => {
            dispatch(getLocation)
        }
    }
}

const mapStateToProps = function (state, ownProps) {
    return {
        ...state,
        ...ownProps
    };
};

const ConnIndexHero = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(IndexHero));

export default ConnIndexHero;
