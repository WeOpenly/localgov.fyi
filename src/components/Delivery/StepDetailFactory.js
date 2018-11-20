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
import CallApiStepDetails from './CallApiStepDetails';

import {submitStepDetails} from './actions';


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
            userActiveStep: 0,
            completed: {}
        };
        this.getActiveStep = this.getActiveStep.bind(this);

        this.handleStep = this
            .handleStep
            .bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.getStepContent = this
            .getStepContent
            .bind(this);
    }

    getActiveStep(){
        const {serviceFlow} = this.props.delivery;
        console.log('getActiveStep', serviceFlow);

        const {currentStep, steps} = serviceFlow;
        const {id} = currentStep;
        let activeStepIndex = 0;

        steps.forEach((step, index) => {
            if(id === step.id){
                activeStepIndex = index 
            }
        });
        console.log(activeStepIndex);
        return activeStepIndex;
    }

    getStepContent(step) {
        switch (step.step_type) {
            case 'form':
                return (<FormStepDetails id={step.id} handleNext={this.handleNext} />)
            case 'callapi_consent':
                return (<CallApiStepDetails id={step.id} handleNext={this.handleNext}/>);
            case 'payment':
                // return (<PaymentStepDetails id={step.id}/>)
                return 'ola';
            default:
                return 'Uknown stepIndex';
        }
    }

    handleNext(step_type, step_id, stepDetailsToSubmit) {
        const {dispatch, delivery} = this.props;
        const {serviceFlow} = delivery;
        const {flowId} = serviceFlow;
        dispatch(submitStepDetails(step_type, step_id, stepDetailsToSubmit, flowId));
    }

    handleStep(step) {
        this.setState({userActiveStep: step});
        
    }


    render() {
        const {classes, serviceName, delivery} = this.props;
        const {serviceFlowLoading, serviceFlow, serviceFlowLoadingFailed} = delivery;
        
        let content = null;

        if (serviceFlowLoading) {
            return (<Spinner name="ball-beat" color="blue"/>);
        }

        if (serviceFlowLoadingFailed) {
            return 'Something went wrong!';
        }

        if (!serviceFlow){
            return null
        }

        const activeStep = this.getActiveStep();
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

        const stepContent = this.getStepContent(activeStepDetails, serviceFlow.flowId);

        // const stepActions = (
        //     <DialogActions className={classes.summaryActions}>
        //         <Button
        //             disabled={activeStep === 0}
        //             onClick={this.handleBack}
        //             className={classes.button}>
        //             Back
        //         </Button>
        //         <Button
        //             variant="outlined"
        //             color="primary"
        //             onClick={this.handleNext}
        //             className={classes.button}>
        //             Next
        //         </Button>
        //     </DialogActions>
        // )

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