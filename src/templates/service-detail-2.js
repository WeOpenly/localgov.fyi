import React from "react"
import * as PropTypes from "prop-types"
import {connect} from "react-redux";
import Helmet from "react-helmet";
import {isMobileOnly} from 'react-device-detect';
import Link from 'gatsby-link';

import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Spinner from 'react-spinkit';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

import KeyboardBackspace from '@material-ui/icons/KeyboardBackspace';

import DetailTemplate from '../components/detailTemplate';
import ServiceHeader from '../components/ServiceHeader';
import AddressGoogleMap from '../components/AddressGoogleMap';

import ServiceCard from '../components/ServiceCard';
import withRoot from '../withRoot';
import {isLoggedIn} from '../components/Account/Auth';

import {trackView} from "../components/common/tracking";
import { toggleNotifyDialog } from '../components/Search/actions.js';
const windowGlobal = typeof window !== 'undefined' && window;

const styles = theme => ({
    ser_detail_container: {
        marginTop: theme.spacing.unit * 2
    },
    ser_detail_details: {
        width: '100%'
    },
    ser_detail_cardWrapper: {
        borderRadius: 3,
        boxShadow: `0 0 0 0`,
        border: `1px solid ${theme.palette.primary['50']}`
    },
    ser_detail_cards: {
        marginBottom: theme.spacing.unit * 2,
        paddingTop: theme.spacing.unit,
        borderRadius: 3,
        boxShadow: `0 0 0 0`,
        // border: `1px solid ${theme.palette.primary['50']}`,
    },
    ser_detail_serviceItemIcon: {
        padding: 8
    },
    ser_detail_cardContent: {
        marginLeft: theme.spacing.unit * 3,
        padding: theme.spacing.unit / 2
    },
    ser_detail_dividerWrapper: {
        paddingLeft: theme.spacing.unit * 3,
        paddingRight: theme.spacing.unit * 3
    },
    ser_detail_iconWrapper: {
        paddingTop: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 2
    },
    ser_detail_button: {
        border: 'none',
        marginLeft: theme.spacing.unit * -6
    },
    ser_detail_icon: {
        fontSize: 24,
        color: theme.palette.primary["200"]
    },
    ser_detail_formLink: {
        textDecoration: 'underline',
        textDecorationColor: '#0000EE'
    },
    ser_detail_otherServicesDividerWrapper: {
        marginBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 3,
        paddingRight: theme.spacing.unit * 3
    },
    other_ser_headerWrapper: {
        display: 'flex',
        justifyContent: 'left',
        marginBottom: theme.spacing.unit * 2,
        marginLeft: theme.spacing.unit
    },
    other_ser_card: {
        marginBottom: theme.spacing.unit * 2,
        boxShadow: '0 0 0 0',
        border: `1px solid ${theme.palette.primary['50']}`
    },
    other_ser_cardContent: {
        marginBottom: theme.spacing.unit * -2
    },
    other_ser_cardTitle: {
        fontWeight: 600
    },
    other_ser_caption: {
        height: 40,
        overflowY: 'hidden',
        color: 'rgba(30, 30, 50, 0.75)'
    },
    other_ser_serviceLink: {
        textDecoration: 'none'
    },
    other_ser_cardActions: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    other_ser_linkWrapper: {
        margin: theme.spacing.unit *2,
        display: 'flex',
        justifyContent: 'left',
        width: '100%'
    },
    other_ser_link: {
        color: theme.palette.primary['500'],
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline'
        }
    },
    other_ser_linkText: {
        color: theme.palette.primary['500']
    },
    other_ser_raw: {
        overflow: 'hidden',
        'textOverflow': 'ellipsis'
    },
ser_detail_loading_spinner:{

}
});

const JsonLd = ({data}) => <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
    __html: JSON.stringify(data)
}}/>;

const RawHTML = ({
    children,
    className = ""
}) => (<div
    className={className}
    dangerouslySetInnerHTML={{
    __html: children.replace(/\n/g, " ")
}}/>);

class ServiceDetail extends React.Component {
    static propTypes = {
        data: PropTypes.shape({postsJson: PropTypes.object.isRequired})
    }

    state = {
        loggedin: false,
        logincheckloading: true,
        notifyInterval: null,
    }

    componentDidMount() {
        const {dispatch} = this.props;
        const { search} = this.props;
        const { showNotifyDialog} = search;
        const {id, name} = this.props.pageContext.data;
        dispatch(trackView('entity_detail', 'service', id, name));
        const loggedin = isLoggedIn();
        this.setState({logincheckloading: false});
        if (loggedin) {
            this.setState({loggedin: true})
        }
        // if (name.includes('Pay Property') || name.includes('Pay Utility')){
        if (windowGlobal && !this.state.notifyInterval){
            const notifyInterval = windowGlobal.setTimeout(() => dispatch(toggleNotifyDialog(true)), 5000);
            this.setState({ notifyInterval});
        }
        // }
        
    }

    componentWillUnmount(){
        if (this.state.notifyInterval && windowGlobal){
            const notifyInterval = this.state.notifyInterval;
            windowGlobal.clearTimeout(notifyInterval);
        }
    }

    render() {
        const {
            id,
            name,
            service_delivery_enabled,
            allForms,
            allSteps,
            description,
            contact_details,
            price,
            alllocations,
            alltimings,
            allfaq,
            org_id,
            org_name,
            service_del_links,
            service_flow_steps,
            otherServices,
            logoSizes
        } = this.props.pageContext.data;

        const {classes} = this.props;

        let serLogoSvg = null
        if (logoSizes && logoSizes.sizes) {
            serLogoSvg = logoSizes.sizes
        }

        let timingList = null;
        if (alltimings.length > 0) {
            timingList = alltimings.map((timing, index) => {
                const {day, open} = timing;
                const breakTime = timing["break"];
                let openTime = "";

                if (open && breakTime) {
                    openTime = `OPEN: ${open} CLOSED: ${breakTime}`;
                }

                return (
                    <ListItem disableGutters>
                        <ListItemText
                            primary={openTime}
                            secondary={day}
                            secondaryTypographyProps={{
                            variant: "subheading"
                        }}/>
                    </ListItem>
                );
            });
        }

        let stepList = null;
        if (allSteps.length > 0) {
            stepList = allSteps.map((step, index) => {
                const {description} = step;
                const text = (
                    <RawHTML>
                        {description}
                    </RawHTML>
                );
                return <ListItem disableGutters>
                    <Typography type="caption" gutterBottom>
                        {index + 1}
                    </Typography>
                    <ListItemText primary={text}/>
                </ListItem>;
            });
        }

        let formList = null;
        if (allForms.length > 0) {
            formList = allForms.map((form, index) => {
                const {name, url, price} = form;
                return <ListItem button disableGutters>
                    <ListItemText
                        primary={name}
                        onClick={() => {
                        if (url) {
                            windowGlobal.open(url, "_blank");
                        }
                    }}
                        secondary={price}
                        className={classes.ser_detail_formLink}/>
                </ListItem>;
            });
        }

        let qaList = null;
        if (allfaq.length > 0) {
            qaList = allfaq.map((qa, index) => {
                const {answer, question} = qa;
                const text = (
                    <RawHTML>
                        {answer}
                    </RawHTML>
                );

                return <ListItem disableGutters>
                    <ListItemText primary={question} secondary={text}/>
                </ListItem>;
            });
        }

        let locList = null;
        if (alllocations.length > 0) {
            locList = alllocations.map((loc, index) => {
                const {id, description, address} = loc;
                return <div>
                    <Typography variant="body" gutterBottom>
                        {id}
                    </Typography>
                    <Typography variant="caption" gutterBottom>
                        {description}
                    </Typography>
                    <br/>
                    <AddressGoogleMap
                        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyC1d6ej2p77--6Wf8m6dzdrbvKhfBnb3Ks&libraries=places"
                        loadingElement={< div style = {{ height: "205px", width: "280px" }}/>}
                        containerElement={< div style = {{ height: "200px", width: "280px" }}/>}
                        mapElement={< div style = {{ height: "200px", width: "280px" }}/>}
                        address={address.toLowerCase()}/>
                    <br/>
                </div>;
            });
        }

        const serDel = service_del_links.map((link, idx) => {
            return ({
                "potentialAction": {
                    "@type": "ReserveAction",
                    "target": {
                        "@type": "EntryPoint",
                        "urlTemplate": `${link.url}`,
                        "inLanguage": "en-US",
                        "actionPlatform": ["http://schema.org/DesktopWebPlatform", "http://schema.org/IOSPlatform", "http://schema.org/AndroidPlatform"]
                    },
                    "result": {
                        "@type": "Reservation",
                        "name": `${link.link_name}`
                    }
                }
            });
        });

        const otherSersComp = otherServices
            .slice(0, 3)
            .map((service, idx) => <ServiceCard
                key={`service-card-other-${service.id}`}
                resultType='service'
                id={service.id}
                listIndex={`${service.id}-${idx}`}
                toLink={`/service/${service.id}`}
                title={service.service_name}
                description={service.service_description}
                deliveryLink={service.service_del_links && service.service_del_links[0]
                ? service.service_del_links[0]
                : null}/>);

        const jsonLd = {
            "@context": "http://schema.org",
            "@type": "GovernmentService",
            "name": `${name}`,
            "provider": {
                "@context": "http://schema.org",
                "@type": "GovernmentOrganization",
                "schema:name": `${org_name}`
            }
        }
        
        if (serDel.length > 0) {
            jsonLd['potentialAction'] = serDel[0]['potentialAction']
        }

        const someDetails = description || price || timingList || formList || stepList || qaList || locList;
        return (
            <DetailTemplate location={this.props.location}>

                <Grid container spacing={16} className={classes.ser_detail_container}>
                    <Helmet>
                        <title>{`${name} service offered in ${org_name} | Localgov.fyi`}
                        </title>
                        <link rel="canonical" href={`https://localgov.fyi/service/${id}/`}/>
                        <script key='gatsby-plugin-stripe' src="https://js.stripe.com/v3/" async/>
                        <meta
                            property="og:title"
                            content={`${name} service offered in ${org_name} | Localgov.fyi`}/>
                        <meta property="og:url" content={`https://localgov.fyi/service/${id}/`}/>

                        <meta
                            name="description"
                            content={`Forms, Price, Timings and Local Government Service Contact Details for ${name} offered in ${org_name} | Localgov.fyi`}/>
                        <meta
                            name="keywords"
                            content={`${name} online , ${org_name} , localgov `}/>
                        <meta
                            property="og:description"
                            content={`Forms, Price, Timings and Local Government Service Contact Details for ${name} offered in ${org_name} | Localgov.fyi`}/>
                        <JsonLd data={jsonLd}/>
                    </Helmet>
                    {(windowGlobal && window.history.length > 2) && !isMobileOnly
                        ? (
                            <IconButton
                                variant="outlined"
                                aria-label="goback"
                                onClick={() => window.history.back()}
                                className={classes.ser_detail_button}>
                                <KeyboardBackspace/>
                            </IconButton>
                        )
                        : null}
                    <Grid item xs={12}>
                        <ServiceHeader
                            name={name}
                            service_delivery_enabled={service_delivery_enabled}
                            id={id}
                            offeredIn={org_name}
                            orgID={org_id}
                            info={contact_details}
                            serDelLinks={service_del_links}
                            logoSizes={serLogoSvg}/>
                    </Grid>
                    <Grid item xs={12} md={8} className={classes.ser_detail_details}>
                        {someDetails && <Paper className={classes.ser_detail_cardWrapper}>
                            <Grid item xs={12}>
                                <Paper className={classes.ser_detail_cards}>
                                    <Grid container spacing={8}>
                                        <Grid item xs={10} sm={11}>
                                            <div className={classes.ser_detail_cardContent}>
                                                <Typography variant="subheading" gutterBottom>
                                                    About this service
                                                </Typography>
                                                <Typography variant="body1" gutterBottom>
                                                    <RawHTML>{description}</RawHTML>
                                                </Typography>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                            {price && <Grid item xs={12}>
                                <div className={classes.ser_detail_dividerWrapper}><Divider/></div>
                                <Paper className={classes.ser_detail_cards}>
                                    <Grid container spacing={8}>
                                        {/*<Grid item xs={2} sm={1}>
                                        <div className={classes.iconWrapper}>
                                            <AttachMoney className={classes.icon} />
                                        </div>
                                    </Grid>*/}
                                        <Grid item xs={10} sm={11}>
                                            <div className={classes.ser_detail_cardContent}>
                                                <Typography variant="body2" gutterBottom>
                                                    {price}
                                                </Typography>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>}
                            {timingList && <Grid item xs={12}>
                                <div className={classes.ser_detail_dividerWrapper}><Divider/></div>
                                <Paper className={classes.ser_detail_cards}>
                                    <Grid container spacing={8}>
                                        {/*<Grid item xs={2} sm={1}>
                                        <div className={classes.iconWrapper}>
                                            <AccessTime className={classes.icon} />
                                        </div>
                                    </Grid>*/}
                                        <Grid item xs={10} sm={11}>
                                            <div
                                                className={classes.ser_detail_cardContent}
                                                style={{
                                                marginTop: -12
                                            }}>{timingList}</div>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>}
                            {formList && <Grid item xs={12}>
                                <div className={classes.ser_detail_dividerWrapper}><Divider/></div>
                                <Paper className={classes.ser_detail_cards}>
                                    <Grid container spacing={8}>
                                        {/*<Grid item xs={2} sm={1}>
                                        <div className={classes.iconWrapper}>
                                            <Assignment className={classes.icon} />
                                        </div>
                                    </Grid>*/}
                                        <Grid item xs={10} sm={11}>
                                            <div
                                                className={classes.ser_detail_cardContent}
                                                style={{
                                                marginTop: -12
                                            }}>{formList}</div>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>}
                            {stepList && <Grid item xs={12}>
                                <div className={classes.ser_detail_dividerWrapper}><Divider/></div>
                                <Paper className={classes.ser_detail_cards}>
                                    <Grid container spacing={8}>
                                        {/*<Grid item xs={2} sm={1}>
                                        <div className={classes.iconWrapper}>
                                            <PlaylistAddCheck className={classes.icon} />
                                        </div>
                                    </Grid>*/}
                                        <Grid item xs={10} sm={11}>
                                            <div
                                                className={classes.ser_detail_cardContent}
                                                style={{
                                                marginTop: -12
                                            }}>{stepList}</div>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>}
                            {qaList && <Grid item xs={12}>
                                <div className={classes.ser_detail_dividerWrapper}><Divider/></div>
                                <Paper className={classes.ser_detail_cards}>
                                    <Grid container spacing={8}>
                                        {/*<Grid item xs={2} sm={1}>
                                        <div className={classes.iconWrapper}>
                                            <QuestionAnswer className={classes.icon} />
                                        </div>
                                    </Grid>*/}
                                        <Grid item xs={10} sm={11}>
                                            <div className={classes.ser_detail_cardContent}>{qaList}</div>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>}
                            {locList && <Grid item xs={12}>
                                <div className={classes.ser_detail_dividerWrapper}><Divider/></div>
                                <Paper className={classes.ser_detail_cards}>
                                    <Grid container spacing={8}>
                                        {/*<Grid item xs={2} sm={1}>
                                        <div className={classes.iconWrapper}>
                                            <PinDrop className={classes.icon} />
                                        </div>
                                    </Grid>*/}
                                        <Grid item xs={10} sm={11}>
                                            <div className={classes.ser_detail_cardContent}>{locList}</div>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>}
                        </Paper>}
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        {isMobileOnly && <div className={classes.ser_detail_otherServicesDividerWrapper}><Divider/></div>}
                        <div className={classes.other_ser_headerWrapper}>
                            <Typography variant="subheading">Additional services</Typography>
                        </div>
                        {this.state.logincheckloading ? (<Spinner className={classes.ser_detail_loading_spinner} name="ball-beat" color="blue"/>) : (<div>
                            {otherSersComp}
                        </div>)}
                        <div className={classes.other_ser_linkWrapper}>
                            <Link to={`/organization/${org_id}`} className={classes.other_ser_link}>
                                <Typography variant="caption" className={classes.other_ser_linkText}>See all services from {org_name}</Typography>
                            </Link>
                        </div>
                    </Grid>
                </Grid>
            </DetailTemplate>
        )
    }
}

const mapStateToProps = function (state, ownProps) {
    return {
        ...state,
        ...ownProps
    };
};

export default connect(mapStateToProps)(withRoot(withStyles(styles)(ServiceDetail)));
