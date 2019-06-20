



import React, { Component } from 'react';

import { isMobileOnly } from 'react-device-detect';


import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from 'gatsby-link';
import HeaderAccountMenu from '../HeaderAccountMenu';

const styles = theme => ({
    index_hero_nav: {
        paddingLeft: theme.spacing(1),
    },
    index_hero_nav_items: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: theme.spacing(1),
    },
    index_hero_app_name: {
        textDecoration: 'none',
        cursor: 'pointer',
        '&:hover': {
            color: theme.palette.primary['700'],
        }
    },
});


class CommonNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMobileOnly: false
        };
    }

    componentDidMount() {
        this.setState({ isMobileOnly: isMobileOnly });
    }

    render() {
        const { classes, location } = this.props;

        return (
            <Grid container className={classes.index_hero_nav}>
                <Grid item sm={1} />
                <Grid item sm={10} align="center" className={classes.index_hero_nav_items}>
                 
                     
                    <Typography
                        component="h3"
                        variant="h6">
                            evergov
                                 </Typography>
                         
               
                    <HeaderAccountMenu location={location} />
                </Grid>
                <Grid item sm={1} />
            </Grid>
        );
    }
}


export default withStyles(styles)(CommonNav);
