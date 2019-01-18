import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Headroom from 'react-headroom';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import Truncate from 'react-truncate';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {SpringGrid} from 'react-stonecutter';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import queryString from 'query-string'
import Fuse from 'fuse.js';
import {navigate} from '@reach/router';
import Link from 'gatsby-link';
import Helmet from "react-helmet";
import {isMobileOnly, isTablet, isMobile} from 'react-device-detect';
import Toolbar from '@material-ui/core/Toolbar';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Search from '@material-ui/icons/Search';
import Footer from '../components/Footer';
import withRoot from '../withRoot';
import StateSuggest from '../components/StateSuggest';
import HeaderAccountMenu from '../components/HeaderAccountMenu';
import LoginRegisterDialog from '../components/Account/LoginRegisterDialog';
import {trackView, trackClick, trackInput} from "../components/common/tracking";

const styles = theme => ({
    "@global": {
        html: {
            WebkitFontSmoothing: "antialiased", // Antialiasing.
            MozOsxFontSmoothing: "grayscale", // Antialiasing.
            height: "100%",
            overflow: 'hidden'
        },
        body: {
            margin: 0,
            padding: 0,
            width: '100%',
            height: '100%',
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
    filterContainer:{
        width: '100%',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        boxShadow: `0 5px 10px 0 #f1f1f1`,
        borderRadius: '5px'
    },
    locationPaper:{
        padding: theme.spacing.unit*5,
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        margin: theme.spacing.unit,
        boxShadow: `0 0 1px 0 #d4d4d4`,
    },
    root: {
        padding: '4px 8px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        marginRight: 24,
        boxShadow: `0 0 1px 0 #d4d4d4`,
    },
    input: {
        marginLeft: 16,
        flex: 1
    },
    iconButton: {
        padding: 12
    },
    divider: {
        width: 1,
        height: 32,
        margin: 4
    },
    ser_gloss_titleWrapper: {
        textAlign: 'center',
        padding: theme.spacing.unit * 4,
        margin: theme.spacing.unit * 2
    },
    ser_gloss_subtitle: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit * 4
    },
    ser_gloss_section: {
        marginBottom: theme.spacing.unit
    },
    ser_gloss_link: {
        padding: theme.spacing.unit
    },
    ser_gloss_locGrid: {
        display: 'flex',
        alignItems: 'left',
        flexWrap: 'wrap',
        justifyContent: 'left',
        alignContent: 'left',
        paddingTop: theme.spacing.unit *4,
    },
    ser_gloss_locGrid_mob: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'left',
        paddingTop: theme.spacing.unit
    },
    ser_gloss_gridItemLocation: {
        padding: theme.spacing.unit*2,
        display: 'flex',
        alignItems: 'center',
        margin: theme.spacing.unit,
        boxShadow: `0 1px 2px 0 ${theme.palette.primary['100']}`,
        justifyContent: 'left',
        width: 256,
        height: 88
    },
    ser_gloss_heading: {
        fontWeight: 600
    },
    ser_gloss_listItem: {
        display: 'flex',
        marginTop: theme.spacing.unit * 2,
        marginLeft: theme.spacing.unit * 2
    },
    ser_gloss_nav_items: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 4,
    },
    ser_gloss_nav_items_mob: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        paddingTop: theme.spacing.unit * 3,
        marginLeft: theme.spacing.unit * 3
    },
    ser_gloss_servicename_mob: {
        color: theme.palette.primary['50'],
        height: 280,
        background: `linear-gradient(45deg, ${theme.palette.primary["700"]} 20%, ${theme.palette.primary["A900"]} 80%)`
    },
    ser_gloss_servicename: {
        color: '#fff',
        paddingBottom : theme.spacing.unit * 4,
        background: `linear-gradient(45deg, ${theme.palette.primary["700"]} 30%, ${theme.palette.primary["A900"]} 70%)`
    },
    ser_gloss_servicename_text: {
        height: 240,
        paddingTop : theme.spacing.unit * 4,
    },
    ser_gloss_servicename_text_mob: {
        height: 80,
        width: 300,
        paddingTop : theme.spacing.unit * 1,
        marginLeft: theme.spacing.unit *3
    },
    gloss_searchContainer: {
        marginTop: '-24px',
    },
    gloss_searchContainer_mob:{
        marginTop: '0px'
    },
    gloss_countContainer: {
        marginTop: theme.spacing.unit *4,
    },
    locGridContainer_mob: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'left',
        margin: theme.spacing.unit
    },
    locGridContainer: {
        display: 'flex',
        alignItems: 'left',
        justifyContent: 'left',
        marginTop: theme.spacing.unit * 4
    },
    gloss_footer:{
       marginTop: theme.spacing.unit * 4
    }
});

const RawHTML = ({
    children,
    className = ""
}) => (<div
    className={className}
    dangerouslySetInnerHTML={{
    __html: children.replace(/\n/g, " ")
}}/>);

class ServiceGlossary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openDescDialog: false,
            orgs: this.props.pageContext.data.orgs,
            stateName: null,
            searchText: null,
            isMobile: false,
        }

        this.handleOrgClick = this
            .handleOrgClick
            .bind(this);
        this.toggleDescDialog = this
            .toggleDescDialog
            .bind(this);
        this.onSearchChange = this
            .onSearchChange
            .bind(this);
        this.setStateFilter = this
            .setStateFilter
            .bind(this);
        this.clearStateName = this.clearStateName.bind(this);
    }



    static getDerivedStateFromProps(nextProps, prevState) {
        const values = queryString.parse(nextProps.location.search);

        if (!values) {
            return null
        }
 
        if ((values.searchText !== prevState.searchText) && (values.stateName !== prevState.stateName)){
   
            return {stateName: values.stateName, searchText: values.searchText, isMobile: isMobileOnly}
        }
        
        
        if (values.searchText !== prevState.searchText) {
   
            return {searchText: values.searchText, stateName: prevState.stateName, isMobile: isMobileOnly}
        }

        if (values.stateName !== prevState.stateName) {
 
            return {stateName: values.stateName, searchText: prevState.searchText, isMobile: isMobileOnly}
        }

        return null;
    }

    clearStateName(){
        const {location} = this.props;
        const searchValues = queryString.parse(location.search);

        let uri = `?stateName=`;
        if (searchValues.searchText){
            uri =`?searchText=${searchValues.searchText}`;
        }
        const encodedStateUri = encodeURI(uri);
        navigate(encodedStateUri);
    }

    toggleDescDialog() {
        this.setState({
            openDescDialog: !this.state.openDescDialog
        })
    }

    setStateFilter(stateSuggestion) {
        const {label} = stateSuggestion;
        const {location} = this.props;
        const searchValues = queryString.parse(location.search);

        this.props.trackFeedback(label);

        let uri = `?stateName=${label}`;

        if (searchValues.searchText){
            uri =`?searchText=${searchValues.searchText}&stateName=${label}`;
        }
        const encodedStateUri = encodeURI(uri);
        navigate(encodedStateUri);
    }

    onSearchChange(ev) {
        ev.preventDefault();
        const {location} = this.props;
        const searchValues = queryString.parse(location.search);

        const value = ev.target.value;
        if (value && value.length > 1) {
            this.props.trackFeedback(value);
        }

        let uri = `?searchText=${value}`;

        if (searchValues.stateName){
            uri =`?searchText=${value}&stateName=${searchValues.stateName}`;
        }

        const encodedSearchUri = encodeURI(uri);
        navigate(encodedSearchUri);
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
        const {service_name, service_name_slug, service_glossary_description} = this.props.pageContext.data;
        console.log('ismob', this.state.isMobile);

        let allOrgs = this.state.orgs;

        const service_glossary_description_text = (
            <RawHTML>
                {service_glossary_description}
            </RawHTML>
        );

        const searchOptions = {
            shouldSort: true,
            tokenize: true,
            threshold: 0.1,
            location: 0,
            distance: 5,
            maxPatternLength: 32,
            minMatchCharLength: 1,
            keys: ['organization.org_name']
        }

        const stateOptions = {
            shouldSort: true,
            tokenize: false,
            threshold: 0,
            location: 0,
            distance: 5,
            maxPatternLength: 32,
            minMatchCharLength: 1,
            keys: ['area.hierarchy.area_name']
        }

        if (this.state.searchText) {
            const searchfuse = new Fuse(allOrgs, searchOptions)
            allOrgs = searchfuse.search(this.state.searchText);
        }
 
        if (this.state.stateName) {
            const stateFuse = new Fuse(allOrgs, stateOptions)
            allOrgs = stateFuse.search(this.state.stateName);
        }

        const allStatesSet = new Set();
        this.state.orgs.map((org, idx) => {
            allStatesSet.add(org.area.hierarchy[org.area.hierarchy.length-1].area_name) 
        })

        allOrgs.sort((a, b) => a.organization.org_name.localeCompare(b.organization.org_name));

        let allStates = [];
        allStatesSet.forEach((org) => {
            allStates.push({'label': org})
        })

        const locs = allOrgs.map((org, idx) => {
            const organization = org.organization;
            let strippedName = organization.org_name.replace("-", " ")
            strippedName = strippedName.replace("Independent", " ")
            const state = org.area.hierarchy[org.area.hierarchy.length-1].area_name;

            return (
                <div key={`${org.id}-${idx}`} >
                         <Paper  className={classes.ser_gloss_gridItemLocation}  elevation={1}>
                               <a
                                style={{
                               
                                cursor: 'pointer'
                            }}
                        onClick={() => this.handleOrgClick(organization.id, organization.org_name, idx, `/service/${org.id}/`)}
                        className={classes.ser_gloss_link}>
                        <Typography variant="subheading" className={classes.ser_gloss_heading}>
                            {strippedName}
                        </Typography>
                         <Typography variant="caption" className={classes.ser_gloss_state_name}>
                            {state}
                        </Typography>
                    </a>
                        </Paper>
                  
                </div>
            )
        })

        const searchInput = (<InputBase
            onChange={this.onSearchChange}
            className={classes.input}
            placeholder="Search Locations"/>)

        const descDialog = (
            <Dialog
                onClose={this.toggleDescDialog}
                aria-labelledby="customized-dialog-title"
                open={this.state.openDescDialog}>
                <DialogTitle id="customized-dialog-title" onClose={this.toggleDescDialog}>
                    {service_name}
                </DialogTitle>
                <DialogContent>
                    <Typography gutterBottom>
                        {service_glossary_description_text}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.toggleDescDialog} color="outlined">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        )

        return (
            <Fragment>
                <Helmet>
                    <title>{`Localgov.fyi | ${service_name}`}</title>

                    <link
                        rel="canonical"
                        href={`https://localgov.fyi/services/${service_name_slug}/`}/>
                    <script key='gatsby-plugin-stripe' src="https://js.stripe.com/v3/" async/>
                    <meta property="og:title" content={`${service_name} | Localgov.fyi`}/>
                    <meta
                        property="og:url"
                        content={`https://localgov.fyi/service/${service_name_slug}/`}/>

                    <meta
                        name="description"
                        content={`Forms, Price, Timings and Contact Details for ${service_name} | Localgov.fyi`}/>
                    <meta name="keywords" content={`${service_name},  ${service_name} online, Local Government Service Onine, my ${service_name}, ${service_name} near me, How do you ${service_name}, can you ${service_name} onine, ${service_glossary_description}`}/>
                    <meta
                        property="og:description"
                        content={`Forms, Price, Timings and Local Government Service Contact Details for ${service_name} | Localgov.fyi`}/>

                </Helmet>
                {descDialog}
                <Grid
                    container
                    className={this.state.isMobile
                    ? classes.ser_gloss_servicename_mob
                    : classes.ser_gloss_servicename}>
                    <Grid item sm={1}/>
                    <Grid
                        item
                        sm={10}
                        align="center"
                        className={this.state.isMobile
                        ? classes.ser_gloss_nav_items_mob
                        : classes.ser_gloss_nav_items}>

                        <Link to="/" className={classes.link}>
                            <Typography
                                style={{
                                color: "#fff"
                            }}
                                variant="display2">
                                Localgov.fyi
                            </Typography>
                        </Link>

                        <HeaderAccountMenu location={this.props.location}/>
                    </Grid>
                    <Grid item sm={1}/>
                    <Grid item sm={1}/>
                    <Grid
                        item
                        sm={5}
                        className={this.state.isMobile
                        ? classes.ser_gloss_servicename_text_mob
                        : classes.ser_gloss_servicename_text}
                        align={
                         'left'
                        }>
                        <Typography
                            style={{
                            color: "#fff",
                            fontSize: '2rem'
                        }}
                            variant="display1">
                            {service_name}
                        </Typography>
                   
                    </Grid>
                    <Grid item sm={5}>
                             {service_glossary_description
                            ? (
                                <Typography
                                    style={this.state.isMobile
                                    ? {
                                        color: "#fff",
                                        marginTop: '24px',
                                        paddingLeft: '16px',
                                        paddingRight: '16px'
                                    }
                                    : {
                                        color: "#fff",
                                        marginTop: '32px',
                                        paddingLeft: '0px',
                                        paddingRight: '0px'
                                    }}
                                    variant="body2">
                                    <Truncate
                                        lines={this.state.isMobile
                                        ? 2
                                        : 6}
                                        ellipsis={(
                                        <span>
                                            ... <a
                                                style={{
                                            fontSize: '12px',
                                            color: "#fff"
                                        }}
                                                href='#'
                                                onClick={this.toggleDescDialog}>
                                                {'(read more)'}
                                            </a>
                                        </span>
                                    )}
                                        onTruncate={() => {}}>
                                        {service_glossary_description_text}
                                    </Truncate>
                                </Typography>
                            )
                            : ''}
                    </Grid>
                    <Grid item sm={2}/>
                </Grid>
                <Grid container className={this.state.isMobile ? classes.gloss_searchContainer_mob : classes.gloss_searchContainer}>
                    <Grid item sm={1}/>
                    <Grid item sm={10}>
                        <Paper className={classes.filterContainer}  elevation={3}>
                               <Grid container>
                            <Grid item sm={12} md={5} align="left">
                                <Paper className={classes.root} elevation={1}>
                                    {searchInput}
                                    <IconButton className={classes.iconButton} aria-label="Search">
                                        <SearchIcon/>
                                    </IconButton>
                                </Paper>
                            </Grid>
                    
                        <Grid item sm={12} md={5}  align="left">
                            <div style={{position: 'relative'}}>
                            <StateSuggest clearStateName={this.clearStateName} selected={this.state.stateName} allStates={allStates} onSelectSuggestion={this.setStateFilter} />    
                            </div>
                        </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
        
                    <Grid item sm={1}/>
                </Grid>

                <LoginRegisterDialog location={this.props.location}/>
                <Grid container className={classes.gloss_countContainer}>
                    <Grid item sm={1}/>
                    <Grid item sm={8} align={this.state.isMobile ? "center" :"left"}>
                        <Typography
                            style={{
                            color: "#0a0a0a",
                            paddingLeft: '8px'
                        }}
                            variant="caption">
                            {this.state.searchText
                                ? (`Showing ${allOrgs.length} results matching ${this.state.searchText}`)
                                : (`Currently offered in ${allOrgs.length} locations`)}  {this.state.stateName ? (` in the state of ${this.state.stateName}`) : ''}</Typography>
                    </Grid>
                    <Grid item sm="auto"/>
                </Grid>
                <Grid
                    container
                    className={this.state.isMobile
                    ? classes.locGridContainer_mob
                    : classes.locGridContainer}>
                    <Grid item sm={1} />

                    <Grid
                        item
                        sm={10}
                        align="left"
                        className={this.state.isMobile
                        ? classes.ser_gloss_locGrid_mob
                        : classes.ser_gloss_locGrid}>
                            
                            {locs}
                        
                    </Grid>
               
                </Grid>
                <div className={classes.gloss_footer}>
                    <Footer page={this.props.location.pathname} />
                </div>
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
        },
        trackFeedback: (input) => {
            dispatch(trackInput('service_glossary_search', input));
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