import React, { Component } from "react";
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
import Button from '@material-ui/core/Button';
import Share from '@material-ui/icons/Share';
import Info from '@material-ui/icons/InfoOutlined';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import HeaderAccountMenu from '../HeaderAccountMenu';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import Truncate from 'react-truncate-html';


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
        paddingBottom: theme.spacing.unit,
        paddingTop: theme.spacing.unit * 4,
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    ser_gloss_app_name:{
    textDecoration: 'none',
    cursor: 'pointer',
    '&:hover': {
        color: theme.palette.primary['700'],
    },

    },
    ser_gloss_servicename_text_mob: {
        width: '100%',
        paddingLeft: theme.spacing.unit,
        paddingTop: theme.spacing.unit,
        flexWrap: 'wrap',
        textAlign: 'center',
        justifyContent: 'center'
    },
    ser_gloss_servicename_description: {
        display: 'flex',
        justifyContent: 'center',
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
            fontSize: "0.79rem",
            fontWeight: 300,
            lineHeight: "1.36429em",
            fontFamily: '"Nunito Sans",  -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue", sans-serif',
            color: "rgba(30, 30, 50,0.79)",
            alignItems: 'center',
            justifyContent: 'center'
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
        const { trackClick } = this.props;
    }

    componentDidMount() {
        this.setState({ isMobile: isMobileOnly });
    }

    render() {
        const { classes, service_name, service_glossary_description, trackClick } = this.props;
        const { anchorEl, copied } = this.state;

        const windowGlobal = typeof window !== 'undefined' && window;
        const windowLocation = windowGlobal.location
            ? windowGlobal.location
            : {};

        const shareLink = windowLocation.href;

        const shareButton = (
            <Button
                color="primary"
                size="small"
                className={classes.ser_gloss_menu_button}
                onClick={this.handleShareClick}
                aria-label="share">
                <Share className={classes.ser_gloss_share} fontSize="small" />
            </Button>
        )

        const learnMoreButton = (
            <Button
                color="primary"
                size="small"
                className={classes.ser_gloss_learn_more}
                onClick={this.toggleDescDialog}
                aria-label="share">
                <Info className={classes.ser_gloss_share} fontSize="small" />
            </Button>
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
                        {service_glossary_description}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.toggleDescDialog} color="outlined">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        )

        return (<Grid container className={classes.ser_gloss_serviceheading}>
            <Grid item sm={1} />
            <Grid item sm={10} align="center" className={classes.ser_gloss_nav_items}>

                    <Typography
                        variant="title">
                    <Link
                        to="/"
                        className={classes.ser_gloss_app_name}>
                        evergov
                           </Link>

                    </Typography>
                {this.state.isMobile && (<div className={classes.ser_gloss_service_mob_actions}>
                    {shareButton}
                    {learnMoreButton}
                </div>)}
                   <HeaderAccountMenu location={this.props.location} />
            </Grid>
            <Grid item sm={1} />

            <Grid item xs={1} />
            <Grid item
                xs={10}
                className={!this.state.isMobile
                    ? classes.ser_gloss_servicename_text
                    : classes.ser_gloss_servicename_text_mob}
                >  
                <Typography
                    component="span"
                    variant="title">
                    {service_name}
                </Typography>
 
                
                {!this.state.isMobile ? (<div className={classes.ser_gloss_service_actions}>
                    {shareButton}
                </div>) : null}
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}>
                    <CopyToClipboard text={shareLink} onCopy={this.handleCopy}>
                        <MenuItem className={classes.ser_gloss_menu_item}>
                            <Typography>{copied
                                ? 'Copied!'
                                : 'Copy link'}</Typography>
                        </MenuItem>
                    </CopyToClipboard>
                    <MenuItem
                        onClick={() => this.handleClose('facebook')}
                        className={classes.ser_gloss_menu_item}>
                        <FacebookShareButton url={shareLink} className={classes.ser_gloss_sharebutton}>
                            <Typography>Facebook</Typography>
                        </FacebookShareButton>
                    </MenuItem>
                    <MenuItem
                        onClick={() => this.handleClose('twitter')}
                        className={classes.ser_gloss_menu_item}>
                        <TwitterShareButton url={shareLink} className={classes.ser_gloss_sharebutton}>
                            <Typography>Twitter</Typography>
                        </TwitterShareButton>
                    </MenuItem>
                </Menu>
            </Grid>
            <Grid item xs={1} />

            <Grid item sm={1} md={3} />
          

            {this.state.isMobile ? null : (<Grid item sm={10} md={6} className={classes.ser_gloss_servicename_description}><RawHTML>
                    {service_glossary_description}
                </RawHTML> </Grid>)}
      
            {descDialog}
            <Grid item sm={1} md={3} />
        </Grid>)
    }
}

export default withStyles(styles)(TemplateHero);
