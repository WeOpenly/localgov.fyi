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
import Divider from '@material-ui/core/Divider';
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
    boxShadow: '0 0 0 0',
    border: `1px solid ${theme.palette.primary['50']}`,
  },
  media: {
    height: 200,
  },
  cardTop: {
    display: 'flex',
    justifyContent: 'space-between',
    marginRight: -theme.spacing.unit,
  },
  cardTitle: {
    fontWeight: 600,
    cursor: 'pointer',
  },
  caption: {
    height: 80,
    overflowY: 'scroll',
    cursor: 'pointer',
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  iconButton: {
    marginTop: theme.spacing.unit * -2,
    marginRight: theme.spacing.unit * -2,
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
  dividerWrapper: {
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
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
                            <Typography variant="body1" component="h1" className={classes.cardTitle} onClick={this.handleClick}>
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
                                        <Typography>{copied ? 'Copied!' : 'Copy link'}</Typography>
                                    </CopyToClipboard>
                                </MenuItem>
                                <MenuItem onClick={this.handleClose} className={classes.menuItem}>
                                    <FacebookShareButton url={shareLink} className={classes.shareButton}>
                                        <Typography>Facebook</Typography>
                                    </FacebookShareButton>
                                </MenuItem>
                                <MenuItem onClick={this.handleClose} className={classes.menuItem}>
                                    <TwitterShareButton url={shareLink} className={classes.shareButton}>
                                        <Typography>Twitter</Typography>
                                    </TwitterShareButton>
                                </MenuItem>
                            </Menu>
                        </div>
                        <Typography variant="caption" className={classes.caption} onClick={this.handleClick}>
                            <RawHTML>{subtitle}</RawHTML>
                        </Typography>
                    </CardContent>
                </Fragment>
                <div className={classes.dividerWrapper}>
                    <Divider />
                </div>
                <Fragment>
                    <CardActions className={classes.cardActions}>
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