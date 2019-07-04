import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import styles from "./spectre.min.module.css"
import inputStyles from './inputfile.module.css';
import iconStyles from './typicons.min.module.css';

import {uploadDocumentAndCreateSubmission} from './actions'
import {stepChange} from './actions'

class Landing extends React.Component {
    constructor(props) {
        super(props);
        
        this.onChange = this.onChange.bind(this);
    }

    onChange(e){
        const { dispatch, anonUserID} = this.props;

        const files = Array.from(e.target.files)

        if (files){
            dispatch(uploadDocumentAndCreateSubmission(files[0], anonUserID))
        }
       
    }

    render() {
        const {createSubInProgress} = this.props;

        let btnLabel = 'Snap to get started'
        if(createSubInProgress){
            btnLabel = 'Uploading ...'
        }

        return (<div className={styles.columns}>
            <div className={`${styles.column} ${styles.col12}`} style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
             
                <div className={styles.h3}>
                    Snap your tickets
                </div>
            </div>

            <div className={`${styles.column} ${styles.col12}`} style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>

                
                <div className={styles.h3}>
                    Add your payment details
                </div>
            </div>

            <div className={`${styles.column} ${styles.col12}`} style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>

               
                <div className={styles.h3}>
                    We will take care of the rest
                </div>
            </div>
            
            <div className={`${styles.column} ${inputStyles.col12} ${styles.textUppercase} `} style={{width: '100%'}}>
                <input onChange={this.onChange} className={`${inputStyles.inputfile} ${styles.btn} ${styles.btnPrimary} ${styles.btnLg}`}  type="file" id="inputfile" accept="image/*" capture/>
               
                <label htmlFor="inputfile"> <span className={`${iconStyles.typcn} ${iconStyles.typcnCameraOutline}` }></span>{btnLabel}</label>
                    </div>
            </div>
        )
    }
}

const mapStateToProps = function (state, ownProps) {
    return {
        ...state.quickPay
    };
};

export default connect(mapStateToProps)(Landing);