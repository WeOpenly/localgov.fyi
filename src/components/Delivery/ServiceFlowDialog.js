
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
    account_dialog_dialog: {
        height: '460px'
    },
    account_form_loginEmbed: {},
    account_form_registerinstead: {
        marginTop: theme.spacing*4,
        display: 'flex'
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
        const {classes,  delivery, service_name } = this.props;
        const {showDeliveryDialog, serviceFlow} = delivery;
        
        let flowExists = true;
        if(Object.keys(serviceFlow).length === 0){
            flowExists = false;
        }

        let dialogContent = null;
        
        if(flowExists){
            dialogContent = (<StepDetails />);
        } else {
            dialogContent  = (<FlowSummary serviceName={service_name} />)
        }

        return (
            <Dialog 
                open={showDeliveryDialog}
                className={classes.account_dialog_dialog}
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