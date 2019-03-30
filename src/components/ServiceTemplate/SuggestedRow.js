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
import LocationSerCard from "./LocationSerCard";


const styles = theme => ({
ser_gloss_suggested_row:{
    paddingLeft: theme.spacing.unit,
    marginTop: theme.spacing.unit *4,
},
    ser_gloss_suggested_row_heading:{
        paddingBottom: theme.spacing.unit*2,
        display: 'flex',
        flexWrap: 'wrap',
    },
ser_gloss_suggested_row_locs:{
    display: 'flex',
    flexWrap: 'wrap',
    padding: theme.spacing.unit,
}
});

class SuggestedRow extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.setState({ isMob: isMobileOnly });
    }

    render() {
const {header, results, handleOrgClick, classes} = this.props;

        let serviceLocations = null;

        serviceLocations = results.map((result, idx) => {
            const { organization, url_slug, area } = result['_source'];
 
            return <LocationSerCard key={idx} idx={idx} organization={organization} ser_url_slug={url_slug} area={area}/>
        });

        return (
            <Grid container>
                <Grid item sm={1} />
                <Grid item sm={10} className={classes.ser_gloss_suggested_row}>
                    <Typography
                        variant="title"
                        className={classes.ser_gloss_suggested_row_heading}>
                        {header}
                    </Typography>
                    <div className={classes.ser_gloss_suggested_row_locs}>
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
