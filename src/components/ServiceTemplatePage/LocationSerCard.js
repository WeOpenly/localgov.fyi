import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import Link from "gatsby-link";
import {StaticQuery, graphql} from "gatsby"
import { isMobileOnly } from 'react-device-detect';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { navigate } from '@reach/router';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Img from "gatsby-image";
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
ser_gloss_gridItemLocation_mob_focus : {
    boxShadow: `0 0 3px 0px ${theme.palette.primary['600']}`
},
    suggest_loc_card:{
        display: 'flex',

    },
suggest_loc_org_details:{
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column'
},
    suggest_loc_logo:{
        width: 56,
        zIndex: '190',
        height: 56,
        boxShadow: `0 0 0px 1px ${theme.palette.primary["200"]}`,
        border: '1px solid #fff',
        marginRight: theme.spacing.unit * 2, 
    }
});



class LocationSerCard extends Component {
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
        const { classes, area, organization, ser_url_slug, highlight } = this.props;
        let state = null;
        let areaName = null;
        if (area.hierarchy.length ===1){
            areaName = area.name || organization.org_name
            areaName = `State of ${areaName}`
        }
        else{
            areaName = area.name || organization.org_name
            state = `State of ${area.hierarchy[area.hierarchy.length - 1].area_name}`;
        }
        let logoUrl = null;
        if (organization.logo_url){
            logoUrl = organization.logo_url
        }

        if (!(areaName && ser_url_slug)) {
            return null;
        }
        const border = highlight ? `#d782d9` : `#AB93FF`
        return (
          <Link
            style={{
              cursor: "pointer",
              width: "280px",
              display: "flex",
              flexDirection: "column",
              textDecoration: "none",
              margin: 16,
              borderTop: `2px solid ${border}`,
              boxShadow:
                "0px 3px 5px 0px rgba(0,0,0,0.1),0px 1px 1px 0px rgba(0,0,0,0.07),0px 2px 6px 1px rgba(0,0,0,0.06)"
            }}
            to={`/service/${ser_url_slug}`}
          >
            <CardContent className={classes.suggest_loc_card}>
              {logoUrl ? (
                <Avatar
                  alt={areaName}
                  className={classes.suggest_loc_logo}
                  src={logoUrl}
                />
              ) : null}
              <div className={classes.suggest_loc_org_details}>
                <Typography variant="body2" gutterBottom>
                  {areaName}
                </Typography>
                <Typography variant="caption">{state}</Typography>
              </div>
            </CardContent>
          </Link>
        );
    }
}

export default withStyles(styles)(LocationSerCard);
