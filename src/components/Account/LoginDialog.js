import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";

import Spinner from 'react-spinkit';
import {isMobileOnly} from 'react-device-detect';
import {navigate} from '@reach/router';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import queryString from 'query-string'
import {withStyles} from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import LoginForm from './LoginForm';

import {toggleLogin, handleLoginRequest} from './actions';


import withRoot from '../../withRoot';

const windowGlobal = typeof window !== 'undefined'
    ? window
    : null

const styles = theme => ({
    mobile: {
        width: '100%'
    },
    serviceSuggestWrapper: {
        border: '1px solid lightGray',
        borderRadius: 4,
        marginTop: theme.spacing.unit * 6,
        marginBottom: theme.spacing.unit * 2
    },
    newSuggestWrapper: {
        border: '1px solid lightGray',
        borderRadius: 4
    }
});

class LoginDialog extends React.Component {
    constructor(props) {
        super(props);
        this.handleLoginRequest = this.handleLoginRequest.bind(this);
        this.closeLoginDialog = this.closeLoginDialog.bind(this);
    }

    closeLoginDialog(){
        const {dispatch} = this.props;
        dispatch(toggleLogin(false));
        const values = queryString.parse(this.props.location.search);
        let newValues = values;

        if (values && values.register) {
            delete newValues['login'];
        }

        const newQueryString= queryString.stringify(newValues);
        navigate(`${this.props.location.pathname}${newQueryString}`);
  
    }

    handleLoginRequest(values){
        return handleLoginRequest(values)
    }

    componentDidMount() {
        const {dispatch} = this.props;
        const values = queryString.parse(this.props.location.search);

        if (values && values.login){
            dispatch(toggleLogin(true));
        }
    }

    render() {
        const {classes, account} = this.props;
        const {showLogin} = account;

        return (
           <Dialog
          open={showLogin}
          onClose={this.closeLoginDialog}
          aria-labelledby="login-dialog-title"
          aria-describedby="login-dialog-description"
        >
          <DialogTitle id="login-dialog-title">
              {"Login to your localgov.fyi account"}
          </DialogTitle>
          <DialogContent>
              <LoginForm onSubmit={this.handleLoginRequest}/>
          </DialogContent>
        </Dialog>
        );
    }
}

LoginDialog.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = function (state, ownProps) {
    return {
        ...state,
        ...ownProps
    };
};

export default connect(mapStateToProps)(withRoot(withStyles(styles)(LoginDialog)));