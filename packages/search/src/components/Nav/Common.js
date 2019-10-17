



import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from 'gatsby-link';
import HeaderAccountMenu from '../HeaderAccountMenu';

const styles = theme => ({
    index_hero_nav: {
        paddingLeft: theme.spacing.unit,
    },
    index_hero_nav_items: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: theme.spacing.unit,
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
    }
    render() {
        const { classes, location, isMobile } = this.props;

        return (
            <Grid container className={classes.index_hero_nav}>
                <Grid item sm={1} />
                <Grid item sm={10} align="center" className={classes.index_hero_nav_items}>
                    <Typography
                        variant="display1">
                        <a
                            href="/"
                            className={classes.index_hero_app_name}>
                            papergov
                           </a>
                    </Typography>
                    <HeaderAccountMenu isMobile={isMobile} location={location} />
                </Grid>
                <Grid item sm={1} />
            </Grid>
        );
    }
}


export default withStyles(styles)(CommonNav);
