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
    amount: {
        margin: theme.spacing.unit *4
    },
    button: {
        margin: theme.spacing.unit *4,
        display: 'flex',
        justifyContent: 'center'
    }
});

const CustomFieldTemplate = (props) => {
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
    if (required) {
        textLabel = textLabel + '*';
    }

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
            error={errors
            ? true
            : false}
            helperText={errors
            ? errors
            : help}
            label={textLabel}
            variant="outlined"
            id={id}>
            {description}
            {children}
            {errors}
        </TextField>
    );
}

class CallApiStepDetails extends React.Component {
    constructor(props) {
        super(props);
        this.consentSubmit = this.consentSubmit.bind(this);
    }

    consentSubmit() {
        const {delivery} = this.props;
        const {stepDetails} = delivery;
        const {step_details} = stepDetails;
        const {id, step_type} = step_details;
        this.props.handleNext(step_type, id, true);
    }

    componentWillMount() {
        const {dispatch, id} = this.props;
        dispatch(fetchStepDetails(id));
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

        if (!stepDetails || !step_details) {
            return null;
        }

        const {amount_to_pay} = step_details;

        return (
            <Grid container spacing={16} align="center" >
                <Grid item xs='auto' sm={2} />
                    <Grid item xs={12} sm={8} >
                    <Typography variant="headline" component="h1" className={classes.amount}>
                        {amount_to_pay}
                    </Typography>
                    </Grid> 
                <Grid item xs='auto' sm={2} />
                <Grid item xs='auto' sm={2} />
                    <Grid item xs={12} sm={8} >
                        <Button
                            type="button"
                            variant="outlined"
                            color="primary"
                            onClick={this.consentSubmit}
                            className={classes.button}>
                            Accept and proceed
                        </Button>
                    </Grid>
                <Grid item xs='auto' sm={2} />
            </Grid>
        );
    }
}

CallApiStepDetails.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = function (state, ownProps) {
    return {
        ...state,
        ...ownProps
    };
};

export default connect(mapStateToProps)(withStyles(styles)(CallApiStepDetails));