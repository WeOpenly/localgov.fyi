import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import Link from 'gatsby-link';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {FacebookShareButton, TwitterShareButton} from 'react-share';
import Img from "gatsby-image";
import {isMobileOnly} from 'react-device-detect';

import {withStyles} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Share from '@material-ui/icons/Share';
import SvgIcon from '@material-ui/core/SvgIcon';
import CheckCircle from '@material-ui/icons/CheckCircle';
import Help from '@material-ui/icons/Help';
import MoreVert from '@material-ui/icons/MoreVert';




import {trackClick} from './common/tracking';

const styles = theme => ({
org_header_main : {
  // marginRight: theme.spacing(1),
  borderBottom: '1px solid #d4d4d4',
  paddingTop:theme.spacing(2),
  paddingLeft:theme.spacing(2),
  paddingRight:theme.spacing(2),
  paddingBottom:theme.spacing(2),
  margin: '1px'
},
org_header_mainMobile : {
  justifyContent : 'center',
  textAlign: 'center',
  borderBottom: '1px solid #d4d4d4',
    paddingTop:theme.spacing(2),
  paddingLeft:theme.spacing(2),
  paddingRight:theme.spacing(2),
  paddingBottom:theme.spacing(2),
},
org_header_cardTop : {
  display: 'flex',
  justifyContent: 'space-between',
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  flexWrap: 'wrap'
},
org_header_logoName : {
  display: 'flex'
},
org_header_title : {
  flexGrow: 1,
},
org_header_menuButtonIcon:{
  marginRight: theme.spacing()
},
org_header_in : {
  cursor: 'pointer',
  color: theme.palette.primary['400']
},
org_header_avatar : {
  width: 80,
  height: 80,
  boxShadow: `0 0 1px 1px ${theme.palette.primary["200"]}`,
  border: '2px solid #fff',
  marginRight: theme.spacing(2), 
},
org_header_menuButton : {
  marginTop: theme.spacing(-1),
  marginRight: theme.spacing(-1)
},
org_header_menuItem : {
  display: 'flex',
  justifyContent: 'center'
},
org_header_shareButton : {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
},
org_header_cardActions : {
  paddingTop: theme.spacing(1),
},
org_header_buttonContent : {
  display: 'flex',
  alignItems: 'space-between'
},
org_header_contactButton : {
  marginTop: theme.spacing( 2)
},
org_header_notifyButton : {
  marginLeft: theme.spacing()
},
org_header_serDelLink : {
  display: 'flex',
  alignSelf: 'center'
},
svgIcon : {
  fontSize: '18px',
    marginRight: 8, 
    color: theme.palette.primary['400']
},
org_header_contactIcons : {
  marginTop: theme.spacing()
},
org_header_serviceNotify : {},
org_header_serviceShare : {
  marginBottom: theme.spacing(2),
  marginTop: theme.spacing()
},
});

class OrgHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      copied: false,
      hover: false,
      isMobileOnly: false,
    };
    this.handleShareClick = this
      .handleShareClick
      .bind(this);
    this.handleClose = this
      .handleClose
      .bind(this);
    this.handleCopy = this
      .handleCopy
      .bind(this);
    this.handleMouseEnter = this
      .handleMouseEnter
      .bind(this);
    this.handleMouseLeave = this
      .handleMouseLeave
      .bind(this);
    this.trackClickSocialIcon = this
      .trackClickSocialIcon
      .bind(this);
  }

  componentDidMount(){
    this.setState({
      isMobileOnly: isMobileOnly,
    });
  }

  handleShareClick(event) {
    this.setState({anchorEl: event.currentTarget});
    // this.props.trackClick('external', 'share', '', '', 0);
  }

  handleClose(type) {
    this.setState({anchorEl: null, copied: false});

    const {trackClick} = this.props;
    if(type)
      trackClick('social_share', type, '', '', 0);
  }

  handleCopy() {
    const {trackClick} = this.props;
    this.setState({copied: true});
    trackClick('social_share', 'copy', '', '', 0);
  }

  handleMouseEnter(orgId, orgName) {
    this.setState({hover: true});
    this.props.trackClick('claim', 'org_page', orgId, orgName, 0);
  }

  handleMouseLeave() {
    this.setState({hover: false});
  }

  trackClickSocialIcon(type, url) {
    this.props.trackClick('external', 'social_icon', type, url, 0);
  }

  render() {
    const {
      classes,
      id,
      name,
      parent,
      info,
      logoFluid,
      claimed,
      displayShare = true
    } = this.props;
    const {anchorEl, copied} = this.state;

  

    const windowGlobal = typeof window !== 'undefined' && window;
    const windowLocation = windowGlobal.location
      ? windowGlobal.location
      : {};
    const shareLink = windowLocation.href + '/';

 

    let contactAddress;
    if (info) 
      contactAddress = info.find((detail) => detail.contact_type === 'ADDRESS');
    let contactAddressValue = null;
    if (contactAddress) 
      contactAddressValue = contactAddress.contact_value || null;
    
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
    if (info) 
      sortInfo(info);

    const contactDetailButtons = sortedInfo.map((cd, idx, arr) => {
      const icons = {
        phone: (
          <SvgIcon
            className={classes.svgIcon}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512">
            <path
              d="M436.9 364.8c-14.7-14.7-50-36.8-67.4-45.1-20.2-9.7-27.6-9.5-41.9.8-11.9 8.6-19.6 16.6-33.3 13.6-13.7-2.9-40.7-23.4-66.9-49.5-26.2-26.2-46.6-53.2-49.5-66.9-2.9-13.8 5.1-21.4 13.6-33.3 10.3-14.3 10.6-21.7.8-41.9C184 125 162 89.8 147.2 75.1c-14.7-14.7-18-11.5-26.1-8.6 0 0-12 4.8-23.9 12.7-14.7 9.8-22.9 18-28.7 30.3-5.7 12.3-12.3 35.2 21.3 95 27.1 48.3 53.7 84.9 93.2 124.3l.1.1.1.1c39.5 39.5 76 66.1 124.3 93.2 59.8 33.6 82.7 27 95 21.3 12.3-5.7 20.5-13.9 30.3-28.7 7.9-11.9 12.7-23.9 12.7-23.9 2.9-8.1 6.2-11.4-8.6-26.1z"/>
          </SvgIcon>
        ),
        address: (
          <SvgIcon
            className={classes.svgIcon}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512">
            <path
              d="M256 32c-88.004 0-160 70.557-160 156.801C96 306.4 256 480 256 480s160-173.6 160-291.199C416 102.557 344.004 32 256 32zm0 212.801c-31.996 0-57.144-24.645-57.144-56 0-31.357 25.147-56 57.144-56s57.144 24.643 57.144 56c0 31.355-25.148 56-57.144 56z"/>
          </SvgIcon>
        ),
        email: (
          <SvgIcon
            className={classes.svgIcon}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512">
            <path
              d="M437.332 80H74.668C51.199 80 32 99.198 32 122.667v266.666C32 412.802 51.199 432 74.668 432h362.664C460.801 432 480 412.802 480 389.333V122.667C480 99.198 460.801 80 437.332 80zM432 170.667L256 288 80 170.667V128l176 117.333L432 128v42.667z"/>
          </SvgIcon>
        ),
        facebook: (
          <SvgIcon
            className={classes.svgIcon}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512">
            <path
              d="M426.8 64H85.2C73.5 64 64 73.5 64 85.2v341.6c0 11.7 9.5 21.2 21.2 21.2H256V296h-45.9v-56H256v-41.4c0-49.6 34.4-76.6 78.7-76.6 21.2 0 44 1.6 49.3 2.3v51.8h-35.3c-24.1 0-28.7 11.4-28.7 28.2V240h57.4l-7.5 56H320v152h106.8c11.7 0 21.2-9.5 21.2-21.2V85.2c0-11.7-9.5-21.2-21.2-21.2z"/>
          </SvgIcon>
        ),
        twitter: (
          <SvgIcon
            className={classes.svgIcon}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512">
            <path
              d="M492 109.5c-17.4 7.7-36 12.9-55.6 15.3 20-12 35.4-31 42.6-53.6-18.7 11.1-39.4 19.2-61.5 23.5C399.8 75.8 374.6 64 346.8 64c-53.5 0-96.8 43.4-96.8 96.9 0 7.6.8 15 2.5 22.1-80.5-4-151.9-42.6-199.6-101.3-8.3 14.3-13.1 31-13.1 48.7 0 33.6 17.2 63.3 43.2 80.7-16-.4-31-4.8-44-12.1v1.2c0 47 33.4 86.1 77.7 95-8.1 2.2-16.7 3.4-25.5 3.4-6.2 0-12.3-.6-18.2-1.8 12.3 38.5 48.1 66.5 90.5 67.3-33.1 26-74.9 41.5-120.3 41.5-7.8 0-15.5-.5-23.1-1.4C62.8 432 113.7 448 168.3 448 346.6 448 444 300.3 444 172.2c0-4.2-.1-8.4-.3-12.5C462.6 146 479 129 492 109.5z"/>
          </SvgIcon>
        )
      };

      let value = cd.contact_value
      if (!value) 
        value = cd.value;
      
      const contactType = cd
        .contact_type
        .toLowerCase();
      if (contactType.toLowerCase() === 'phone') {
        value = (
          <Typography variant="caption" style={{
            display: 'flex'
          }}>
            <a
              href={`tel:${value}`}
              className={classes.org_header_buttonContent}
              onClick={() => this.trackClickSocialIcon(contactType, cd.contact_value)}
              target="_blank">
              {icons[contactType]}
              {value}
            </a>
          </Typography>
        );
      } else if (contactType.toLowerCase() === 'address') {
        value = (
          <Typography variant="caption">
            <a
              href={`http://maps.google.com/?q=${value}`}
              className={classes.org_header_buttonContent}
              onClick={() => this.trackClickSocialIcon(contactType, cd.contact_value)}
              target="_blank">
              {icons[contactType]}
              {value}
            </a>
          </Typography>
        );
      } else if (contactType.toLowerCase() === 'email') {
        value = (
          <Typography variant="caption" style={{
            display: 'flex'
          }}>
            <a
              href={`mailto:${value}`}
              className={classes.org_header_buttonContent}
              onClick={() => this.trackClickSocialIcon(contactType, cd.contact_value)}
              target="_blank">
              {icons[contactType]}
              {value}
            </a>
          </Typography>
        );
      } else {
        value = (
          <Typography variant="caption" style={{
            display: 'flex'
          }}>
            <a
              href={`${value}`}
              className={classes.org_header_buttonContent}
              onClick={() => this.trackClickSocialIcon(contactType, cd.contact_value)}
              target="_blank">
              {icons[contactType]}
              {value}
            </a>
          </Typography>
        )

      }

      return <div className={classes.org_header_contactIcons}>{value}
      </div>;
    });

   const shareButton = (<Button color="primary" size="small"  className={classes.org_header_menuButton}  onClick={this.handleShareClick}  aria-label="share">
      <Share className={classes.org_header_menuButtonIcon}  fontSize="small"/> Share
      </Button>)

    return (
      <Grid
        container
        spacing={16}
        className={!this.state.isMobileOnly
        ? classes.org_header_main
        : classes.org_header_mainMobile}>
        <Grid item xs={12} md={11}>
          <div className={classes.org_header_cardTop}>
            <div>
              {logoFluid && <Avatar className={classes.org_header_avatar}>
                  <Img
                    title={`logo${name}`}
                    alt={`logo of ${name}`}
                    style={{width: '100px'}}
                    sizes={logoFluid}/>
          </Avatar>}
            </div>
            <div className={classes.org_header_title}>
            
              <Typography variant="h4">{name}</Typography>
              {parent ? (<Typography varant="subtitle1"> <span  className={classes.service_header_in}> {parent} </span></Typography>) : null}
                <div className={classes.org_header_cardActions}>
            {contactDetailButtons}
          </div>

            </div>
           
          </div>

          
        </Grid>
        <Grid item xs={12} md={1}>
          <div className={classes.org_header_serviceActions}>
            <div className={classes.org_header_serviceShare}>
              {shareButton}
            </div>
          </div>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => this.handleClose()}>
            <CopyToClipboard text={shareLink} onCopy={this.handleCopy}>
              <MenuItem className={classes.org_header_menuItem}>
                <Typography>{copied
                    ? 'Copied!'
                    : 'Copy link'}</Typography>
              </MenuItem>
            </CopyToClipboard>
            <MenuItem
              onClick={() => this.handleClose('facebook')}
              className={classes.org_header_menuItem}>
              <FacebookShareButton
                url={shareLink}
                className={classes.org_header_shareButton}>
                <Typography>Facebook</Typography>
              </FacebookShareButton>
            </MenuItem>
            <MenuItem
              onClick={() => this.handleClose('twitter')}
              className={classes.org_header_menuItem}>
              <TwitterShareButton
                url={shareLink}
                className={classes.org_header_shareButton}>
                <Typography>Twitter</Typography>
              </TwitterShareButton>
            </MenuItem>
          </Menu>

        </Grid>

      </Grid>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    trackClick: (click_type, resultType, id, title, listIndex) => {
      dispatch(trackClick(click_type, resultType, id, title, listIndex));
    }
  }
}

const mapStateToProps = function (state, ownProps) {
  return {
    ...ownProps
  };
};

const ConnOrgHeader = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(OrgHeader));

export default ConnOrgHeader;
