import React, {Fragment} from "react";
import { ErrorMessage } from "formik";
import styles from "../../spectre.min.module.css";

const Label = ({ error, children, htmlFor, ...props }) =>
  children ? (
    <div className={`${styles.col3} ${styles.colSm12}`}>
      <label className={styles.formLabel} htmlFor={htmlFor}>
        {children}
      </label>
    </div>
  ) : (
    ""
  );

const Options = ({options, option_values}) => (
    <Fragment>
        {options.map((opt, idx) => (<option key={opt} value={option_values[idx]}>{opt}</option>))}
    </Fragment>
)

export const SelectInput = ({
  field: { name, value, ...field },
  form: { touched, errors, handleBlur, handleChange },
  label,
  type,
  disabled,
  placeholder,
  ...props
}) => {
  const error = errors[name];
  return (
    <div
      className={`${styles.formGroup} ${props.classes ? props.classes : ""}`}
    >
      {label && (
        <Label htmlFor={name} error={error}>
          {label}
        </Label>
      )}
      <div className={`${styles.col9} ${styles.colSm12}`}>
        <select className={styles.formSelect}>
          <Options options={props.enum_titles} option_values={props.enum}/>
        </select>
        <ErrorMessage
          component="p"
          className={styles.formInputHint}
          name={name}
        />
      </div>
    </div>
  );
};
