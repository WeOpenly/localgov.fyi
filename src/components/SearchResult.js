import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { navigateTo } from 'gatsby-link';
import { connect } from 'react-redux';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
    FacebookShareButton,
    TwitterShareButton,
} from 'react-share';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import MoreVert from '@material-ui/icons/MoreVert';
import withRoot from '../withRoot';

import { trackClick} from "./Search/tracking";

const styles = theme => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 200,
    // cursor: 'pointer',
    boxShadow: `0 0 1px 1px #EBE5FF`,
  },
  media: {
    height: 200,
  },
  cardTop: {
    display: 'flex',
    justifyContent: 'space-between',
    marginRight: -theme.spacing.unit,
  },
  caption: {
    height: 80,
    overflowY: 'scroll',
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'flex-end',
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
});

const RawHTML = ({ children, className = "" }) => (
    <div
        className={className}
        dangerouslySetInnerHTML={{ __html: children.replace(/\n/g, " ") }}
    />
);

class SearchResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            copied: false,
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleDeliveryClick = this.handleDeliveryClick.bind(this);
        this.handleMoreVertClick = this.handleMoreVertClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleCopy = this.handleCopy.bind(this);
    }

    handleClick() {
        const { trackClick, resultType, id, toLink, title,  listIndex} = this.props;
        trackClick('card_item', resultType, id, title, listIndex);
        navigateTo(toLink);
    }

    handleDeliveryClick() {
        const { trackClick, deliveryLink } = this.props;
        const windowGlobal = typeof window !== 'undefined' && window;
        trackClick('external', 'service_delivery_link', deliveryLink.url, deliveryLink.link_name, 0);
        windowGlobal.open(deliveryLink.url);
    }

    handleMoreVertClick(event) {
        this.setState({ anchorEl: event.currentTarget });
    }

    handleClose() {
        this.setState({ anchorEl: null, copied: false });
    }

    handleCopy() {
        this.setState({ copied: true });
    }

    render() {
        const { classes, title, description, deliveryLink, toLink } = this.props;
        const { anchorEl, copied } = this.state;
        const windowGlobal = typeof window !== 'undefined' && window;
        const windowLocation = windowGlobal.location ? windowGlobal.location : {};
        const shareLink = windowLocation.origin + toLink;
        let key = title
        if (this.props.key) {
            key = this.props.key
        }

        let subtitle = '';
        if (description){
            subtitle = description;
        }

        return (
            <Card className={classes.card}>
                <Fragment>
                    {/*<CardMedia
                        image="https://via.placeholder.com/345x345"
                        className={classes.media}
                    />*/}
                    <CardContent>
                        <div className={classes.cardTop}>
                            <Typography variant="body1" component="h1">
                                {title}
                            </Typography>
                            <IconButton onClick={this.handleMoreVertClick} className={classes.iconButton}>
                                <MoreVert/>
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
                        <Typography variant="caption" className={classes.caption}>
                            <RawHTML>{subtitle}</RawHTML>
                        </Typography>
                    </CardContent>
                </Fragment>
                <Fragment>
                    <CardActions className={classes.cardActions}>
                        <Button size="small" color="primary" onClick={this.handleClick}>
                            More details
                        </Button>
                        {(deliveryLink && deliveryLink.link_name) && <Button size="small" color="primary" onClick={this.handleDeliveryClick}>
                            {deliveryLink.link_name}
                        </Button>}
                    </CardActions>
                </Fragment>
            </Card>
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

const ConnSearchResult = connect(
    mapStateToProps,
    mapDispatchToProps
)(withRoot(withStyles(styles)(SearchResult)));

export default ConnSearchResult;