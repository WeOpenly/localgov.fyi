import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import Grid from '@material-ui/core/Grid';
import { isMobileOnly } from 'react-device-detect';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Link from 'gatsby-link';

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
        justifyContent: 'flex-start',
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
        fontSize: '18px',
        marginRight: '8px',
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
            </Grid>
  
            <Grid item xs={12} >
        
              <TemplateViews views={views} orgsCnt={orgsCnt} />
            </Grid>
  
     
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
