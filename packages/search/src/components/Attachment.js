import React, {Component, Fragment} from "react";

import styles from "./spectre.min.module.css";
import classNames from "classnames/bind";

let cx = classNames.bind(styles);

class Attachment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.openAttachment = this.openAttachment.bind(this);
    this.closeAttachment = this.closeAttachment.bind(this);
  }

  closeAttachment(ev){
    this.setState({
      isOpen: false
    })
  }

  openAttachment(ev){
    this.setState({
      isOpen: true
    })
  }

  render() {
    const { url, name, description } = this.props;

    let className = cx({
      modal: true,
      active: this.state.isOpen
    });

    return (
      <div key={`att-img-${name}`} id={`att-img-${name}`}>
        {this.state.isOpen ? (
          <div className={className}>
            <a
              href="#close"
              onClick={this.closeAttachment}
              className={styles.modalOverlay}
              aria-label="Close"
            />
            <div className={styles.modalContainer}>
              <div
                className={styles.modalHeader}
                style={{ textAlign: "center" }}
              >
                <h5 className={styles.modalTitle}>{name}</h5>
              </div>

              <div className={`${styles.modalBody}`}>
                <img src={url} className={styles.imgFitContain} alt={name} />
              </div>
            </div>
          </div>
        ) : null}

        <div
          key={`img-${name}`}
          id={`img-${name}`}
          style={{ width: "240px", cursor: "pointer" }}
          onClick={this.openAttachment}
        >
          <figure
            className={`${styles.figure}`}
            style={{ textAlign: "center" }}
          >
            <img
              style={{ width: "240px" }}
              src={url}
              className={styles.imgFitCover}
              alt={name}
            />
            <figcaption className={styles.figureCaptionTextCenter}>
              {name}
            </figcaption>
          </figure>
        </div>
      </div>
    );
  }
}

export default Attachment;