import React from "react";
import { Elements } from "react-stripe-elements";

import AddCustomService from './index';

import styles from "../../spectre.min.module.css";
import classNames from "classnames/bind";

let cx = classNames.bind(styles);

class AddCustomServiceDialog extends React.Component {
  render() {
    const { addSerModalOpen, onSave } = this.props;

    let className = cx({
      modal: true,
      active: addSerModalOpen
    });

    return (
      <div className={className}>
        <a
          href="#close"
          onClick={() => this.props.onClose(false)}
          className={styles.modalOverlay}
          aria-label="Close"
        />
        <div className={styles.modalContainer}>
          <div className={styles.columns} style={{ margin: "1rem 0" }}>
            <div className={styles.modalHeader} style={{ textAlign: "center" }}>
              <h5 className={styles.modalTitle}>Add a new service</h5>
            </div>
            <div
              className={`${styles.column} ${styles.col12}`}
              style={{ padding: "1rem" }}
            >
              <AddCustomService onSave={onSave} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddCustomServiceDialog;
