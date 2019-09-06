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
          minHeight: "120px",
          margin: "0.5rem",
          padding: "0.2rem",
          width: "300px",
          borderRadius: "0.3rem",
          boxShadow: "0 .1rem 0.1rem rgba(48,55,66,.10)"
        }}
      >
        <div
          className={styles.cardImage}
          style={{
            margin: "1.1rem 0 0.6rem 0"
          }}
        >
          <span
            style={{
              background: "#3500f3",
              color: "#fff",
              padding: "0.4rem",
              fontSize: "1.5rem",
              borderRadius: "0.3rem",
              boxShadow: "0 0.5rem 1rem rgba(86, 39, 255, .2)"
            }}
            className={`${iconStyles.typcn} ${iconStyles.typcnInfinity}`}
          ></span>
        </div>
        <div
          className={styles.cardHeader}
          style={{ cursor: "pointer" }}
          onClick={this.expandCard}
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
