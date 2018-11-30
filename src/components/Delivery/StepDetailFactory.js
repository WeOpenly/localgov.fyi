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

        const {all_available_transitions, available_transitions_from_current_state} = serviceFlow;
        const nextPossibleStep = available_transitions_from_current_state[0];
        const { type } = nextPossibleStep;
        let activeStepIndex = 0;

        all_available_transitions.forEach((step, index) => {
            if (type === step.type){
                activeStepIndex = step.index 
            }
        });
        console.log(activeStepIndex);
        return activeStepIndex;
    }

    getStepContent(step, flow_id) {
        switch (step.type) {
            case 'user_details_submit':
                return (<FormStepDetails flowId={flow_id}  handleNext={this.handleNext} />)
            case 'user_amount_to_pay_consent':
                return (<CallApiStepDetails flowId={flow_id} handleNext={this.handleNext}/>);
            case 'user_payment_authorize':
                // return (<PaymentStepDetails id={step.id}/>)
                return 'ola';
            default:
                return 'Uknown stepIndex';
        }
    }

    handleNext(step_type, stepDetailsToSubmit) {
        const {dispatch, delivery} = this.props;
        const {serviceFlow} = delivery;
        const {flow_id} = serviceFlow;
        dispatch(submitStepDetails(flow_id, step_type, stepDetailsToSubmit));
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
        const { all_available_transitions} = serviceFlow;
        const stepCount = all_available_transitions.length;

        const stepper = (
            <Stepper nonLinear alternativeLabel activeStep={activeStep}>
                {all_available_transitions.map((step, index) => {
                    return (
                        <Step key={step.id}>
                            <StepButton
                                onClick={() => this.handleStep(index)}
                                completed={this.state.completed[index]}>
                                {step.name}
                            </StepButton>
                        </Step>
                    );
                })}
            </Stepper>
        )

        const activeStepDetails = all_available_transitions[activeStep];

        const stepContent = this.getStepContent(activeStepDetails, serviceFlow.flow_id);

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