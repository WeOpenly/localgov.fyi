import React, { Component, Fragment } from "react";

import styles from "../spectre.min.module.css";
import iconStyles from "../typicons.min.module.css";


const PaymentPlan = props => (
    <div key={props.name} className={`${styles.column} ${styles.colSm3} ${styles.colXs12}`}>
        <div
            className={styles.card}
            style={{
                border: "1px solid rgba(86, 39, 255, .2)",
                background: "#fff",
                margin: '1rem 0',
                padding: '0.5rem',
                borderRadius: "0.3rem",
                boxShadow: "0 .1rem 0.1rem rgba(48,55,66,.10)"
            }}
        >
            <div className={styles.cardHeader}>
                {props.tag ? (
                    <span
                        className={`${styles.label} ${styles.labelRounded} ${styles[props.tag]} ${
                            styles.floatRight
                            }`}
                    >
                        {props.name}
                    </span>
                ) : null}
                <div className={styles.h2}>{" "}<small>$</small><span style={{fontWeight: 700}}>{props.price}
                </span><span style={{fontSize: '0.8rem'}} className={`${styles.textGray} ${styles.textUppercase} ${styles.cardSubTitle}`}>
                    <small>
                          / {props.duration}
                    </small>
                   
                    </span></div>
            </div>
            <div className={styles.cardBody} >
                <div className={styles.divider} />
                <div style={{padding: "0.5rem 0"}}>
                    {props.features.map(feat => (<div key={feat} style={{padding: '0.1rem'}}>{`- ${feat}`}</div> ))}
                </div>
            </div>
            <div className={styles.cardFooter}>
                <button
                    onClick={() =>  
                        props.selectPaymentPlan(props.id)
                     }
                    className={`${styles.btn} ${props.focus ? `${styles.btnPrimary}` : `${styles.btnSecondary}`}`}
                >
                    Select this plan
        </button>
            </div>
        </div>
    </div>
);


class PaymentPlans extends Component {
    constructor(props) {
        super(props);
        this.onSelectPaymentPlan = this.onSelectPaymentPlan.bind(this);
    }

    onSelectPaymentPlan(plan) {
        console.log(plan)
        this.props.onSelectPlan(plan)
    }

    render() {
        let plans = [{
            "id": 'lite',
            "tag": "labelDefault",
            "name": 'Lite',
            "price": "99",
            "duration": "Year",
            "features": [
                "Upto 4 Services",
                "24/7 Support",
                "Recurring Annual Payment"
            ]
        }, 
            {
                "id": 'plus',
                "tag": "labelSecondary",
                "name": 'Plus',
                "price": "199",
                "duration": "Year",
                "features": [
                    "Upto 10 Services",
                    "24/7 Support",
                    "Recurring Annual Payment"
                ]
            },
            {
                "id": 'life_long',
                "tag": "labelSuccess",
                "name": 'LifeLong',
                "price": "999",
                "duration": "Forever",
                "features": [
                    "Unlimited Services",
                    "24/7 Support",
                    "Use Forever",
                ]
            }
        ]

        const planComps =  plans.map((plan, idx) => {
            return <PaymentPlan id={plan.id} name={plan.name} tag={plan.tag}
                price={plan.price} duration={plan.duration}
                selectPaymentPlan={this.onSelectPaymentPlan}
                features={plan.features}
                />
        })

        return (
            <Fragment>
                {planComps}
            </Fragment>
        );
    }
}



export default PaymentPlans;
