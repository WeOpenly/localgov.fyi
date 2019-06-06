import React, {Component} from "react";

import {navigate} from '@reach/router';
import Img from "gatsby-image";
import {Link} from 'gatsby';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import CardContent from '@material-ui/core/CardContent';
import AccountBalance from '@material-ui/icons/AccountBalance';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import ContactDetails from "./ContactDetails";

import withRoot from '../withRoot';

const styles = theme => ({
    org_detail_lite_media: {
        minWidth: "100px",
        minHeight: "100px",
        backgroundPosition: "center",
        borderRadius: "50%",
        boxShadow: `0px 0px 10px 5px ${theme.palette.primary["A200"]}`
    },
    org_detail_lite_card: {
        borderRadius: 3,
        cursor: 'pointer',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: `0 0 10px 5px ${theme.palette.primary["A200"]}`
    },
    org_detail_lite_cardContent: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: theme.spacing.unit * 3
    },
    org_detail_lite_icon: {
        color: theme.palette.primary['100'],
        fontSize: 64,
        marginRight: theme.spacing.unit
    }
});

class MiniOrgDetail extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {classes} = this.props;
        const {org_name, org_link, logoFluid} = this.props;

        return (

            <Link style={{textDecoration: 'none'}} to={`organization/${org_link}`} >
                         <Card className={classes.card}>
      <div className={classes.details}>
          {logoFluid && (
            <Img
                title={`logo${org_name}`}
                alt={`logo of ${org_name}`}
                style={{
                width: '100px'
            }}
                sizes={logoFluid}/>
          )}
          <CardContent className={classes.content}>
          <Typography  component="h5" variant="h5">
          {org_name}
          </Typography>
        </CardContent>
              
      </div>
    </Card>
                      </Link>
  
        );
    }
}

export default withStyles(styles)(MiniOrgDetail);
