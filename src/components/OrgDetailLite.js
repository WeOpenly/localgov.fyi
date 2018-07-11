import React, {Component} from "react";

import {navigateTo} from 'gatsby-link';

import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import CardContent from '@material-ui/core/CardContent';
import AccountBalance from '@material-ui/icons/AccountBalance';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import ContactDetails from "./ContactDetails";

import withRoot from '../withRoot';

const styles = theme => ({
    media: {
        minWidth: "100px",
        minHeight: "100px",
        backgroundPosition: "center",
        borderRadius: "50%",
        boxShadow: `0px 0px 10px 5px ${theme.palette.primary["A200"]}`
    },
    mediaContainer: {
        paddingTop: 24,
        borderRadius: 3,
        cursor: 'pointer',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: `0 0 10px 5px ${theme.palette.primary["A200"]}`
    },
    icon: {
        color: theme.palette.primary['100'],
        fontSize: 64,
        marginBottom: theme.spacing.unit * 2,
    },
});

class OrgDetailLite extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {classes} = this.props;
        const {org_name, org_id, contact_details, heading} = this.props.detail;

        return <Grid container spacing={8}>
            <Grid item xs={12} sm={12} md={12}>
                <Typography variant="subheading" gutterBottom>
                    {heading}
                </Typography>
                <Card className={classes.mediaContainer} onClick={() => navigateTo(`/organization/${org_id}`)}>
                    <CardContent style={{display: 'flex', justifyContent: 'center'}}>
                        <AccountBalance className={classes.icon} />
                        <Typography align="center" variant="title">
                            {org_name}
                        </Typography>
                    </CardContent>
                </Card>
                <br/> {contact_details && <ContactDetails info={contact_details}/>}
            </Grid>
        </Grid>;
    }
}

export default withStyles(styles)(OrgDetailLite);
