import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";

import Spinner from 'react-spinkit';
import {isMobileOnly} from 'react-device-detect';

import {SubmissionError} from 'redux-form';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import queryString from 'query-string'
import {withStyles} from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import RegisterForm from './RegisterForm';

import {toggleRegister, handleRegisterRequest} from './actions';


import withRoot from '../../withRoot';
import { query } from '../../pages';
import { navigate } from '@reach/router';

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

class RegisterDialog extends React.Component {
    constructor(props) {
        super(props);
        this.handleRegisterRequest = this.handleRegisterRequest.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
    }

    closeDialog(){
        const {dispatch} = this.props;
        dispatch(toggleRegister(false));
        const values = queryString.parse(this.props.location.search);
        let newValues = values;

        if (values && values.register) {
            delete newValues['register'];
        }

        const newQueryString= queryString.stringify(newValues);
        navigate(`${this.props.location.pathname}${newQueryString}`);
    }

    handleRegisterRequest(values){
        return handleRegisterRequest(values)
    }

    componentDidMount() {
        const {dispatch} = this.props;
        const values = queryString.parse(this.props.location.search);

        if (values && values.register){
            dispatch(toggleRegister(true));
        }
    }

    render() {
        const {classes, account} = this.props;
        const {showRegister, registerEmailVerificationRequired} = account;

        return (
           <Dialog
          open={showRegister}
          onClose={this.closeDialog}
          aria-labelledby="register-dialog-title"
          aria-describedby="register-dialog-description"
        >
          <DialogTitle id="register-dialog-title">
              {"Create a localgov.fyi account"}
          </DialogTitle>
          <DialogContent>
              {registerEmailVerificationRequired? <div>
                    We've sent you an email, verify to finish creating account
                  </div>:(<RegisterForm onSubmit={this.handleRegisterRequest}/>)}
          </DialogContent>
        </Dialog>
        );
    }
}

RegisterDialog.propTypes = {
    classes: PropTypes.object.isRequired
};


const mapStateToProps = function (state, ownProps) {
    return {
        ...state,
        ...ownProps
    };
};

export default connect(mapStateToProps)(withStyles(styles)(RegisterDialog));