


import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import queryString from 'query-string'
import { isMobileOnly } from 'react-device-detect';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Fuse from 'fuse.js';
import { navigate } from '@reach/router';
import LocationSerCard from './LocationSerCard';
import StateSuggest from '../StateSuggest';

const styles = theme => ({
    ser_gloss_gridItemLocation_mob_focus: {
        boxShadow: `0 0 3px 0px ${theme.palette.primary['600']}`
    },
    ser_gloss_suggested_row: {
        paddingLeft: theme.spacing.unit,
        marginTop: theme.spacing.unit * 4,
    },
    ser_gloss_suggested_row_heading: {
        paddingBottom: theme.spacing.unit * 2,
    },
    ser_gloss_suggested_row_locs: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    suggest_loc_card: {
        display: 'flex'
    },
    ser_gloss_suggested_row_heading_mob: {
        fontSize: '16px',
        paddingBottom : theme.spacing.unit,
    },
ser_gloss_others_row_header_container:{
    display: 'flex',
    justifyContent: 'space-between',
     flexWrap: 'wrap',
    alignItems:"center",
    position: 'relative'
},
    ser_gloss_others_row_header_container_mob:{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        alignItems: "center",
        position: 'relative'
    },
    suggest_loc_logo: {
        width: 56,
        height: 56,
        boxShadow: `0 0 0px 1px ${theme.palette.primary["200"]}`,
        border: '1px solid #fff',
        marginRight: theme.spacing.unit * 2,
    }
});



class OtherLocations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stateName: null,
            isMobile: false
        }
        this.setStateFilter = this
            .setStateFilter
            .bind(this);
        this.clearStateName = this
            .clearStateName
            .bind(this);
    }


    clearStateName() {
        const { location } = this.props;
        this.setState({
            stateName: ''
        })
    }


    setStateFilter(stateSuggestion) {
        const { label } = stateSuggestion;
        this.setState({
            stateName: label
        })
    }

    componentDidMount() {
        this.setState({ isMobile: isMobileOnly });
    }

    render() {
        const { classes, allOrgs } = this.props;
        const { stateName} = this.state;

        let filteredOrgs = allOrgs;

        const allStatesSet = new Set();

        const stateOptions = {
            shouldSort: true,
            tokenize: false,
            threshold: 0,
            location: 0,
            distance: 5,
            maxPatternLength: 32,
            minMatchCharLength: 1,
            keys: ['area.hierarchy.area_name']
        }


 
        if (stateName) {
            const stateFuse = new Fuse(allOrgs, stateOptions)
            filteredOrgs = stateFuse.search(stateName);
        }

        
        allOrgs.map((org, idx) => {
                allStatesSet.add(org.area.hierarchy[org.area.hierarchy.length - 1].area_name)
            })

        allOrgs.sort((a, b) => a.organization.org_name.localeCompare(b.organization.org_name));

        let allStates = [];
        const sortedAllStates = Array
            .from(allStatesSet)
            .sort()
        sortedAllStates.forEach((org) => {
            allStates.push({ 'label': org })
        })

        const locs = filteredOrgs.map((org, idx) => {
            const organization = org.organization;

            return (
                <LocationSerCard key={idx} idx={idx} organization={organization} ser_url_slug={org.url_slug} area={org.area}  />
            )
        })
    
         
        return (<Grid container>
            <Grid item sm={1} />
            <Grid item sm={10} className={classes.ser_gloss_suggested_row}>
                <div className={this.state.isMobile ? classes.ser_gloss_others_row_header_container_mob : classes.ser_gloss_others_row_header_container}>
                    <Typography
                        variant="title"
                        className={this.state.isMobile ? classes.ser_gloss_suggested_row_heading_mob : classes.ser_gloss_suggested_row_heading}>
                        Other locations offering this service
                    </Typography>
                    <StateSuggest clearStateName={this.clearStateName}
                        selected={this.state.stateName}
                        allStates={allStates}
                        onSelectSuggestion={this.setStateFilter}/>
                </div>

                <div className={classes.ser_gloss_suggested_row_locs}>
                    {locs}
                </div>
            </Grid>
            <Grid item sm={1} />
        </Grid>)
    }
}

export default withStyles(styles)(OtherLocations);
