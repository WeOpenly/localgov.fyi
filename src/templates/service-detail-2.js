import * as PropTypes from "prop-types"
import React from "react"
import {connect} from "react-redux";
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Helmet from "react-helmet";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import InfoOutline from '@material-ui/icons/InfoOutline';
import AttachMoney from '@material-ui/icons/AttachMoney';
import AccessTime from '@material-ui/icons/AccessTime';
import Assignment from '@material-ui/icons/Assignment';
import PlaylistAddCheck from '@material-ui/icons/PlaylistAddCheck';
import QuestionAnswer from '@material-ui/icons/QuestionAnswer';
import PinDrop from '@material-ui/icons/PinDrop';

import ContactDetails from '../components/ContactDetails';
import AddressGoogleMap from '../components/AddressGoogleMap';
import HorizontalList from '../components/HorizontalList';
// import MemberListItem from '../components/MemberListItem';
import SearchResult from '../components/SearchResult';
import ServiceDeliveryLink from '../components/ServiceDeliveryLink';
import withRoot from '../withRoot';

import { trackView } from "../components/Search/tracking";

const windowGlobal = typeof window !== 'undefined' && window;

const styles = theme => ({
    container: {
        marginTop: theme.spacing.unit * 2
    },
    details: {
        width: '100%',
    },
    cards: {
        marginBottom: theme.spacing.unit * 2,
        paddingTop: theme.spacing.unit,
        borderRadius: 3,
        boxShadow: `0 0 2px 1px ${theme.palette.primary["50"]}`
    },
    serviceItemIcon: {
        padding: 8
    },
    cardContent: {
        padding: 4
    },
    iconWrapper: {
        paddingTop: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 2,
    },
    icon: {
        fontSize: 30,
    },
    formLink: {
        textDecoration: 'underline',
        textDecorationColor: '#0000EE',
    },
});

const RawHTML = ({
    children,
    className = ""
}) => (
    <div
        className={className}
        dangerouslySetInnerHTML={{
        __html: children.replace(/\n/g, "<br />")
    }}/>
);

class ServiceDetail extends React.Component {
    static propTypes = {
        data: PropTypes.shape({postsJson: PropTypes.object.isRequired})
    }

    componentDidMount() {
        const { dispatch } = this.props;
        const { id, name } = this.props.pathContext.data;
        dispatch(trackView('entity_detail', 'service', id, name));
    }

    render() {
        const {
            id,
            name,
            allForms,
            allSteps,
            description,
            contact_details,
            price,
            alllocations,
            alltimings,
            allfaq,
            allOrgs,
            allMems,
            org_id,
            org_name,
            service_del_links
        } = this.props.pathContext.data;
        const {classes} = this.props;

        const containerSize = 12;
        const space = 8;

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
                            secondaryTypographyProps={{variant: "subheading"}}
                        />
                    </ListItem>
                );
            });
        }

        let steplist = null;
        if (allSteps.length > 0) {
            steplist = allSteps.map((step, index) => {
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
                        className={classes.formLink}
                    />
                </ListItem>;
            });
        }

        let qaList = null;
        if (allfaq.length > 0) {
            qaList = allfaq.map((qa, index) => {
                const text = (
                    <RawHTML>
                        {answer}
                    </RawHTML>
                );
                const {answer, question} = qa;
                return <ListItem disableGutters>
                    <ListItemText primary={question} secondary={answer}/>
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
                        containerElement={< div style = {{ height: "200px", width: "280px" }}/>}
                        mapElement={< div style = {{ height: "200px", width: "280px" }}/>}
                        address={address.toLowerCase()}/>
                    <br/>
                </div>;
            });
        }

        const offeredInDetails = <Grid container spacing={8} style={{
            // marginTop: 16
        }}>
            <Grid item xs={12} sm={12}>
                <Typography variant="subheading" gutterBottom>
                    Offered in
                </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
                <SearchResult key={org_id} id={org_id} listindex={0} resultType={'organization'} toLink={`/organization/${org_id}`} title={org_name}/>
            </Grid>
        </Grid>;


        const serDel = service_del_links.map((link, idx) => {
      return ({
            "potentialAction": {
                "@type": "ReserveAction",
                "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": `${link.url}`,
                    "inLanguage": "en-US",
                    "actionPlatform": [
                        "http://schema.org/DesktopWebPlatform",
                        "http://schema.org/IOSPlatform",
                        "http://schema.org/AndroidPlatform"
                    ]
                },
                "result": {
                    "@type": "Reservation",
                    "name": `${link.link_name}`
                }
            }
      }
      );
    });

        const jsonLd = {
            "@context": "http://schema.org",
            "@type": "GovernmentService",
            "name": `${name}`,
            "provider": {
                "@context": "http://schema.org",
                 "@type": "GovernmentOrganization",
                "schema:name": `${org_name}`
            },
        }
        if(serDel.length >0){
            jsonLd['potentialAction'] = serDel[0]['potentialAction']
        }
  

        const jsonLdStr = JSON.stringify(jsonLd, null, 2);

        return (
            <Grid container spacing={16} className={classes.container}>
                <Helmet>
                    <title>{`${name} service offered in ${org_name} | Localgov.fyi`} </title>
                    <link rel="canonical" href={`https://localgov.fyi/service/${id}/`} />

                    <meta property="og:title" content={`${name} service offered in ${org_name} | Localgov.fyi`} />
                    <meta property="og:url" content={`https://localgov.fyi/service/${id}/`} />

                    <meta name="description" content={`Forms, Price, Timings and Local Government Service Contact Details for ${name} offered in ${org_name} | Localgov.fyi`}  />

                    <meta property="og:description" content={`Forms, Price, Timings and Local Government Service Contact Details for ${name} offered in ${org_name} | Localgov.fyi`}  />
                    <script type="application/ld+json">
                        {jsonLdStr}
                    </script>
                </Helmet>
                <Grid item md={6} sm={12} className={classes.details}>
                    <Grid item xs={12}>
                        <Paper className={classes.cards}>
                            <Grid container spacing={8}>
                                <Grid item xs={2} sm={1}>
                                    <div className={classes.iconWrapper}>
                                        <InfoOutline className={classes.icon} />
                                    </div>
                                </Grid>
                                <Grid item xs={10} sm={11}>
                                    <div className={classes.cardContent}>
                                        <Typography variant="subheading" gutterBottom>
                                            {name}
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
                        <Paper className={classes.cards}>
                            <Grid container spacing={8}>
                                <Grid item xs={2} sm={1}>
                                    <div className={classes.iconWrapper}>
                                        <AttachMoney className={classes.icon} />
                                    </div>
                                </Grid>
                                <Grid item xs={10} sm={11}>
                                    <div className={classes.cardContent}>
                                        <Typography variant="body2" gutterBottom>
                                            {price}
                                        </Typography>
                                    </div>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>}
                    {timingList && <Grid item xs={12}>
                        <Paper className={classes.cards}>
                            <Grid container spacing={8}>
                                <Grid item xs={2} sm={1}>
                                    <div className={classes.iconWrapper}>
                                        <AccessTime className={classes.icon} />
                                    </div>
                                </Grid>
                                <Grid item xs={10} sm={11}>
                                    <div className={classes.cardContent} style={{ marginTop: -12 }}>{timingList}</div>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>}
                    {formList && <Grid item xs={12}>
                        <Paper className={classes.cards}>
                            <Grid container spacing={8}>
                                <Grid item xs={2} sm={1}>
                                    <div className={classes.iconWrapper}>
                                        <Assignment className={classes.icon} />
                                    </div>
                                </Grid>
                                <Grid item xs={10} sm={11}>
                                    <div className={classes.cardContent} style={{ marginTop: -12 }}>{formList}</div>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>}
                    {steplist && <Grid item xs={12}>
                        <Paper className={classes.cards}>
                            <Grid container spacing={8}>
                                <Grid item xs={2} sm={1}>
                                    <div className={classes.iconWrapper}>
                                        <PlaylistAddCheck className={classes.icon} />
                                    </div>
                                </Grid>
                                <Grid item xs={10} sm={11}>
                                    <div className={classes.cardContent} style={{ marginTop: -12 }}>{steplist}</div>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>}
                    {qaList && <Grid item xs={12}>
                        <Paper className={classes.cards}>
                            <Grid container spacing={8}>
                                <Grid item xs={2} sm={1}>
                                    <div className={classes.iconWrapper}>
                                        <QuestionAnswer className={classes.icon} />
                                    </div>
                                </Grid>
                                <Grid item xs={10} sm={11}>
                                    <div className={classes.cardContent}>{qaList}</div>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>}
                    {locList && <Grid item xs={12}>
                        <Paper className={classes.cards}>
                            <Grid container spacing={8}>
                                <Grid item xs={2} sm={1}>
                                    <div className={classes.iconWrapper}>
                                        <PinDrop className={classes.icon} />
                                    </div>
                                </Grid>
                                <Grid item xs={10} sm={11}>
                                    <div className={classes.cardContent}>{locList}</div>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>}
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    {service_del_links && <ServiceDeliveryLink serDelLinks={service_del_links}/>}
                    {contact_details && <ContactDetails info={contact_details}/>}
                    {offeredInDetails}
                </Grid>
            </Grid>
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

