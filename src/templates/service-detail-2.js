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
import ServiceFlowDialog from '../components/Delivery/ServiceFlowDialog';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ContentLoader from 'react-content-loader';

import KeyboardBackspace from '@material-ui/icons/KeyboardBackspace';
import ServiceDetail from '../components/ServiceDetail';
import DetailTemplate from '../components/detailTemplate';
import ServiceHeader from '../components/ServiceHeader';

import Footer from '../components/Footer';
import ServiceCard from '../components/ServiceCard';

import MoreLinks from '../components/ServicePage/MoreLinks';

import withRoot from '../withRoot';
import {isLoggedIn} from '../components/Account/Auth';

import {trackView} from "../components/common/tracking";

const windowGlobal = typeof window !== 'undefined' && window;

const styles = theme => ({
    "@global": {
        html: {
            WebkitFontSmoothing: "antialiased", // Antialiasing.
            MozOsxFontSmoothing: "grayscale", // Antialiasing.
            height: "100%"
        },
        body: {
            margin: 0,
            padding: 0,
            height: "100%",
            width: "100%",
            background: '#fff',
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
    ser_detail_container: {
        marginTop: theme.spacing.unit * 2,
        maxWidth: '1000px',
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
    ser_goback_button: {
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
        marginLeft: theme.spacing.unit,
        marginTop: theme.spacing.unit * 2,
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
},
    ser_detail_morelinks:{
        borderTop: `1px solid #dcdcdc`,
        paddingTop: theme.spacing.unit,
        marginTop: theme.spacing.unit * 6
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

const OtherSerLoader = () => (
    <ContentLoader
        height={350}
        width={300}
        speed={100}
        primaryColor="#f3f3f3"
        secondaryColor="#d5d9f3"
    >
        <circle cx="27" cy="26" r="1" />
        <circle cx="46" cy="49" r="1" />
        <rect x="65" y="109" rx="0" ry="0" width="0" height="0" />
        <rect x="384" y="243" rx="0" ry="0" width="0" height="0" />
        <rect x="673" y="174" rx="0" ry="0" width="0" height="1" />
        <rect x="148" y="192" rx="0" ry="0" width="0" height="0" />
        <rect x="229" y="71" rx="0" ry="0" width="0" height="0" />
        <rect x="66" y="48" rx="0" ry="0" width="16" height="1" />
        <rect x="-7" y="6" rx="0" ry="0" width="327" height="133" />
        <rect x="2" y="170" rx="0" ry="0" width="327" height="133" />
    </ContentLoader>
)

const DeskTopServiceLoader = () => (
    <ContentLoader
        height={400}
        width={800}
        speed={100}
        primaryColor="#f3f3f3"
        secondaryColor="#d5d9f3"
    >
        <circle cx="27" cy="26" r="1" />
        <circle cx="46" cy="49" r="1" />
        <rect x="65" y="109" rx="0" ry="0" width="0" height="0" />
        <rect x="13" y="141" rx="0" ry="0" width="538" height="220" />
        <rect x="384" y="243" rx="0" ry="0" width="0" height="0" />
        <rect x="594" y="141" rx="0" ry="0" width="181" height="56" />
        <rect x="673" y="174" rx="0" ry="0" width="0" height="1" />
        <rect x="594" y="214" rx="0" ry="0" width="181" height="56" />
        <rect x="590" y="290" rx="0" ry="0" width="181" height="56" />
        <rect x="17" y="22" rx="0" ry="0" width="277" height="20" />
        <rect x="19" y="60" rx="0" ry="0" width="113" height="20" />
        <rect x="16" y="99" rx="0" ry="0" width="113" height="20" />
        <rect x="651" y="23" rx="0" ry="0" width="122" height="21" />
    </ContentLoader>
)

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
    constructor(props) {
        super(props);
        this.state = {
            loggedin: false,
            logincheckloading: true,
        };
    }

    componentDidMount() {
        const {dispatch} = this.props;
        const { userRequests} = this.props;
        const { showNotifyDialog} = userRequests;
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
        // if (this.state.notifyInterval && windowGlobal){
        //     const notifyInterval = this.state.notifyInterval;
        //     windowGlobal.clearTimeout(notifyInterval);
        // }
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
            logoSizes,
            org_area_hie,
            org_logo_sizes
        } = this.props.pageContext.data;

        const {classes} = this.props;
        let orgLogoSvg = null
        if (org_logo_sizes && org_logo_sizes.fluid) {
            orgLogoSvg = org_logo_sizes.fluid
        }

        let orgHieSlug = null;
        
    
        if (org_area_hie.length === 1) {
            orgHieSlug = `${org_name}`
        }
        else {
            if (org_area_hie.length)
            orgHieSlug = `${org_name}, ${org_area_hie[org_area_hie.length - 1].area_name}`;
        }

        let serRemFormRaw = null;
        // if (service_reminder_bp_json){
        //     const { field_schema} = service_reminder_bp_json;
        //     serRemFormRaw = <RawForm field_schema={field_schema} id={service_reminder_bp_json.id} service_id={id} org_id={org_id}/>
        // }
        // else{
        //     serRemFormRaw = <RawForm field_schema={JSON.stringify(genericFSchema)} id="generic_ser_rem_form" service_id={id} org_id={org_id} />
        // }

        let serRemFormCard = null;
        // if (service_reminder_bp_json) {
        //     const { field_schema, ui_schema, thanks_msg, greeting_msg} = service_reminder_bp_json;
        //     serRemFormCard = <SerRemCard
        //     key={id}
        //     service_delivery_enabled={service_delivery_enabled}
        //     field_schema={field_schema}
        //     greeting_msg={greeting_msg}
        //     thanks_msg={thanks_msg}
        //     ui_schema={ui_schema}
        //     ser_rem_form_id={service_reminder_bp_json.id}
        //     service_id={id}
        //     org_id={org_id}/>
        // }
        // else {
        //     serRemFormCard = <SerRemCard
        //         key = "generic_ser_rem_form"
        //         service_delivery_enabled={service_delivery_enabled}
        //         field_schema={JSON.stringify(genericFSchema)}
        //         service_delivery_enabled={service_delivery_enabled}
        //         greeting_msg={null}
        //         thanks_msg={null}
        //         ui_schema={null}
        //         ser_rem_form_id="generic_ser_rem_form"
        //         service_id={id}
        //         org_id={org_id} />
        // }
 
        let serLogoSvg = null
        if (logoSizes && logoSizes.sizes) {
            serLogoSvg = logoSizes.sizes
        }


        let locList = null;

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


    
        const serviceDeliveryFeedbackForm = (<form hidden name="serviceDeliveryFeedback" method="post" action="/" data-netlify="true">
            <p hidden>
                <label>
                    Don’t fill this out:{" "}
                    <input name="bot-field" onChange={this.handleChange} />
                </label>
            </p>
            <p hidden>
                <label>
                    Don’t fill this out:{" "}
                    <input name="path" type="text" value="" />
                </label>
            </p>
            <p hidden>
                <label>
                    Don’t fill this out:{" "}
                    <input name="satisfied" type="text" value="" />
                </label>
            </p>
            <p hidden>
                <label>
                    Don’t fill this out:{" "}
                    <input name="feedbackComment" type="text" value="" />
                </label>
            </p>
            <p hidden>
                <label>
                    Don’t fill this out:{" "}
                    <input name="email" type="email" value="" />
                </label>
            </p>
        </form>);

<<<<<<< HEAD
        let otherSer =null;
        if (!this.state.loggedin){
            otherSer = otherServices
                .slice(0, 3)
                .map((service, idx) => <div style={{ marginBottom: '24px' }}><ServiceCard
                    key={`service-card-other-${idx}`}
                    resultType='service'
                    id={id}
                    listIndex={`${id}-${idx}`}
                    toLink={`/${service.url_slug}/`}
                    title={service.service_name}
                    description={service.service_description}
                    deliveryLink={service.service_del_links && service.service_del_links[0]
                        ? service.service_del_links[0]
                        : null} /></div>);
        }
=======


>>>>>>> service-add-links

        const jsonLd = {
            "@context": "http://schema.org",
            "@type": "GovernmentService",
            "@id": `https://evergov.com/${url_slug}/`,
            "name": `${name}`,
            "operator": {
                "@context": "http://schema.org",
                "@id": `https://evergov.com/${org_slug}/`,
                "@type": "GovernmentOrganization",
                "name": `${org_name}`
            }
        }
        
        if (serDel.length > 0) {
            jsonLd['potentialAction'] = serDel[0]['potentialAction']
        }


        let serHeader = null;
        if (name){
            serHeader = <ServiceHeader
                name={name}
                views={views}
                service_delivery_enabled={service_delivery_enabled}
                id={id}
                orgLogoSvg={orgLogoSvg}
                offeredIn={orgHieSlug}
                orgID={org_id}
                orgSlug={org_slug}
                info={contact_details}
                serDelLinks={service_del_links}
                logoSizes={serLogoSvg} />
        }
      

        let backButton = null;
        if((windowGlobal && window.history.length > 2) && !isMobileOnly){
            backButton = (
                <IconButton
                    variant=""
                    aria-label="goback"
                    disableRipple
                    disableFocusRipple
                    onClick={() => window.history.back()}
                    className={classes.ser_goback_button}>
                    <KeyboardBackspace />
                </IconButton>
            )
        }
        const views = [{
            "date": "2019-03-23T00:00:00",
            "views": 0
        },
        {
            "date": "2019-03-22T00:00:00",
            "views": 0
        },
        {
            "date": "2019-05-09T00:00:00",
            "views": 0
        },
        {
            "date": "2019-03-20T00:00:00",
            "views": 0
        },
        {
            "date": "2019-05-07T00:00:00",
            "views": 1
        },
        {
            "date": "2019-05-06T00:00:00",
            "views": 1
        },
        {
            "date": "2019-05-05T00:00:00",
            "views": 0
        },
        {
            "date": "2019-05-04T00:00:00",
            "views": 4
        },
        {
            "date": "2019-05-03T00:00:00",
            "views": 0
        },
        {
            "date": "2019-05-02T00:00:00",
            "views": 0
        },
        {
            "date": "2019-05-01T00:00:00",
            "views": 0
        },
        {
            "date": "2019-03-28T00:00:00",
            "views": 0
        },
        {
            "date": "2019-05-14T00:00:00",
            "views": 0
        },
        {
            "date": "2019-05-15T00:00:00",
            "views": 0
        },
        {
            "date": "2019-03-18T00:00:00",
            "views": 0
        },
        {
            "date": "2019-05-30T00:00:00",
            "views": 0
        },
        {
            "date": "2019-05-31T00:00:00",
            "views": 0
        },
        {
            "date": "2019-04-04T00:00:00",
            "views": 1
        },
        {
            "date": "2019-04-05T00:00:00",
            "views": 1
        },
        {
            "date": "2019-05-25T00:00:00",
            "views": 0
        },
        {
            "date": "2019-05-24T00:00:00",
            "views": 0
        },
        {
            "date": "2019-05-27T00:00:00",
            "views": 0
        },
        {
            "date": "2019-05-26T00:00:00",
            "views": 0
        },
        {
            "date": "2019-05-21T00:00:00",
            "views": 0
        },
        {
            "date": "2019-05-20T00:00:00",
            "views": 0
        },
        {
            "date": "2019-05-23T00:00:00",
            "views": 0
        },
        {
            "date": "2019-05-22T00:00:00",
            "views": 0
        },
        {
            "date": "2019-04-25T00:00:00",
            "views": 0
        },
        {
            "date": "2019-05-29T00:00:00",
            "views": 0
        },
        {
            "date": "2019-05-28T00:00:00",
            "views": 0
        },
        {
            "date": "2019-04-28T00:00:00",
            "views": 1
        },
        {
            "date": "2019-04-29T00:00:00",
            "views": 0
        },
        {
            "date": "2019-04-22T00:00:00",
            "views": 0
        },
        {
            "date": "2019-04-23T00:00:00",
            "views": 0
        },
        {
            "date": "2019-04-20T00:00:00",
            "views": 0
        },
        {
            "date": "2019-04-21T00:00:00",
            "views": 1
        },
        {
            "date": "2019-04-26T00:00:00",
            "views": 0
        },
        {
            "date": "2019-04-27T00:00:00",
            "views": 0
        },
        {
            "date": "2019-04-24T00:00:00",
            "views": 0
        },
        {
            "date": "2019-03-19T00:00:00",
            "views": 0
        },
        {
            "date": "2019-03-16T00:00:00",
            "views": 0
        },
        {
            "date": "2019-03-17T00:00:00",
            "views": 1
        },
        {
            "date": "2019-03-14T00:00:00",
            "views": 0
        },
        {
            "date": "2019-03-15T00:00:00",
            "views": 0
        },
        {
            "date": "2019-03-12T00:00:00",
            "views": 0
        },
        {
            "date": "2019-03-13T00:00:00",
            "views": 0
        },
        {
            "date": "2019-03-10T00:00:00",
            "views": 0
        },
        {
            "date": "2019-03-11T00:00:00",
            "views": 0
        }
        ]

        

        return (
            <DetailTemplate location={this.props.location}>
                <Helmet>
                    <title>{`${name} | ${org_name} | Evergov`}
                    </title>
                    <script src="https://js.stripe.com/v3/"></script>
                    <link href={"/css/stripe.css"} rel="stylesheet" />
                    <script type="application/ld+json">{`${JSON.stringify(jsonLd)}`}</script>
                    <link rel="canonical" href={`https://evergov.com/${url_slug}/`} />
                    <meta
                        property="og:title"
                        content={`${name} | ${org_name} | Evergov`} />
                    <meta property="og:url" content={`https://evergov.com/${url_slug}/`} />

                    {description ? (<meta
                        name="description"
                        content={description.substr(0, 300)} />) : (<meta
                            name="description"
                            content={`${name} online in ${org_name} seamlessly with Evergov. Be it property taxes, utility bills, tickets or permits and licenses, you can find them all on Evergov.`} />)}
                    <meta
                        name="keywords"
                        content={`${name} online , ${org_name} services `} />
                    <meta
                        property="og:description"
                        content={`Forms, Price, Checklist, FAQS, Timings and Local Government Service Contact Details for ${name} offered in ${org_name} | Evergov`} />

                </Helmet>

                <ServiceFlowDialog service_name={name} service_id={id} /> 
                <Grid container>
                    <Grid item sm={1}>

                    </Grid>
                    <Grid item xs={12} sm={10}>
                        <Grid item xs={12}>
                            {serHeader}
                        </Grid>


                        <Grid item xs={12} sm={12} className={classes.ser_detail_details}>
                            <ServiceDetail name={name} orgHieSlug={orgHieSlug} description={description} price={price} alltimings={alltimings} allForms={allForms} allfaq={allfaq} allSteps={allSteps} />
                        </Grid>


                        </Grid>
       
                    <Grid item sm={1}>

<<<<<<< HEAD
                    </Grid>
                    <Grid item xs={12} className={classes.ser_detail_morelinks} >
                        <MoreLinks otherServices={otherServices} state_name={'state'} glossaryLinks={[]}/>
=======
                    <Grid item xs={12} sm={12} md={4}>
                        <div className={classes.other_ser_headerWrapper}>
                            <Typography variant="subheading">More Services</Typography>
                        </div>
                        {otherSer}
                        <div className={classes.other_ser_linkWrapper}>
                            <Link to={`/${org_slug}/`} className={classes.other_ser_link}>
                                <Typography variant="caption" className={classes.other_ser_linkText}>See all services from {org_name}</Typography>
                            </Link>
                        </div>
>>>>>>> changes
                    </Grid>
                </Grid>

       
              <div className={classes.ser_detail_footer}>
                <Footer page={this.props.location.pathname} />
                </div>

                {serviceDeliveryFeedbackForm}
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
