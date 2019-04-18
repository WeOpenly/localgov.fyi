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
    const {header, results, handleOrgClick, classes} = this.props;

        let serviceLocations = null;

        serviceLocations = results.map((result, idx) => {

            const { organization, url_slug, area } = result;
 
            return <LocationSerCard highlight key={idx} idx={idx} organization={organization} ser_url_slug={url_slug} area={area}/>
        });

        return (
            <Grid container>
                <Grid item sm={1} />
                <Grid item sm={10} className={this.state.isMob ? classes.ser_gloss_suggested_row_mob :  classes.ser_gloss_suggested_row}>
                    <Typography
                        variant="title"
                        className={this.state.isMob ? classes.ser_gloss_suggested_row_heading_mob : classes.ser_gloss_suggested_row_heading}>
                        {header}
                    </Typography>
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
