import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {navigate} from '@reach/router';
import { connect } from 'react-redux';

import { encode } from 'universal-base64';

import iconStyles from "./typicons.min.module.css";
import styles from "./spectre.min.module.css";

import { trackClick} from "./common/tracking";

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
              "&:hover": {
                boxShadow: "none"
              },
              textDecoration: "none"
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                cursor: "pointer"
              }}
            >
              <a className={styles.textBold} href={toLink}>
                <h5 style={{ margin: "0.5rem 0" }}>{title}</h5>
              </a>

              <a style={{textDecoration: 'none'}} href={toLink}>
                <RawHTML className={`${styles.textSmall} ${styles.textGray}`}>
                  {subtitle}
                </RawHTML>
              </a>
              <div style={{ margin: "0.5rem 0" }}>
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
)(SearchResult);

export default ConnSearchResult;