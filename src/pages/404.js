import React, { Component } from 'react';
import Link from 'gatsby-link';
import {connect} from "react-redux";

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import withRoot from '../withRoot';
import {trackView} from "../components/common/tracking";

const styles = theme => ({
    root: {
        height: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        color: theme.palette.primary['100'],
        fontSize: 64,
        marginBottom: theme.spacing.unit * 2,
    },
    divider:{
        marginRight: theme.spacing.unit * 4,
        marginLeft: theme.spacing.unit * 4,
        marginBottom: theme.spacing.unit * 3,
    },
    link: {
        textDecoration: 'none',
    },
});

class NotFound extends Component {
    constructor(props) {
        super(props);
    }


    componentDidMount() {
        const { trackView } = this.props;
        trackView();
    }


    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid container spacing={16} align="center">
                    <Grid item xs='auto' sm={4} />
                    <Grid item xs={12} sm={4}>
                        <Typography variant="display3">
                            {`Oops!`} 
                        </Typography>
                    </Grid>
                    <Grid item xs='auto' sm={4} />

                    <Grid item xs='auto' sm={4} />
                    <Grid item xs={12} sm={4}>
                        <Typography variant="subheading">
                            {`This page no longer exists or hasn't been created yet.`}
                        </Typography>
                    </Grid>
                    <Grid item xs='auto' sm={4} />

                    <Grid item xs='auto' sm={4} />
                    <Grid item xs={12} sm={4}>
                        <Divider className={classes.divider} />
                        <Grid container spacing={8}>
                            <Grid item xs={6}>
                                <Button variant="outlined" onClick={() => this.props.history.goBack()} className={classes.link}>
                                    Go back
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Link to="/" className={classes.link}>
                                    <Button variant="outlined">Take me home</Button>
                                </Link>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs='auto' sm={4} />
                </Grid>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        trackView: () => {
            dispatch(trackView('no_page_found', null));
        }
    }
}

const mapStateToProps = function (state, ownProps) {
    return {
        ...ownProps
    };
};

const ConnNotFound = connect(mapStateToProps, mapDispatchToProps)(withRoot(withStyles(styles)(NotFound)));

export default ConnNotFound;
