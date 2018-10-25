import React from 'react'
import {Field, reduxForm} from 'redux-form'
import queryString from 'query-string'
import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button';
import {handleRegisterRequest} from './actions';


const validate = values => {
    const errors = {}
    const requiredFields = ['email', 'password']
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required'
        }
    })
    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    return errors
}

const renderTextField = ({
    input,
    label,
    meta: {
        touched,
        error
    },
    ...custom
}) => (<TextField
    id="outlined-full-width"
    label
    touched
    error={touched && error}
    style={{
    margin: 8
}}
    fullWidth
    margin="normal"
    variant="outlined"
    InputLabelProps={{
    shrink: true
}}
    {...input}
    {...custom}/>);

const renderPassField = ({
    input,
    label,
    meta: {
        touched,
        error
    },
    ...custom
}) => (<TextField
    hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}/>)

const renderCheckbox = ({input, label}) => (<Checkbox
    label={label}
    checked={input.value
    ? true
    : false}
    onCheck={input.onChange}/>)

const MaterialUiForm = props => {
    const {handleSubmit,  pristine, reset, submitting, error} = props
  
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field
                    name="email"
                    type="email"
                    component={renderTextField}
                    label="Email Address"/>
            </div>
            <div>
                <Field
                    name="password"
                    type="password"
                    component={renderTextField}
                    label="Password"/>
            </div>
            <div>
                <Button type="submit" variant="contained" disabled={pristine || submitting}>
                    Submit
                </Button>
                <Button
                    type="button"
                    variant="outlined"
                    disabled={pristine || submitting}
                    onClick={reset}>
                    Clear Values
                </Button>
            </div>
            <div>
                {error ? error : ''}
            </div>
        </form>
    )
}

export default reduxForm({
    form: 'RegisterForm', // a unique identifier for this form
    validate
})(MaterialUiForm)
