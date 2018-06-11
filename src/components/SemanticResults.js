import React, { Component } from "react";
import { connect } from "react-redux";
import { navigateTo } from 'gatsby-link';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Typography from '@material-ui/core/Typography';

import OrgDetailLite from "./OrgDetailLite";
import MemDetailLite from "./MemDetailLite";
import SearchResult from "./SearchResult";
import ServiceDetails from "../templates/service-detail-2";

const windowGlobal = typeof window !== 'undefined' && window
const styles = theme => ({
    root: {
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    searchResults: {
       
    },
    elevated: {
        boxShadow: `0 0 3px 1px ${theme.palette.primary["200"]}`
    },
    errorMsgContainer: {
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    errorText: {},
    errorStateIcon: {
        fontSize: 64
    }
});

class SearchResults extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { search, classes } = this.props;
        const { semantic } = search;

        const { list_results, detail_result, intent, intent_string } = semantic;
        const { component } = detail_result;

        let detailComp = null;
        let intentComp = null;

        if (intent) {
            intentComp = (<Grid container spacing={8}>
                <Grid item xs={10} sm={10} md={10}>
                    <Typography variant="body1" gutterBottom>
                        {intent_string}
                    </Typography>
                </Grid>
            </Grid>);
        }

        if (component === "org_detail") {
            detailComp = <OrgDetailLite detail={detail_result} heading={"from"} />;
        } else if (component === "mem_detail") {
            detailComp = <MemDetailLite detail={detail_result} />;
        }

        const listComp = [];

        list_results.map((result, idx) => {
            if (result) {
                const heading = result.heading;
                let comp = null;

                if (
                    result.component &&
                    result.component === "list" &&
                    (result.results && result.results.length > 0)
                ) {
                    const listRes = result.results.map((entResult, index) => {
                        return (
                            <SearchResult
                                key={`${entResult.id}-${index}`}
                                toLink={`/${entResult.type}/${entResult.id}`}
                                title={entResult.title}
                                subtitle={entResult.subhead}
                            />
                        );
                    });

                    comp = (
                        <div key={`${result.title}-${idx}`}>
                            <Typography variant="subheading" gutterBottom>
                                {heading}
                            </Typography>
                            {listRes}
                        </div>
                    );
                } else if (result.component && result.component === "ser_faq") {
                    let qaList = "No faqs found";
                    if (result.results && result.results.length > 0) {
                        qaList = result.results.map((qa, index) => {
                            const { answer, question } = qa;
                            return (
                                <ListItem key={`${idx}-ser_faq-${index}`}>
                                    <ListItemText primary={question} secondary={answer} />
                                </ListItem>
                            );
                        });
                    }
                    comp = (
                        <Paper key={`${idx}-ser_faq`} className={classes.elevated}>
                            <Grid container spacing={8}>
                                <Grid item xs={2} sm={1}>
                                    <Icon
                                        className={classes.serviceItemIcon}
                                        color="accent"
                                        style={{ fontSize: 30 }}
                                    >
                                        question_answer
                  </Icon>
                                </Grid>
                                <Grid item xs={10} sm={11}>
                                    {qaList}
                                </Grid>
                            </Grid>
                        </Paper>
                    );
                } else if (result.component && result.component === "ser_form") {
                    let formList = "No forms found";
                    if (result.results.length > 0) {
                        formList = result.results.map((form, index) => {
                            const { name, url, price } = form;
                            return (
                                <ListItem key={`${idx}-ser_form-${index}`}>
                                    <ListItemText
                                        button
                                        primary={name}
                                        onClick={() => {
                                            if (url) {
                                                windowGlobal.open(url, "_blank");
                                            }
                                        }}
                                        secondary={price}
                                    />
                                </ListItem>
                            );
                        });
                    }
                    comp = (
                        <Paper key={`${idx}-ser_form`} className={classes.elevated}>
                            <Grid container spacing={8}>
                                <Grid item xs={2} sm={1}>

                                </Grid>
                                <Grid item xs={10} sm={11}>
                                    {formList}
                                </Grid>
                            </Grid>
                        </Paper>
                    );
                } else if (result.component && result.component === "ser_price") {
                    let price = "Price not available";
                    if (result.results > 0) {
                        price = result.results;
                    }
                    comp = (
                        <Paper key={`${idx}-ser_price`} className={classes.elevated}>
                            <Grid container spacing={8}>
                                <Grid item xs={2} sm={1}>

                                </Grid>
                                <Grid item xs={10} sm={11}>
                                    <Typography variant="body2" gutterBottom>
                                        {price}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    );
                } else if (result.component && result.component === "ser_timings") {
                    let timingList = null;
                    if (result.results.length > 0) {
                        timingList = result.results.map((timing, index) => {
                            const { day, open } = timing;
                            const breakTime = timing["break"];
                            let openTime = "";
                            if (open && breakTime) {
                                openTime = `OPEN: ${open} CLOSED: ${breakTime}`;
                            }

                            return (
                                <ListItem>
                                    <ListItemText primary={openTime} secondary={day} />
                                </ListItem>
                            );
                        });
                    }
                    comp = (
                        <Paper key={`${idx}-ser_time`} className={classes.elevated}>
                            <Grid container spacing={8}>
                                <Grid item xs={2} sm={1}>
                                    
                                </Grid>
                                <Grid item xs={10} sm={11}>
                                    {timingList}
                                </Grid>
                            </Grid>
                        </Paper>
                    );
                } else if (result.component && result.component === "ser_detail") {
                    const {
                        service_name,
                        service_location,
                        contact_details,
                        service_price,
                        service_timing,
                        service_description,
                        service_faq,
                        service_forms,
                        service_steps,
                        members,
                        orgs,
                        service_del_links
                    } = result.results;
                    const name = service_name;
                    const alltimings = service_timing || [];
                    const alllocations = service_location || [];
                    const allfaq = service_faq || [];
                    const allForms = service_forms || [];
                    const allSteps = service_steps || [];
                    const allSerDelLinks = service_del_links || [];

                    comp = <ServiceDetails key={`${idx}-ser_details`} name={name} members={members} orgs={orgs} description={service_description} contact_details={contact_details} alllocations={alllocations} alltimings={alltimings} price={service_price} allfaq={allfaq} allForms={allForms} allSteps={allSteps} service_del_links={allSerDelLinks} wide />;
                }
                listComp.push(comp);
            }
        });
        console.log(listComp);
        return (
            <Grid container className={classes.searchResults} spacing={16}>
                <Grid item xs={12} sm={8}>
                    {intentComp}
                    {listComp}
                    {/* {(listComp.length > 0) ? ({listComp}) : null} */}
                </Grid>
                {detailComp && (
                    <Grid xs={12} item sm={4}>
                            {detailComp}
                    </Grid>
                )}
            </Grid>
        );
    }
}

const mapStateToProps = function (state, ownProps) {
    return {
        ...state
    };
};

export default connect(mapStateToProps)(withStyles(styles)(SearchResults));
