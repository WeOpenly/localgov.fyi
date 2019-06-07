import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import Link from "gatsby-link";
import { StaticQuery, graphql } from "gatsby"
import { isMobileOnly } from 'react-device-detect';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { navigate } from '@reach/router';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Img from "gatsby-image";
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
    ser_gloss_gridItemLocation_mob_focus: {
        boxShadow: `0 0 3px 0px ${theme.palette.primary['600']}`
    },
    suggest_loc_card: {
        display: 'flex',
        paddingTop: theme.spacing.unit*3,
    },
    suggest_loc_org_details: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    suggest_loc_logo: {
        width: 56,
        zIndex: '190',
        height: 56,
        boxShadow: `0 0 0px 1px ${theme.palette.primary["200"]}`,
        border: '1px solid #fff',
        marginRight: theme.spacing.unit * 2,
    }
});



class GlossaryCard extends Component {
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
        const { classes, name, description, logoUrl } = this.props;


        const border = `#AB93FF`
        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    textDecoration: "none",
                    borderLeft: `2px solid ${border}`,
                    boxShadow:
                        "0px 3px 16px 0px rgba(0,0,0,0.1),0px 1px 1px 0px rgba(0,0,0,0.07),0px 2px 6px 1px rgba(0,0,0,0.06)"
                }}
            >
                <CardContent className={classes.suggest_loc_card}>
                    {logoUrl ? (
                        <Avatar
                            alt={name}
                            className={classes.suggest_loc_logo}
                            src={`${logoUrl}`}
                        />
                    ) : null}
                    <div className={classes.suggest_loc_org_details}>
                        <Typography variant="title" gutterBottom>
                            {name}
                        </Typography>
                        <Typography variant="body1">{description}</Typography>
                    </div>
                </CardContent>
            </div>
        );
    }
}

export default withStyles(styles)(GlossaryCard);
