
import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import queryString from 'query-string';

import Dialog from '@material-ui/core/Dialog';

import {withStyles} from '@material-ui/core/styles';

import {toggleDeliveryDialog} from './actions';

import StepDetailFactory from './StepDetailFactory';
import FlowSummary from './FlowSummary';


const windowGlobal = typeof window !== 'undefined'
    ? window
    : null

const styles = theme => ({
    service_flow_dialog: {
     
    }
});

class ServiceFlowDialog extends React.Component {
    constructor(props) {
        super(props);
        this.closeServiceFlowForm = this.closeServiceFlowForm.bind(this);
    }

    closeServiceFlowForm(){
        const {dispatch} = this.props;
        dispatch(toggleDeliveryDialog(false));
    }
   
    render() {
        const {classes,  delivery, service_name, service_id } = this.props;
        const {showDeliveryDialog, serviceFlow} = delivery;

        let flowExists = true;
        if(Object.keys(serviceFlow).length === 0){
            flowExists = false;
        }

        let dialogContent = null;
        
        if(flowExists){
            dialogContent = (<StepDetailFactory serviceName={service_name}  />);
        } else {
            dialogContent = (<FlowSummary serviceId={service_id} serviceName={service_name} />)
        }

        return (
            <Dialog 
                open={showDeliveryDialog}
                scroll='body'
                className={classes.service_flow_dialog}
                onClose={this.closeServiceFlowForm}
                aria-labelledby="login-dialog-title"
                aria-describedby="login-dialog-description">                    {dialogContent}
            </Dialog>
        );
    }
}

ServiceFlowDialog.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = function (state, ownProps) {
    return {
        ...state,
        ...ownProps
    };
};

export default connect(mapStateToProps)(withStyles(styles)(ServiceFlowDialog));