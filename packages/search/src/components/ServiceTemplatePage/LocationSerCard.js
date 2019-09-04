import React, { Component } from "react";
import { connect } from "react-redux";

import {  Defer } from 'react-progressive-loader'

import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import LocationCity from '@material-ui/icons/LocationCity'


const styles = theme => ({
ser_gloss_gridItemLocation_mob_focus : {
    boxShadow: `0 0 3px 0px ${theme.palette.primary['600']}`
},
    suggest_loc_card:{
        display: 'flex',
        border: 0,
        padding: theme.spacing.unit *2, 
        boxShadow:  `0 2px 6px 0 hsla(0,0%,0%, 0.2)}`,
    },
suggest_loc_org_details:{
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column'
},
  suggest_loc_logo_container:{
    width: '57px',
    height: '57px',
    overflow: 'hidden',
    marginRight: theme.spacing.unit * 2, 
  },
    suggest_loc_logo:{

      width: '56px',
      height: '56px',
      overflow: 'hidden',
      borderRadius: '50%',
      boxShadow: `0 0 0px 1px ${theme.palette.primary["200"]}`,
      border: '1px solid #fff',
      '&img': {
        maxHeight: '100%',
        height: 'none'
      }
    },
  ser_list_org_agg_logo_dum: {
    width: 56,
    zIndex: '190',
    background: '#fff',
    height: 56,
    border: '1px solid #d4d4d4',
    marginRight: theme.spacing.unit * 2,
  }
});



class LocationSerCard extends Component {
    constructor(props) {
        super(props);
    }



    render() {
      const { classes, area, organization, ser_url_slug, highlight, isMobile } = this.props;
        let state = null;
        let areaName = null;


        if (area.hierarchy.length ===1){
            areaName = `State of ${area.hierarchy[area.hierarchy.length - 1].area_name}`;
        }
        else{
            areaName = area.name || organization.org_name
            state = `State of ${area.hierarchy[area.hierarchy.length - 1].area_name}`;
        }
        
        let logoUrl = null;

        if (organization.logo_url){
            const filename = organization.logo_url.replace(/^.*[\\\/]/, "");
            logoUrl = `/org_images/${filename}_128_thumb.jpg`;
        }

        if (!(areaName && ser_url_slug)) {
            return null;
        }

    

      let avatar = (<Avatar className={classes.ser_list_org_agg_logo_dum}>
        <LocationCity fontSize="medium" style={{ color: '#AB93FF' }} />
      </Avatar>)

      if (logoUrl) {
        avatar = (
          <Defer
            render={() => <img alt={areaName} className={classes.suggest_loc_logo} src={`${logoUrl}`}></img>}
            renderPlaceholder={null}
            loadOnScreen
          />
        )
      }
    
        const border = highlight ? `#d782d9` : `#AB93FF`
        return (
          <a
            style={{
              cursor: "pointer",
              width: "288px",
              marginLeft: '16px',
              marginRight:'16px',
              marginTop: '16px',
              display: "flex",
              flexDirection: "column",
              textDecoration: "none",
              borderTop: `2px solid ${border}`,
            }}
            href={`/${ser_url_slug}`}
          >
            <div className={classes.suggest_loc_card}>
              <div className={classes.suggest_loc_logo_container}>
                {avatar}
              </div>
           
              <div className={classes.suggest_loc_org_details}>
                <Typography variant="body2" gutterBottom>
                  {areaName}
                </Typography>
                <Typography variant="caption">{state}</Typography>
              </div>
            </div>
          </a>
        );
    }
}

export default withStyles(styles)(LocationSerCard);
