import React from 'react'
import { Field } from 'formik'
import {TextInput} from './TextInput';
import { SelectInput } from "./SelectInput";
import FileInput from './FileInput';

export function switchInput (field) { 
  let f = { ...field }

  switch(f.type) {
    case 'text':
        f['component'] = TextInput
        break;
    case 'select':
        f["component"] = SelectInput;
        break;
    case 'fileArray':
        f['component'] = FileInput;

        break;
    default:
        f['component'] = TextInput
        break;
  }

  return f;
}

class FieldComponents extends React.Component {
  renderField = (field, errors) => {
    let specific = switchInput(field);
    let props = {
      key: `field-components-fields-${field.name}`,
      label: field.label,
      name: field.name,
      placeholder: field.placeholder ? field.placeholder : "",
      type: field.type ? field.type : "text",
      ...specific,
      errors
    };

    return React.createElement(Field, props);
  };

  render() {
    return this.props.formSchema.map(field =>
      this.renderField(field, this.props.errors)
    );
  }
}

export default FieldComponents