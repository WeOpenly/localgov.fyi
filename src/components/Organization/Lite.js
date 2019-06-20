import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { StaticQuery, graphql } from "gatsby"
import { isMobileOnly } from 'react-device-detect';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';
import { navigate } from '@reach/router';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Img from "gatsby-image";
import Avatar from '@material-ui/core/Avatar';

import LocationCity from '@material-ui/icons/LocationCity'

const styles = theme => ({
    ser_gloss_gridItemLocation_mob_focus: {
        boxShadow: `0 0 3px 0px ${theme.palette.primary['600']}`
    },
    suggest_loc_card: {
        display: 'flex'
    },
    suggest_loc_org_details: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    ser_list_org_agg_logo :{
        width: 56,
        zIndex: '190',

        height: 56,
        boxShadow: `0 0 0px 1px ${theme.palette.primary["900"]}`,
        border: '2px solid #fff',
        marginRight: theme.spacing(2),
    },
ser_list_org_agg_logo_dum:{
    width: 48,
    zIndex: '190',
    background: '#fff',
    height: 48,
    boxShadow: `0 0 0px 1px ${theme.palette.primary["900"]}`,
    border: '1px solid #d4d4d4',
    marginRight: theme.spacing(2),
}
});



class OrgLite extends Component {
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
        const { classes, area, org_name, logo_url, url_slug } = this.props;
        let state = null;
        let areaName = null;

        if (area.hierarchy.length === 1) {
            areaName = area.name || org_name
            areaName = `State of ${areaName}`
        }
        else {
            areaName = area.name || org_name
            state = `State of ${area.hierarchy[area.hierarchy.length - 1].area_name}`;
        }

        let avatar = (<Avatar className={classes.ser_list_org_agg_logo_dum}>
            <LocationCity  style={{ color: '#AB93FF' }}/>
        </Avatar>)

        if (logo_url) {

            const filename = logo_url.replace(
                /^.*[\\\/]/,
                ""
            );
            const logoUrl = `/org_images/${filename}_128_thumb.jpg`;
    
            avatar = (
              <Avatar
                className={classes.ser_list_org_agg_logo}
                src={logoUrl}
              />
            );
        }

        const border =  `#AB93FF`
        return (<Card
            key={`nearby-org-${url_slug}`}
            style={{
                cursor: 'pointer',
                width: '280px',
                display: 'flex',
                flexDirection: 'column',
                margin: 16,
                borderTop: `2px solid ${border}`,
                boxShadow: '0px 3px 5px 0px rgba(0,0,0,0.1),0px 1px 1px 0px rgba(0,0,0,0.07),0px 2px 6px 1px rgba(0,0,0,0.06)'
            }}
            onClick={() => navigate(`/${url_slug}`)}>
            <CardContent className={classes.suggest_loc_card}>
               {avatar}
                <div className={classes.suggest_loc_org_details}>
                    <Typography variant="body2" gutterBottom>
                        {areaName}
                    </Typography>
                    <Typography variant="caption">
                        {state}
                    </Typography>
                </div>
            </CardContent>
        </Card>)
    }
}

export default withStyles(styles)(OrgLite);
