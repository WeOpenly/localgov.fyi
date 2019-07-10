import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {navigate} from '@reach/router';

import { connect } from 'react-redux';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
    FacebookShareButton,
    TwitterShareButton,
} from 'react-share';
import { encode } from 'universal-base64';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';

import withRoot from '../withRoot';

import { trackClick} from "./common/tracking";

const styles = theme => ({
  service_card_card: {
    display: 'flex',
    maxWidth: '320px',
    flexDirection: 'column',
    justifyContent: 'baseline',
    borderTop: `2px solid #AB93FF`,
    boxShadow: '0px 3px 5px 0px rgba(0,0,0,0.1),0px 1px 1px 0px rgba(0,0,0,0.07),0px 2px 6px 1px rgba(0,0,0,0.06)',
    padding: theme.spacing.unit/2,
    height: theme.spacing.unit * 20,
    margin: theme.spacing.unit
  },
service_card_cardTop : {
    display: 'flex',
    justifyContent: 'space-between',
    marginRight: -theme.spacing.unit,
  },
    service_card_cardTitle:{
        cursor: 'pointer',
    },
service_card_caption : {
    overflowY: 'hidden',
    cursor: 'pointer',
    height : theme.spacing.unit * 6,
  },
service_card_cardActions : {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: theme.spacing.unit,
    padding:0,
  },
service_card_iconButton : {
    marginTop: theme.spacing.unit * -2,
    marginRight: theme.spacing.unit * -2,
  },
service_card_menuItem : {
    display: 'flex',
    justifyContent: 'center',
  },
service_card_shareButton : {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
service_card_cardContent : {
    paddingBottom: 0,
    height : theme.spacing.unit * 13,
},
service_card_dividerWrapper : {
    paddingLeft: theme.spacing.unit * 4,
    paddingRight: theme.spacing.unit * 4,
  },
  "service_card_raw":{
      height: 'auto',
      minHeight: '48px',
     '& $p':{
padding : 0,
margin: 0,
    }
  }
});

const RawHTML = ({ children, className = "" }) => (
    <div
        className={className}
        style={{padding:0, margin: 0}}
        dangerouslySetInnerHTML={{ __html: children.replace(/\n/g, " ") }}
    />
);

class SearchResult extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleDeliveryClick = this.handleDeliveryClick.bind(this);
        this.handleMoreVertClick = this.handleMoreVertClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleCopy = this.handleCopy.bind(this);
    }
      componentDidMount(){
        }

    handleClick() {
        const { trackClick, resultType, id, toLink, title,  listIndex} = this.props;
        trackClick('card_item', resultType, id, title, listIndex);

        navigate(toLink);
    }

    handleDeliveryClick() {
        const { trackClick, deliveryLink } = this.props;
        const windowGlobal = typeof window !== 'undefined' && window;
        trackClick('external', 'service_delivery_link', deliveryLink.url, deliveryLink.link_name, 0);
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
        const { classes, title, description, deliveryLink, toLink, id, org_name } = this.props;

        const windowGlobal = typeof window !== 'undefined' && window;
        const windowLocation = windowGlobal.location ? windowGlobal.location : {};
        const shareLink = windowLocation.origin + toLink + '/';
        let redir = null;
        if (deliveryLink && 'url' in deliveryLink){
            const data = {
                's': title,
                'o': org_name,
                'u': deliveryLink.url
            }
            const encodedData = encode(JSON.stringify(data))
            redir = `/deep_link/?data=${encodedData}`
        }
        
        let key = title
        if (this.props.key) {
            key = this.props.key
        }

        let subtitle = '';
        if (description){
            subtitle = (description.length > 80) ? description.substr(0, 79) + '&hellip;' : description;
        }
        
        return (
            <Card className={classes.service_card_card}>
                    <CardContent className={classes.service_card_cardContent}>
                        <div className={classes.service_card_cardTop}>
                            <Typography variant="body2" component="h1"  className={classes.service_card_cardTitle} onClick={this.handleClick}>
                                {title}
                            </Typography>
                        </div>
                        <Typography variant="caption" className={classes.service_card_caption} onClick={this.handleClick}>
                            <RawHTML className={classes.service_card_raw}>{subtitle}</RawHTML>
                            
                        </Typography>
                    </CardContent>

                    <CardActions className={classes.service_card_cardActions}>
                    {(deliveryLink && deliveryLink.link_name) && <Button size="small" color="primary" href={redir}  target="_blank" onClick={this.handleDeliveryClick}>
                            {deliveryLink.link_name}
                        </Button>}
                
                    </CardActions>
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
)(withStyles(styles)(SearchResult));

export default ConnSearchResult;