import React, {Component} from 'react';
import {connect} from "react-redux";
import {withStyles} from '@material-ui/core/styles';

import withRoot from '../../../withRoot';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import {handleAuthentication} from '../../../components/Account/actions';

const styles = theme => ({
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        background: theme.palette.common.white,
        color: theme.palette.primary['700'],
        boxShadow: `0 0 0 0 ${theme.palette.common.white}`,
        borderBottom: `1px solid ${theme.palette.primary['50']}`
    },
    link: {
        textDecoration: 'none'
    },
    title: {
        padding: theme.spacing.unit * 2
    },
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: theme.spacing.unit * 12,
        margin: theme.spacing.unit * 2
    },
    heading: {
        marginBottom: theme.spacing.unit * 5
    },
    card: {
        height: 'auto',
        boxShadow: '0 0 0 0',
        paddingTop: theme.spacing.unit * 2,
        paddingLeft: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 3,
        border: `1px solid ${theme.palette.primary['200']}`
    },
    listItem: {
        display: 'flex',
        margin: theme.spacing.unit *2
    },
    icon: {
        marginRight: theme.spacing.unit
    },
    cardActions: {
        marginBottom: theme.spacing.unit * 2
    },
    buttonWrapper: {
        width: '100%',
        paddingLeft: theme.spacing.unit,
        paddingRight: theme.spacing.unit
    },
    button: {
        width: '100%',
        background: `${theme.palette.primary['500']}`
    }
});


class AppAuth extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {dispatch} = this.props;
        console.log('here');
        dispatch(handleAuthentication());
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.wrapper}>
                <Typography variant="display1" className={classes.heading}>
                    Localgov.fyi
                </Typography>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography variant="subheading">
                            Taking you back to application ...
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        );
    }
}

const ConnAppAuth = connect()(withRoot(withStyles(styles)(AppAuth)));

export default ConnAppAuth;