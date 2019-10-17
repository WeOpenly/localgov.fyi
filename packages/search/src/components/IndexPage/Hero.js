import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";

import Img from "gatsby-image";
import { graphql, StaticQuery } from 'gatsby';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ContentLoader from "react-content-loader";
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Defer } from 'react-progressive-loader'

import CommonNav from '../Nav/Common';

import SerSuggestions from './SerSuggestions';
import AreaSuggestions from './AreaSuggestions';
import MobileSuggestions from './MobileSuggestions';
import IndexServiceTemplates from './IndexServiceTemplates';
import {fetchAreaGuess, executeSearch} from './actions';
import { trackClick } from "../common/tracking";



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
    index_hero_title:{
        display: 'flex',
        justifyContent: 'space-around'
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
  index_hero_search_box_mob:{
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
    index_hero_mob_slogan: {
        width: '100%',
        flexDirection: 'column',
        marginTop: theme.spacing.unit *3,
        marginBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
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



const SuggestBoxLoader = props => (<div style={{ display: 'flex', justifyContent: 'flex-start', width: '560px', marginTop: '8px' }}>
  <ContentLoader 
    height={20}
    width={300}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    <rect x="6" y="1" rx="0" ry="0" width="85" height="27" /> 
    <rect x="105" y="-3" rx="0" ry="0" width="152" height="27" />
  </ContentLoader>
</div>);

const HeroIl = () => (
    <StaticQuery
        query={graphql `query heroIlQuery {
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
                style={{ width: '400px' }}
       
                fluid={data.heroIl.edges[0].node.childImageSharp.fluid} />)
    }}/>
)

class IndexHero extends Component {
    constructor(props) {
        super(props);
        this.onSearch = this.onSearch.bind(this)
    }


    onSearch(){
        this.props.executeSearch()
    }

    render() {
      const { classes, location, appReady, isMobile } = this.props;

      if (isMobile) {
            return (
              <Grid
                container
                className={classes.index_hero_mob_container}
              >
                <CommonNav isMobile={isMobile} location={location} />
                <Grid item xs="auto" sm={2} />
                <Grid
                  item
                  xs={12}
                  sm={8}
                  align="left"
                  className={classes.index_hero_mob_slogan}
                >
                  <Typography component="h1" variant="display1">
                    All your government services in a single place.
                  </Typography>
                </Grid>

                <Grid item xs="auto" sm={2} />

                <Grid
                  item
                  xs={12}
                  sm={6}
                  className={
                    isMobile
                      ? classes.index_hero_search_box_mob
                      : classes.index_hero_search_box
                  }
                >
                  {appReady ? <MobileSuggestions onSearch={this.onSearch} /> : <CircularProgress style={{alignSelf: 'center'}} />}
                </Grid>
                <Grid item xs={12}>
                  <Defer
                    render={() => (<IndexServiceTemplates isMobile={isMobile} compact={true} />)}
                    renderPlaceholder={() => <div></div>}
                    loadOnScreen
                  /> 
                </Grid>
              </Grid>
            );
          }

        return (
            <Grid container className={classes.index_hero_section_container}>
                <CommonNav location={location} />

                <Grid item xs="auto" sm={1} />
                <Grid item
                    sm={10}

              className={!isMobile
                        ? classes.index_hero_title
                        : classes.index_hero_title_mob}
                >
                <div className={classes.index_hero_container}>
                    <div className={classes.index_hero_slogan}>
                            <Typography
                                component="h1"
                                variant="display1">
                                All your government services
                        </Typography>
                            <Typography
                                component="h1"
                                variant="display1">
                                in a single place.
                        </Typography>
                    </div>
                    
                    <div className={classes.index_suggest_box}>
                            {appReady ? (<Fragment>       
                                        <AreaSuggestions />
                                        <SerSuggestions onSearch={this.onSearch} />
                            </Fragment>) : <SuggestBoxLoader />}
                    </div>
                 
                </div>
                   
                    <HeroIl />
                </Grid>
                 <Grid item xs="auto" sm={1}   />
                <Grid item xs="auto" sm={1} />
                <Grid item xs={10} style={{ marginLeft: '16px', marginRight: '16px', marginTop: '32px'}}>
                    <Divider center />
                </Grid>
                <Grid item xs="auto" sm={1} />
                <Grid item xs={12}>
               
                    <div className={classes.index_templates_box}>
                        <IndexServiceTemplates compact={true} />
                    </div>
                    </Grid>
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
