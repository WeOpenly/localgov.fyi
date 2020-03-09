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
    minWidth: '320px',
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
    style={{ padding: 0, margin: 0, fontSize: "0.7rem", color: "#96a1ad" }}
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
            subtitle = (description.length > 130) ? description.substr(0, 129) + '&hellip;' : description;
        }
        
        return (
          <div
            style={{
              cursor: "pointer",
              width: "288px",
              background: "#fff",
              color: "#3a4251",
              marginLeft: "16px",
              marginRight: "16px",
              padding: "1rem 1rem",
              marginTop: "16px",
              display: "flex",
              alignItems: "center",
              borderRadius: ".8rem",
              boxShadow: "0 0 1px rgba(0,0,0,.08),0 2px 4px rgba(0,0,0,.03)",
              "&::hover": {
                boxShadow: "none"
              },
              textDecoration: "none"
            }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", flex: "80" }}
            >
              <div className={styles.textBold}>
                <h6>{title}</h6>
              </div>
              <div>
                <RawHTML
                  className={`${styles.textSmall} ${styles.textGray}`}
                >
                  {subtitle}
                </RawHTML>
              </div>
              <div>
                {deliveryLink && deliveryLink.link_name && (
                  <button
                    className={`${styles.btn} ${styles.btnSecondary}  ${styles.btnSm}`}
                    href={redir}
                    target="_blank"
                    onClick={this.handleDeliveryClick}
                    color="primary"
                  >
                    {deliveryLink.link_name}
                  </button>
                )}
              </div>
            </div>
          </div>
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