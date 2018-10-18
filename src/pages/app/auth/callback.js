import React, {Component} from 'react';
import {connect} from "react-redux";
import {withStyles} from '@material-ui/core/styles';
import Spinner from 'react-spinkit';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import {handleAuthentication} from '../../../components/Account/actions';

const styles = theme => ({
    app_callback_wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: theme.spacing.unit * 12,
        margin: theme.spacing.unit * 2
    },

    app_callback_card : {
        height: 'auto',
        boxShadow: '0 0 0 0',
        paddingTop: theme.spacing.unit * 2,
        paddingLeft: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 3,
        border: `1px solid ${theme.palette.primary['200']}`
    }
});


class AppAuth extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(handleAuthentication());
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.app_callback_wrapper}>
                <Typography variant="display1" className={classes.heading}>
                    Localgov.fyi
                </Typography>
                <Card className={classes.app_callback_card}>
                    <CardContent>
                        <Typography variant="subheading">
                           <Spinner name="ball-beat" color="blue"/>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        );
    }
}

const ConnAppAuth = connect()(withStyles(styles)(AppAuth));

export default ConnAppAuth;