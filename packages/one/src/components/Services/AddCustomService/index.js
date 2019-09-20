import React, { Component, Fragment } from "react";
import slugify from "slugify";
import styles from "../../spectre.min.module.css";
import ServiceForm from "../ServiceForm";
const windowGlobal = typeof window !== "undefined" && window;

class AddCustomService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serviceName: ""
    };
    this.setServiceName = this.setServiceName.bind(this);
  }

  setServiceName(ev) {
    this.setState({
      serviceName: ev.target.value
    });
  }

  render() {
    const { attachedFiles, serviceId, onFileDrop, onSave } = this.props;
    const slugService = slugify(this.state.serviceName);

    const flexFormSchema = {
      id: `FLEX_SERVICE_${slugService}`,
      name: `${this.state.serviceName}`,
      faqs: [],
      formSchema: [
        {
          id: "providerName",
          name: "providerName",
          label: "Name of the provider",
          validationType: "string",
          description: "Name of the provider",
          type: "string",
          validations: [
            {
              type: "required",
              params: ["this field is required"]
            }
          ]
        },
        {
          id: "acctNumber",
          name: "acctNumber",
          label: "Customer Number/Account Number",
          description: "Customer Number/Account Number",
          type: "string",
          validationType: "string",
          validations: [
            {
              type: "required",
              params: ["this field is required"]
            }
          ]
        },
        {
          id: "billFile",
          name: "billFile",
          label: "Upload latest (or any available) bill",
          description: "Upload latest (or any available) bill",
          type: "fileArray",
          validationType: "mixed",
          validations: [
            {
              type: "required",
              params: ["this field is required"]
            }
          ]
        }
      ]
    };

    return (
      <div className={styles.colums}>
        <div className={`${styles.formGroup}`}>
          <div className={`${styles.col12}`}>
            <label className={styles.formLabel} htmlFor="flex_service_name">
              <h6>Service Name</h6>
            </label>
          </div>

          <div className={`${styles.col12}`}>
            <input
              id={this.state.serviceName}
              className={`${styles.formInput}`}
              name="flex_service_name"
              type="text"
              placeholder=""
              onChange={this.setServiceName}
              value={this.state.serviceName || ""}
            />
          </div>
          <div className={styles.columns} style={{ margin: "1rem 0" }}>
            <ServiceForm
              key={`service-form-${flexFormSchema.id}`}
              selectedService={flexFormSchema}
              showName={false}
              isFinalized={false}
              showFaq={false}
              onSubmit={this.props.updateServiceDetails}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default AddCustomService;
