import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, submit } from 'redux-form';
import Link from 'gatsby-link';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import withRoot from '../withRoot';
// import { register } from '../../actions/authentication';

const styles = theme => ({
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    background: theme.palette.common.white,
    color: theme.palette.primary['700'],
    boxShadow: `0 0 0 0 ${theme.palette.common.white}`,
    borderBottom: `1px solid ${theme.palette.primary['50']}`
  },
  title:{
    padding: theme.spacing.unit * 2,
  },
  formWrapper: {
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    paddingTop: theme.spacing.unit * 12,
  },
  heading: {
    marginBottom: theme.spacing.unit * 3,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'center',
    alignItems: 'center',
    width: 400,
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
  },
  wrapperWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  fieldWrapper: {
    width: '100%',
    marginBottom: theme.spacing.unit * 2,
  },
  button: {
    marginTop: theme.spacing.unit * 2,
  },
  success: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  link: {
    // cursor: 'pointer',
    textDecoration: 'none',
  },
});

const validate = values => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Please enter a valid email address';
  }
  if (!values.password) {
    errors.password = 'Required';
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = 'Required';
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords must match';
  }

  return errors;
}

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.renderTextField = this.renderTextField.bind(this);
  }

  renderTextField({
    input,
    label,
    type,
    meta: { touched, error },
    ...custom
  }) {
    return (
      <TextField
        type={type}
        label={touched && error ? error : label}
        error={touched && !!error}
        {...input}
        {...custom}
      />
    );
  }

  render() {
    const {
      classes,
      dispatch,
      authentication,
      error,
      handleSubmit,
      pristine,
      invalid,
      submitting,
    } = this.props;
    // const { registered } = authentication;

    return (
      <Fragment>
        <AppBar className={classes.header} position="static">
          <Link to="/" className={classes.link}>
            <Typography variant="display1" color="inherit" className={classes.title}>
              Localgov.fyi
            </Typography>
          </Link>
          <Typography variant="body1" color="primary">
            for Government Agencies
          </Typography>
        </AppBar>
        <Grid container>
          <Grid item xs={12} className={classes.formWrapper}>
            <Typography variant="display1" className={classes.heading}>
              Sign in to access your dashboard
            </Typography>
            <form onSubmit={handleSubmit} className={classes.form}>
              <div className={classes.fieldWrapper}>
                <Field
                  name="email"
                  component={this.renderTextField}
                  type="email"
                  label="Email"
                  fullWidth
                />
              </div>
              <div className={classes.fieldWrapper}>
                <Field
                  name="password"
                  component={this.renderTextField}
                  type="password"
                  label="Password"
                  fullWidth
                />
              </div>
              {error && <Typography color="error">{error}</Typography>}
              <Button
                variant="contained"
                color="primary"
                disabled={pristine || invalid || submitting}
                className={classes.button}
                onClick={() => dispatch(submit('SignIn'))}
              >
                Sign In
              </Button>
            </form>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

SignIn = reduxForm({
  form: 'SignIn',
  validate,
  onSubmit: ()=>{}, // update after creating thunk
})(SignIn);

SignIn = connect(
  state => ({
    authentication: state.authentication,
  })
)(SignIn);

export default withRoot(withStyles(styles)(SignIn));
