import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import Spinner from 'react-spinkit';
import { isMobileOnly } from 'react-device-detect';
import { StaticQuery, graphql, Link } from "gatsby";

import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ContentLoader from "react-content-loader";

import CommonNav from '../Nav/Common';

import SerSuggestions from './SerSuggestions';
import AreaSuggestions from './AreaSuggestions';
import MobileSuggestions from './MobileSuggestions';
import RelatedServiceTemplates from '../RelatedServiceTemplates';
import {fetchAreaGuess, executeSearch} from './actions';
import { trackClick } from "../common/tracking";
import { teal } from '@material-ui/core/colors';



const styles = theme => ({
    index_hero_header: {
        margin: theme.spacing.unit * 5,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    index_templates_box:{
        display:  'flex',
        flex : '1',
    },
    index_hero_container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '480px',
        marginBottom: theme.spacing.unit * 5,
        flexWrap: 'wrap',
    },
    index_hero_search_box:{
        display: 'flex',
        alignItems: 'flex-start'
    },
    index_hero_mob_slogan: {
        width: '100%',
        flexDirection: 'column',
        marginTop: theme.spacing.unit *3,
        marginBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit*2,
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    index_hero_section_container:{

    },
    index_hero_slogan:{
        marginBottom: theme.spacing.unit,
    },
    index_suggest_box:{
        display: 'flex',
        flexWrap: 'wrap'
    }
});

const SuggestBoxLoader = props => (<div style={{ display: 'flex', justifyContent: 'center' }}><Spinner name="ball-beat" color="white" /></div>);

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
            isMobileOnly: false, 
        };
        this.onSearch = this.onSearch.bind(this)
    }

    componentDidMount() {
        this.setState({ isMobileOnly: isMobileOnly });
        // const script = document.createElement("script");

        // script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBr4RixcEvuxgGr9EwNeiHCqUITczxvvuc&libraries=places&callback=initIndex";
        // script.async = true;
        // script.defer = true;
        // document.head.appendChild(script);
        // this.props.fetchAreaGuess();
    }

    onSearch(){
        this.props.executeSearch()
    }

    render() {
        const { classes, location } = this.props;
       

        if (this.state.isMobileOnly) {
            return (
              <Grid
                container
                className={classes.index_hero_mob_container}
              >
                <CommonNav location={location} />
                <Grid item xs="auto" sm={2} />
                <Grid
                  item
                  xs={12}
                  sm={8}
                  align="left"
                  className={classes.index_hero_mob_slogan}
                >
                  <Typography component="span" variant="title">
                    All your government services in a single place.
                  </Typography>
                </Grid>

                <Grid item xs="auto" sm={2} />

                <Grid
                  item
                  xs={12}
                  sm={6}
                  className={
                    !this.state.isMobile
                      ? classes.index_hero_search_box
                      : classes.index_hero_search_box_mob
                  }
                >
                  <MobileSuggestions onSearch={this.onSearch} />
                </Grid>
                <Grid item xs={12}>
                  <RelatedServiceTemplates compact={true} />
                </Grid>
              </Grid>
            );
          }

        return (
            <Grid container className={classes.index_hero_section_container}>
                    <CommonNav location={location} />

                <Grid item xs="auto" sm={1} md={2} />
                <Grid item
                    sm={10}
                    md={8}
                    className={!this.state.isMobile
                        ? classes.index_hero_title
                        : classes.index_hero_title_mob}
                >
                <div className={classes.index_hero_container}>
                    <div className={classes.index_hero_slogan}>
                            <Typography
                                component="span"
                                variant="display1">
                                All your government services
                        </Typography>
                            <Typography
                                component="span"
                                variant="display1">
                                in a single place.
                        </Typography>
                    </div>
                    
                    <div className={classes.index_suggest_box}>
                        <AreaSuggestions />
                        <SerSuggestions onSearch={this.onSearch} />
                    </div>
                   
                </div>
                    <div className={classes.index_templates_box}>
                        <RelatedServiceTemplates compact={true} />
                    </div>
                </Grid>
                <Grid item xs="auto" sm={1} md={2}  />
            </Grid>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        trackClick: (click_type, resultType, id, title, listIndex) => {
            dispatch(trackClick(click_type, resultType, id, title, listIndex));
        },
        fetchAreaGuess: () => {
            dispatch(fetchAreaGuess())
        },
        executeSearch: ()=>{
            dispatch(executeSearch())
        }
    }
}

const mapStateToProps = function (state, ownProps) {
    return {
        ...state.indexPage,
        ...ownProps
    };
};

const ConnIndexHero = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(IndexHero));

export default ConnIndexHero;
