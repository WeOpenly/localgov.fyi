import * as yup from "yup";

export function createYupSchema(schema, config) {
  const { id, validationType, validations = [] } = config;
  if (!yup[validationType]) {
    return schema;
  }
  let validator = yup[validationType]();
  validations.forEach(validation => {
    const { params, type } = validation;
    if (!validator[type]) {
      return;
    }
    validator = validator[type](...params);
  });
  schema[id] = validator;
  return schema;
}
