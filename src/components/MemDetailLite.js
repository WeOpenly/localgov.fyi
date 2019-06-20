import React, {Component} from "react";


import {withStyles} from '@material-ui/core';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import ContactDetails from "./ContactDetails";

const styles = theme => ({
    media: {
        minWidth: "100px",
        minHeight: "100px",
        backgroundPosition: "center",
        borderRadius: "50%",
        boxShadow: `0 0 3px 1px ${theme.palette.primary["A200"]}`
    },
    mediaContainer: {
        paddingTop: 24,
        borderRadius: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: `0 0 3px 1px ${theme.palette.primary["A200"]}`
    }
});

class MemDetailLite extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {classes} = this.props;
        const {mem_name, mem_post, contact_details} = this.props.detail;

        return <Grid container spacing={8}>
            <Grid item xs={12} sm={12} md={12}>
                <Card className={classes.mediaContainer}>
                    <CardContent>
                        <Typography align="center" varant="h6">
                            {mem_name}
                        </Typography>
                        <Typography align="center" variant="caption">
                            {mem_post}
                        </Typography>
                    </CardContent>
                </Card>
                <br/> {contact_details && <ContactDetails info={contact_details}/>}
            </Grid>
        </Grid>;
    }
}


export default withStyles(styles)(MemDetailLite);
