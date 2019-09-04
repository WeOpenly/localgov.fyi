import React from 'react'
import { ErrorMessage } from 'formik';
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


export const TextInput = ({
  field: { name, value, ...field },
  form: { touched, errors, handleBlur, handleChange },
  label,
  type,
  disabled,
  placeholder,
  ...props
}) => {
  const error = errors[name]
  return (
    <div className={`${styles.formGroup} ${props.classes ? props.classes : ''}`}>
      {label && (
        <Label htmlFor={name} error={error}>
          {label}
        </Label>
      )}
      <div className={`${styles.col9} ${styles.colSm12}`}>
      <input
        id={name}
        className={`${styles.formInput} ${error ? styles.isError: ''}`}
        name={name}
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        onBlur={handleBlur}
        onChange={handleChange}
        value={value || ""}
      />
      <ErrorMessage
        component="p"
        className={styles.formInputHint}
        name={name}
      />
      </div>
    </div>
  );
}