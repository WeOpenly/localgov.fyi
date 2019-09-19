import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { navigate } from "@reach/router";
import PropTypes from "prop-types";
import styles from "../spectre.min.module.css";
import iconStyles from "../typicons.min.module.css";
import FieldComponents from "./FormFields/FieldComponents";
import { createYupSchema } from "./yupSchemaCreator";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import ServiceFaq from "./ServiceFaq";



class ServiceForm extends Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.yupSchema = this.yupSchema.bind(this);
  }

  yupSchema() {
    const { selectedService, canSkip } = this.props;
    const yepSchema = selectedService.formSchema.reduce(createYupSchema, {});
    const sch = yup.object().shape(yepSchema);
    return sch;
  }

  submitForm(values ) {
    const { onSubmit, selectedService } = this.props;
    console.log(values, onSubmit)
    onSubmit(values, selectedService);
  }

  render() {
    const { selectedService, canSkip, uploadedFile, showFaq } = this.props;
    const { name, icon } = selectedService;
    const { initialFormData, formData, faqs } = selectedService;
    let initialValues = formData;
    console.log(selectedService.formData);
    if (!formData){
        initialValues = initialFormData;
    }

    return (
      <Fragment>
        <div className={`${styles.column} ${styles.col1} ${styles.hideXs}`} />
        <div
          className={`${styles.column} ${
            showFaq ? `${styles.col6}` : `${styles.col12}`
          } ${styles.colXs12}`}
        >
          <h5
            className={` ${styles.cardTitle}`}
            style={{ margin: "1rem 0.2rem" }}
          >
            {this.props.showName ?       this.props.isFinalized ? (
              <span
                className={`${iconStyles.typcn} ${styles.textSuccess} ${iconStyles.typcnTick}`}
              />
            ) : null : null}
      
          </h5>
          <div
            className={styles.card}
            style={{
              border: "1px solid rgba(86, 39, 255, .2)",
              background: "#fff",
              marginBottom: "4rem",
              padding: "0.2rem",
              borderRadius: "0.3rem",
              boxShadow: "0 .1rem 0.1rem rgba(48,55,66,.10)"
            }}
          >
            <div className={`${styles.cardBody}`}>
              <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                validationSchema={this.yupSchema()}
                className={styles.formGroup}
                onSubmit={values => {
                  // same shape as initial values

                  this.submitForm(values);
                }}
                render={(props, actions) => {
                  return (
                    <form
                      className={styles.formHorizontal}
                      onSubmit={props.handleSubmit}
                    >
                      <FieldComponents
                        key={`${name}-field-component`}
                        {...props}
                        formSchema={selectedService.formSchema}
                      />
                      <div className={styles.textRight}>
                        <button
                          disabled={!props.isValid}
                          className={`${styles.btn} ${styles.btnPrimary} ${styles.btnLg}`}
                          type="submit"
                        >
                          {!formData ? ` Submit ` : ` Update`}
                        </button>
                      </div>
                    </form>
                  );
                }}
              />
            </div>
          </div>
        </div>
        {showFaq ? (
          <div className={`${styles.column} ${styles.col4} ${styles.colXs12}`}>
            <ServiceFaq faqs={faqs} serviceId={name} />
          </div>
        ) : null}
        <div className={`${styles.column} ${styles.col1} ${styles.hideXs}`} />
      </Fragment>
    );
  }
}

export default ServiceForm;
