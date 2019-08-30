import React, { Component, Fragment } from "react";

import styles from "../spectre.min.module.css";
import iconStyles from "../typicons.min.module.css";


const PaymentPlan = props => (
    <div key={props.name} className={`${styles.column} ${styles.colSm3} ${styles.colXs12}`}>
        <div
            className={styles.card}
            style={{
                border: `1px solid ${props.isSelected ? '#30ae40' : 'rgba(86, 39, 255, .2)'}`,
                background: `${props.isSelected ? '#f7f8f9' : '#fff'}`,
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

                <div style={{ padding: "0.5rem 0", minHeight: "12rem" }}>
                    <div className={`${styles.textUppercase} ${styles.textGray}`}> <small> Includes </small> </div>
                    {props.covers.map(feat => (<div key={feat} style={{ padding: '0.1rem' }}><span
                        className={`${iconStyles.typcn} ${styles.textSuccess} ${iconStyles.typcnTick}`}
                    />{`${feat}`}</div>))}
                    {props.features.map(feat => (<div key={feat} style={{ padding: '0.1rem' }}><span
                        className={`${iconStyles.typcn} ${styles.textSuccess} ${iconStyles.typcnTick}`}
                    />{`${feat}`}</div>))}
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
        this.state = {
            selected: false,
            userType: 'individual',
        }
    }

    componentDidMount(){
        const {isBusiness} = this.props;
        if (isBusiness){
            this.setState({
                userType:'business'
            })
        }
    }

    selectType(userType){
        this.setState({
            userType: userType
        })
    }

    onSelectPaymentPlan(plan) {
        this.props.onSelectPlan(plan)
        this.setState({
            selected: plan
        })
    }

    render() {
        let plans = [{
            "id": 'lite-indiv',
            "tag": "labelDefault",
            "name": 'Lite',
            "price": "49",
            "duration": "Year",
            "features": [
                "24/7 Support",
                "Recurring Annual Payment"
            ],
            "covers": [
                "Propterty Tax Payments",
                "Utility Bill Payments",
                "Vehicle Registration Renewals",
                "Pet Licensing"
            ]
        }, 
            {
                "id": 'plus-indiv',
                "tag": "labelSecondary",
                "name": 'Plus',
                "price": "99",
                "duration": "Year",
                "features": [
                
                    "24/7 Support",
                    "Recurring Annual Payment"
                ],
                "covers": [
                    "Everything in Lite, plus up to 10 services of your choice",
                ]
            },
            {
                "id": 'life_long_indiv',
                "tag": "labelSuccess",
                "name": 'LifeLong',
                "price": "499",
                "duration": "Forever",
                "features": [
                    "24/7 Support",
                    "Use Forever",
                ],
                "covers": [
                    "Unlimited services of your choice",
                ]
            }
        ]
        if (this.state.userType === 'business'){
            plans = [{
                "id": 'lite-busi',
                "tag": "labelDefault",
                "name": 'Lite',
                "price": "99",
                "duration": "Year",
                "features": [
                    "24/7 Support",
                    "Recurring Annual Payment"
                ],
                "covers": [
                    "Business Licence Renewals",
                    "Utility Bill Payments",
                    "Renew Fictitious Business Licence or DBA"
                ]
            },
            {
                "id": 'plus-busi',
                "tag": "labelWarning",
                "name": 'Startup',
                "price": "199",
                "duration": "Year",
                "features": [
                    "24/7 Support",
                    "Recurring Annual Payment"
                ],
                "covers": [
                    "Delaware Franchise Tax Filing",
                    "California Franchise Tax Filing",
                    "Any two other service filings of your choice",
                ]
            },
            {
                "id": 'life_long_busi',
                "tag": "labelSuccess",
                "name": 'Pro',
                "price": "999",
                "duration": "Forever",
                "features": [
                    "Dedicated best-in-class support",
                    "Use Forever",
                ],
                "covers": [
                    "Unlimited services of your choice",
                ]
            }
            ]
        }
  

        const planComps =  plans.map((plan, idx) => {
            return <PaymentPlan id={plan.id} name={plan.name} tag={plan.tag}
                price={plan.price} duration={plan.duration} covers={plan.covers}
                selectPaymentPlan={this.onSelectPaymentPlan}
                features={plan.features} isSelected={plan.id === this.state.selected}
                />
        })

        return (
            <Fragment>
                {this.props.userTypeSelected ? null : (<div className={`${styles.column} ${styles.col12} ${styles.textCenter}`}>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <div style={{ display: "flex", alignSelf: "center" }}>

                            <div
                                className={`${styles.card} ${styles.textCenter}`}
                                onClick={() =>
                                    this.selectType('individual')
                                }
                                style={{
                                    border: "1px solid rgba(86, 39, 255, .2)",
                                    background: `${this.state.userType==='individual' ? '#f6f7f8' : '#fff'}`,
                                    cursor: 'pointer',
                                    padding: '0 0.5rem',
                                    margin: '0 0.5rem',
                                    borderRadius: "0.9rem",
                                    
                                }}
                            >
                                <div className={styles.cardImage} style={{
                                    margin: "1rem 0 0.4rem 0",
                                }}>
                                    <span style={{
                                        background: "#3500f3",
                                        color: "#fff",
                                        padding: '0.4rem',
                                        fontSize: '0.9rem',
                                        borderRadius: "0.3rem",
                                        boxShadow: "0 0.1rem 1rem rgba(86, 39, 255, .2)"
                                    }} className={`${iconStyles.typcn} ${iconStyles.typcnUserOutline}`}></span>
                                </div>

                                <div className={styles.cardHeader}>

                                    <h6
                                        className={`${styles.cardTitle}`}

                                    >
                                        Individual
                      </h6>
                                </div>
                            </div>
                        </div>
                        <div style={{ display: "flex", alignSelf: "center" }}>

                            <div
                                className={`${styles.card} ${styles.textCenter}`}
                                onClick={() =>
                                    this.selectType('business')
                                }
                                style={{
                                    border: "1px solid rgba(86, 39, 255, .2)",
                                    background: `${this.state.userType === 'business' ? '#f6f7f8' : '#fff'}`,
                                    cursor: 'pointer',
                                    padding: '0 0.5rem',
                                    margin: '0 0.5rem',
                                    borderRadius: "0.9rem",
                                  
                                }}
                            >
                                <div className={styles.cardImage} style={{
                                    margin: "1rem 0 0.4rem 0",
                                }}>
                                    <span style={{
                                        background: "#3500f3",
                                        color: "#fff",
                                        padding: '0.4rem',
                                        fontSize: '0.9rem',
                                        borderRadius: "0.3rem",
                                        boxShadow: "0 0.1rem 1rem rgba(86, 39, 255, .2)"
                                    }} className={`${iconStyles.typcn} ${iconStyles.typcnBriefcase}`}></span>
                                </div>

                                <div className={styles.cardHeader}>

                                    <h6
                                        className={`${styles.cardTitle}`}

                                    >
                                        Business
                      </h6>
                                </div>
                            </div>
                        </div>
                    </div>
                  
                </div>)}
                {planComps}
            </Fragment>
        );
    }
}



export default PaymentPlans;
