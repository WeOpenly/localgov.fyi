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
    delivery_form_button_container:{
        marginTop: theme.spacing.unit * 2
    },
    account_form_loginEmbed: {},
    account_form_registerinstead: {
        marginTop: theme.spacing.unit *4,
        display: 'flex'
    },
    form:{
        margin: theme.spacing.unit *2,
    },
    formButtonContainer:{
        margin: theme.spacing.unit *4,
        display: 'flex',
        justifyContent: 'center'
    }
});


function ObjectFieldTemplate(props) {
    return (
        <div>
            {props.properties.map(element => <div className="property-wrapper">{element.content}</div>)}
        </div>
    );
}

function CustomFieldTemplate(props) {
    const { id, classNames, label, help, required, description, errors, children } = props;

    return (
        <div className={classNames}>
            {description}
            {children}
            <Typography variant="caption" color="error">
                {errors}
            </Typography>

            {help}
        </div>
    );
}

function ErrorListTemplate(props) {
    const { errors } = props;
    return (
        <ul style={{ display: 'none' }}>
            {errors.map(error => (
                <li key={error.stack}>
                    {error.stack}
                </li>
            ))}
        </ul>
    );
}

class matTextWidget extends React.Component {
    render() {
        const { label, value, required, title, name } = this.props;
        return (<TextField
            id={`outlined-${title}`}
            label={label}
            value={value}
            required={required}
            placeholder={title}
            onChange={(event) => this.props.onChange(event.target.value)}
            margin="dense"
            fullWidth
            variant="outlined"
        />)
    }
}


const widgets = {
    TextWidget: matTextWidget,
    EmailWidget: matTextWidget,
};



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
        let trimmedUi = null;
        let trimmedFD = null;
        
        if (step_details && step_details.field_schema) {
            trimmedFS = step_details.field_schema.trim(); 
            trimmedFS = JSON.parse(trimmedFS);         
        }

        if (step_details && step_details.ui_schema) {
            trimmedUi = step_details.ui_schema.trim();
            trimmedUi = JSON.parse(trimmedUi);
        }

        if (step_details && step_details.form_data) {
            trimmedFD = step_details.form_data.trim(); 
            trimmedFD = JSON.parse(trimmedFD);         
        }
    
        return (
            <Form schema={trimmedFS}
                formData={trimmedFD}
                uiSchema={trimmedUi}
                className={classes.form}
                onSubmit={this.submitForm}
                widgets={widgets}
                ObjectFieldTemplate={ObjectFieldTemplate}
                FieldTemplate={CustomFieldTemplate}
                ErrorList={ErrorListTemplate}
                onError={() => { }} >
                <div className={classes.delivery_form_button_container}>
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