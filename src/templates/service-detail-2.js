import * as PropTypes from "prop-types"
import React from "react"
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Helmet from "react-helmet";

import List from '@material-ui/core/List';
import ListItem from
'@material-ui/core/ListItem';
import ListItemText from
'@material-ui/core/ListItemText';

import ContactDetails from '../components/ContactDetails';
import AddressGoogleMap from '../components/AddressGoogleMap';
import HorizontalList from '../components/HorizontalList';
// import MemberListItem from '../components/MemberListItem';
import SearchResult from '../components/SearchResult';
import ServiceDeliveryLink from '../components/ServiceDeliveryLink';
import withRoot from '../withRoot';

const windowGlobal = typeof window !== 'undefined' && window;

const styles = theme => ({
    container: {
        marginTop: theme.spacing.unit * 2
    },
    cards: {
        marginTop: theme.spacing.unit * 2,
        paddingTop: theme.spacing.unit,
        borderRadius: 3,
        boxShadow: `0 0 2px 1px ${theme.palette.primary["50"]}`
    },
    serviceItemIcon: {
        padding: 8
    },
    cardContent: {
        padding: 4
    }
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

        const eventParams = {
            event_type: 'overview_query',
            type: 'service',
            org_id,
            id
        }

        // fire & forget
        const payloadParams = Object
            .keys(eventParams)
            .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(eventParams[k])}`)
            .join('&');
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

                return <ListItem disableGutters>
                    <ListItemText primary={openTime} secondary={day}/>
                </ListItem>;
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
                        secondary={price}/>
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
            marginTop: 16
        }}>
            <Grid item xs={12} sm={12}>
                <Typography variant="subheading" gutterBottom>
                    Offered in
                </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
                <SearchResult key={org_id} toLink={`/organization/${org_id}`} title={org_name}/>
            </Grid>
        </Grid>;

        return (
            <Grid container spacing={16} className={classes.container}>
                <Helmet>
                    <title>{`${name} service offered in ${org_name} | Localgov.fyi`} </title>
                    <meta name="description" content={`Forms, Price, Timings and Local Government Service Contact Details for ${name} offered in ${org_name} | Localgov.fyi`}  />
                </Helmet>
                <Grid item md={6} sm={12}>
                    <Grid item xs={12}>
                        <Paper className={classes.cards}>
                            <Grid container spacing={8}>
                                <Grid item xs={2} sm={1}></Grid>
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
                                <Grid item xs={2} sm={1}></Grid>
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
                                <Grid item xs={2} sm={1}></Grid>
                                <Grid item xs={10} sm={11}>
                                    <div className={classes.cardContent}>{timingList}</div>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>}
                    {formList && <Grid item xs={12}>
                        <Paper className={classes.cards}>
                            <Grid container spacing={8}>
                                <Grid item xs={2} sm={1}></Grid>
                                <Grid item xs={10} sm={11}>
                                    <div className={classes.cardContent}>{formList}</div>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>}
                    {steplist && <Grid item xs={12}>
                        <Paper className={classes.cards}>
                            <Grid container spacing={8}>
                                <Grid item xs={2} sm={1}></Grid>
                                <Grid item xs={10} sm={11}>
                                    <div className={classes.cardContent}>{steplist}</div>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>}
                    {qaList && <Grid item xs={12}>
                        <Paper className={classes.cards}>
                            <Grid container spacing={8}>
                                <Grid item xs={2} sm={1}></Grid>
                                <Grid item xs={10} sm={11}>
                                    <div className={classes.cardContent}>{qaList}</div>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>}
                    {locList && <Grid item xs={12}>
                        <Paper className={classes.cards}>
                            <Grid container spacing={8}>
                                <Grid item xs={2} sm={1}></Grid>
                                <Grid item xs={10} sm={11}>
                                    <div className={classes.cardContent}>{locList}</div>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>}
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    {contact_details && <ContactDetails info={contact_details}/>}
                    <img src={`https://d3qlx9ss0mi45s.cloudfront.net/localgov.fyi/track.png?${payloadParams}`} alt={"localgov-track"} /> 
                    <br/>
                    {service_del_links && <ServiceDeliveryLink serDelLinks={service_del_links}/>}
                    {offeredInDetails}
                </Grid>
            </Grid>
        )
    }
}

const Detail = withRoot(withStyles(styles)(ServiceDetail));

export default Detail;