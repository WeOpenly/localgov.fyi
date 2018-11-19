import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";

import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Spinner from 'react-spinkit';
import Button from '@material-ui/core/Button';

import List from '@material-ui/core/List';
import {navigate} from '@reach/router';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import FormStepDetails from './FormStepDetails';
import PaymentStepDetails from './PaymentStepDetails';

const styles = theme => ({
    fave_orgs_root: {
        padding: theme.spacing.unit * 2
    },
    fave_orgs_head: {
        padding: theme.spacing.unit
    },
    summaryTitle: {
        display: 'flex',
        justifyContent: 'center'
    },
    summaryActions: {
        display: 'flex',
        margin: theme.spacing.unit *4,
        justifyContent: 'center'
    }
});

class StepDetailFactory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0,
            completed: {}
        };
        this.handleNext = this
            .handleNext
            .bind(this);
        this.handleBack = this
            .handleBack
            .bind(this);
        this.handleStep = this
            .handleStep
            .bind(this);
        this.handleComplete = this
            .handleComplete
            .bind(this);
        this.handleReset = this
            .handleReset
            .bind(this);
        this.completedSteps = this
            .completedSteps
            .bind(this);
        this.isLastStep = this
            .isLastStep
            .bind(this);
        this.allStepsCompleted = this
            .allStepsCompleted
            .bind(this);
        this.getStepContent = this
            .getStepContent
            .bind(this);
    }

    getStepContent(step) {
        switch (step.step_type) {
            case 'form':
                return (<FormStepDetails id={step.id}/>)
            case 'callapi_consent':
                // return (<CallApiStepDetails id={step.id}/>);
                return 'hello';
            case 'payment':
                // return (<PaymentStepDetails id={step.id}/>)
                return 'ola';
            default:
                return 'Uknown stepIndex';
        }
    }

    handleNext() {
        const {serviceFlow} = this.props.delivery;
        const {steps} = serviceFlow;
        let activeStep;

        if (this.isLastStep() && !this.allStepsCompleted()) {
            // It's the last step, but not all steps have been completed, find the first
            // step that has been completed
            activeStep = steps.findIndex((step, i) => !(i in this.state.completed));
        } else {
            activeStep = this.state.activeStep + 1;
        }
        this.setState({activeStep});
    }

    handleBack() {
        this.setState(state => ({
            activeStep: state.activeStep - 1
        }));
    }

    handleStep(step) {
        this.setState({activeStep: step});
    }

    handleComplete() {
        const {completed} = this.state;
        completed[this.state.activeStep] = true;
        this.setState({completed});
        this.handleNext();
    };

    handleReset() {
        this.setState({activeStep: 0, completed: {}});
    };

    completedSteps() {
        return Object
            .keys(this.state.completed)
            .length;
    }

    isLastStep() {
        const {serviceFlow} = this.props.delivery;
        const {steps} = serviceFlow;

        return this.state.activeStep === steps.length - 1;
    }

    allStepsCompleted() {
        const {serviceFlow} = this.props.delivery;
        const {steps} = serviceFlow;

        return this.completedSteps() === steps.length;
    }

    render() {
        const {classes, serviceName, delivery} = this.props;
        const {serviceFlowLoading, serviceFlow, serviceFlowLoadingFailed} = delivery;
        console.log(serviceFlow, serviceFlowLoading, serviceFlowLoadingFailed);
        const {activeStep} = this.state;

        let content = null;

        if (serviceFlowLoading) {
            return (<Spinner name="ball-beat" color="blue"/>);
        }

        if (serviceFlowLoadingFailed) {
            return 'Something went wrong!';
        }

        const {steps} = serviceFlow;
        const stepCount = steps.length;

        const stepper = (
            <Stepper nonLinear alternativeLabel activeStep={activeStep}>
                {steps.map((step, index) => {
                    return (
                        <Step key={step.id}>
                            <StepButton
                                onClick={() => this.handleStep(index)}
                                completed={this.state.completed[index]}>
                                {step.step_name}
                            </StepButton>
                        </Step>
                    );
                })}
            </Stepper>
        )

        const activeStepDetails = steps[activeStep];

        const stepContent = this.getStepContent(activeStepDetails)

        const stepActions = (
            <DialogActions className={classes.summaryActions}>
                <Button
                    disabled={activeStep === 0}
                    onClick={this.handleBack}
                    className={classes.button}>
                    Back
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={this.handleNext}
                    className={classes.button}>
                    Next
                </Button>
            </DialogActions>
        )

        return (
            <Fragment>
                <DialogTitle className={classes.summaryTitle} id="alert-dialog-title">{serviceName}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {stepper}
                        {stepContent}
                        {/* {stepActions} */}
                    </DialogContentText>
                </DialogContent>
            </Fragment>
        );
    }
}

StepDetailFactory.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = function (state, ownProps) {
    return {
        ...state,
        ...ownProps
    };
};

export default connect(mapStateToProps)(withStyles(styles)(StepDetailFactory));