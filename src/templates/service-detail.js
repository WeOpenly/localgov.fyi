import * as PropTypes from "prop-types"
import React from "react"
import {withStyles} from '@material-ui/core/styles';
// import Grid from '@material-ui/core/Grid';
// import Paper from "@material-ui/core/Paper";

// import Typography from '@material-ui/core/Typography';
// import Icon from '@material-ui/core/Icon';
// import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import Button from "@material-ui/core/Button";
// import ContactDetails from '../components/ContactDetails';
// import AddressGoogleMap from '../components/AddressGoogleMap';

// import ServiceDeliveryLink from '../components/ServiceDeliveryLink';

// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';

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

// const RawHTML = ({
//     children,
//     className = ""
// }) => (
//     <div
//         className={className}
//         dangerouslySetInnerHTML={{
//         __html: children.replace(/\n/g, "<br />")
//     }}/>
// );

class ServiceDetails extends Component {
    static propTypes = {
        data: PropTypes.shape({postsJson: PropTypes.object.isRequired})
    }

    render() {
        const {
            name,
            allForms,
            allSteps,
            description,
            contact_details,
            price,
            alllocations,
            alltimings,
            allfaq,
            classes,
            service_del_links
        } = this.props.pathContext.data;

        console.log(this.props.pathContext.data);


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

        const offeredByDetails = <Grid container spacing={8} style={{
            marginTop: 16
        }}>
            <Grid item xs={12} sm={12}>
                <br/>
                <Typography variant="subheading" gutterBottom>
                    Offered by
                </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
                {allMems.length > 0
                    ? allMems
                    : null}
            </Grid>
        </Grid>;

        const offeredInDetails = <Grid container spacing={8} style={{
            marginTop: 16
        }}>
            <Grid item xs={12} sm={12}>
                <Typography variant="subheading" gutterBottom>
                    Offered in
                </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
                {allOrgs.length > 0
                    ? allOrgs
                    : null}
            </Grid>
        </Grid>;

//         let steplist = null;
//         if (allSteps.length > 0) {
//             steplist = allSteps.map((step, index) => {
//                 const {description} = step;
//                 const text = (<RawHTML> {description} </RawHTML>);

//                 return <ListItem disableGutters>
//                     <Typography type="caption" gutterBottom>
//                         {index + 1}
//                     </Typography>
//                     <ListItemText
// primary = {
//     text
// } />
//                 </ListItem>;
//             });
//         }

//         let formList = null;
//         if (allForms.length > 0) {
//             formList = allForms.map((form, index) => {
//                 const {name, url, price} = form;
//                 return <ListItem disableGutters>
//                     <ListItemText
//                         button
//                         primary={name}
//                         onClick={() => {
//                         if (url) {
//                             window.open(url, "_blank");
//                         }
//                     }}
//                         secondary={price}/>
//                 </ListItem>;
//             });
//         }

//         let qaList = null;
//         if (allfaq.length > 0) {
//             qaList = allfaq.map((qa, index) => {
//                 const text = (<RawHTML> {answer} </RawHTML>);
//                 const {answer, question} = qa;
//                 return <ListItem disableGutters>
//                     <ListItemText
//                         primary={question}
//                         secondary={answer}/>
//                 </ListItem>;
//             });
//         }

//         let locList = null;
//         if (alllocations.length > 0) {
//             locList = alllocations.map((loc, index) => {
//                 const {id, description, address} = loc;
//                 return <div>
//                     <Typography variant="body" gutterBottom>
//                         {id}
//                     </Typography>
//                     <Typography variant="caption" gutterBottom>
//                         {description}
//                     </Typography>
//                     <br/>
//                     <AddressGoogleMap
//                         containerElement={< div style = {{ height: "200px", width: "280px" }}/>}
//                         mapElement={< div style = {{ height: "200px", width: "280px" }}/>}
//                         address={address.toLowerCase()}/>
//                     <br/>
//                 </div>;
//             });
//         }

//         let containerSize = 6;
//         let space = 0;

//         if (wide) {
//             containerSize = 12;
//             space = 8;
//         }

        // return <Grid container className={classes.container}>
        //     <Grid item container md={containerSize} spacing={space}>
        //         <Grid item xs={12}>
        //             <Paper className={classes.cards}>
        //                 <Grid container spacing={8}>
        //                     <Grid item xs={2} sm={1}>
        //                         <Icon
        //                             className={classes.serviceItemIcon}
        //                             color="accent"
        //                             style={{
        //                             fontSize: 30
        //                         }}>
        //                             info_outline
        //                         </Icon>
        //                     </Grid>
        //                     <Grid item xs={10} sm={11}>
        //                         <div className={classes.cardContent}>
        //                             <Typography variant="subheading" gutterBottom>
        //                                 {name}
        //                             </Typography>
        //                             <Typography variant="body1" gutterBottom>
        //                                 <RawHTML>{description}</RawHTML>
        //                             </Typography>
        //                         </div>
        //                     </Grid>
        //                 </Grid>
        //             </Paper>
        //         </Grid>
        //         {price && <Grid item xs={12}>
        //             <Paper className={classes.cards}>
        //                 <Grid container spacing={8}>
        //                     <Grid item xs={2} sm={1}>
        //                         <Icon
        //                             className={classes.serviceItemIcon}
        //                             color="accent"
        //                             style={{
        //                             fontSize: 30
        //                         }}>
        //                             attach_money
        //                         </Icon>
        //                     </Grid>
        //                     <Grid item xs={10} sm={11}>
        //                         <div className={classes.cardContent}>
        //                             <Typography variant="body2" gutterBottom>
        //                                 {price}
        //                             </Typography>
        //                         </div>
        //                     </Grid>
        //                 </Grid>
        //             </Paper>
        //         </Grid>}
        //         {timingList && <Grid item xs={12}>
        //             <Paper className={classes.cards}>
        //                 <Grid container spacing={8}>
        //                     <Grid item xs={2} sm={1}>
        //                         <Icon
        //                             className={classes.serviceItemIcon}
        //                             color="accent"
        //                             style={{
        //                             fontSize: 30
        //                         }}>
        //                             access_time
        //                         </Icon>
        //                     </Grid>
        //                     <Grid item xs={10} sm={11}>
        //                         <div className={classes.cardContent}>{timingList}</div>
        //                     </Grid>
        //                 </Grid>
        //             </Paper>
        //         </Grid>}
        //         {formList && <Grid item xs={12}>
        //             <Paper className={classes.cards}>
        //                 <Grid container spacing={8}>
        //                     <Grid item xs={2} sm={1}>
        //                         <Icon
        //                             className={classes.serviceItemIcon}
        //                             color="accent"
        //                             style={{
        //                             fontSize: 30
        //                         }}>
        //                             assignment
        //                         </Icon>
        //                     </Grid>
        //                     <Grid item xs={10} sm={11}>
        //                         <div className={classes.cardContent}>{formList}</div>
        //                     </Grid>
        //                 </Grid>
        //             </Paper>
        //         </Grid>}
        //         {steplist && <Grid item xs={12}>
        //             <Paper className={classes.cards}>
        //                 <Grid container spacing={8}>
        //                     <Grid item xs={2} sm={1}>
        //                         <Icon
        //                             className={classes.serviceItemIcon}
        //                             color="accent"
        //                             style={{
        //                             fontSize: 30
        //                         }}>
        //                             playlist_add_check
        //                         </Icon>
        //                     </Grid>
        //                     <Grid item xs={10} sm={11}>
        //                         <div className={classes.cardContent}>{steplist}</div>
        //                     </Grid>
        //                 </Grid>
        //             </Paper>
        //         </Grid>}
        //         {qaList && <Grid item xs={12}>
        //             <Paper className={classes.cards}>
        //                 <Grid container spacing={8}>
        //                     <Grid item xs={2} sm={1}>
        //                         <Icon
        //                             className={classes.serviceItemIcon}
        //                             color="accent"
        //                             style={{
        //                             fontSize: 30
        //                         }}>
        //                             question_answer
        //                         </Icon>
        //                     </Grid>
        //                     <Grid item xs={10} sm={11}>
        //                         <div className={classes.cardContent}>{qaList}</div>
        //                     </Grid>
        //                 </Grid>
        //             </Paper>
        //         </Grid>}
        //         {locList && <Grid item xs={12}>
        //             <Paper className={classes.cards}>
        //                 <Grid container spacing={8}>
        //                     <Grid item xs={2} sm={1}>
        //                         <Icon
        //                             className={classes.serviceItemIcon}
        //                             color="accent"
        //                             style={{
        //                             fontSize: 30
        //                         }}>
        //                             pin_drop
        //                         </Icon>
        //                     </Grid>
        //                     <Grid item xs={10} sm={11}>
        //                         <div className={classes.cardContent}>{locList}</div>
        //                     </Grid>
        //                 </Grid>
        //             </Paper>
        //         </Grid>}
        //     </Grid>
        //     <Grid item xs={12} sm={12} md={6}>
        //         {contact_details && <ContactDetails info={contact_details}/>}
        //         {service_del_links && <ServiceDeliveryLink serDelLinks={service_del_links}/>}
        //         {allMems.length > 0
        //             ? offeredByDetails
        //             : null}
        //         {allOrgs.length > 0
        //             ? offeredInDetails
        //             : null}
        //     </Grid>
        // </Grid>;
        return <div>hello</div>;
    }
}

export default withStyles(styles)(ServiceDetails);
