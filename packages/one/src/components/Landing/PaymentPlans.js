import React, { Component, Fragment } from "react";

import styles from "../spectre.min.module.css";
import iconStyles from "../typicons.min.module.css";

const PaymentPlan = props => (
  <div
    key={props.id}
    className={`${styles.column} ${styles.col3} ${styles.colXs12}`}
    style={{
      minWidth: "340px"
    }}
  >
    <div
      className={styles.card}
      style={{
        border: `1px solid ${
          props.isSelected ? "#30ae40" : "rgba(86, 39, 255, .2)"
        }`,
        background: `${props.isSelected ? "#f7f8f9" : "#fff"}`,
        margin: "1rem 0",
        padding: "0.5rem",
        borderRadius: "0.3rem",
        boxShadow: "0 .1rem 0.1rem rgba(48,55,66,.10)"
      }}
    >
      <div className={styles.cardHeader}>
        {props.tag ? (
          <span
            className={`${styles.label} ${styles.labelRounded} ${
              styles[props.tag]
            } ${styles.floatRight}`}
          >
            {props.name}
          </span>
        ) : null}
        <div className={styles.h2}>
          {" "}
          <small>$</small>
          <span style={{ fontWeight: 700 }}>{props.price}</span>
          <div
            style={{ fontSize: "0.8rem" }}
            className={`${styles.textGray} ${styles.textUppercase} ${styles.cardSubTitle}`}
          >
            <small className={styles.textBold}>Per {props.duration}</small>
          </div>
        </div>
      </div>
      <div className={styles.cardBody}>
        <div className={styles.divider} />

        <div style={{ padding: "0.5rem 0", minHeight: "12rem" }}>
          <div
            style={{ margin: "0.2rem" }}
            className={`${styles.textUppercase} ${styles.textGray}`}
          >
            {" "}
            <small> Includes </small>{" "}
          </div>
          {props.covers.map(ser => (
            <div key={ser} style={{ padding: "0.1rem" }}>
              <span
                className={`${iconStyles.typcn} ${styles.textSuccess} ${iconStyles.typcnTick}`}
              />
              {`${ser.name}`}
            </div>
          ))}
          {props.features.map(feat => (
            <div key={feat} style={{ padding: "0.1rem" }}>
              <span
                className={`${iconStyles.typcn} ${styles.textSuccess} ${iconStyles.typcnTick}`}
              />
              {`${feat}`}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.cardFooter}>
        {props.isSelected ? (
          <div style={{ height: "40px" }}>
            <button
              onClick={() => props.selectPaymentPlan(props)}
              className={`${styles.btn} ${
                props.focus ? `${styles.btnPrimary}` : `${styles.btnSecondary}`
              }`}
            >
              Finalize Subscription
            </button>
          </div>
        ) : (
          <button
            onClick={() => props.selectPaymentPlan(props)}
            className={`${styles.btn} ${
              props.focus ? `${styles.btnPrimary}` : `${styles.btnSecondary}`
            }`}
          >
            Select this plan
          </button>
        )}
      </div>
    </div>
  </div>
);

class PaymentPlans extends Component {
  constructor(props) {
    super(props);
    this.onSelectPaymentPlan = this.onSelectPaymentPlan.bind(this);
    this.toggleDuration = this.toggleDuration.bind(this);
    this.state = {
      showYearly: true
    };
  }

  toggleDuration() {
    this.setState({
      showYearly: !this.state.showYearly
    });
  }

  onSelectPaymentPlan(plan) {
    this.props.onSelectPlan(
      plan.id,
      this.props.packName,
      this.state.showYearly ? "yearly" : "monthly"
    );
  }

  render() {
    const { plans, selectedPlan, planDuration } = this.props;
    let preselected = false;
    let preselectedPlans = [];
   
    const monthlyPlans = plans.map((plan, idx) => {
      return (
        <PaymentPlan
          id={plan.pg_plan_id}
          name={plan.pg_plan_name}
          tag={"labelDefault"}
          price={plan.monthly_plan_price}
          duration={"month"}
          covers={plan.sers}
          selectPaymentPlan={this.onSelectPaymentPlan}
          features={plan.features || []}
          isSelected={false}
        />
      );
    });

    const yearlyPlans = plans.map((plan, idx) => {
      return (
        <PaymentPlan
          id={plan.pg_plan_id}
          name={plan.pg_plan_name}
          tag={"labelDefault"}
          price={plan.yearly_plan_price}
          duration={"year"}
          covers={plan.sers}
          selectPaymentPlan={this.onSelectPaymentPlan}
          features={plan.features || []}
          isSelected={false}
        />
      );
    });

    if (selectedPlan && planDuration) {
      preselected = true;
      if (planDuration === "yearly") {
        preselectedPlans = plans.map((plan, idx) => {
          if (plan.pg_plan_id === selectedPlan) {
            return (
              <PaymentPlan
                id={plan.pg_plan_id}
                name={plan.pg_plan_name}
                tag={"labelDefault"}
                price={plan.yearly_plan_price}
                duration={"year"}
                covers={plan.sers}
                selectPaymentPlan={this.onSelectPaymentPlan}
                features={plan.features || []}
                isSelected={true}
              />
            );
          }
        });
      } else if (planDuration === "monthly") {
        preselectedPlans = plans.map((plan, idx) => {
          if (plan.pg_plan_id === selectedPlan) {
            return (
              <PaymentPlan
                id={plan.pg_plan_id}
                name={plan.pg_plan_name}
                tag={"labelDefault"}
                price={plan.monthly_plan_price}
                duration={"month"}
                covers={plan.sers}
                selectPaymentPlan={this.onSelectPaymentPlan}
                features={plan.features || []}
                isSelected={true}
              />
            );
          }
        });
      }
    }

    const durationComps = (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "320px",
          borderRadius: "0.3rem",

          border: `1px solid rgba(86, 39, 255, .2)`,
          boxShadow: "0 .1rem 0.1rem rgba(48,55,66,.10)"
        }}
      >
        <div
          style={{
            width: "160px",
            cursor: "pointer",
            padding: "0.6rem 0.4rem",
            background: `${
              this.state.showYearly ? "#fff" : "rgba(86, 39, 255, .9)"
            }`,

            color: `${this.state.showYearly ? "#000" : "#fff"}`
          }}
          onClick={this.toggleDuration}
        >
          Monthly
        </div>
        <div
          style={{
            width: "156px",
            cursor: "pointer",
            padding: "0.6rem 0.4rem",
            background: `${
              !this.state.showYearly ? "#fff" : "rgba(86, 39, 255, .9)"
            }`,

            color: `${!this.state.showYearly ? "#000" : "#fff"}`
          }}
          onClick={this.toggleDuration}
        >
          Yearly
        </div>
      </div>
    );

    if (preselected){
      return (
        <div
          className={`${styles.columns}`}
          style={{ display: "flex", justifyContent: "center" }}
        >
          {preselectedPlans}
        </div>
      )
    }

    return (
      <Fragment>
        <div
          className={`${styles.columns} ${styles.textCenter}`}
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "2rem"
          }}
        >
          {durationComps}
        </div> 
        <div className={`${styles.columns}`} style={{display: 'flex', justifyContent: 'center'}}>
            {this.state.showYearly ? yearlyPlans : monthlyPlans}
        </div>
      </Fragment>
    );
  }
}

export default PaymentPlans;
