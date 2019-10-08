import React, { Component, Fragment } from "react";
import styles from "../../spectre.min.module.css";
import expStyles from "../../spectre-exp.min.module.css";
import iconStyles from "../../typicons.min.module.css";

import { connect } from "react-redux";
import { ErrorMessage } from "formik";
import classnames from "classnames";
import Dropzone from "react-dropzone";

import {uploadFile} from '../actions';

const windowGlobal = typeof window !== 'undefined' && window

const Label = ({ error, children, htmlFor, ...props }) =>
  children ? (
    <div >
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
      files: [],
      uploadinProgress:false
    };

    this.onDrop = this.onDrop.bind(this);
  }

  componentDidMount(){
    const {value} = this.props.field;
    if(value){
      this.setState({
        files: value
      })
    }
  }

  onDrop(acceptedFiles) {
    const {field, uid, form } = this.props;
    let progStep = acceptedFiles.length;
     this.setState({
       uploadinProgress: true
     });
    acceptedFiles.forEach((file, fileIdx) => {
      const updateStates = (downloadUrl) => {
              const newarr = this.state.files.concat([downloadUrl])
              const upDone = fileIdx === acceptedFiles.length - 1;

              this.setState({
                files: newarr,
                uploadinProgress: !upDone
              });
            
              form.setFieldValue(field.name, this.state.files);
              progStep = progStep - 1;
            //setFieldValue(field.name, this.state.files);
       }

      if (windowGlobal) {
        uploadFile(uid, file, updateStates)
      }
    })
  }

  render() {
    const {
      errorMessage,
      title,
      classes,
      placeholder,
      type,
      label,
      disabled,
      serName
    } = this.props;
    const { name, onBlur, value } = this.props.field;
    const { touched, errors, handleBlur, handleChange } = this.props.form;
    const error = errors[name];
 
    return (
      <Fragment>
        <Dropzone onDrop={this.onDrop} multiple>
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
                <div style={{ margin: "0 0 0 0" }}>
                  {label && (
                    <Label htmlFor={name} error={error}>
                      {label}
                    </Label>
                  )}
                </div>

                <div
                  style={{
                    display: "flex",
                    marginTop: "8px",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    border: `${
                      error
                        ? "1px solid #d73e48"
                        : "1px dotted rgba(86, 39, 255, .2)"
                    }`,

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
                  {error ? (
                    <div style={{ margin: "8px 0" }}>
                      <span className={`${styles.label}`}>{error}</span>
                    </div>
                  ) : (
                    ""
                  )}
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
        <div>
          {this.state.files.length > 0 &&
            this.state.files.map((fileUrl, idx) => (
              <div
                key={`attachment-${idx}`}
                style={{ margin: "4px 0", cursor: "pointer" }}
              >
                <a target="_blank" href={fileUrl}>
                  <span
                    className={`${styles.label} ${styles.labelSecondary}`}
                    style={{ background: "#fff" }}
                  >
                    <span
                      className={`${iconStyles.typcn} ${iconStyles.typcnAttachment}`}
                    />
                    {serName} {idx + 1}
                  </span>{" "}
                </a>
              </div>
            ))}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = function(state, ownProps) {
  return {
    uid: state.oneUser.details.uid,
  };
};

export default connect(mapStateToProps)(FileInput);
