import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import Spinner from 'react-spinkit';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import { isMobileOnly } from 'react-device-detect';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import HighLightOutlined from '@material-ui/icons/HighlightOutlined';

import NearMe from "@material-ui/icons/NearMe";

import LocationSerCard from "./LocationSerCard";


const styles = theme => ({
ser_gloss_suggested_row:{
    paddingLeft: theme.spacing.unit,
    marginTop: theme.spacing.unit *5,
},
    ser_gloss_suggested_row_mob:{
        paddingLeft: theme.spacing.unit,
        marginTop: theme.spacing.unit * 2,
    },
    ser_gloss_suggested_row_heading_mob:{
        fontSize: '16px'
    },
    ser_gloss_suggested_row_heading:{
        fontSize: '18px',
        paddingBottom: theme.spacing.unit,
        display: 'flex',
        flexWrap: 'wrap',
    },
    ser_del_link_icymi: {
        display: 'flex',
        alignItems: 'center',
    },
    ser_del_link_icymi_icon: {
        color: '#d782d9',
    },
    ser_del_link_icymi_text: {
        paddingTop: 2,
        paddingLeft: 4,
        color: '#d782d9',
    },
ser_gloss_suggested_row_locs:{
    display: 'flex',
    flexWrap: 'wrap',
    padding: theme.spacing.unit,
},
ser_gloss_suggested_row_locs_mob:{
    display: 'flex',
    padding: theme.spacing.unit,
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignItems: "center",
    position: 'relative'
}
});

class SuggestedRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMob: false,
        }
    }

    componentDidMount() {
        this.setState({ isMob: isMobileOnly });
    }

    render() {
     
        const { header, results, classes, searchText, showingRelated, showingParent, service_name } = this.props;

        let serviceLocations = null;
        let parentFirstResName = null;

        serviceLocations = results.map((result, idx) => {

            const { organization, url_slug, area } = result;
            if(idx === 0){
                parentFirstResName = organization.org_name
            }
            return <LocationSerCard highlight key={idx} idx={idx} organization={organization} ser_url_slug={url_slug} area={area}/>
        });

        let extraMessage = null;
        if (searchText && showingRelated){
            extraMessage = (<div style={{ display: 'flex', alignItems: 'center' }}>  <HighLightOutlined style={{ fontSize: '20px' }} className={classes.ser_del_link_icymi_icon} /> <Typography variant="caption" className={classes.ser_del_link_icymi_text}>
                {`Showing related services to "${service_name}" in ${searchText}`}
            </Typography></div>)
        } else if (searchText && showingParent){
            extraMessage = (<div style={{ display: 'flex', alignItems: 'center' }}>  <HighLightOutlined style={{ fontSize: '20px' }} className={classes.ser_del_link_icymi_icon} /> <Typography variant="caption" className={classes.ser_del_link_icymi_text}>
                {`This service in ${searchText} is handled by ${parentFirstResName}`}
            </Typography></div>)
        }
        return (
            <Grid container>
                <Grid item sm={1} />
                <Grid item sm={10} className={this.state.isMob ? classes.ser_gloss_suggested_row_mob :  classes.ser_gloss_suggested_row}>
                    <Typography
                        variant="title"
                        component="h2"
                        className={this.state.isMob ? classes.ser_gloss_suggested_row_heading_mob : classes.ser_gloss_suggested_row_heading}>
                        {header}
                    </Typography>
                    {extraMessage}
                    <div className={this.state.isMob ? classes.ser_gloss_suggested_row_locs_mob : classes.ser_gloss_suggested_row_locs}>
                        {serviceLocations}
                    </div>
                </Grid>
                <Grid item sm={1} />
            </Grid>
        )
    }
}

const mapStateToProps = function (state, ownProps) {
    return {
        ...ownProps
    };
};

export default connect(mapStateToProps)(withStyles(styles)(SuggestedRow));
