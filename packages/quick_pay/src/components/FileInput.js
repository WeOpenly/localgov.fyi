import React, { Component, Fragment } from "react";
import styles from "./spectre.min.module.css";
import expStyles from "./spectre-exp.min.module.css";
import iconStyles from "./typicons.min.module.css";
import CardLogos from "../illus/CardLogos.js";
import Dropzone from "react-dropzone";

import { uploadFile } from "./actions";

const windowGlobal = typeof window !== "undefined" && window;

const Label = ({ error, children, htmlFor, ...props }) =>
  children ? (
    <div>
      <label className={styles.formLabel} htmlFor={htmlFor}>
        {children}
      </label>
    </div>
  ) : (
    ""
  );

class FileInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadinProgress: false
    };

    this.onDrop = this.onDrop.bind(this);
  }


  onDrop(acceptedFiles) {
    const {onFileAdded} = this.props;
     this.setState({
       uploadinProgress: true
     });
     onFileAdded(acceptedFiles);
  }

  render() {
    return (
      <Fragment>
        <div
          className={styles.card}
          style={{
            boxShadow: "0 .25rem 1rem rgba(48,55,66,.15)",
            padding: "0.5rem 2rem"
          }}
        >
          <Dropzone onDrop={this.onDrop}>
            {({
              getRootProps,
              getInputProps,
              isDragActive,
              isDragReject,
              rejectedFiles
            }) => (
              <div
                className={`${styles.formGroup}  ${
                  this.props.classes ? this.props.classes : ""
                }`}
                {...getRootProps()}
              >
                <div className={`${styles.col12} ${styles.colSm12}`}>
                  <div
                    style={{
                      display: "flex",
                      marginTop: "8px",
                      flexDirection: "column",
                      justifyContent: "center",
                      padding: "2rem",
                      alignItems: "center",
                      border: "1px dotted rgba(86, 39, 255, .2)",
                      borderRadius: "10px",
                      cursor: "pointer",
                      background: `${isDragActive ? "#fff" : "#f7f8f9"}`
                    }}
                  >
                    <div
                      className={styles.textGray}
                      style={{
                        margin: "16px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                      }}
                    >
                      <div>
                        <span
                          className={`${iconStyles.typcn} ${iconStyles.typcnUpload}`}
                          style={{
                            fontSize: "1.1rem"
                          }}
                        />
                      </div>
                      <div>
                        {!isDragActive && "Click here or drop a file to upload"}
                        {isDragReject && "File type not accepted, sorry!"}
                      </div>
                    </div>
                    <input {...getInputProps()} />
                  </div>
                </div>
              </div>
            )}
          </Dropzone>
          <div style={{ width: "100%" }}>
            {this.state.uploadinProgress ? (
              <progress
                style={{ width: "100%" }}
                className={expStyles.progress}
                max="100"
              />
            ) : null}
          </div>
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <div>
              <div
                className={`${styles.column} ${styles.col12} ${styles.textCenter}`}
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center"
                }}
              >
                <CardLogos />
              </div>
              <div
                className={`${styles.column} ${styles.col12} ${styles.textCenter}`}
                style={{
                  marginBottom: "1rem",
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center"
                }}
              >
                <div
                  style={{
                    textAlign: "center"
                  }}
                >
                  <span
                    style={{ padding: "0 4px 0 0 ", color: "#30ae40" }}
                    className={`${iconStyles.typcn} ${iconStyles.typcnLockClosedOutline}`}
                  ></span>
                  <span style={{ fontSize: "12px" }}>
                    Your data, and transactions are always safe & secure
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default FileInput;
