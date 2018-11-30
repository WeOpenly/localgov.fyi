import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import queryString from 'query-string'
import {withStyles} from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Spinner from 'react-spinkit';
import {ferchServiceBpFlowSummary, createServiceFlow} from './actions';

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

class FlowSummary extends React.Component {
    constructor(props) {
        super(props);
        this.handleCreateFlow = this
            .handleCreateFlow
            .bind(this)
    }

    handleCreateFlow() {
        const { dispatch, serviceId} = this.props;
        dispatch(createServiceFlow(serviceId));
    }

    componentDidMount() {
        const {dispatch, service_id} = this.props;
        dispatch(ferchServiceBpFlowSummary(service_id));
    }

    render() {
        const {classes, serviceName, delivery} = this.props;
        const {flowSummaryLoading, flowSummary, flowSummaryLoadingFailed} = delivery;
        let content = null;
        let actions = null;

        if (flowSummaryLoading) {
            return (<Spinner name="ball-beat" color="blue"/>);
        }

        if (flowSummaryLoadingFailed) {
            return 'Something went wrong!'
        }

        let summaryList = []
        for (const [key, value] of Object.entries(flowSummary)) {
   
            summaryList.push(
                <ListItem dense>
                    <ListItemText
                        primary={value.step_name}
                        secondary={value.step_description} />
                </ListItem>
            )
        }

        content = (
            <List>
                {summaryList}
            </List>
        )
        actions = (
            <Button onClick={this.handleCreateFlow} variant="outlined" color="primary">
                Let's get started
            </Button>
        );

        return (
            <Fragment>
                <DialogTitle className={classes.summaryTitle} id="alert-dialog-title">{serviceName}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {content}
                    </DialogContentText>
                </DialogContent>
                {actions
                    ? (
                        <DialogActions className={classes.summaryActions}>
                            {actions}
                        </DialogActions>
                    )
                    : null}
            </Fragment>
        );
    }
}

FlowSummary.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = function (state, ownProps) {
    return {
        ...state,
        ...ownProps
    };
};

export default connect(mapStateToProps)(withStyles(styles)(FlowSummary));