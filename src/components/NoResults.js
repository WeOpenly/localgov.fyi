import React, { Component } from 'react';
import Link from 'gatsby-link';
import {navigate} from '@reach/router';

import { connect } from "react-redux";

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SentimentDissatisfied from '@material-ui/icons/SentimentDissatisfied';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import withRoot from '../withRoot';
import {NO_SEARCH_RESULTS} from './common/tracking_events';
import { trackEvent } from "./common/tracking";

const styles = theme => ({
  no_res_wrapper: {
    position: 'relative',
  },
no_res_icon : {
    fontSize: 48,
    color: theme.palette.primary['500'],
    marginBottom: theme.spacing.unit * 2,
  },
no_res_title : {
    fontWeight: 600,
  },
no_res_paper : {
    position: 'absolute',
    top: -284,
    left: -230,
    height: 280,
    width: 332,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 3,
    borderTop: `6px solid ${theme.palette.primary["500"]}`,
  },
no_res_bootstrapInput : {
    borderRadius: 3,
    // backgroundColor: theme.palette.primary['50'],
    color: theme.palette.primary['200'],
    border: '1px solid #ced4da',
    padding: '10px 12px 12px 12px',
    marginTop: theme.spacing.unit,
    width: '300px',
    transition: theme.transitions.create(['border-color', 'box-shadow'])
  },
no_res_button : {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit,
  },
no_res_afterSubmit : {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
no_res_spinner : {
    color: theme.palette.primary['500'],
  },
no_res_icon : {
    color: theme.palette.primary['100'],
    fontSize: 64,
    marginBottom: theme.spacing.unit * 2,
  },
no_res_divider : {
    marginRight: theme.spacing.unit * 4,
    marginLeft: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 3,
  },
no_res_otherCitiesHeader : {
    marginBottom: theme.spacing.unit * 1,
  },
no_res_link : {
    textDecoration: 'none',
  },
});


const xah_randomize_array = ((arr) => {
  /* [ Fisher-Yates shuffle. can be used on array-like object
  Modify array inplace.
  http://xahlee.info/js/javascript_random_array.html
  version 2017-09-18
  ] */
  let i = arr.length - 1;
  let j;
  while (i >= 1) {
    // random element up to i, include i
    j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
    i--;
  }
  return arr;
});

const encode = (data) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}


class NoResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      searchQuery: '',
      submitting: false,
      success: false,
      failure: false
    };

    this.handleChange = this
      .handleChange
      .bind(this);
    this.handleSubmit = this
      .handleSubmit
      .bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  componentDidMount(){
    const { searchQuery, trackEvent} = this.props;
    this.setState({
      searchQuery
    })
    trackEvent(NO_SEARCH_RESULTS, {search_query: searchQuery})
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
      body: encode({ "form-name": "no-results", "path": currentLoc, "search": this.state.searchQuery, "email": this.state.email})
    })
    .then(() => {
      this.setState({ submitting: false, success: true });
      setTimeout(() => {navigate('/')}, 1000);
    })
    .catch(error => this.setState({submitting: false, failure: true}));

    e.preventDefault();
  }


  render() {
    const { classes, searchQuery } = this.props;
    const otherPlaces = [
      {
        name: 'Atlanta',
        url: '/organization/usa/georgia-state/fulton-county/atlanta-city/ '
      }, {
        name: 'San Francisco',
        url: '/organization/usa/california-state/san-francisco-county/'
      }, {
        name: 'Las Vegas',
        url: '/organization/usa/nevada-state/clark-county/las-vegas-city/'
      }, {
        name: 'San Jose',
        url: '/organization/usa/california-state/santa-clara-county/san-jose-city/'
      }, {
        name: 'Los Angeles',
        url: '/organization/usa/california-state/los-angeles-county/los-angeles-city/'
      }, {
        name: 'Houston',
        url: '/organization/usa/texas-state/harris-county/houston-city/'
      }, {
        name: 'New York',
        url: '/organization/usa/new-york-state/bronx-county/new-york-city/'
      }, {
        name: 'Philadelphia',
        url: '/organization/usa/pennsylvania-state/philadelphia-county/'
      }, {
        name: 'Seattle',
        url: '/organization/usa/washington-state/king-county/seattle-city/'
      }
    ];
    const shuffledArray = xah_randomize_array(otherPlaces);
    const otherLinks = shuffledArray.slice(0,3).map((item, idx) => {
      return (
        <Grid item xs={3}>
          <Link to={item.url} className={classes.no_res_link}>
            <Typography variant="caption" color="primary">{item.name}</Typography>
          </Link>
        </Grid>
      );
    })

    return (
      <Grid container spacing={16} align="center" >
        <Grid item xs='auto' sm={4} />
        <Grid item xs={12} sm={4} >
          <SentimentDissatisfied className={classes.no_res_icon} />
        </Grid>
        <Grid item xs='auto' sm={4} />


        <Grid item xs='auto' sm={4} />
        <Grid item xs={12} sm={4} >
        <Typography variant="title" className={classes.no_res_title}>
            {`We couldn't find any results for your query '${searchQuery}'`}
        </Typography>
        </Grid>
        <Grid item xs='auto' sm={4} />

        <Grid item xs='auto' sm={4} />
        <Grid item xs={12} sm={4} >
        <Typography variant="caption">
          {`We are constantly adding more locations and services. We can drop you a note when results for '${searchQuery}' are available`}
        </Typography>
        </Grid>
        <Grid item xs='auto' sm={4} />
        <Grid item xs='auto' sm={4} />
        <Grid item xs={12} sm={4} >
          <form
            name="no-results"
              method="post"
            action="/"
            onSubmit={this.handleSubmit}
            data-netlify="true"
            data-netlify-honeypot="bot-field"
          >
            <input type="hidden" name="form-name" value="no-results" />
            <p hidden>
              <label>
                Don’t fill this out:{" "}
                <input name="bot-field" onChange={this.handleChange} />
              </label>
            </p>
            <label>
              <input
                name="email"
                type="email"
                placeholder="your@email.com"
                value={this.state.email}
                onChange={this.handleChange}
                className={classes.no_res_bootstrapInput}
              />
            </label>
            <label>
              <input
              name="search"
              type="text"
              value={`${searchQuery}`}
              hidden
            />
            </label>
            <label>
              <input
                name="path"
                type="text"
                value=""
                hidden
              />
            </label>
            <br/>
            <Button size="small" variant="outlined" type="submit" className={classes.no_res_button}>
              Notify me
            </Button>
          </form>
          {this.state.submitting && <Typography>Submitting...</Typography>}
          {this.state.success && <Typography>Thanks! Redirecting home...</Typography>}
        </Grid>
        <Grid item xs='auto' sm={4} />
        <Grid item xs='auto' sm={4} />
        <Grid item xs={12} sm={4} >
          <Divider className={classes.no_res_divider}/>
          <Typography variant="caption" component="h1" className={classes.no_res_otherCitiesHeader}>
            {`Here are some other cities you can checkout`}
          </Typography>
          <Grid container spacing={8}>
            {otherLinks}
            <Grid item xs={3}>
              <Link to="/locations/" className={classes.no_res_link}>
                <Typography variant="caption" color="primary">More cities</Typography>
              </Link>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs='auto' sm={4} />
      </Grid>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    trackEvent: (ev, data) => {
      dispatch(trackEvent(ev, data));
    }
  }
}

const mapStateToProps = function (state, ownProps) {
  return {
    ...ownProps
  };
};

const ConnNoResults = connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(NoResults));

export default ConnNoResults;