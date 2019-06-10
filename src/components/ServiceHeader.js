import React, { Component } from 'react';
import {connect} from "react-redux";
import {navigate} from '@reach/router';

import Img from "gatsby-image";
import { isMobileOnly } from 'react-device-detect';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
  FacebookShareButton,
  TwitterShareButton,
} from 'react-share';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import NotificationImportant from '@material-ui/icons/NotificationImportant'
import IconButton from '@material-ui/core/IconButton';
import Share from '@material-ui/icons/Share';
import SvgIcon from '@material-ui/core/SvgIcon';
import Avatar from '@material-ui/core/Avatar';
import ServiceDeliveryLink from './ServiceDeliveryLink';

import {trackClick} from "./common/tracking";
import {toggleNotifyDialog} from './UserRequests/actions.js';
import {isLoggedIn} from './Account/Auth';
import {toggleDeliveryDialog} from './Delivery/actions';
import { action } from 'popmotion';

const styles = theme => ({
  service_header_main: {
    // marginRight: theme.spacing.unit,
    boxShadow: '0 0 0 0',
    paddingTop: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit * 2,
  },
service_header_mainMobile : {
    boxShadow: '0 0 0 0',
    paddingTop: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
service_header_cardTop : {
    display: 'flex',
    justifyContent: 'left',
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    flexWrap: 'wrap'
  },
  service_header_cardTop_mob:{
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    flexWrap: 'wrap'
  },
  service_header_logoName : {
    display: 'flex',
  },
  service_header_title : {
    marginRight: theme.spacing.unit * 5,
  },
  service_header_title_mob : {

  },
  service_header_in : {
    cursor: 'pointer',

    color: theme.palette.primary['400'],
  },

service_header_menuItem : {
    display: 'flex',
    justifyContent: 'center',
  },
service_header_shareButton : {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
service_header_buttonContent : {
    display: 'flex',
    alignItems: 'space-between',
  },
service_header_contactButton : {
    marginTop : theme.spacing.unit * 2,
  },
service_header_notifyButton : {
  padding: theme.spacing.unit,
  marginLeft: theme.spacing.unit,
},
service_header_serDelLink:{
  display: 'flex',
  alignSelf: 'center',
  width: '100%'
},
service_header_menuButtonIcon:{
  marginRight: theme.spacing.unit
},
  service_header_menuButtonNotify:{
    width: '152px'
  },
service_header_svgIcon : {
    width: 18,
    color: theme.palette.primary['400']
  },
service_header_contactIcons : {
    marginTop: theme.spacing.unit
  },
service_header_serviceNotify : {
  },
  org_header_avatar:{
    alignSelf: 'center',
    display: 'flex',
    height: theme.spacing.unit * 4,
    width: theme.spacing.unit * 4,
    boxShadow: `0 0 1px 1px ${theme.palette.primary["200"]}`,
    border: '1px solid #fff',
    margin: theme.spacing.unit,
  },

service_header_serviceShare : {
  },
service_header_deliveryLinkWrapper : {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing.unit,
    // marginRight: -theme.spacing.unit,
    // borderLeft: '1px solid #e4e4e4',
  },
  ser_header_offered_in_org:{
    paddingTop: '2px',
    fontSize: '1rem'
  },
  svgIcon:{
    fontSize: '18px',
    marginRight: 8, 
    color: theme.palette.primary['400']
  },
service_header_serviceActions : {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing.unit*2
  },
service_header_deliveryLinkWrapperMobile : {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing.unit,
    // marginRight: -theme.spacing.unit,
    // borderLeft: '1px solid #e4e4e4',
  },
});

class ServiceHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      copied: false,
      isMobileOnly: false,
    };
    this.handleShareClick = this.handleShareClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleCopy = this.handleCopy.bind(this);
    this.handleOrgClick = this.handleOrgClick.bind(this);
    this.trackClickSocialIcon = this.trackClickSocialIcon.bind(this);
    this.handleNotifyClick = this.handleNotifyClick.bind(this);
    this.toggleServiceFlow = this.toggleServiceFlow.bind(this);
  }
  
  componentDidMount(){
    this.setState({
      isMobileOnly: isMobileOnly
    })
  }

  handleNotifyClick(){
    this.props.openNotifyDialog(true);
  }

  toggleServiceFlow(){
    this.props.openServiceFlowDialog();
  }

  handleShareClick(event) {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleClose(type) {
    const {trackClick} = this.props;
    this.setState({ anchorEl: null, copied: false });
    if(type)
      trackClick('social_share', type, '', '', 0);
  }

  handleCopy() {
     const {trackClick} = this.props;
    this.setState({ copied: true });
    trackClick('social_share', 'copy', '', '', 0);
  }

  handleOrgClick() {
    const { orgSlug } = this.props;
    navigate(`/${orgSlug}/`);
  }

  trackClickSocialIcon(type, url) {
    this.props.trackClick('external', 'social_icon', type, url, 0);
  }

  render() {
    const { classes, name, offeredIn, info, serDelLinks, id, logoSizes, service_delivery_enabled, views, orgLogoSvg, orgHieComp, orgNameOnly } = this.props;

    if (!(name && offeredIn && info && serDelLinks )){
      return null;
    }

    const { anchorEl, copied } = this.state;
    const windowGlobal = typeof window !== 'undefined' && window;
    const windowLocation = windowGlobal.location ? windowGlobal.location : {};
    const shareLink = windowLocation.href + '/';

    // if (!info) return null;
    // if (!info.length > 0) return null;

    let contactAddress;
    if (info) contactAddress = info.find((detail) => detail.contact_type === 'ADDRESS');
    let contactAddressValue = null;
    if (contactAddress) contactAddressValue = contactAddress.contact_value || null;

    const sortedInfo = []
    const sortInfo = (info) => {
      info.forEach((detail) => {
        let type = detail.contact_type;
        if (type === 'FACEBOOK') {
          sortedInfo[0] = detail;
        } else if (type === 'TWITTER') {
          sortedInfo[1] = detail;
        } else if (type === 'EMAIL') {
          sortedInfo[2] = detail;
        } else if (type === 'PHONE') {
          sortedInfo[3] = detail;
        } else if (type === 'ADDRESS') {
          sortedInfo[4] = detail;
        }
      })
    }
    if (info) sortInfo(info);

    const contactDetailButtons = sortedInfo.map((cd, idx, arr) => {
      const icons = {
        phone: (
          <SvgIcon className={classes.svgIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M436.9 364.8c-14.7-14.7-50-36.8-67.4-45.1-20.2-9.7-27.6-9.5-41.9.8-11.9 8.6-19.6 16.6-33.3 13.6-13.7-2.9-40.7-23.4-66.9-49.5-26.2-26.2-46.6-53.2-49.5-66.9-2.9-13.8 5.1-21.4 13.6-33.3 10.3-14.3 10.6-21.7.8-41.9C184 125 162 89.8 147.2 75.1c-14.7-14.7-18-11.5-26.1-8.6 0 0-12 4.8-23.9 12.7-14.7 9.8-22.9 18-28.7 30.3-5.7 12.3-12.3 35.2 21.3 95 27.1 48.3 53.7 84.9 93.2 124.3l.1.1.1.1c39.5 39.5 76 66.1 124.3 93.2 59.8 33.6 82.7 27 95 21.3 12.3-5.7 20.5-13.9 30.3-28.7 7.9-11.9 12.7-23.9 12.7-23.9 2.9-8.1 6.2-11.4-8.6-26.1z"/>
          </SvgIcon>
        ),
        address: (
          <SvgIcon className={classes.svgIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M256 32c-88.004 0-160 70.557-160 156.801C96 306.4 256 480 256 480s160-173.6 160-291.199C416 102.557 344.004 32 256 32zm0 212.801c-31.996 0-57.144-24.645-57.144-56 0-31.357 25.147-56 57.144-56s57.144 24.643 57.144 56c0 31.355-25.148 56-57.144 56z"/>
          </SvgIcon>
        ),
        email: (
          <SvgIcon className={classes.svgIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M437.332 80H74.668C51.199 80 32 99.198 32 122.667v266.666C32 412.802 51.199 432 74.668 432h362.664C460.801 432 480 412.802 480 389.333V122.667C480 99.198 460.801 80 437.332 80zM432 170.667L256 288 80 170.667V128l176 117.333L432 128v42.667z"/>
          </SvgIcon>
        ),
        facebook: (
          <SvgIcon className={classes.svgIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M426.8 64H85.2C73.5 64 64 73.5 64 85.2v341.6c0 11.7 9.5 21.2 21.2 21.2H256V296h-45.9v-56H256v-41.4c0-49.6 34.4-76.6 78.7-76.6 21.2 0 44 1.6 49.3 2.3v51.8h-35.3c-24.1 0-28.7 11.4-28.7 28.2V240h57.4l-7.5 56H320v152h106.8c11.7 0 21.2-9.5 21.2-21.2V85.2c0-11.7-9.5-21.2-21.2-21.2z"/>
          </SvgIcon>
        ),
        twitter: (
          <SvgIcon className={classes.svgIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M492 109.5c-17.4 7.7-36 12.9-55.6 15.3 20-12 35.4-31 42.6-53.6-18.7 11.1-39.4 19.2-61.5 23.5C399.8 75.8 374.6 64 346.8 64c-53.5 0-96.8 43.4-96.8 96.9 0 7.6.8 15 2.5 22.1-80.5-4-151.9-42.6-199.6-101.3-8.3 14.3-13.1 31-13.1 48.7 0 33.6 17.2 63.3 43.2 80.7-16-.4-31-4.8-44-12.1v1.2c0 47 33.4 86.1 77.7 95-8.1 2.2-16.7 3.4-25.5 3.4-6.2 0-12.3-.6-18.2-1.8 12.3 38.5 48.1 66.5 90.5 67.3-33.1 26-74.9 41.5-120.3 41.5-7.8 0-15.5-.5-23.1-1.4C62.8 432 113.7 448 168.3 448 346.6 448 444 300.3 444 172.2c0-4.2-.1-8.4-.3-12.5C462.6 146 479 129 492 109.5z"/>
          </SvgIcon>
        ),
      };

      let value = cd.contact_value
      if (!value) value = cd.value;

      const contactType = cd.contact_type.toLowerCase();
      if (contactType.toLowerCase() === 'phone') {
        value = (
          <Typography variant="caption"style={{display: 'flex'}} >
            <a href={`tel:${value}`}  className={classes.service_header_buttonContent}  onClick={() => this.trackClickSocialIcon(contactType, cd.contact_value)} target="_blank">
            {icons[contactType]} {value}
               </a>
          </Typography>
     );
      }
      else if (contactType.toLowerCase() === 'address') {
        value = (
          <Typography variant="caption">
            <a href={`http://maps.google.com/?q=${value}`}  className={classes.service_header_buttonContent} onClick={() => this.trackClickSocialIcon(contactType, cd.contact_value)} target="_blank">
            {icons[contactType]} {value}
            </a>
          </Typography>
        );
      }
      else if (contactType.toLowerCase() === 'email') {
        value = (
          <Typography variant="caption" style={{display: 'flex'}}>
            <a href={`mailto:${value}`}  className={classes.service_header_buttonContent} onClick={() => this.trackClickSocialIcon(contactType, cd.contact_value)} target="_blank">
            {icons[contactType]} {value}
             </a>
          </Typography>
       );
      }
      else {
        value = (<Typography variant="caption" style={{display: 'flex'}}>
            <a href={`${value}`}  className={classes.service_header_buttonContent} onClick={() => this.trackClickSocialIcon(contactType, cd.contact_value)} target="_blank">
            {icons[contactType]} {value}
          </a>
          </Typography>)
     
      }

      return <div className={classes.service_header_contactIcons}>{value} </div>;
    });

      const actionButton = null;
      // const actionButton = (<Button color="primary" size="medium" className={classes.service_header_menuButtonNotify} onClick={this.handleNotifyClick} aria-label="Ge Notified">
      //   <NotificationImportant className={classes.service_header_menuButtonIcon} fontSize="small" /> Get notified
      // </Button>)


    const shareButton = (<Button color="primary" size="small"  className={classes.service_header_menuButton}  onClick={this.handleShareClick}  aria-label="share">
      <Share className={classes.service_header_menuButtonIcon}  fontSize="small"/> Share
      </Button>)

    const serviceFlowButton = service_delivery_enabled ? (<Button size="small" variant="outlined" color="primary" onClick={this.toggleServiceFlow} className={classes.service_header_notifyButton}>Pay with evergov</Button>) : null;
    const sdl = <ServiceDeliveryLink orgNameOnly={orgNameOnly} views={views} id={id} service_name={name} org_name={offeredIn} serDelLinks={serDelLinks} />

    return (
      <Grid container spacing={0} className={!this.state.isMobileOnly ? classes.service_header_main : classes.service_header_mainMobile}>
 
        <Grid item xs={12} md={8}>
          <div className={!this.state.isMobileOnly ? classes.service_header_cardTop : classes.service_header_cardTop_mob}>
            <div className={!this.state.isMobileOnly ?  classes.service_header_title: classes.service_header_title_mob}>
                  <Typography component="h1" variant="display1">{name}</Typography>

            
                <Typography variant="subheading" className={classes.ser_header_offered_in_org} onClick={this.handleOrgClick}>
                Offered by  <span className={classes.service_header_in}> {orgHieComp} </span>
                 </Typography>
    
                </div>
         
          </div>

          <div className={classes.service_header_cardActions}>
            {contactDetailButtons && contactDetailButtons}
          </div>

        </Grid>
        <Grid item xs={12} md={4}>
              <div className={classes.service_header_serviceActions}>
            <div className={classes.service_header_serDelLink}>
              {sdl}
            </div>
                <div className={classes.service_header_serviceNotify}>
                  <div className={classes.service_header_serDelLink}>
                      {serviceFlowButton}
                  </div>
                </div>    
              </div>
        </Grid>
      </Grid>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    trackClick: (click_type, resultType, id, title, listIndex, extra) => {
      dispatch(trackClick(click_type, resultType, id, title, listIndex, extra));
    },
    openServiceFlowDialog: () => {
      dispatch(toggleDeliveryDialog(true));
    }
  }
}

const mapStateToProps = function (state, ownProps) {
  return {
    ...ownProps
  };
};

const ConnSerHeader = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ServiceHeader));

export default ConnSerHeader;
