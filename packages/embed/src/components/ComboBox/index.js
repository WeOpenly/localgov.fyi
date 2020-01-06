import React, { Component, Fragment } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  ComboboxOptionText
} from "@reach/combobox";
import "@reach/combobox/styles.css";

import styles from "../spectre.min.module.css";
import iconStyles from "../typicons.min.module.css";

class ComboBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ""
    };

    this.onSelect = this.onSelect.bind(this);
    this.searchServices = this.searchServices.bind(this);
  }

  searchServices(ev) {
    this.setState({
      searchText: ev.target.value
    });
  }

  onSelect(item) {
    let { services, selectTemplate } = this.props;

    if (this.state.searchText) {
      services = services.filter(
        s => s.node.service_name.toLowerCase().indexOf(item.toLowerCase()) !== -1
      );
    }

    console.log(services, item);

    if (services && services.length == 1){
        selectTemplate(services[0].node.id);
    }
  }

  render() {
    let { services } = this.props;

    if (this.state.searchText){
       services =  services.filter(s => s.node.service_name.toLowerCase().indexOf(this.state.searchText) !== -1);
    }

    const options = services.map((s, idx) => {
      const { service_name, id } = s.node;
      return (
        <ComboboxOption value={service_name} key={id}>
          <ComboboxOptionText />
        </ComboboxOption>
      );
    });

  
    return (
        <Fragment>
          <label className={styles.formLabel} for="input-example-1">
            <h6>Select a service template</h6>
          </label>
          <Combobox className={styles.formGroup} onSelect={this.onSelect}>
            <ComboboxInput
              aria-label="Service Templates"
              className={styles.formInput}
              onChange={this.searchServices}
            />
            <ComboboxPopover className="shadow-popup">
              <ComboboxList aria-label="Service Templates">
                {options}
              </ComboboxList>
            </ComboboxPopover>
          </Combobox>
        </Fragment>
      );
  }
}

export default ComboBox;