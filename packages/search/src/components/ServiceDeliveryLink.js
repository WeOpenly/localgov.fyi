import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import speStyles from "./spectre.min.module.css";
import iconStyles from "./typicons.min.module.css";


import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import SvgIcon from '@material-ui/core/SvgIcon';
import Mood from '@material-ui/icons/Mood';
import HighLightOutlined from '@material-ui/icons/HighlightOutlined';

import SentimentDissatisfied from '@material-ui/icons/SentimentDissatisfied';
import Cancel from '@material-ui/icons/Cancel';
import MoodBad from '@material-ui/icons/MoodBad';
import CircularProgress from '@material-ui/core/CircularProgress';;

import withRoot from '../withRoot';
import {trackClick, trackInput} from "./common/tracking";
import {toggleFeedbackDialog, toggleNotifyDialog} from './UserRequests/actions';
import {navigate, redirectTo} from '@reach/router';

import {encode} from 'universal-base64';
import ShareBox from './ShareBox';
import SvgUsers from '../svgIcons/users';

const styles = theme => ({
  ser_del_link_root: {
    marginBottom: theme.spacing.unit
  },
  ser_del_link_media: {
    minWidth: "100px",
    minHeight: "100px",
    backgroundPosition: "center",
    borderRadius: "50%",
    boxShadow: `0 0 2px 1px ${theme.palette.primary["50"]}`
  },
  ser_del_link_mediaContainer: {
    paddingTop: theme.spacing.unit * 2,
    borderRadius: 3,
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: `0 0 0 0`,
    border: `1px solid ${theme.palette.primary["50"]}`
  },
  ser_del_link_feedbackIcon: {
    margin: theme.spacing.unit
  },
  ser_del_link_content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  ser_del_link_button: {
    width: "100%",
    marginBottom: "4px",
    "&:hover": {
      color: "white",
      backgroundColor: theme.palette.primary["400"]
    }
  },
  ser_del_link_button_qp: {
    width: "100%",
    marginBottom: "4px",
    color: "white",
     "&:visited": {
      color: `white !important`,
    }
  },
  ser_del_link_paper: {
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingTop: theme.spacing.unit * 2,
    // borderTop : `6px solid ${theme.palette.primary["500"]}`,
    backgroundImage: `linear-gradient(to left bottom, #6f47ff, #5d38f2, #4829e4, #3017d7)`,
    backgroundColor: theme.palette.primary["400"]
  },
  ser_del_link_title: {
    color: theme.palette.common.white,
    paddingBottom: theme.spacing.unit * 2
  },
  ser_del_link_satisfiedDialog: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: theme.spacing.unit * 4
  },
  ser_del_link_form: {
    width: "350px"
  },
  ser_del_link_bootstrapInput: {
    borderRadius: 3,
    color: theme.palette.primary["200"],
    border: "1px solid #ced4da",
    padding: "10px 12px 12px 12px",
    marginTop: theme.spacing.unit,
    width: "100%",
    transition: theme.transitions.create(["border-color", "box-shadow"])
  },
  ser_del_link_bootstrapInputComment: {
    borderRadius: 3,
    color: theme.palette.primary["200"],
    border: "1px solid #ced4da",
    padding: "10px 12px 12px 12px",
    marginTop: theme.spacing.unit,
    width: "100%",
    height: "100px",
    wordBreak: "break-word",
    transition: theme.transitions.create(["border-color", "box-shadow"])
  },
  ser_del_link_dialogButton: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    backgroundColor: "white",
    color: theme.palette.primary["700"],
    textTransform: "capitalize",
    "&:hover": {
      color: "white"
    }
  },
  ser_del_button_msg_container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    justifyContent: "space-between"
  },
  ser_del_link_dialogButton2: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
  },
  ser_del_link_afterSubmit: {
    margin: theme.spacing.unit * 6,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  ser_del_link_spinner: {
    color: theme.palette.primary["500"]
  },
  ser_del_link_icon: {
    color: theme.palette.primary["500"],
    fontSize: 32,
    marginBottom: theme.spacing.unit * 2
  },
  ser_del_link_successIcon: {
    color: theme.palette.primary["100"],
    fontSize: 56,
    margin: theme.spacing.unit * 2
  },
  ser_del_link_bodyText: {
    color: theme.palette.common.white
  },
  ser_del_redir: {},
  ser_del_link_close: {
    position: "absolute",
    top: "8px",
    right: "8px"
  },
  ser_del_link_icymi: {
    display: "flex",
    alignItems: "center",
    paddingTop: theme.spacing.unit
  },
  ser_del_link_icymi_icon: {
    color: theme.palette.primary["100"],
    margin: theme.spacing.unit
  },
  ser_del_link_icymi_text: {
    color: theme.palette.primary["100"]
  },
  template_views_card_item: {
    display: "flex",
    justifyContent: "center"
  },
  template_views_card_item_mob: {
    display: "flex"
  },
  template_views_card_mob: {
    display: "flex",
    flexWrap: "wrap",
    paddingLeft: theme.spacing.unit
  },
  template_views_card: {
    display: "flex",
    flexWrap: "wrap",
    padding: theme.spacing.unit
  },
  template_views_message: {
    paddingLeft: theme.spacing.unit,
    paddingTop: theme.spacing.unit / 4
  },
  template_views_message_text: {
    fontWeight: 500,
    textAlign: "left"
  }
});

const windowGlobal = typeof window !== 'undefined' && window

const encodeBody = (data) => {
  return Object
    .keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

class ServiceDeliveryLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectClicked: false,
      feedbackOpen: false,
      showSatisfied: true,
      satisfied: null,
      email: '',
      feedbackComment: '',
      submitting: false,
      success: false,
      failure: false
    };
    this.handleClick = this
      .handleClick
      .bind(this);
    this.handleGood = this
      .handleGood
      .bind(this);
    this.handleBad = this
      .handleBad
      .bind(this);
    this.handleClose = this
      .handleClose
      .bind(this);
    this.handleChange = this
      .handleChange
      .bind(this);
    this.handleSubmit = this
      .handleSubmit
      .bind(this);
    this.handleReset = this
      .handleReset
      .bind(this);
  }

  handleClick() {
    const {tglFeedbackDialog} = this.props;

    setTimeout(() => {
      this.setState({redirectClicked: false});
      tglFeedbackDialog(true);
    }, 100);
  }

  handleGood() {
    const {trackFeedback} = this.props;
    let currentLoc = '';
    if (window.location && window.location.pathname) {
      currentLoc = window.location.pathname
    }

    this.setState({showSatisfied: false, satisfied: true, submitting: true});

    fetch("/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: encodeBody({"form-name": "serviceDeliveryFeedback", "path": currentLoc, "satisfied": true})
    }).then(() => this.setState({submitting: false, success: true})).catch(error => this.setState({submitting: false, failure: true}));

    trackFeedback({satisfied: true, feedbackComment: this.state.feedbackComment});
  }

  handleBad() {
    const {trackFeedback} = this.props;
    let currentLoc = '';
    if (window.location && window.location.pathname) {
      currentLoc = window.location.pathname
    }
    this.setState({
      showSatisfied: false,
      satisfied: false
    }, () => fetch("/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: encodeBody({"form-name": "serviceDeliveryFeedback", "path": currentLoc, "satisfied": false})
    }).then(() => this.setState({submitting: this.state.submitting, success: this.state.success})).catch(error => this.setState({submitting: this.state.submitting, failure: this.state.success})));
    trackFeedback({satisfied: false, feedbackComment: this.state.feedbackComment});
  }

  handleClose() {
    const {id} = this.props;

    if (windowGlobal && windowGlobal.localStorage) {
      const remClosedone = localStorage.getItem(`rem_close_${id}`);
      if (!remClosedone) {
        this
          .props
          .tglNotifyDialog(true);
      }
    }

    this
      .props
      .tglFeedbackDialog(false)
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    const {trackFeedback} = this.props;
    let currentLoc = '';
    if (window.location && window.location.pathname) {
      currentLoc = window.location.pathname
    }
    e.preventDefault();

    this.setState({submitting: true});
    fetch("/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: encodeBody({"form-name": "serviceDeliveryFeedback", "path": currentLoc, "satisfied": this.state.satisfied, "feedbackComment": this.state.feedbackComment, "email": this.state.email})
    }).then(() => this.setState({submitting: false, success: true}))
      .catch(error => this.setState({submitting: false, failure: true}))
      .then(() => {});

    trackFeedback({satisfied: this.state.satisfied, feedbackComment: this.state.feedbackComment});
  }

  handleReset() {
    this.setState({submitting: false, success: false, failure: false});
  }

  render() {
    const { showFeedbackDialog, classes, serDelLinks, org_name, orgNameOnly, service_name, views} = this.props;
    const {
      feedbackOpen,
      showSatisfied,
      feedbackComment,
      email,
      submitting,
      success,
      failure
    } = this.state;

    let canQuickPay = false;

    if (
      service_name.includes("Activity") ||
      service_name.includes("Register") ||
      service_name.includes("Apply") ||
      service_name.includes("Check")
    ) {
      canQuickPay = false;
    }


    if (!serDelLinks) {
      return null;
    }

    if (serDelLinks.length === 0) {
      return null;
    }

    let moreThan = 10;

    if (views) {
      let viewsAgg = views.map(item => item.views).reduce((a, b) => a + b);

      if (viewsAgg && viewsAgg / 10 > 1) {
        moreThan = 10 * Math.ceil(viewsAgg / 10);
      }
    }

    let serButtons = null;
    let qpButton = null;
    let linkText = 'Quick Pay';
    if(serDelLinks){
      serButtons = serDelLinks.map((link, idx) => {
        const data = {
          's': service_name,
          'o': orgNameOnly,
          'u': link.url
        }
        const encodedData = encode(JSON.stringify(data))
        const redir = `/deep_link/?data=${encodedData}`
        linkText = `Quick ${link.link_name}`
        return (
          <Button
            key={link.link_name}
            href={redir}
            onClick={this.handleClick}
            target="_blank"
            variant="outlined"
            color="primary"
            size="small"
            className={classes.ser_del_link_button}>
            {this.state.redirectClicked
              ? (<CircularProgress />)
              : `${link.link_name}`}
          </Button>
        );
      });
    }

    if(canQuickPay){
      const redir = 'https://pay.papergov.com/?utm_source=service_page';
      qpButton = (
        <Button
          key={"qp-button"}
          href={redir}
          onClick={this.handleClick}
          target="_blank"
          variant="contained"
          color="primary"
          size="small"
          style={{
            marginBottom: '4px',
       
          }}
          className={classes.ser_del_link_button_qp}
        >
          {this.state.redirectClicked ? <CircularProgress /> : `${linkText}`}
        </Button>
      );
    }

    const dialog = (
      <Dialog
        fullWidth={false}
        maxWidth='sm'
        style={{
        maxHeight: '480px'
      }}
        scroll="body"
        aria-labelledby="ser-notify-form-dialog-title"
        open={showFeedbackDialog}
        onClose={this.handleClose}>
        <Paper className={classes.ser_del_link_paper}>
          {showSatisfied && <div className={classes.ser_del_link_satisfiedDialog}>
            <div className={classes.ser_del_link_close}>
              <Cancel
                style={{
                cursor: 'pointer'
              }}
                onClick={this.handleClose}
                color='disabled'/>
            </div>
            <Typography
              id="ser-notify-form-dialog-title"
              variant="headline"
              component="h2"
              className={classes.ser_del_link_title}>
              How was your experience with papergov?
            </Typography>
            <Button
              onClick={this.handleGood}
              variant="extendedFab"
              color="primary"
              type="submit"
              className={classes.ser_del_link_dialogButton}>
              <Mood className={classes.ser_del_link_feedbackIcon}/>
              Good so far!
            </Button>
            <Button
              onClick={this.handleBad}
              variant="extendedFab"
              color="primary"
              type="submit"
              className={classes.ser_del_link_dialogButton}>
              <SentimentDissatisfied className={classes.ser_del_link_feedbackIcon}/>
              It could have been better.
            </Button>
            <div className={classes.ser_del_link_icymi}>
              <HighLightOutlined style={{fontSize: '20px'}} className={classes.ser_del_link_icymi_icon} /> <Typography
                variant="caption"
                className={classes.ser_del_link_icymi_text}>
                In case you missed it, the link opens in a new tab of your browser
              </Typography>
            </div>
          </div>}
          {(!showSatisfied && !success && !failure && !submitting) && <Fragment>
            <div className={classes.ser_del_link_satisfiedDialog}>
              <Typography
                variant="headline"
                component="h2"
                className={classes.ser_del_link_title}>
                Let us know how we can improve
              </Typography>
              <form
                name="serviceDeliveryFeedback"
                method="post"
                action="/"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={this.handleSubmit}
                className={classes.ser_del_link_form}>
                <input type="hidden" name="form-name" value="serviceDeliveryFeedback"/>
                <p hidden>
                  <label>
                    Don’t fill this out:{" "}
                    <input name="bot-field" onChange={this.handleChange}/>
                  </label>
                </p>
                <p hidden>
                  <label>
                    Don’t fill this out:{" "}
                    <input name="path" type="text" value=""/>
                  </label>
                </p>
                <label>
                  <textarea
                    required={!this.state.satisfied}
                    name="feedbackComment"
                    type="text"
                    placeholder="Your comments"
                    value={feedbackComment}
                    onChange={this.handleChange}
                    rows={4}
                    className={classes.ser_del_link_bootstrapInputComment}/>
                </label>
                <label>
                  <input
                    required
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={this.handleChange}
                    className={classes.ser_del_link_bootstrapInput}/>
                </label>
                <Button
                  size="small"
                  variant="contained"
                  type="submit"
                  className={classes.ser_del_link_dialogButton}>
                  Submit
                </Button>
                <Button
                  size="small"
                  onClick={this.handleClose}
                  className={classes.ser_del_link_dialogButton2}>Cancel</Button>
              </form>
            </div>
          </Fragment>}
          {submitting && <div className={classes.ser_del_link_afterSubmit}>
            <CircularProgress />
          </div>}
          {success && (<ShareBox title={`Help them find government services easily`} messageToShare={`${service_name} easily on papergov`}/>)}
          {failure && <div className={classes.ser_del_link_afterSubmit}>
            <MoodBad className={classes.ser_del_link_icon}/>
            <Typography variant="body1" className={classes.ser_del_link_bodyText}>Something went wrong. Please try again.</Typography>
            <Button
              size="small"
              onClick={this.handleReset}
              className={classes.ser_del_link_dialogButton}>Back</Button>
          </div>}
        </Paper>
      </Dialog>
    )
    
    let redirMsg = null;
    if (this.state.redirectClicked){
      redirMsg = (
        <Typography variant="caption" className='ser_del_redir' gutterBottom>
          <i>Redirecting to
            </i>
          {org_name}'s {service_name}
          page
          </Typography>
      )
    }

    const viewsComp =
      moreThan > 10 ? (
        <div
          className={
            this.state.isMob
              ? classes.template_views_card_item_mob
              : classes.template_views_card_item
          }
        >
          <div>
            {" "}
            <SvgUsers style={{ fontSize: "20px" }} />{" "}
          </div>{" "}
          <div className={classes.template_views_message}>
            <div className={`${speStyles.textSemibold}`}>
              <p style={{marginBottom: '0.5rem'}}>
                <b>{moreThan}</b> accessed this month
              </p>
            </div>
          </div>
        </div>
      ) : null;

    return (
      <Fragment>
        <div className={classes.ser_del_button_msg_container}>
          {viewsComp}
          {serButtons}
          {qpButton ? (
            <Fragment>
              <div className={speStyles.divider} />
              {qpButton}
              <div
                className={
                  this.state.isMob
                    ? classes.template_views_card_item_mob
                    : classes.template_views_card_item
                }
              >
                <div className={`${speStyles.textSemibold}`}>
                  <p>⚡ No Login. Snap, Pay & Done!</p>
                </div>
              </div>
            </Fragment>
          ) : null}
        </div>

        {redirMsg}
        {dialog}
      </Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    trackClick: (click_type, resultType, id, title, listIndex) => {
      dispatch(trackClick(click_type, resultType, id, title, listIndex));
    },
    trackFeedback: (data) => {
      dispatch(trackInput('feedback_form', '', data));
    },
    tglFeedbackDialog: (toggle) => {
      dispatch(toggleFeedbackDialog(toggle));
    },
    tglNotifyDialog: (toggle) => {
      dispatch(toggleNotifyDialog(toggle));
    }
  }
}

const mapStateToProps = function (state, ownProps) {
  return {
showFeedbackDialog : state.userRequests.showFeedbackDialog,
    ...ownProps
  };
};

const ConnServiceDeliveryLink = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, {name: 'ser-deliv-link'})(ServiceDeliveryLink));

export default ConnServiceDeliveryLink;