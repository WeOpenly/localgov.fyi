import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Headroom from 'react-headroom';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {SpringGrid} from 'react-stonecutter';

import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import queryString from 'query-string'
import Fuse from 'fuse.js';
import { navigate } from '@reach/router';
import Link from 'gatsby-link';
import Helmet from "react-helmet";
import { isMobileOnly, isTablet, isMobile } from 'react-device-detect';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Search from '@material-ui/icons/Search';



import withRoot from '../withRoot';
import HeaderAccountMenu from '../components/HeaderAccountMenu';
import LoginRegisterDialog from '../components/Account/LoginRegisterDialog';
import { trackView, trackClick } from "../components/common/tracking";

const styles = theme => ({
    "@global": {
        html: {
            background: theme.palette.common.white,
            WebkitFontSmoothing: "antialiased", // Antialiasing.
            MozOsxFontSmoothing: "grayscale", // Antialiasing.
            height: "100%"
        },
        body: {
            margin: 0,
            padding: 0,
            overflowWrap: "break-word",
            overflowY: "scroll",
            overflowX: "hidden"
        },
        "body>div": {
            display: "block",
            height: "100%"
        },
        "body>div>div": {
            display: "block",
            height: "100%"
        },
    },
    root: {
        padding: '4px 8px',
        display: 'flex',
        alignItems: 'center',
        width: 450,
    },
    input: {
        marginLeft: 12,
        flex: 1,
    },
    iconButton: {
        padding: 12,
    },
    divider: {
        width: 1,
        height: 32,
        margin: 4,
    },
    ser_gloss_titleWrapper: {
        textAlign: 'center',
        padding: theme.spacing.unit * 4,
        margin: theme.spacing.unit * 2
    },
ser_gloss_subtitle : {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit * 4
    },
ser_gloss_section : {
        marginBottom: theme.spacing.unit
    },
ser_gloss_link : {
        padding: theme.spacing.unit
    },
ser_gloss_locGrid : {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        paddingTop: theme.spacing.unit*4
    },
ser_gloass_locGrid_mob:{
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'flex-start',
    paddingTop: theme.spacing.unit
},
ser_gloss_gridItemLocation : {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 250,
        height: 56,
    },
ser_gloss_heading : {
        fontWeight: 600
    },
ser_gloss_listItem : {
        display: 'flex',
        marginTop: theme.spacing.unit * 2,
        marginLeft: theme.spacing.unit * 2
    },
ser_gloss_nav_items:{
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingTop: theme.spacing.unit* 8,
    marginLeft: '9%',
    transform : 'rotate(2deg)',
},
    ser_gloss_nav_items_mob:{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        paddingTop: theme.spacing.unit * 3,
        marginLeft: theme.spacing.unit * 3,
    },
ser_gloss_servicename_mob:{
    height: 300,
    position: 'absolute',
    width: '130%',
    color: theme.palette.primary['50'],
    background: `linear-gradient(45deg, ${theme.palette.primary["700"]} 20%, ${theme.palette.primary["A900"]} 80%)`,
    },
ser_gloss_servicename:{
    height: 350,
    position: 'absolute',
    top: '-5%',
    left: '-5%',
    width: '110%',
    color: theme.palette.primary['50'],
    transform: 'rotate(-2deg)',
    background: `linear-gradient(45deg, ${theme.palette.primary["700"]} 20%, ${theme.palette.primary["A900"]} 80%)`,
},
ser_gloss_servicename_text:{
    height: 100,
    marginLeft: '-1%',
    transform: 'rotate(2deg)',
},
    ser_gloss_servicename_text_mob:{
        height: 100,
        marginLeft: theme.spacing.unit*3,
    },
gloss_searchContainer: {
    position: 'absolute',
    top: '280px',
},
    gloss_countContainer:{
        position: 'absolute',
        top: '360px',
    },
    locGridContainer_mob:{
        position: 'absolute',
        top: '380px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'left',
        paddingTop: theme.spacing.unit
    },
locGridContainer: {
    position: 'absolute',
    top: '400px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: theme.spacing.unit * 4
}
});

class ServiceGlossary extends React.Component {
    constructor(props) {
        super(props);
        this.handleOrgClick = this
            .handleOrgClick
            .bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
    }
    
    onSearchChange(ev){
        ev.preventDefault();
        const value = ev.target.value;
  
        navigate(`?search=${value}`)
        // if(value === ''){
        //     console.log('here');
        //     navigate('')
        // }else{
        //     navigate(`?search=${value}`)
        // }
       
    }

    componentDidMount() {
        this.props.trackView();
    }

    handleOrgClick(id, name, index, url) {
        this.props.trackClick('service_glossary', 'list', id, name, index);
        navigate(url);
    }

  render() {
    const {classes} = this.props;
      const { orgs, service_name, service_name_slug, service_glossary_description} = this.props.pageContext.data;
    const {search} = this.props.location;
    let searchForLoc = null;
    let allOrgs = orgs;
    
    if(search){
        const values = queryString.parse(this.props.location.search);
        if (values && values.search) {
            searchForLoc = values.search;
        }
    }

    const options = {
        shouldSort: true,
        tokenize: true,
        threshold: 0.1,
        location: 0,
        distance: 5,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: ['organization.org_name']
    }

    if (searchForLoc){
        const fuse = new Fuse(orgs, options)
        allOrgs = fuse.search(searchForLoc);
    }
   

      const locs = allOrgs.map((org, idx) => {
            const organization = org.organization;
            let strippedName = organization.org_name.replace("-", " ")
            strippedName = strippedName.replace("Independent", " ")
       
            return (
                <div key={`${org.id}-${idx}`} className={classes.ser_gloss_gridItemLocation}>
                      <a
                          style={{
                              textDecoration: 'none',
                              cursor: 'pointer',
                            backgroundImage: 'linear-gradient(180deg, rgba(0,0,0,0),rgba(0,0,0,0) 81%, #222222 81.1%, rgb(69, 29, 255) 86%,rgba(0,0,0,0) 85.1%,rgba(0,0,0,0))'
                          }}
                        onClick={() => this.handleOrgClick(organization.id, organization.org_name, idx, `/service/${org.id}/`)}
                        className={classes.ser_gloss_link}>
                        <Typography variant="subheading" className={classes.ser_gloss_heading}>
                              {strippedName}
                          </Typography>
                      </a>
                  </div>
              )
          })

const searchInput =  (<InputBase
        onChange={this.onSearchChange}
        className={classes.input}
        placeholder="Search Locations"/>)
  
    return (
      <Fragment>
        <Helmet>
            <title>{`Localgov.fyi | ${service_name}`}</title>
   
            <link rel="canonical" href={`https://localgov.fyi/services/${service_name_slug}/`} />
            <script key='gatsby-plugin-stripe' src="https://js.stripe.com/v3/" async />
            <meta
                property="og:title"
                content={`${service_name} | Localgov.fyi`} />
            <meta property="og:url" content={`https://localgov.fyi/service/${service_name_slug}/`} />

            <meta
                name="description"
            content={`Forms, Price, Timings and Local Government Service Contact Details for ${service_name} | Localgov.fyi`} />
            <meta
                name="keywords"
            content={`${service_name}, localgov `} />
            <meta
                property="og:description"
            content={`Forms, Price, Timings and Local Government Service Contact Details for ${service_name} | Localgov.fyi`} />
        
        </Helmet>
            <Grid container className={isMobile ? classes.ser_gloss_servicename_mob : classes.ser_gloss_servicename}>
                <Grid item sm={1} sm="auto" />
                <Grid item sm={10} align="center" className={isMobile ? classes.ser_gloss_nav_items_mob: classes.ser_gloss_nav_items}>

                    <Link to="/" className={classes.link}>
                        <Typography style={{ color: "#fff" }} variant="display2">
                            Localgov.fyi
                    </Typography>
                    </Link>
                  
                    <HeaderAccountMenu location={this.props.location} />
                </Grid>
                <Grid item sm={1} sm="auto" />
                <Grid item sm={2} />
                <Grid item sm={8} className={isMobile ? classes.ser_gloss_servicename_text_mob : classes.ser_gloss_servicename_text} align={isMobile ? 'left': 'center'}>
                    <Typography style={{ color: "#fff", fontSize:'2rem' }} variant="display1"> {service_name} </Typography>
                    {service_glossary_description ? (<Typography style={{ color: "#fff", margin: '16px' }} variant="caption">{service_glossary_description} </Typography>) : ''}
                </Grid>
                <Grid item sm={2} />
            </Grid>
            <Grid container className={classes.gloss_searchContainer}>
                <Grid item sm={2} />
                <Grid item sm={8} align="center">
                <Paper className={classes.root} elevation={1}>
                        {searchInput}
                    <IconButton className={classes.iconButton} aria-label="Search">
                        <SearchIcon />
                    </IconButton>
                </Paper>
                </Grid>
                <Grid item sm={2} />
                </Grid>
 
            <LoginRegisterDialog location={this.props.location} />
            <Grid container className={classes.gloss_countContainer}>
                <Grid item sm={2} />
                <Grid item sm={8} align="center">
                    <Typography style={{ color: "#0a0a0a", margin: '16px' }} variant="caption"> {searchForLoc ? (`Showing ${allOrgs.length} matching results`) : (`Currently offered in ${allOrgs.length} locations`)}</Typography>
                </Grid>
                <Grid item sm={2} />
            </Grid>
            <Grid container className={isMobile ? classes.locGridContainer_mob: classes.locGridContainer}>
          <Grid item sm={2} />

                <Grid item sm={8} align="center" className={isMobile ? classes.ser_gloass_locGrid_mob : classes.ser_gloass_locGrid }>
                        <SpringGrid
                            component="div"
                            columns={isMobileOnly ? 1 : 3}
                            columnWidth={230}
                            gutterWidth={5}
                            gutterHeight={5}
                            itemHeight={60}
                            springConfig={{ stiffness: 60, damping: 10 }}
                        >
                            {locs}
                        </SpringGrid>
            </Grid>
            <Grid item sm={2} />
        </Grid>
      </Fragment>
    );
  }
}


ServiceGlossary.propTypes = {
  classes: PropTypes.object.isRequired
};


const mapDispatchToProps = (dispatch) => {
    return {
        trackView: (click_type, resultType, id, title, listIndex) => {
            dispatch(trackView('service_glossary', null, null, null));
        },
        trackClick: (click_type, resultType, id, title, listIndex) => {
            dispatch(trackClick(click_type, resultType, id, title, listIndex));
        }
    }
}

const mapStateToProps = function (state, ownProps) {
    return {
        ...ownProps
    };
};

const ConnServiceGlossary = connect(mapStateToProps, mapDispatchToProps)(withRoot(withStyles(styles)(ServiceGlossary)));

export default ConnServiceGlossary;