import React, { Component } from 'react';
import classNames from 'classnames';
import { withStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Grid from "@material-ui/core/Grid";

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import AddressGoogleMap from './AddressGoogleMap';
import ContactAddressMap from './ContactAddressMap';
import withRoot from '../withRoot';

const styles = theme => ({
    root: {
        marginBottom: theme.spacing.unit,
    },
    linkIconContainer: {
        paddingLeft: 20
    },
    contactListItem: {
        borderBottom: `1px solid ${theme.palette.primary["300"]}`
    },
    contactInfoContainer: {
        // paddingBottom: 24,
        borderRadius: 5,
        boxShadow: `0 0 10px 5px ${theme.palette.primary["A200"]}`
    },
    contactIcon: {
        fontSize: 16
    },
    contactType: {
        paddingTop: 2
    },
    contactDetailValue: {
        paddingLeft: 20
    },
    gridItem: {
        margin: 4
    },
    title: {
        // paddingTop: 4,
        marginBottom: 13.6,
    },
    mapGridItem: {
        width: "100%",
        // marginTop: "-8px"
    },
    detailsGridItem: {
        width: "100%"
    },
    detailsBorderBottom: {
        borderBottom: "1px solid lightGray"
    },
    linkGridItemValue: {
        wordBreak: "break-all"
    },
    detailsGridContainerItem: {
        width: "100%"
    }
});

class ContactDetails extends Component {
    render() {
        const { info, classes } = this.props;
        if (!info) {
            return null;
        }

        if (!info.length > 0) {
            return null;
        }

        const contactAddress = info.find((detail) => detail.contact_type === 'ADDRESS');
        let contactAddressValue = null;
        if (contactAddress) contactAddressValue = contactAddress.contact_value || null;

        const sortedInfo = []
        const sortInfo = (info) => {
            info.forEach((detail) => {
                let type = detail.contact_type;
                if (type === 'ADDRESS') {
                    sortedInfo[0] = detail;
                } else if (type === 'PHONE') {
                    sortedInfo[1] = detail;
                } else if (type === 'EMAIL') {
                    sortedInfo[2] = detail;
                } else if (type === 'FACEBOOK') {
                    sortedInfo[3] = detail;
                } else if (type === 'TWITTER') {
                    sortedInfo[4] = detail;
                }
            })
        }
        sortInfo(info);

        const contactDetailCards = sortedInfo.map((cd, idx, arr) => {
            const iconClasses = {
                'icon': true,
                'contactIcon': true,
                'ion-ios-telephone': cd.contact_type.toLowerCase() === 'phone',
                'ion-location': cd.contact_type.toLowerCase() === 'address',
                'ion-email': cd.contact_type.toLowerCase() === 'email',
            }

            let value = cd.contact_value

            if (!value) {
                value = cd.value
            }

            const contactType = cd.contact_type.toLowerCase();
            if (contactType.toLowerCase() === 'phone') {
                value = (<a href={`tel:${value}`} target="_blank">
                    <Typography variant="body1">
                        {value}
                    </Typography>
                </a>);
            }
            else if (contactType.toLowerCase() === 'address') {
                value = (<a href={`http://maps.google.com/?q=${value}`} target="_blank">
                    <Typography variant="body1">
                        {value}
                    </Typography>
                </a>);
            }
            else if (contactType.toLowerCase() === 'email') {
                value = (<a href={`mailto:${value}`} target="_blank">
                    <Typography variant="body1">
                        {value}
                    </Typography>
                </a>);
            }
            else {
                value = (<a href={`${value}`} target="_blank">
                    <Typography variant="body1" className={classes.linkGridItemValue}>
                        {value}
                    </Typography>
                </a>);
            }

            if (cd.contact_type.toLowerCase() !== 'email' || cd.contact_type.toLowerCase() !== 'phone' || cd.contact_type.toLowerCase() === 'address') {
                iconClasses[`ion-social-${cd.contact_type.toLowerCase()}`] = true
            }

            const contactDetailClassName = classNames(iconClasses);

            return (
                <Grid key={contactType} item className={`${classes.detailsGridItem} ${idx < arr.length - 1 ? classes.detailsBorderBottom : ''}`}>
                    <Grid  container spacing={16} className={classes.gridItem}>
                        <Grid item xs={2}>
                            <div className={classes.linkIconContainer}>
                                <i style={{ fontSize: "24px" }} className={contactDetailClassName}>
                                    {" "}
                                </i>
                            </div>
                        </Grid>
                        <Grid item xs={8}>
                            {value}
                        </Grid>
                    </Grid>
                </Grid>
            );
        });

        return (
            <Grid container spacing={8} className={classes.root}>
                <Grid item xs={12}>
                    <Typography variant="subheading" component="h4" gutterBottom className={classes.title}>
                        Contact Details
                    </Typography>
                    <Paper elevation={1} className={classes.contactInfoContainer}>
                        <Grid container justify="center" direction="column" alignItems="center">
                            <Grid item className={classes.mapGridItem}>
                                <ContactAddressMap contactAddress={contactAddressValue} />
                            </Grid>
                            <Grid item container className={classes.detailsGridContainerItem}>
                                {contactDetailCards}
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}


export default withRoot(withStyles(styles)(ContactDetails));
