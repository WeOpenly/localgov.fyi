
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import queryString from 'query-string';
import Button from '@material-ui/core/Button';

import { injectStripe } from 'react-stripe-elements';
import { CardElement} from 'react-stripe-elements';

import { withStyles } from '@material-ui/core/styles';

const windowGlobal = typeof window !== 'undefined'
    ? window
    : null

const styles = theme => ({
    service_flow_dialog: {

    },
    CardElement:{
        marginTop: theme.spacing.unit*2,
        marginBottom: theme.spacing.unit*2,
    }
});

const createOptions = (fontSize, padding) => {
    return {
        style: {
            base: {
                fontSize: 32,
                color: '#3C17FF',
                background: '#fefefe',
                letterSpacing: '0.025em',
                fontFamily: 'monospace',
                '::placeholder': {
                    color: '#3C17FF',
                },
                padding: 24,
            },
            invalid: {
                color: '#9e2146',
            },
        },
    };
};

class StripePaymentCard extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleReady = this.handleReady.bind(this);
    }

    handleSubmit(ev){
        const { onSubmit} = this.props;

        ev.preventDefault();
        if (this.props.stripe) {
            this.props.stripe
                .createToken()
                .then((payload) =>{
                    if(payload && payload.token){
                        onSubmit(payload.token)
                    }
                });
        } else {
            console.log("Stripe.js hasn't loaded yet.");
        }
    }

     handleChange = (change) => {
        console.log('[change]', change);
    }

    handleClick = () => {
        console.log('[click]');
    }

    handleFocus = () => {
        console.log('[focus]');
    }
    
    handleReady = () => {
        console.log('[ready]');
    }

    render() {
        const {classes} = this.props;

        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Card details
                    <CardElement
                    className={classes.CardElement}
                        onBlur={this.handleBlur}
                        onChange={this.handleChange}
                        onFocus={this.handleFocus}
                        onReady={this.handleReady}
                        {...createOptions(this.props.fontSize)}
                    />
                </label>
                <Button
                    type="submit"
                    variant="outlined"
                    color="primary"
                >
                    Pay
                </Button>
            </form>
        );
    }
}

StripePaymentCard.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = function (state, ownProps) {
    return {
        ...state,
        ...ownProps
    };
};

export default connect(mapStateToProps)(withStyles(styles)(injectStripe(StripePaymentCard)));