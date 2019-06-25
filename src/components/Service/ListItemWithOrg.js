import React, { Component } from "react";
import { connect } from "react-redux";

import Link from 'gatsby-link';
import { isMobileOnly } from 'react-device-detect';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { navigate } from '@reach/router';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import LocationCity from '@material-ui/icons/LocationCity'

const styles = theme => ({
    ser_list_item_card: {
        borderTop: `2px solid ${theme.palette.primary["700"]}`,
        margin: theme.spacing.unit *2,
        width: '300px',
        boxShadow: '0px 3px 5px 0px rgba(0,0,0,0.1),0px 1px 1px 0px rgba(0,0,0,0.07),0px 2px 6px 1px rgba(0,0,0,0.06)',
        display: 'flex',
        flexDirection: 'column'
    },
    ser_list_item_ser_name: {
        margin: theme.spacing.unit * 3,
        cursor: 'pointer',  
        display: 'flex',
        flex: 1,
    },
    ser_list_item_agg_org_section:{
        display: 'flex',
        alignItems: 'center',
        borderTop: '1px solid #d4d4d4',
        background: '#fafafa',
        padding: theme.spacing.unit/2,
    },
    ser_list_org_agg_logo:{
        alignSelf: 'center',
        display: 'flex',
        height: theme.spacing.unit * 3,
        width: theme.spacing.unit * 3,
        boxShadow: `0 0 1px 1px ${theme.palette.primary["200"]}`,
        border: '1px solid #fff',
        margin: theme.spacing.unit,
    },
    link_style:{
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline'
        }
        
    }
});


class SerListItemWithOrg extends Component {
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
        const { classes, organization, service_name, area, url_slug } = this.props;
        if (!service_name || !organization) {
            return null;
        }

        const {org_name, logo_url} = organization;
        
        let avatar = (<Avatar className={classes.ser_list_org_agg_logo}>
            <LocationCity />
        </Avatar>)

        if (logo_url){
            const filename = logo_url.replace(/^.*[\\\/]/, "");

            const logoUrl = `/org_images/${filename}_32_thumb.jpg`;
            avatar = (
              <Avatar
                className={classes.ser_list_org_agg_logo}
                src={logoUrl}
                alt={org_name}
              />
            );
        }


  
        // let state = null;
        // let areaName = null;
        // if (area.hierarchy.length === 1) {
        //     areaName = area.name || org_name
        //     areaName = `State of ${areaName}`
        // }
        // else {
        //     areaName = area.name || org_name
        //     state = `State of ${area.hierarchy[area.hierarchy.length - 1].area_name}`;
        // }

   

        return (<Card
            className={classes.ser_list_item_card}>
                <div className={classes.ser_list_item_ser_name} >
                <Link className={classes.link_style} to={`/${url_slug}`}>
                <Typography style={{
                    color: '#5627FF',
                    position: 'relative',
                    fontWeight: '500'
                  
                }} variant="subheading">
                    {service_name}
                </Typography>
                </Link>
                </div>
                <div className={classes.ser_list_item_agg_org_section}>
                {avatar}
                    <div className={classes.org_agg_name}>
                    <Link className={classes.link_style}  to={`/${organization.url_slug}`}>
                        <Typography style={{
                            position: 'relative',
                            fontWeight: '700',
                            color: '#1f1f33'
                        }}  variant="caption">
                            {org_name}
                        </Typography>
                    </Link>
                    </div>
                </div>
        </Card>)
    }
}

export default withStyles(styles)(SerListItemWithOrg);
