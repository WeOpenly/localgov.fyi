import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import { isMobileOnly } from 'react-device-detect';
import queryString from 'query-string'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SerListItemWithOrg from '../Service/ListItemWithOrg';
import Typography from '@material-ui/core/Typography';
import ContentLoader from "react-content-loader"
import NearMe from '@material-ui/icons/NearMe';
import { fetchAreaServices } from './actions.js';
import { navigate } from '@reach/router';

const windowGlobal = typeof window !== 'undefined' && window



const SuggestedLoader = () => (
  <ContentLoader 
    height={460}
    width={800}
    speed={100}
    primaryColor="#f3f3f3"
    secondaryColor="#d5d9f3"
  >
    <circle cx="27" cy="26" r="1" /> 
    <circle cx="46" cy="49" r="1" /> 
    <rect x="65" y="109" rx="0" ry="0" width="0" height="0" /> 
    <rect x="384" y="243" rx="0" ry="0" width="0" height="0" /> 
    <rect x="673" y="174" rx="0" ry="0" width="0" height="1" /> 
    <rect x="236" y="42" rx="0" ry="0" width="334" height="26" /> 
    <rect x="29" y="119" rx="0" ry="0" width="197" height="101" /> 
    <rect x="148" y="192" rx="0" ry="0" width="0" height="0" /> 
    <rect x="306" y="119" rx="0" ry="0" width="197" height="101" /> 
    <rect x="571" y="117" rx="0" ry="0" width="197" height="101" /> 
    <rect x="573" y="244" rx="0" ry="0" width="197" height="101" /> 
    <rect x="307" y="242" rx="0" ry="0" width="197" height="101" /> 
    <rect x="33" y="243" rx="0" ry="0" width="197" height="101" />
  </ContentLoader>
)

const styles = theme => ({
    ser_org_list_container: {
        alignItems: 'center',
        display: 'flex',
        minHeight: '800px',
        marginTop: theme.spacing.unit*4,
        justifyContent: 'center',
        flexDirection : 'column',
        flexWrap: 'wrap',
    },
    ser_org_list_container_mob:{
        display: 'flex',
        flexDirection : 'column',
        flexWrap: 'wrap',
    },
    ser_org_list:{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    ser_org_list_header: {

    },
    ser_org_list_header_container:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: theme.spacing.unit * 6,
    },
    ser_org_list_header_container_mob:{
        display: 'flex',
        marginTop: theme.spacing.unit * 2,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: theme.spacing.unit * 2,
    },
    ser_org_list_header_mob: {
        fontSize: '16px'
    },
    ser_gloss_suggested_row: {
        paddingLeft: theme.spacing.unit,
        marginTop: theme.spacing.unit * 2,
    },
});

class AreaSuggestedServices extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isMobile: false
        }
    }

    componentDidMount() {
        this.setState({ isMobile: isMobileOnly });
    }

    componentWillReceiveProps(nextProps){
        const { dispatch } = this.props;
        console.log(this.props, nextProps)
        if(!this.props.areaGuessResult.lat && nextProps.areaGuessResult.lat){
            dispatch(fetchAreaServices(nextProps.areaGuessResult.lat, nextProps.areaGuessResult.lng));
        }
    }

    render() {
        const { areaServicesLoading, areaServices, areaServicesLoadingFailed, classes } = this.props;

        if (areaServicesLoading && !areaServicesLoadingFailed && areaServices.length == 0) {
            return (<Grid container>
                <Grid item sm={1} />
                <Grid item sm={10} className={classes.ser_gloss_suggested_row}>
                    <SuggestedLoader />
                </Grid>
                <Grid item sm={1} />
            </Grid>)
        }

        if (areaServicesLoadingFailed) {
            return null
        }

        let nearbyComp = null;


        if (areaServices && areaServices.length > 0) {
            nearbyComp = areaServices.map((ser, idx) => <SerListItemWithOrg {...ser} />)
            return (<Grid container>
                <Grid item xs="auto" sm={1} />
                <Grid item xs={12} sm={10} className={this.state.isMobile ?classes.ser_org_list_container_mob : classes.ser_org_list_container}>
                    <div className={this.state.isMobile ? classes.ser_org_list_header_container_mob : classes.ser_org_list_header_container}>
                        <NearMe style={{ fontSize: '14', color: '#5627FF', marginRight: '4px' }} /> 
                        <Typography
                            variant="title"
                            className={this.state.isMobile ? classes.ser_org_list_header_mob : classes.ser_org_list_header}>
                            Suggestions based on your location
                    </Typography>
                    </div>
                
                    <div className={classes.ser_org_list}>
                            {nearbyComp}
                    </div>
                </Grid>
                <Grid item xs="auto" sm={1} />
            </Grid>)
        } else {
            return null;
        }

    }
}

AreaSuggestedServices.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = function (state, ownProps) {
    return {
        ...state.indexPage,
        ...ownProps
    };
};

export default connect(mapStateToProps)(withStyles(styles)(AreaSuggestedServices));