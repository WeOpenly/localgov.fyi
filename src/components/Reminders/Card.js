import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';


import SvgIcon from '@material-ui/core/SvgIcon';
import { connect } from 'react-redux';
import { isMobileOnly } from 'react-device-detect';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { withStyles } from '@material-ui/core/styles';
import Cancel from '@material-ui/icons/Cancel';
import Typography from '@material-ui/core/Typography';
import SerRemForm from './Form';
import posed, {PoseGroup} from 'react-pose';
import { trackClick } from "../common/tracking";
import { toggleNotifyDialog, slowToggleNotifyDilog } from '../Search/actions';

const windowGlobal = typeof window !== 'undefined' && window
const styles = theme => ({
reminders_card_container:{
    minHeight: 200,
    background:'#fff',
    
},
    reminders_card_container_mob:{
        background: '#fff',
        margin: theme.spacing.unit * 2,
        boxShadow: `1px 1px 4px 2px ${theme.palette.primary['100']}`,
        borderRadius: 6,
        textAlign: 'center'
    },
    reminders_card_close:{
        display: 'flex',
        justifyContent: 'flex-end',
        padding: 4,
    },
    reminders_card_topborder:{
        width: '100%',
        height: 6,
        backgroundImage: `linear-gradient(to right, #b076f3, #5d38f2, #4829e4)`,
        borderRadius: `6px 6px 0px 0px`,
    },
    reminders_card_content:{
        padding: `0 ${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px`
    },
reminders_card_thanks_icon:{
    marginBottom: theme.spacing.unit *2,
},
    reminders_card_thanks:{
        display: 'flex',
        padding: theme.spacing.unit * 3,
        flexDirection: 'column',
        alignItems: 'center',
    },
    reminders_card_greeting:{
        display: 'flex',
        padding: `${theme.spacing.unit}px 0 0 ${theme.spacing.unit}px`,
    },
    ser_rem_shade :{
zIndex : '9999',
        position: 'absolute',
        background: `rgba(0, 0, 0, 0.4)`,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
},
ser_rem_modal :{
    top: '100px',
    zIndex: '10000',
        position: 'absolute',
        width: '480px',
        minHeight: '300px',
        background: 'white',
        borderRadius: '5px',
        left: '0',
        right: '0',
        marginLeft: 'auto',
        marginRight: 'auto'
}

});

const RawHTML = ({ children, className = "" }) => (
    <div
        className={className}
        style={{ padding: 0, margin: 0 }}
        dangerouslySetInnerHTML={{ __html: children.replace(/\n/g, " ") }}
    />
);
const Modal = posed.div({
    enter: {
        opacity: 1,
        delay: 150,
        transition: {
            default: { duration: 150 }
        }
    },
exit : {

    opacity: 0,
}
});

const Shade = posed.div({
    enter: { opacity: 1 },
    exit: { opacity: 0 }
});

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showGreeting: false,
            isMob: false,
        }
        this.submissionDoneCb = this.submissionDoneCb.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
    }

    submissionDoneCb(){
        this.setState({
            showGreeting: true,
        })
        if (windowGlobal && windowGlobal.localStorage){
            localStorage.setItem(`rem_sub_${this.props.service_id}`, true)
        }
    }

    closeDialog(){
        this.props.dispatch(toggleNotifyDialog(false));
    }

    componentDidMount(){
        this.setState({
            isMob: isMobileOnly
        })
        
        const { dispatch} = this.props;

        if (windowGlobal && windowGlobal.localStorage) {
            const remSubDone = localStorage.getItem(`rem_sub_${this.props.service_id}`);

            if (!remSubDone){
                dispatch(slowToggleNotifyDilog());
            }
        }
    }

    componentWillUnmount(){
        this.closeDialog();
    }
    
    render() {
        const { classes, greeting_msg, thanks_msg, field_schema, ui_schema, ser_rem_form_id, org_id, service_id ,showNotifyDialog} = this.props;

        const {showGreeting} = this.state;
        

        return (!this.state.isMob ? (<PoseGroup> 
            {showNotifyDialog && [
                <Shade key="shade" className={classes.ser_rem_shade} />,
                <Modal key={ser_rem_form_id} className={classes.ser_rem_modal}  >
                    <div key={ser_rem_form_id} className={classes.reminders_card_container}>
                    
                        <div className={classes.reminders_card_close} >
                            <Cancel style={{cursor: 'pointer'}} onClick={this.closeDialog} color='disabled'/>
                        </div>
                        <div className={classes.reminders_card_content}>
                            {showGreeting ? (<div className={classes.reminders_card_thanks}>
                            <SvgIcon className={classes.reminders_card_thanks_icon}>
                                <path fill="none" d="M0 0h24v24H0V0zm0 0h24v24H0V0z" />
                                <path d="M16.59 7.58L10 14.17l-3.59-3.58L5 12l5 5 8-8zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
                            </SvgIcon>
                            <Typography variant="heading">
                                {thanks_msg ? thanks_msg : "Thank you, we will notify you soon!"}
                            </Typography>
                        </div>) : (<div className={classes.reminders_card_greeting}>
                                <Typography  variant="title">
                                    {greeting_msg ? greeting_msg : "Never miss out"}
                                </Typography>
                            </div>)}
                            {showGreeting ? null : (<div className={classes.reminders_card_form}>
                            <SerRemForm submittedCb={this.submissionDoneCb} field_schema={field_schema} thanks_msg={thanks_msg} ui_schema={ui_schema} id={ser_rem_form_id} service_id={service_id} org_id={org_id} />
                            </div>)}
                        </div>
                </div></Modal>]}
        </PoseGroup>): (<div className={classes.reminders_card_container_mob}>
                <div className={classes.reminders_card_topborder} />
                <div className={classes.reminders_card_content}>
                    {showGreeting ? (<div className={classes.reminders_card_thanks}>
                        <Typography variant="heading">
                            {thanks_msg ? thanks_msg : "Thank you, we will notify you soon!"}
                        </Typography>
                    </div>) : (<div className={classes.reminders_card_greeting}>
                        <Typography variant="title">
                            {greeting_msg ? greeting_msg : "Never miss out"}
                        </Typography>
                    </div>)}
                    {showGreeting ? null : (<div className={classes.reminders_card_form}>
                        <SerRemForm submittedCb={this.submissionDoneCb} field_schema={field_schema} thanks_msg={thanks_msg} ui_schema={ui_schema} id={ser_rem_form_id} service_id={service_id} org_id={org_id} />
                    </div>)}
                </div>
            </div>)
        );
    }
}


const mapStateToProps = function (state, ownProps) {
    return {
        showNotifyDialog : state.search.showNotifyDialog,
        showFeedbackDialog: state.search.showFeedbackDialog,
        ...ownProps,
    };
};

const ConnSearchResult = connect(
    mapStateToProps
)(withStyles(styles)(Card));

export default ConnSearchResult;