import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";


import queryString from 'query-string'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SerListItemWithOrg from '../Service/ListItemWithOrg';
import Typography from '@material-ui/core/Typography';
import ContentLoader from "react-content-loader"

import { fetchNearbyOrgs } from './actions.js';
import { navigate } from '@reach/router';

const windowGlobal = typeof window !== 'undefined' && window



const SuggestedLoader = () => (
    <ContentLoader
        height={200}
        width={400}
        speed={100}
        primaryColor="#f3f3f3"
        secondaryColor="#d5d9f3">
        <rect x="11" y="75" rx="0" ry="0" width="166" height="61"/>
        <rect x="8" y="12" rx="0" ry="0" width="304" height="19"/>
    </ContentLoader>
)

const styles = theme => ({
ser_org_list_container : {
        display: 'flex',
        flexWrap: 'wrap',
    },
    ser_org_list_header:{
        paddingBottom: theme.spacing.unit * 2,
    },
    ser_org_list_header_mob:{
        paddingBottom: theme.spacing.unit * 2,
    },
    ser_gloss_suggested_row: {
        paddingLeft: theme.spacing.unit,
        marginTop: theme.spacing.unit * 2,
    },
});

class NearbySerOrgList extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        const { search } = this.props.location;
        const { dispatch, excAreaId } = this.props;

        if (search) {
            const values = queryString.parse(this.props.location.search);
            if (!values) {
                return
            }
            const { lat, lng, service_template_id, service_text } = values;
            if (!lat || !lng) {
                return
            }

            dispatch(fetchNearbyOrgs(lat, lng, service_template_id, service_text, excAreaId));
        }

    
    }

    render() {
        const { loading, items, failed, classes } = this.props;
  
 
        if (loading && !failed && items.length ==0) {
            return (<Grid container>
                <Grid item sm={1} />
                <Grid item sm={5} className={classes.ser_gloss_suggested_row}>
                    <SuggestedLoader />
                </Grid>
                <Grid item sm={6} />
            </Grid>)
        }

        if (failed){
            return null;
        }

        let nearbyComp = null;

    
        if (items && items.length > 0) {
            nearbyComp = items.map((ser, idx) => <SerListItemWithOrg {...ser} />)
            return (<Grid container>
                <Typography
                    variant="title"
                    className={this.props.isMobile ? classes.ser_org_list_header : classes.ser_org_list_header_mob}>
                    Suggestions based on your location
                    </Typography>
                <Grid item sm={12} className={classes.ser_org_list_container}>
                    {nearbyComp }
                </Grid>
            </Grid>)
        } else{
            return null;
        }
           
    }
}

NearbySerOrgList.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = function (state, ownProps) {
    return {
        ...state.nearbyOrgs,
        ...ownProps
    };
};

export default connect(mapStateToProps)(withStyles(styles)(NearbySerOrgList));