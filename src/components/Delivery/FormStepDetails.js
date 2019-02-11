import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import Form from "react-jsonschema-form";

import Spinner from 'react-spinkit';
import {isMobileOnly} from 'react-device-detect';
import {navigate} from '@reach/router';

import TextField from '@material-ui/core/TextField';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import queryString from 'query-string'
import {withStyles} from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {fetchStepDetails, submitStepDetails} from './actions';

const windowGlobal = typeof window !== 'undefined'
    ? window
    : null

const styles = theme => ({
    account_dialog_dialog: {
        height: '460px'
    },
    account_form_loginEmbed: {},
    account_form_registerinstead: {
        marginTop: theme.spacing.unit *4,
        display: 'flex'
    },
    form:{
        margin: theme.spacing.unit *4,
    },
    formButtonContainer:{
        margin: theme.spacing.unit *4,
        display: 'flex',
        justifyContent: 'center'
    }
});


const  CustomFieldTemplate = (props) => {
    const {
        id,
        classNames,
        label,
        help,
        required,
        description,
        errors,
        children
    } = props;

    let textLabel = label;
    if (required){
        textLabel = textLabel + '*';
    }
    console.log(props);
    return (
        <TextField
        className={classNames}
        InputLabelProps={{
            htmlFor: `${id}`
        }}
        InputProps={{
            'aria-label': 'description'
        }}
        required={required}
        error={errors ? true: false}
        helperText={errors ? errors: help}
        label={textLabel}
        variant="outlined"
        id={id}
      >
       {description}
      {children}
      {errors}
      </TextField>
    );
}

class FormStepDetails extends React.Component {
    constructor(props) {
        super(props);
        this.submitForm = this.submitForm.bind(this);
    }

    submitForm(formData){
        this.props.handleNext('user_details_submit', { formData: formData.formData } );
    }

    componentWillMount() {
        const {dispatch, flowId} = this.props;
        dispatch(fetchStepDetails(flowId, 'user_details_submit'));
    }

    render() {
        const {classes, delivery} = this.props;
        const {stepDetailsLoading, stepDetails, stepDetailsLoadingFailed} = delivery;

        const {step_details} = stepDetails;


        if (stepDetailsLoading) {
            return (<Spinner name="ball-beat" color="blue"/>);
        }

        if (stepDetailsLoadingFailed) {
            return 'Something went wrong!'
        }

        if (!stepDetails || !step_details){
            return null;
        }

        let trimmedFS = null;
        let trimmedUs = null;
        let trimmedFD = null;
        
        if (step_details && step_details.field_schema) {
            trimmedFS = step_details.field_schema.trim(); 
            trimmedFS = JSON.parse(trimmedFS);         
        }

        if (step_details && step_details.form_data) {
            trimmedFD = step_details.form_data.trim(); 
            trimmedFD = JSON.parse(trimmedFD);         
        }

        return (
             <Form
                schema={trimmedFS}
                formData={trimmedFD}
                className={classes.form}
                onChange={() => console.log("changed")}
                onSubmit={this.submitForm}
                onError={() => console.log("errors")}>
                <div className={classes.formButtonContainer}>
                     <Button
                    type="submit"
                    variant="outlined"
                    color="primary"
                    className={classes.button}>
                    Next
                </Button>
                </div>
                
            </Form>
        );
    }
}

FormStepDetails.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = function (state, ownProps) {
    return {
        ...state,
        ...ownProps
    };
};

export default connect(mapStateToProps)(withStyles(styles)(FormStepDetails));