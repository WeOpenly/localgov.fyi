import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
  FacebookShareButton,
  TwitterShareButton,
} from 'react-share';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import Share from '@material-ui/icons/Share';
import withRoot from '../withRoot';
import ServiceDeliveryLink from './ServiceDeliveryLink';

const styles = theme => ({
  card: {
    boxShadow: '0 0 0 0',
    border: `1px solid ${theme.palette.primary['50']}`,
  },
  cardTop: {
    display: 'flex',
    justifyContent: 'space-between',
    marginRight: -theme.spacing.unit,
  },
  title: {
    display: 'flex',
  },
  in: {
    color: 'lightGray',
    marginLeft: 8,
  },
  iconButton: {
    marginTop: -theme.spacing.unit,
    marginRight: theme.spacing.unit * -1.5,
  },
  menuItem: {
    display: 'flex',
    justifyContent: 'center',
  },
  shareButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContent: {
    display: 'flex',
    alignItems: 'center',
  },
});

class ServiceHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      copied: false,
    };
    this.handleShareClick = this.handleShareClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleCopy = this.handleCopy.bind(this);
  }

  handleShareClick(event) {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleClose() {
    this.setState({ anchorEl: null, copied: false });
  }

  handleCopy() {
    this.setState({ copied: true });
  }

  render() {
    const { classes, name, offeredIn, info, serDelLinks } = this.props;
    const { anchorEl, copied } = this.state;
    const windowGlobal = typeof window !== 'undefined' && window;
    const windowLocation = windowGlobal.location ? windowGlobal.location : {};
    const shareLink = windowLocation.href;
    const inOrg = 'in ' + offeredIn;

    // if (!info) return null;
    // if (!info.length > 0) return null;

    const contactAddress = info.find((detail) => detail.contact_type === 'ADDRESS');
    let contactAddressValue = null;
    if (contactAddress) contactAddressValue = contactAddress.contact_value || null;

    const sortedInfo = [];
    const sortInfo = (info) => {
      info.forEach((detail) => {
        let type = detail.contact_type;
        if (type === 'ADDRESS') {
          sortedInfo[0] = detail;
        } else if (type === 'PHONE') {
          sortedInfo[1] = detail;
        } else if (type === 'EMAIL') {
          sortedInfo[2] = detail;
        } else if (type === 'FACEBOOK') {
          sortedInfo[3] = detail;
        } else if (type === 'TWITTER') {
          sortedInfo[4] = detail;
        }
      })
    }
    sortInfo(info);

    const contactDetailButtons = sortedInfo.map((cd, idx, arr) => {
      const icons = {
        phone: (
          <SvgIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M436.9 364.8c-14.7-14.7-50-36.8-67.4-45.1-20.2-9.7-27.6-9.5-41.9.8-11.9 8.6-19.6 16.6-33.3 13.6-13.7-2.9-40.7-23.4-66.9-49.5-26.2-26.2-46.6-53.2-49.5-66.9-2.9-13.8 5.1-21.4 13.6-33.3 10.3-14.3 10.6-21.7.8-41.9C184 125 162 89.8 147.2 75.1c-14.7-14.7-18-11.5-26.1-8.6 0 0-12 4.8-23.9 12.7-14.7 9.8-22.9 18-28.7 30.3-5.7 12.3-12.3 35.2 21.3 95 27.1 48.3 53.7 84.9 93.2 124.3l.1.1.1.1c39.5 39.5 76 66.1 124.3 93.2 59.8 33.6 82.7 27 95 21.3 12.3-5.7 20.5-13.9 30.3-28.7 7.9-11.9 12.7-23.9 12.7-23.9 2.9-8.1 6.2-11.4-8.6-26.1z"/>
          </SvgIcon>
        ),
        address: (
          <SvgIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M256 32c-88.004 0-160 70.557-160 156.801C96 306.4 256 480 256 480s160-173.6 160-291.199C416 102.557 344.004 32 256 32zm0 212.801c-31.996 0-57.144-24.645-57.144-56 0-31.357 25.147-56 57.144-56s57.144 24.643 57.144 56c0 31.355-25.148 56-57.144 56z"/>
          </SvgIcon>
        ),
        email: (
          <SvgIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M437.332 80H74.668C51.199 80 32 99.198 32 122.667v266.666C32 412.802 51.199 432 74.668 432h362.664C460.801 432 480 412.802 480 389.333V122.667C480 99.198 460.801 80 437.332 80zM432 170.667L256 288 80 170.667V128l176 117.333L432 128v42.667z"/>
          </SvgIcon>
        ),
        facebook: (
          <SvgIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M426.8 64H85.2C73.5 64 64 73.5 64 85.2v341.6c0 11.7 9.5 21.2 21.2 21.2H256V296h-45.9v-56H256v-41.4c0-49.6 34.4-76.6 78.7-76.6 21.2 0 44 1.6 49.3 2.3v51.8h-35.3c-24.1 0-28.7 11.4-28.7 28.2V240h57.4l-7.5 56H320v152h106.8c11.7 0 21.2-9.5 21.2-21.2V85.2c0-11.7-9.5-21.2-21.2-21.2z"/>
          </SvgIcon>
        ),
        twitter: (
          <SvgIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M492 109.5c-17.4 7.7-36 12.9-55.6 15.3 20-12 35.4-31 42.6-53.6-18.7 11.1-39.4 19.2-61.5 23.5C399.8 75.8 374.6 64 346.8 64c-53.5 0-96.8 43.4-96.8 96.9 0 7.6.8 15 2.5 22.1-80.5-4-151.9-42.6-199.6-101.3-8.3 14.3-13.1 31-13.1 48.7 0 33.6 17.2 63.3 43.2 80.7-16-.4-31-4.8-44-12.1v1.2c0 47 33.4 86.1 77.7 95-8.1 2.2-16.7 3.4-25.5 3.4-6.2 0-12.3-.6-18.2-1.8 12.3 38.5 48.1 66.5 90.5 67.3-33.1 26-74.9 41.5-120.3 41.5-7.8 0-15.5-.5-23.1-1.4C62.8 432 113.7 448 168.3 448 346.6 448 444 300.3 444 172.2c0-4.2-.1-8.4-.3-12.5C462.6 146 479 129 492 109.5z"/>
          </SvgIcon>
        ),
      };

      let value = cd.contact_value
      if (!value) value = cd.value;

      const contactType = cd.contact_type.toLowerCase();
      if (contactType.toLowerCase() === 'phone') {
        value = (<a href={`tel:${value}`} target="_blank">
          <Typography variant="body1" className={classes.buttonContent}>
            {icons[contactType]}
          </Typography>
        </a>);
      }
      else if (contactType.toLowerCase() === 'address') {
        value = (<a href={`http://maps.google.com/?q=${value}`} target="_blank">
          <Typography variant="body1" className={classes.buttonContent}>
            {icons[contactType]}
          </Typography>
        </a>);
      }
      else if (contactType.toLowerCase() === 'email') {
        value = (<a href={`mailto:${value}`} target="_blank">
          <Typography variant="body1" className={classes.buttonContent}>
            {icons[contactType]}
          </Typography>
        </a>);
      }
      else {
        value = (<a href={`${value}`} target="_blank">
          <Typography variant="body1" className={classes.buttonContent}>
            {icons[contactType]}
          </Typography>
        </a>);
      }

      return (
        <Button key={cd.contact_value}>
          {value}
        </Button>
      );
    });

    return (
      <Card className={classes.card}>
        <CardContent>
          <div className={classes.cardTop}>
            <div className={classes.title}>
              <Typography variant="display1">{name}&#32;</Typography>
              <Typography variant="display1" className={classes.in}>{inOrg}</Typography>
            </div>
            <IconButton onClick={this.handleShareClick} className={classes.iconButton}>
              <Share/>
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
            >
              <MenuItem className={classes.menuItem}>
                <CopyToClipboard text={shareLink} onCopy={this.handleCopy}>
                  <Button variant="outlined">{copied ? 'Copied!' : 'Copy URL'}</Button>
                </CopyToClipboard>
              </MenuItem>
              <MenuItem onClick={this.handleClose} className={classes.menuItem}>
                <FacebookShareButton url={shareLink} className={classes.shareButton}>
                  <SvgIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M426.8 64H85.2C73.5 64 64 73.5 64 85.2v341.6c0 11.7 9.5 21.2 21.2 21.2H256V296h-45.9v-56H256v-41.4c0-49.6 34.4-76.6 78.7-76.6 21.2 0 44 1.6 49.3 2.3v51.8h-35.3c-24.1 0-28.7 11.4-28.7 28.2V240h57.4l-7.5 56H320v152h106.8c11.7 0 21.2-9.5 21.2-21.2V85.2c0-11.7-9.5-21.2-21.2-21.2z"/>
                  </SvgIcon>
                </FacebookShareButton>
              </MenuItem>
              <MenuItem onClick={this.handleClose} className={classes.menuItem}>
                <TwitterShareButton url={shareLink} className={classes.shareButton}>
                  <SvgIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M492 109.5c-17.4 7.7-36 12.9-55.6 15.3 20-12 35.4-31 42.6-53.6-18.7 11.1-39.4 19.2-61.5 23.5C399.8 75.8 374.6 64 346.8 64c-53.5 0-96.8 43.4-96.8 96.9 0 7.6.8 15 2.5 22.1-80.5-4-151.9-42.6-199.6-101.3-8.3 14.3-13.1 31-13.1 48.7 0 33.6 17.2 63.3 43.2 80.7-16-.4-31-4.8-44-12.1v1.2c0 47 33.4 86.1 77.7 95-8.1 2.2-16.7 3.4-25.5 3.4-6.2 0-12.3-.6-18.2-1.8 12.3 38.5 48.1 66.5 90.5 67.3-33.1 26-74.9 41.5-120.3 41.5-7.8 0-15.5-.5-23.1-1.4C62.8 432 113.7 448 168.3 448 346.6 448 444 300.3 444 172.2c0-4.2-.1-8.4-.3-12.5C462.6 146 479 129 492 109.5z"/>
                  </SvgIcon>
                </TwitterShareButton>
              </MenuItem>
            </Menu>
          </div>
          <ServiceDeliveryLink serDelLinks={serDelLinks} />
        </CardContent>
        <CardActions>
          {contactDetailButtons}
        </CardActions>
      </Card>
    );
  }
}

export default withRoot(withStyles(styles)(ServiceHeader));
