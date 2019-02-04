import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Headroom from 'react-headroom';
import Paper from '@material-ui/core/Paper';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import Truncate from 'react-truncate';

import IconButton from '@material-ui/core/IconButton';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Share from '@material-ui/icons/Share';
import SvgIcon from '@material-ui/core/SvgIcon';
import CheckCircle from '@material-ui/icons/CheckCircle';
import {fade} from "@material-ui/core/styles/colorManipulator";

import Help from '@material-ui/icons/Help';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import DialogTitle from '@material-ui/core/DialogTitle';
import SearchIcon from '@material-ui/icons/Search';

import queryString from 'query-string'
import Fuse from 'fuse.js';
import {navigate} from '@reach/router';
import Link from 'gatsby-link';
import Helmet from "react-helmet";
import {isMobileOnly, isTablet, isMobile} from 'react-device-detect';

import {withStyles} from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {FacebookShareButton, TwitterShareButton} from 'react-share';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Footer from '../components/Footer';
import withRoot from '../withRoot';
import StateSuggest from '../components/StateSuggest';
import HeaderAccountMenu from '../components/HeaderAccountMenu';
import LoginRegisterDialog from '../components/Account/LoginRegisterDialog';
import {NO_SEARCH_RESULTS} from '../components/common/tracking_events';
import {trackView, trackClick, trackInput, trackEvent} from "../components/common/tracking";

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
            display: "block"
        }
    },
    filterContainer: {
        padding: '16px 16px',
        margin: theme.spacing.unit,
        display: 'flex',
        alignItems: 'center',
        boxShadow: `0 5px 10px 0 #f1f1f1`,
        borderRadius: '5px'
    },
    locationPaper: {
        padding: theme.spacing.unit *5,
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        margin: theme.spacing.unit,
        boxShadow: `0 0 1px 0 #d4d4d4`
    },
    gloss_loc_search_root: {
        padding: '4px 8px',
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        boxShadow: `0 0 1px 0 ${theme.palette.primary['300']}`
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
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: theme.spacing.unit *4
    },
    ser_gloss_gridItemLocation: {
        padding: theme.spacing.unit*2,
        display: 'flex',
        alignItems: 'center',
        margin: theme.spacing.unit * 2,
        boxShadow: `0 1px 2px 0 ${theme.palette.primary['100']}`,
        justifyContent: 'left',
        width: 320,
        height: 88
    },
    ser_gloss_locGrid_list: {
        width: '100%',
        margin: theme.spacing.unit *2,
        backgroundColor: theme.palette.background.paper
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
        width: '100%',
        justifyContent: 'space-between',
        padding: theme.spacing.unit * 2
    },
    ser_gloss_serviceheading: {
        color: '#fff',
        paddingBottom: theme.spacing.unit * 7,
        backgroundImage: `linear-gradient(to left bottom, #6f47ff, #5d38f2, #4829e4, #3017d7, #0000ca)`
    },
    ser_gloss_servicename_text: {
        padding: `${theme.spacing.unit * 2}px 0 ${theme.spacing.unit * 2}px ${theme.spacing.unit *2}px`,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    ser_gloss_servicename_text_mob: {
        padding: `${theme.spacing.unit * 2}px 0 ${theme.spacing.unit * 2}px ${theme.spacing.unit *2}px`,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    ser_gloss_servicename_description: {
        height: 136,
        padding: `${theme.spacing.unit * 2}px 0 ${theme.spacing.unit * 2}px ${theme.spacing.unit*2}px`
    },
    gloss_searchContainer: {
        marginTop: '-40px'
    },
    gloss_searchContainer_mob: {
        marginTop: '0px'
    },
    gloss_countContainer: {
        marginTop: theme.spacing.unit *2
    },
    gloss_footer: {
        marginTop: theme.spacing.unit * 4
    },
    ser_gloss_service_actions: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    ser_gloss_menu_button: {
        color: fade('#fff', 0.75)
    },
    ser_gloss_share: {
        color: fade('#fff', 0.75),
        marginRight: 4
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
            anchorEl: null,
            copied: false,
            openDescDialog: false,
            orgs: this.props.pageContext.data.orgs,
            stateName: null,
            searchText: null,
            isMobile: false
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
        this.clearStateName = this
            .clearStateName
            .bind(this);
    }

    trackNoresults = () => {
        this.props.trackEvent(NO_SEARCH_RESULTS, {
        search_text: this.state.searchText,
        state_name :this.state.stateName
        })
    }

    handleShareClick = (event) => {
        this.setState({anchorEl: event.currentTarget});
        this.props.trackClick('external', 'share', '', '', 0);
    }

    handleClose = () => {
        this.setState({anchorEl: null, copied: false});
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const values = queryString.parse(nextProps.location.search);

        if (!values) {
            return null
        }

        if ((values.searchText !== prevState.searchText) && (values.stateName !== prevState.stateName)) {

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

    clearStateName() {
        const {location} = this.props;
        const searchValues = queryString.parse(location.search);

        let uri = `?stateName=`;
        if (searchValues.searchText) {
            uri = `?searchText=${searchValues.searchText}`;
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

        this
            .props
            .trackFeedback(label);

        let uri = `?stateName=${label}`;

        if (searchValues.searchText) {
            uri = `?searchText=${searchValues.searchText}&stateName=${label}`;
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
            this
                .props
                .trackFeedback(value);
        }

        let uri = `?searchText=${value}`;

        if (searchValues.stateName) {
            uri = `?searchText=${value}&stateName=${searchValues.stateName}`;
        }

        const encodedSearchUri = encodeURI(uri);
        navigate(encodedSearchUri);
    }

    componentDidMount() {
        this
            .props
            .trackView();
    }

    handleOrgClick(id, name, index, url) {
        this
            .props
            .trackClick('service_glossary', 'list', id, name, index);
        navigate(url);
    }

    render() {
        const {classes} = this.props;
        const {service_name, service_name_slug, service_glossary_description} = this.props.pageContext.data;
        const {anchorEl, copied} = this.state;

        const windowGlobal = typeof window !== 'undefined' && window;
        const windowLocation = windowGlobal.location
            ? windowGlobal.location
            : {};
        const shareLink = windowLocation.href;

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

        if (allOrgs.length === 0){
            this.trackNoresults()
        }

        const allStatesSet = new Set();
        this.state.orgs.map((org, idx) => {
                allStatesSet.add(org.area.hierarchy[org.area.hierarchy.length - 1].area_name)
            })

        allOrgs.sort((a, b) => a.organization.org_name.localeCompare(b.organization.org_name));

        let allStates = [];
        const sortedAllStates = Array
            .from(allStatesSet)
            .sort()
        sortedAllStates.forEach((org) => {
            allStates.push({'label': org})
        })

        const locs = allOrgs.map((org, idx) => {
            const organization = org.organization;
            let strippedName = organization
                .org_name
                .replace("-", " ")
            strippedName = strippedName.replace("Independent", " ")
            const state = org.area.hierarchy[org.area.hierarchy.length - 1].area_name;

            return (
                <div key={`${org.id}-${idx}`}>
                    <Paper className={classes.ser_gloss_gridItemLocation} elevation={1}>
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

        const mobileLocs = allOrgs.map((org, idx) => {
            const organization = org.organization;
            let strippedName = organization
                .org_name
                .replace("-", " ")
            strippedName = strippedName.replace("Independent", " ")
            const state = org.area.hierarchy[org.area.hierarchy.length - 1].area_name;

            return (
                <ListItem
                    key={`${org.id}-${idx}`}
                    onClick={() => this.handleOrgClick(organization.id, organization.org_name, idx, `/service/${org.id}/`)}>
                    <ListItemText
                        style={{
                        marginLeft: 0
                    }}
                        primary={strippedName}
                        secondary={<Typography component = "span" color = "textPrimary"> {
                        state
                    } </Typography>}/>
                </ListItem>
            )
        });

        const searchInput = (<InputBase
            onChange={this.onSearchChange}
            defaultValue={this.state.searchText}
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

        const shareButton = (
            <Button
                color="primary"
                size="small"
                className={classes.ser_gloss_menu_button}
                onClick={this.handleShareClick}
                aria-label="share">
                <Share className={classes.ser_gloss_share} fontSize="small"/>
                Share
            </Button>
        )

        return (
            <Fragment>
                <Helmet>
                    <title>{`Localgov.fyi | ${service_name}`}</title>

                    <link
                        rel="canonical"
                        href={`https://localgov.fyi/services/${service_name_slug}/`}/>

                    <meta property="og:title" content={`${service_name} | Localgov.fyi`}/>
                    <meta
                        property="og:url"
                        content={`https://localgov.fyi/service/${service_name_slug}/`}/>

                    <meta
                        name="description"
                        content={`Forms, Price, Timings and Contact Details for ${service_name} | Localgov.fyi`}/>
                    <meta
                        name="keywords"
                        content={`${service_name}, ${service_name} online, Local Government Service Onine, my ${service_name}, ${service_name} near me, How do you ${service_name}, can you ${service_name} onine, ${service_glossary_description}`}/>
                    <meta
                        property="og:description"
                        content={`Forms, Price, Timings and Local Government Service Contact Details for ${service_name} | Localgov.fyi`}/>

                </Helmet>
                {descDialog}
                <Grid container className={classes.ser_gloss_serviceheading}>
                    <Grid item sm={1}/>
                    <Grid item sm={10} align="center" className={classes.ser_gloss_nav_items}>

                        <Link to="/" style={{      textDecoration: 'none',
                                cursor: 'pointer'}}>
                            <Typography
                                style={{
                                color: "#fff",
                                paddingTop: 8
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
                        sm={10}
                        className={!this.state.isMobile
                        ? classes.ser_gloss_servicename_text
                        : classes.ser_gloss_servicename_text_mob}
                        align={'left'}>

                        <Typography
                            style={{
                            color: "#fff",
                            fontSize: '2rem',
                            display: 'flex'
                        }}
                            variant="display1">
                            {service_name}
                        </Typography>
                        <div className={classes.ser_gloss_service_actions}>

                            {shareButton}
                        </div>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={this.handleClose}>
                            <CopyToClipboard text={shareLink} onCopy={this.handleCopy}>
                                <MenuItem className={classes.ser_gloss_menu_item}>
                                    <Typography>{copied
                                            ? 'Copied!'
                                            : 'Copy link'}</Typography>
                                </MenuItem>
                            </CopyToClipboard>
                            <MenuItem onClick={this.handleClose} className={classes.ser_gloss_menu_item}>
                                <FacebookShareButton url={shareLink} className={classes.ser_gloss_sharebutton}>
                                    <Typography>Facebook</Typography>
                                </FacebookShareButton>
                            </MenuItem>
                            <MenuItem onClick={this.handleClose} className={classes.ser_gloss_menu_item}>
                                <TwitterShareButton url={shareLink} className={classes.ser_gloss_sharebutton}>
                                    <Typography>Twitter</Typography>
                                </TwitterShareButton>
                            </MenuItem>
                        </Menu>

                    </Grid>
                    <Grid item sm={1}/>
                    <Grid item sm={1}/>
                    <Grid item sm={10} className={classes.ser_gloss_servicename_description}>
                        {service_glossary_description
                            ? (
                                <Typography
                                    style={{
                                    color: "#fff"
                                }}
                                    variant="body2">
                                    <Truncate
                                        lines={3}
                                        ellipsis={(
                                        <span>
                                            ...
                                            <a
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
                        <Paper className={classes.filterContainer} elevation={3}>
                            <Grid container spacing={8} align="center">

                                <Grid item sm={12} md={7}>
                                    <Paper className={classes.gloss_loc_search_root} elevation={1}>
                                        {searchInput}
                                        <IconButton className={classes.iconButton} aria-label="Search">
                                            <SearchIcon/>
                                        </IconButton>
                                    </Paper>
                                </Grid>

                                <Grid item sm={12} md={4}>
                                    <div
                                        style={{
                                        position: 'relative'
                                    }}>
                                        <StateSuggest
                                            clearStateName={this.clearStateName}
                                            selected={this.state.stateName}
                                            allStates={allStates}
                                            onSelectSuggestion={this.setStateFilter}/>
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
                    <Grid item sm={8}>
                        <Typography
                            style={{
                            color: "#0a0a0a",
                            paddingLeft: '16px'
                        }}
                            variant="caption">
                            {this.state.searchText
                                ? (`Showing ${allOrgs.length} results matching ${this.state.searchText}`)
                                : (`Currently offered in ${allOrgs.length} locations`)}
                            {this.state.stateName
                                ? (` in the state of ${this.state.stateName}`)
                                : ''}</Typography>
                    </Grid>
                    <Grid item sm="auto"/>
                </Grid>
                <Grid container className={classes.locGridContainer}>
                    {this.state.isMobile
                        ? (
                            <Grid item sm={12} align="center">
                                <List className={classes.ser_gloss_locGrid_list}>
                                    {mobileLocs}
                                </List>
                            </Grid>
                        )
                        : (
                            <Grid item sm={12} align="left" className={classes.ser_gloss_locGrid}>

                                {locs}

                            </Grid>
                        )}

                </Grid>
                <div className={classes.gloss_footer}>
                    <Footer page={this.props.location.pathname}/>
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
        },
        trackEvent: (evName, data) => {
            dispatch(trackEvent(evName, data));
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