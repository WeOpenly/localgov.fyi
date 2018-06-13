import React from "react";
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import Share from "../components/Share";
import HeaderWithSearch from '../components/HeaderWithSearch';
import withRoot from '../withRoot';

const styles = theme => ({
    root: {
        width: "100%",
        height: "100%",
        margin: 0,
        padding: 0
    },
    floatingButton: {
        color: theme.palette.common.white,
        background: theme.palette.primary['700'],
        position: 'fixed',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
        zIndex: 1
    }
});

class DetailTemplate extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {classes} = this.props;

        return (<div className={classes.root}>
            <HeaderWithSearch />
            <Grid container spacing={0}>
                <Grid item xs={1}/>
                <Grid item xs={10}>
                {this.props.children()}
                </Grid>
                <Grid item xs={1}  />
            </Grid>
            <Share/>
        </div>);
    }
}

export default withRoot(withStyles(styles)(DetailTemplate));

