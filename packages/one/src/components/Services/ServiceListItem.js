import React from "react";
import { Elements } from "react-stripe-elements";

import styles from "../spectre.min.module.css";
import iconStyles from "../typicons.min.module.css";
import classNames from "classnames/bind";

let cx = classNames.bind(styles);

class ServiceListItem extends React.Component {
  constructor(props) {
    super(props);
    this.expandCard = this.expandCard.bind(this);
    this.state = {
      expanded: false
    };
  }

  expandCard(){
    this.setState({
      expanded: !this.state.expanded
    });
  }

  render() {
    return (
      <div
        className={`${styles.card} ${styles.textCenter}`}
        style={{
          border: "1px solid rgba(48,55,66,.10)",
          background: `${
            this.props.isSelected && !this.props.isFinalized
              ? "#ece6ff"
              : "#fff"
          }`,
          marginBottom: "4rem",
          maxHeight: "340px",
          minHeight: "180px",
          margin: "0.5rem",
          padding: "0.2rem",
          display: "flex",
          justifyContent: "center",
          width: "300px",
          borderRadius: "0.3rem",
          boxShadow: "0 .1rem 0.1rem rgba(48,55,66,.10)"
        }}
      >
        <div
          className={styles.cardImage}
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "1.1rem 0 0.6rem 0",
            cursor: "pointer"
          }}
          onClick={this.expandCard}
        >
          {this.props.ser.icon}
        </div>
        <div
          style={{ cursor: "pointer" }}
          onClick={this.expandCard}
          className={styles.cardHeader}
        >
          <h6 className={`${styles.cardTitle}`}>{this.props.ser.name} </h6>
        </div>
        {this.state.expanded ? (
          <div
            className={`${styles.cardBody}`}
            style={{ cursor: "pointer" }}
            onClick={this.expandCard}
          >
            {this.props.ser.shortDescription}
          </div>
        ) : null}
        {this.state.expanded ? (
          <div className={styles.cardFooter} onClick={this.props.onItemClick}>
            {this.props.isFinalized ? (
              <span className={`${styles.label} ${styles.labelRounded} `}>
                <span
                  className={`${iconStyles.typcn} ${styles.textSuccess} ${iconStyles.typcnTick}`}
                />
              </span>
            ) : this.props.isSelected ? (
              <span className={`${styles.label} ${styles.labelRounded} `}>
                <span
                  className={`${iconStyles.typcn}  ${styles.textError}  ${iconStyles.typcnMinus}`}
                />
              </span>
            ) : (
              <span className={`${styles.btn} ${styles.btnLink} `}>
                <span
                  className={`${iconStyles.typcn} ${iconStyles.typcnPlus}`}
                />
                Add
              </span>
            )}
          </div>
        ) : null}
      </div>
    );
  }
}
export default ServiceListItem;
