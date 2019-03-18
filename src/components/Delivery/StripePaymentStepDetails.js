import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import queryString from 'query-string';

import Dialog from '@material-ui/core/Dialog';
import {Elements, StripeProvider} from 'react-stripe-elements';

import {withStyles} from '@material-ui/core/styles';
import StripePaymentCard from './StripePaymentCard';
import {submitPaymentDetails} from './actions';

const windowGlobal = typeof window !== 'undefined'
    ? window
    : null

const styles = theme => ({
    stripe_payment_details_container: {
        margin: '0 auto',
        maxWidth: 400,
        boxSizing: 'border-box',
        padding: '0 8px'
    }
});

class StripePaymentStepDetails extends React.Component {
    constructor(props) {
        super(props);
        this.submitCardDetails = this
            .submitCardDetails
            .bind(this);
    }

    submitCardDetails(payload) {
        const {dispatch, handleNext} = this.props;
        handleNext('user_payment_authorize', {token: payload.id});
    }

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.stripe_payment_details_container}>
                <StripeProvider apiKey="pk_live_NQEdkDIQcgXgd2HB25RmTfsW">
                    <Elements>
                        <StripePaymentCard onSubmit={this.submitCardDetails}/>
                    </Elements>
                </StripeProvider>
            </div>
        );
    }
}

StripePaymentStepDetails.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = function (state, ownProps) {
    return {
        ...state,
        ...ownProps
    };
};

export default connect(mapStateToProps)(withStyles(styles)(StripePaymentStepDetails));