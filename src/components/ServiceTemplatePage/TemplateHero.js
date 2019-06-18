import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import Grid from '@material-ui/core/Grid';
import { isMobileOnly } from 'react-device-detect';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Link from 'gatsby-link';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Share from '@material-ui/icons/Share';
import Info from '@material-ui/icons/InfoOutlined';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import HeaderAccountMenu from '../HeaderAccountMenu';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import TemplateViews from './TemplateViews';




const styles = theme => ({
    ser_gloss_gridItemLocation_mob_focus: {
        boxShadow: `0 0 3px 0px ${theme.palette.primary['600']}`
    },
    ser_gloss_nav_items: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: theme.spacing.unit,
    },
    ser_gloss_serviceheading: {
    },
    ser_gloss_service_mob_actions: {
        display: 'flex',
        width: '100%',
        justifyContent: 'flex-end',
    },
    ser_gloss_servicename_text: {
        display: 'flex',
        padding: theme.spacing.unit,
        paddingBottom: '0px',
        paddingTop: theme.spacing.unit*2,
        flexWrap: 'wrap',
        justifyContent: 'left',
        alignItems: 'center',
    },
    ser_gloss_app_name:{
    
    textDecoration: 'none',
    cursor: 'pointer',
    '&:hover': {
        color: theme.palette.primary['700'],
    },

    },
    ser_gloss_share:{
        fontSize: '16px',
    },
    ser_gloss_servicename_text_mob: {
        width: '100%',
        margin: theme.spacing.unit,
        flexWrap: 'wrap',
        textAlign: 'left',
        justifyContent: 'left'
    },
    ser_gloss_servicename_description: {
        display: 'flex',
        justifyContent: 'left',
        padding: `0px ${theme.spacing.unit}px  ${theme.spacing.unit}px ${theme.spacing.unit}px`
    },
});


const RawHTML = ({
    children,
    className = ""
}) => (<div
    style={{
            display: 'flex',
            'flexDirection': 'column',
            fontWeight: 300,
            lineHeight: "1.36429em",
            fontFamily: '"Nunito Sans",  -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue", sans-serif',
            fontSize: '0.9rem',
            color: '#080808',
            alignItems: 'left',
            justifyContent: 'left'
    }}
    dangerouslySetInnerHTML={{
        __html: children
    }} />);

class TemplateHero extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            copied: false,
            openDescDialog: false,
            isMobile: false
        }

        this.toggleDescDialog = this
            .toggleDescDialog
            .bind(this);
        this.handleCopy = this
            .handleCopy
            .bind(this);   
    }

    handleCopy() {
        const { trackClick } = this.props;
        this.setState({ copied: true });
   
    }

    toggleDescDialog() {
        this.setState({
            openDescDialog: !this.state.openDescDialog
        })
    }

    handleShareClick = (event) => {
        this.setState({ anchorEl: event.currentTarget });
        // this.props.trackClick('external', 'share', '', '', 0);
    }

    handleClose = (type) => {
        this.setState({ anchorEl: null, copied: false });
    }

    componentDidMount() {
        this.setState({ isMobile: isMobileOnly });
    }

    render() {
        const {
          classes,
          service_name,
          service_glossary_description,
          trackClick,
          views,
          orgsCnt
        } = this.props;

        const { anchorEl, copied } = this.state;

        const windowGlobal = typeof window !== 'undefined' && window;
        const windowLocation = windowGlobal.location
            ? windowGlobal.location
            : {};

        const shareLink = windowLocation.href;

        const shareButton = (
            <IconButton
                color="primary"
                size="small"
                className={classes.ser_gloss_menu_button}
                onClick={this.handleShareClick}
                aria-label="share">
                <Share className={classes.ser_gloss_share} fontSize="small" />
            </IconButton>
        )

        const learnMoreButton = (
            <IconButton
                color="primary"
                size="small"
                className={classes.ser_gloss_learn_more}
                onClick={this.toggleDescDialog}
                aria-label="share">
                <Info className={classes.ser_gloss_share} fontSize="small" />
            </IconButton>
        )

        const descDialog = (
            <Dialog
                onClose={this.toggleDescDialog}
                aria-labelledby="customized-dialog-title"
                open={this.state.openDescDialog}>
                <DialogTitle id="customized-dialog-title" onClose={this.toggleDescDialog}>
                    {service_name}
                </DialogTitle>
                <DialogContent>
                    <Typography gutterBottom>
                        <RawHTML>
                            {service_glossary_description}
                        </RawHTML> 
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.toggleDescDialog} color="outlined">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        )

        return (
          <Grid container className={classes.ser_gloss_serviceheading}>
 

 
            <Grid
              item
              xs={12}
              sm={12}
              className={
                !this.state.isMobile
                  ? classes.ser_gloss_servicename_text
                  : classes.ser_gloss_servicename_text_mob
              }
            >
              <Typography component="h1" variant="display1">
                {service_name}
              </Typography>

              {!this.state.isMobile ? (
                <div className={classes.ser_gloss_service_actions}>
                  {shareButton}
                </div>
              ) : null}
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
              >
                <CopyToClipboard
                  text={shareLink}
                  onCopy={this.handleCopy}
                >
                  <MenuItem className={classes.ser_gloss_menu_item}>
                    <Typography>
                      {copied ? "Copied!" : "Copy link"}
                    </Typography>
                  </MenuItem>
                </CopyToClipboard>
                <MenuItem
                  onClick={() => this.handleClose("facebook")}
                  className={classes.ser_gloss_menu_item}
                >
                  <FacebookShareButton
                    url={shareLink}
                    className={classes.ser_gloss_sharebutton}
                  >
                    <Typography>Facebook</Typography>
                  </FacebookShareButton>
                </MenuItem>
                <MenuItem
                  onClick={() => this.handleClose("twitter")}
                  className={classes.ser_gloss_menu_item}
                >
                  <TwitterShareButton
                    url={shareLink}
                    className={classes.ser_gloss_sharebutton}
                  >
                    <Typography>Twitter</Typography>
                  </TwitterShareButton>
                </MenuItem>
              </Menu>
            </Grid>
  

            <Grid item xs={12} >
              <TemplateViews views={views} orgsCnt={orgsCnt} />
            </Grid>
            {descDialog}
     
            {!this.state.isMobile ? (
              <Fragment>
                <Grid item xs={12} align="left">
                  <Typography
                    style={{ paddingLeft: "8px" }}
                    gutterBottom
                    variant="body1"
                  >
                    <RawHTML>{service_glossary_description}</RawHTML>
                  </Typography>
                </Grid>
     
              </Fragment>
            ) : null}

            <Grid item xs={3}/>
            
          </Grid>
        );
    }
}

export default withStyles(styles)(TemplateHero);
