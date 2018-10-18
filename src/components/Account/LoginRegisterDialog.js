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
import Divider from '@material-ui/core/Divider';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Button from '@material-ui/core/Button';
import {toggleAccountForm, handleLoginRequest, handleRegisterRequest} from './actions';


const windowGlobal = typeof window !== 'undefined'
    ? window
    : null

const styles = theme => ({
account_dialog_dialog:{
    height: '460px'
},
account_form_loginEmbed:{

},
account_form_registerinstead:{
    marginTop: theme.spacing.unit*4,
    display: 'flex',
}

});

class LoginRegisterDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showRegisterForm: false
        }
        this.handleLoginRequest = this.handleLoginRequest.bind(this);
        this.closeLoginDialog = this.closeLoginDialog.bind(this);
        this.toggleRegister = this.toggleRegister.bind(this);
        this.handleRegisterRequest = this.handleRegisterRequest.bind(this);
    }

    toggleRegister(toggle){
        this.setState({
            showRegisterForm: toggle,
        })
    }

    closeLoginDialog(){
        const {dispatch} = this.props;

        dispatch(toggleAccountForm(false));
        const values = queryString.parse(this.props.location.search);
        let newValues = values;

        if (values && values.register) {
            delete newValues['login'];
             const newQueryString= queryString.stringify(newValues);
            navigate(`${this.props.location.pathname}${newQueryString}`);
        }
    
        this.setState({
            showRegisterForm: false,
        })
    }

    handleLoginRequest(values){
        return handleLoginRequest(values)
    }

    handleRegisterRequest(values){
        return handleRegisterRequest(values)
    }

    componentDidMount() {
        const {dispatch, location} = this.props;
        if (location){
            const values = queryString.parse(this.props.location.search);

            if (values && values.login){
                dispatch(toggleAccountForm(true));
            }
        }
    }

    render() {
        const {classes, account} = this.props;
        const {showAccountForm, registerEmailVerificationRequired} = account;

        const registerFormContents = registerEmailVerificationRequired ? (<div>
                    We've sent you an email, verify to finish creating account
                  </div>) : 
                  (<div className={classes.account_form_loginEmbed}>
                  <RegisterForm onSubmit={this.handleRegisterRequest}/>
                   <Button type="button"
                            className={classes.account_form_registerinstead}
                            component="a"
                            onClick={() => this.toggleRegister(false)}>
                            Login instead
                    </Button>
                  </div>
                  );

        const loginFormContent = registerEmailVerificationRequired ? (<div>
                    We've sent you an email, verify to finish creating account
                  </div>) : (
                      <div className={classes.account_form_loginEmbed}>
                        <LoginForm onSubmit={this.handleLoginRequest}/>
                    
                          <Button
                            type="button"
                            className={classes.account_form_registerinstead}
                            component="a"
                            onClick={() => this.toggleRegister(true)}>
                            Register instead
                        </Button>
                      </div>
                 )
        return (
           <Dialog open={showAccountForm}
           className={classes.account_dialog_dialog}
                    onClose={this.closeLoginDialog}
                    aria-labelledby="login-dialog-title"
                    aria-describedby="login-dialog-description" >
          <DialogContent >
              {this.state.showRegisterForm ?  registerFormContents :  loginFormContent
              }
          </DialogContent>
        </Dialog>
        );
    }
}

LoginRegisterDialog.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = function (state, ownProps) {
    return {
        ...state,
        ...ownProps
    };
};

export default connect(mapStateToProps)(withStyles(styles)(LoginRegisterDialog));