import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import Form from "react-jsonschema-form";

import Spinner from 'react-spinkit';
import {isMobileOnly} from 'react-device-detect';
import {navigate} from '@reach/router';

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
import {toggleDeliveryDialog} from './actions';

const windowGlobal = typeof window !== 'undefined'
    ? window
    : null

const styles = theme => ({
    account_dialog_dialog: {
        height: '460px'
    },
    account_form_loginEmbed: {},
    account_form_registerinstead: {
        marginTop: theme.*4,
        display: 'flex'
    }
});

class ServiceFlowDialog extends React.Component {
    constructor(props) {
        super(props);
        this.closeServiceFlowForm = this
            .closeServiceFlowForm
            .bind(this);
    }

    closeServiceFlowForm() {
        const {dispatch} = this.props;
        dispatch(toggleDeliveryDialog(false));
    }

    componentDidMount() {
        const {dispatch, service_id} = this.props;
        //  this should check for current state for logged in users
        dispatch(ferchServiceBpFlowSummary(service_id));
    }

    render() {
        const {classes, delivery} = this.props;
        const {showDeliveryDialog} = delivery;
        let trimmed = null;
        // if (currentUserStepDetails && currentUserStepDetails.field_schema) {
        // trimmed = currentUserStepDetails.field_schema.trim()     trimmed =
        // JSON.parse(trimmed)         }

        const formData = (!flowStepsLoading && !currentUserStepLoading && flowSteps && trimmed)
            ? (
                <Fragment>
                    <Typography variant="headline" color="primary">
                        hello
                    </Typography>
                    <Form
                        schema={trimmed}
                        onChange={() => console.log("changed")}
                        onSubmit={() => console.log("submitted")}
                        onError={() => console.log("errors")}/>

                </Fragment>
            )
            : null
        return (
            <Dialog
                open={showDeliveryDialog}
                className={classes.account_dialog_dialog}
                onClose={this.closeServiceFlowForm}
                aria-labelledby="login-dialog-title"
                aria-describedby="login-dialog-description">
                <DialogContent >
                    {(flowStepsLoading || currentUserStepLoading)
                        ? (<Spinner className={classes.saveButtonspinner} name="ball-beat" color="blue"/>)
                        : null}
                    {formData}
                </DialogContent>
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