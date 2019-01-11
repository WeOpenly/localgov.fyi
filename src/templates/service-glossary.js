import React, {Fragment} from 'react';
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

import withRoot from '../withRoot';
import StateSuggest from '../components/StateSuggest';
import HeaderAccountMenu from '../components/HeaderAccountMenu';
import LoginRegisterDialog from '../components/Account/LoginRegisterDialog';
import {trackView, trackClick, trackInput} from "../components/common/tracking";

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
        }
    },
    filterContainer:{
        width: '100%',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        boxShadow: `0 5px 10px 0 #f1f1f1`,
        borderRadius: '5px'
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
        justifyContent: 'left',
        alignContent: 'left',
        paddingTop: theme.spacing.unit *4,
    },
    ser_gloass_locGrid_mob: {
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'left',
        paddingTop: theme.spacing.unit
    },
    ser_gloss_gridItemLocation: {
        display: 'flex',
        alignItems: 'left',
        justifyContent: 'left',
        width: 250,
        height: 56
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

        background: `linear-gradient(45deg, ${theme.palette.primary["700"]} 20%, ${theme.palette.primary["A900"]} 80%)`
    },
    ser_gloss_servicename: {
        color: '#fff',
        paddingBottom : theme.spacing.unit * 12,
        background: `linear-gradient(45deg, ${theme.palette.primary["700"]} 30%, ${theme.palette.primary["A900"]} 70%)`
    },
    ser_gloss_servicename_text: {
        height: 120,
        paddingTop : theme.spacing.unit * 4,
    },
    ser_gloss_servicename_text_mob: {
        height: 160,
        width: 300,
        marginLeft: theme.spacing.unit *3
    },
    gloss_searchContainer: {
        position: 'absolute',
        marginTop: '-24px',
    },
    gloss_countContainer: {
        marginTop: theme.spacing.unit *12,
    },
    locGridContainer_mob: {
        display: 'flex',
        alignItems: 'left',
        justifyContent: 'left',
        paddingTop: theme.spacing.unit
    },
    locGridContainer: {
        display: 'flex',
        alignItems: 'left',
        justifyContent: 'left',
        paddingTop: theme.spacing.unit * 4
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

class ServiceGlossary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openDescDialog: false,
            orgs: this.props.pageContext.data.orgs,
            stateName: null,
            searchText: null
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
    }

    static getDerivedStateFromProps(nextProps, prevState) {


        const values = queryString.parse(nextProps.location.search);
        console.log(values);
        if (!values) {
            return null
        }
        
        if ((values.searchText !== prevState.searchText) && (values.stateName !== prevState.stateName)){
            console.log("1")
            return {stateName: values.stateName, searchText: values.searchText}
        }
        
        
        if (values.searchText !== prevState.searchText) {
            console.log("2")
            return {searchText: values.searchText, stateName: prevState.stateName}
        }

        if (values.stateName !== prevState.stateName) {
            console.log("3")
            return {stateName: values.stateName, searchText: prevState.searchText}
        }

        return null;
    }

    toggleDescDialog() {
        this.setState({
            openDescDialog: !this.state.openDescDialog
        })
    }

    setStateFilter(ev) {
        ev.preventDefault();
        const value = 'Cali';
        const uri = `?stateName=${value}`;
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
        console.log(encodedSearchUri)
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
            tokenize: true,
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
        allOrgs.map((org, idx) => {
            allStatesSet.add(org.area.hierarchy[org.area.hierarchy.length-1].area_name) 
        })

        let allStates = [];
        allStatesSet.forEach((org) => {
            allStates.push({'label': org})
        })

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
                        content={`Forms, Price, Timings and Local Government Service Contact Details for ${service_name} | Localgov.fyi`}/>
                    <meta name="keywords" content={`${service_name}, localgov `}/>
                    <meta
                        property="og:description"
                        content={`Forms, Price, Timings and Local Government Service Contact Details for ${service_name} | Localgov.fyi`}/>

                </Helmet>
                {descDialog}
                <Grid
                    container
                    className={isMobile
                    ? classes.ser_gloss_servicename_mob
                    : classes.ser_gloss_servicename}>
                    <Grid item sm={1}/>
                    <Grid
                        item
                        sm={10}
                        align="center"
                        className={isMobile
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
                        className={isMobile
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
                                    style={isMobileOnly
                                    ? {
                                        color: "#fff",
                                        marginTop: '24px',
                                        paddingLeft: '0px',
                                        paddingRight: '0px'
                                    }
                                    : {
                                        color: "#fff",
                                        marginTop: '32px',
                                        paddingLeft: '0px',
                                        paddingRight: '0px'
                                    }}
                                    variant="body2">
                                    <Truncate
                                        lines={isMobileOnly
                                        ? 4
                                        : 5}
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
                <Grid container className={classes.gloss_searchContainer}>
                    <Grid item sm={1}/>
                    <Grid item sm={10}>
                        <Paper className={classes.filterContainer}  elevation={3}>
                            
                                    <Grid item sm={12} md={5} align="left">
                        <Paper className={classes.root} elevation={1}>
                            {searchInput}
                            <IconButton className={classes.iconButton} aria-label="Search">
                                <SearchIcon/>
                            </IconButton>
                        </Paper>
                    </Grid>
                    
                    <Grid item sm={12} md={5} styling={{position: 'relative'}} align="left">
                  
                            <StateSuggest allStates={allStates} />
              
                    </Grid>

                        </Paper>
                    </Grid>
        
                    <Grid item sm={1}/>
                </Grid>

                <LoginRegisterDialog location={this.props.location}/>
                <Grid container className={classes.gloss_countContainer}>
                    <Grid item sm={1}/>
                    <Grid item sm={8} align="left">
                        <Typography
                            style={{
                            color: "#0a0a0a",
                            margin: '16px'
                        }}
                            variant="caption">
                            {this.state.searchText
                                ? (`Showing ${allOrgs.length} matching results`)
                                : (`Currently offered in ${allOrgs.length} locations`)}</Typography>
                    </Grid>
                    <Grid item sm={3}/>
                </Grid>
                <Grid
                    container
                    className={isMobile
                    ? classes.locGridContainer_mob
                    : classes.locGridContainer}>
                    <Grid item sm={1}/>

                    <Grid
                        item
                        sm={8}
                        align="left"
                        className={isMobile
                        ? classes.ser_gloass_locGrid_mob
                        : classes.ser_gloass_locGrid}>
                        <SpringGrid
                            component="div"
                            columns={isMobileOnly
                            ? 1
                            : 4}
                            columnWidth={230}
                            gutterWidth={5}
                            gutterHeight={5}
                            itemHeight={60}
                            springConfig={{
                            stiffness: 60,
                            damping: 10
                        }}>
                            {locs}
                        </SpringGrid>
                    </Grid>
                    <Grid item sm={3}/>
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