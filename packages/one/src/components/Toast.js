import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./spectre.min.module.css"
import iconStyles from './typicons.min.module.css';
import toastStyles from './toast.module.css';
import classNames from 'classnames/bind';

let cx = classNames.bind(toastStyles);

class Toast extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
        }
        this.setTimer = this.setTimer.bind(this)
    }

    setTimer(){
        setTimeout( ()  => {
            this.setState({
                show: false,
            }) }, 5000);
    }
    
    componentWillReceiveProps(nextProps){
        if (nextProps.saving && !this.props.saving){
            this.setState({
                show: true,
            }, this.setTimer)
        }
    }

    render() {
        let { show } = this.state;
        let className = cx({
            snackbar: true,
            snackbarShow: show,
        });

        return (<div className={`${styles.toast} ${className} ${styles.textBold}`}>      
            <p><span  
              className={`${iconStyles.typcn} ${styles.textSuccess} ${iconStyles.typcnTick}`}
            />Saved, we will review your documents soon</p>
            </div>)            
        
    }
}

function mapStateToProps(state) {
    return { saving: state.oneServices.saving };
}

export default connect(mapStateToProps)(Toast);
