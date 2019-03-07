import React, { Fragment } from "react"
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
import ServiceDetail from '../components/ServiceDetail';
import DetailTemplate from '../components/detailTemplate';
import ServiceHeader from '../components/ServiceHeader';
import AddressGoogleMap from '../components/AddressGoogleMap';
import Footer from '../components/Footer';
import ServiceCard from '../components/ServiceCard';
import withRoot from '../withRoot';
import {isLoggedIn} from '../components/Account/Auth';

import {trackView} from "../components/common/tracking";
import { toggleNotifyDialog } from '../components/Search/actions.js';
import RawForm from '../components/Reminders/RawForm.js';
import SerRemCard from '../components/Reminders/Card.js';

const windowGlobal = typeof window !== 'undefined' && window;

const styles = theme => ({
    "@global": {
        html: {
            background: theme.palette.common.white,
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
 
    },
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
        '&:hover':{
            background: 'none'
        },
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

},
service_detail_footer : {
       borderTop: `1px solid #dcdcdc`,
    paddingTop: theme.spacing.unit,
    marginTop: theme.spacing.unit * 4,
},
serviceDetailStepNumber:{
    marginRight: theme.spacing.unit *2
},
ser_detail_footer : {
    width: '100%',
    borderTop: `1px solid #dcdcdc`,
    paddingTop: theme.spacing.unit,
    marginTop: theme.spacing.unit *6
}
});


const genericFSchema = {
  "type": "object",
    "title": "Get notified from us about this service",
"description" : "Get notified from us about this service",
  "required": [
    "email",
  ],
  "properties": {
    "email": {
      "type": "string",
      "title": "Email"
    }
  }
}


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

class ServiceDetailTemplate extends React.Component {
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
        // if (windowGlobal && !this.state.notifyInterval){
        //     const notifyInterval = windowGlobal.setTimeout(() => dispatch(toggleNotifyDialog(true)), 6000);
        //     this.setState({ notifyInterval});
        // }
        // // }
        
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
            url_slug,
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
            org_slug,
            org_name,
            service_del_links,
            service_reminder_bp_json,
            otherServices,
            logoSizes
        } = this.props.pageContext.data;

        const {classes} = this.props;
        
        let serRemFormRaw = null;
        if (service_reminder_bp_json){
            const { field_schema} = service_reminder_bp_json;
            serRemFormRaw = <RawForm field_schema={field_schema} id={service_reminder_bp_json.id} service_id={id} org_id={org_id}/>
        }
        else{
            serRemFormRaw = <RawForm field_schema={JSON.stringify(genericFSchema)} id="generic_ser_rem_form" service_id={id} org_id={org_id} />
        }

        let serRemFormCard = null;
        if (service_reminder_bp_json) {
            const { field_schema, ui_schema, thanks_msg, greeting_msg} = service_reminder_bp_json;
            serRemFormCard = <SerRemCard
            key={id}
            field_schema={field_schema}
            greeting_msg={greeting_msg}
            thanks_msg={thanks_msg}
            ui_schema={ui_schema}
            ser_rem_form_id={service_reminder_bp_json.id}
            service_id={id}
            org_id={org_id}/>
        }
        else {
            serRemFormCard = <SerRemCard
                key = "generic_ser_rem_form"
                field_schema={JSON.stringify(genericFSchema)}
                greeting_msg={null}
                thanks_msg={null}
                ui_schema={null}
                ser_rem_form_id="generic_ser_rem_form"
                service_id={id}
                org_id={org_id} />
        }
 
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
                    <Typography type="caption" className={classes.serviceDetailStepNumber} gutterBottom>
                        {index + 1}
                    </Typography>
                     <Typography type="body1" className={classes.serviceDetailStepText}  gutterBottom>
                       {text}
                    </Typography>
                  
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

                return <Fragment>
                    <ListItem disableGutters>
                    <ListItemText primary={<Typography variant='subheading'>{question}</Typography>} secondary=     {<Typography color="textPrimary">{text}</Typography> }/>
                    </ListItem>
                      {(index !== allfaq.length-1) ? <Divider style={{margin: '8px'}} /> : null}
                </Fragment>;
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
                toLink={`/service/${service.url_slug}/`}
                title={service.service_name}
                description={service.service_description}
                deliveryLink={service.service_del_links && service.service_del_links[0]
                ? service.service_del_links[0]
                : null}/>);

        const jsonLd = {
            "@context": "http://schema.org",
            "@type": "GovernmentService",
            "@id": `https://evergov.com/service/${url_slug}/`,
            "name": `${name}`,
            "operator": {
                "@context": "http://schema.org",
                "@id": `https://evergov.com/organization/${org_slug}/`,
                "@type": "GovernmentOrganization",
                "name": `${org_name}`
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
                        <title>{`${name} | ${org_name} | Evergov`}
                        </title>
                        <script src="https://js.stripe.com/v3/"></script>
                        <script type="application/ld+json">{`${JSON.stringify(jsonLd)}`}</script>
                        <link rel="canonical" href={`https://evergov.com/service/${url_slug}/`}/>
                        <meta
                            property="og:title"
                            content={`${name} | ${org_name} | Evergov`}/>
                        <meta property="og:url" content={`https://evergov.com/service/${url_slug}/`}/>

                       {description ? (<meta
                            name="description"
                            content={description.substr(0,300)}/>) : (<meta
                            name="description"
                            content={`${name} online in ${org_name} seamlessly with Evergov. Be it property taxes, utility bills, tickets or permits and licenses, you can find them all on Evergov.`}/>) }
                        <meta
                            name="keywords"
                            content={`${name} online , ${org_name} services `}/>
                        <meta
                            property="og:description"
                            content={`Forms, Price, Checklist, FAQS, Timings and Local Government Service Contact Details for ${name} offered in ${org_name} | Evergov`}/>
                     
                    </Helmet>
                    {(windowGlobal && window.history.length > 2) && !isMobileOnly
                        ? (
                            <IconButton
                                variant=""
                                aria-label="goback"
                                disableRipple
                                disableFocusRipple
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
                            orgSlug={org_slug}
                            info={contact_details}
                            serDelLinks={service_del_links}
                            logoSizes={serLogoSvg}/>
                    </Grid>
                 
         
                    <Grid item xs={12} md={8} className={classes.ser_detail_details}>
                        {serRemFormCard}
                        <ServiceDetail description={description} price={price} timingList={timingList} formList={formList} qaList={qaList} stepList={stepList} locList={locList} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <div className={classes.other_ser_headerWrapper}>
                            <Typography variant="subheading">Additional services</Typography>
                        </div>
                        {this.state.logincheckloading ? (<Spinner className={classes.ser_detail_loading_spinner} name="ball-beat" color="blue"/>) : (<div>
                            {otherSersComp}
                        </div>)}
                        <div className={classes.other_ser_linkWrapper}>
                            <Link to={`/organization/${org_slug}/`} className={classes.other_ser_link}>
                                <Typography variant="caption" className={classes.other_ser_linkText}>See all services from {org_name}</Typography>
                            </Link>
                        </div>
                    </Grid>
                </Grid>
       
                   
                    {serRemFormRaw}
              <div className={classes.ser_detail_footer}>
          <Footer page={this.props.location.pathname} />
        </div>
          
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

export default connect(mapStateToProps)(withRoot(withStyles(styles)(ServiceDetailTemplate)));
