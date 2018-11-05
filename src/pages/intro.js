/*global encode b:true*/
/*eslint no-undef: "error"*/

import React, { Component } from 'react';
import Link from 'gatsby-link';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import withRoot from '../withRoot';

const styles = theme => ({
  heroSection: {
    marginTop: theme.spacing.unit * 20,
  },
  headline: {
    color: theme.palette.primary['500'],
  },
  form: {
    marginTop: theme.spacing.unit * 6,
  },
  bootstrapInput: {
    borderRadius: 3,
    color: theme.palette.primary['200'],
    border: '1px solid #ced4da',
    padding: '10px 12px 12px 12px',
    marginTop: theme.spacing.unit,
    width: '300px',
    transition: theme.transitions.create(['border-color', 'box-shadow'])
  },
  button: {
    marginTop: theme.spacing.unit,
  },
});

class Intro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      submitting: false,
      success: false,
      failure: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    let currentLoc = '';
    if (window.location && window.location.pathname) {
      currentLoc = window.location.pathname
    }

    this.setState({submitting: true});
    fetch("/", {
      method: "POST",
      headers: {
          "Content-Type": "application/x-www-form-urlencoded"
      },
      body: encode({ "form-name": "intro", "path": currentLoc, "searchQuery": this.state.searchQuery, "email": this.state.email})
    })
    .then(() => {
      this.setState({ submitting: false, success: true });
    })
    .catch(error => this.setState({submitting: false, failure: true}));

    e.preventDefault();
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid container align="center">
          <Grid item xs={1} md={2} />
          <Grid item xs={10} md={8} className={classes.heroSection}>
            <Typography
              variant="display3"
              align="center"
              component="h1"
              className={classes.headline}
            >
              Finding local government services
            </Typography>
            <Typography
              variant="display3"
              align="center"
              component="h1"
              className={classes.headline}
              gutterBottom
            >
              has never been easier.
            </Typography>
            <Typography
              variant="subheading"
              align="center"
              component="p"
            >
              Our search engine is the fastest way to access any local government service online.
            </Typography>
          </Grid>
          <Grid item xs={1} md={2} />
          <Grid item xs='auto' md={3} />
            <Grid item xs={12} md={6} className={classes.form}>
              <Typography
                variant="body1"
                align="center"
                component="p"
              >
                Get notified when we launch in your location:
              </Typography>
              <form
                name="intro"
                onSubmit={this.handleSubmit}
                data-netlify="true"
                data-netlify-honeypot="bot-field"
              >
                <label>
                  <input
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={this.state.email}
                    onChange={this.handleChange}
                    className={classes.bootstrapInput}
                  />
                </label>
                <br/>
                <Button size="small" variant="outlined" type="submit" className={classes.button}>
                  Notify me
                </Button>
              </form>
              {this.state.submitting && <Typography>Submitting...</Typography>}
              {this.state.success && <Typography>Thanks! We'll be in touch soon.</Typography>}
            </Grid>
            <Grid item xs='auto' md={3} />
        </Grid>
      </div>
    );
  }
}

export default withRoot(withStyles(styles)(Intro));
