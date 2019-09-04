import React, { Component } from "react";
import { connect } from "react-redux";
import { navigate } from "@reach/router";
import PropTypes from "prop-types";
import {watchForReceipts} from '../actions';
import styles from "../spectre.min.module.css"
import iconStyles from '../typicons.min.module.css';

const TRow = props => (
    <tr key={props.created} >
        <td><a target="_blank" href={props.receipt_url}>{props.description}</a></td>
        <td>{props.created}</td>
    </tr>
)


class Receipts extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        const {dispatch, uid} = this.props;
        dispatch(watchForReceipts(uid))
    }

    render() {
        const { uid, receipts, loading } = this.props;
        const rows = receipts.map(rec => (
            <TRow created={rec.created} receipt_url={rec.receipt_url} description={rec.description}/>
        ))
    
        return (<div className={styles.columns}>
            <div
                className={`${styles.column} ${styles.col8}`}
                style={{ margin: "3rem 0 1rem 1rem" }}
            >
                <h2
                    className={` ${
                        styles.textLeft
                        }`}
                >
                   Receipts
                </h2>
                <div className={styles.divider} />
            </div>
            <div className={`${styles.column} ${styles.col4}`} />
            <div className={`${styles.column} ${styles.col10}`} style={{ margin: "0.5rem" }}>
                <div
                    className={styles.card}
                    style={{
                        border: "1px solid rgba(86, 39, 255, .2)",
                        background: "#fff",
                        padding: '0.2rem',
                        borderRadius: "0.3rem",
                        boxShadow: "0 .1rem 0.1rem rgba(48,55,66,.10)"
                    }}
                >
                    <table className={`${styles.table} ${styles.tablScroll}`}>
                        <thead>
                            <tr>
                                <th>Invoice</th>
                                <th>Charged on</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                        
                    </table>
                </div>
            </div>            
        </div>)
    }
}



const mapStateToProps = function (state, ownProps) {
    return {
        ...state.oneReceipts,
        uid: state.oneUser.userDetails.uid,
    };
};

export default connect(mapStateToProps)(Receipts);