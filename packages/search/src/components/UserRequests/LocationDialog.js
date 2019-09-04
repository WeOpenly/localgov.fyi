import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";


import {navigate} from '@reach/router';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import SvgIcon from '@material-ui/core/SvgIcon';
import Dialog from '@material-ui/core/Dialog';

import DialogContent from '@material-ui/core/DialogContent';
import queryString from 'query-string'
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import {withStyles} from '@material-ui/core/styles';

import Form from "react-jsonschema-form";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {toggleLocationRequestDialog} from './actions';

const windowGlobal = typeof window !== 'undefined'
    ? window
    : null

const encode = (data) => {
    return Object
        .keys(data)
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
        .join("&");
}

const styles = theme => ({
    user_requests_dialog_dialog: {
        maxHeight: '560px',
    },
user_requests_thanks_icon : {
    marginBottom: theme.spacing.unit *2
},
user_requests_thanks : {
    display: 'flex',
    backgroundImage: `linear-gradient(to right, #6f47ff, #5d38f2, #4829e4, #3017d7)`,
    padding: theme.spacing.unit * 4,
    flexDirection: 'column',
    alignItems: 'center'
},
user_requests_greeting : {
    display: 'flex',
    padding: `${theme.spacing.unit}px 0 0 ${theme.spacing.unit}px`
},
"@global" : {
    ul: {
        listStyle: 'none'
    }
},
feedback_wrapper : {
    position: 'relative'
},
feedback_paper : {
    position: 'absolute',
    top: 30,
    left: -230,
    height: 280,
    width: 332,
    zIndex: 10,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 3,
    borderTop: `6px solid ${theme.palette.primary["500"]}`
},
feedback_bootstrapInput : {
    borderRadius: 3,
    // backgroundColor: theme.palette.primary['50'],
    color: theme.palette.primary['200'],
    border: '1px solid #ced4da',
    padding: '10px 12px 12px 12px',
    marginTop: theme.spacing.unit,
    width: '100%',
    transition: theme
        .transitions
        .create(['border-color', 'box-shadow'])
},
feedback_bootstrapInputComment : {
    borderRadius: 3,
    // backgroundColor: theme.palette.primary['50'],
    color: theme.palette.primary['200'],
    border: '1px solid #ced4da',
    padding: '10px 12px 12px 12px',
    marginTop: theme.spacing.unit,
    width: '100%',
    height: '100px',
    'wordBreak': 'break-word',
    transition: theme
        .transitions
        .create(['border-color', 'box-shadow'])
},
feedback_button : {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit
},
feedback_afterSubmit : {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
},
feedback_spinner : {
    color: theme.palette.primary['500']
},
feedback_icon : {
    color: theme.palette.primary['500'],
    fontSize: 32,
    marginBottom: theme.spacing.unit * 2
},
reminder_card_form_button_container : {
    display: 'flex',
    padding: `0 0 ${theme.spacing.unit}px 0`
},
reminder_card_form_container : {
    padding: theme.spacing.unit
}
});

const dialogFsSchema = {
    "type": "object",
    "required": ["email"],
    "properties": {
        "locations": {
            "type": "string",
            "title": "Location(s)"
        },
        "services": {
            "type": "string",
            "title": "Services(s)"
        },
        "email": {
            "type": "string",
            "title": "Email",
            "format": "email"
        },
        "name": {
            "type": 'string',
            "title": "Name"
        }
    }
}

const dialogUiSchema = {
    "locations": {
        "ui:help": "Add multiple locations separated by ','"
    },
     "services": {
        "ui:help": "Add multiple services separated by ','"
    }
}

function ObjectFieldTemplate(props) {
    return (
        <div>
            {props
                .properties
                .map(element => <div className="property-wrapper">{element.content}</div>)}
        </div>
    );
}

function CustomFieldTemplate(props) {
    const {
        id,
        classNames,
        label,
        help,
        required,
        description,
        errors,
        children
    } = props;
    const errorProps = errors.props.errors;
    const helpText = help.props.help; 

    return (
        <div style={{paddingBottom: 8}} className={classNames}>
            {description}
            {children}
            <Typography variant="caption" color="error">
                {errorProps}
            </Typography>
            <Typography variant="caption">
                {helpText}
            </Typography>
        </div>
    );
}

function ErrorListTemplate(props) {
    const {errors} = props;
    return (
        <ul style={{
            display: 'none'
        }}>
            {errors.map(error => (
                <li key={error.stack}>
                    {error.stack}
                </li>
            ))}
        </ul>
    );
}

class matTextWidget extends Component {
    render() {
        const {label, value, required, title, name} = this.props;
        return (<TextField
            id={`outlined-${title}`}
            label={label}
            value={value}
            required={required}
            placeholder={title}
            onChange={(event) => this.props.onChange(event.target.value)}
            margin="dense"
            fullWidth
            variant="outlined"/>)
    }
}

const widgets = {
    TextWidget: matTextWidget,
    EmailWidget: matTextWidget
};


const DialogTitle = withStyles(theme => ({
    loc_rec_dialog_title: {
        backgroundImage: `linear-gradient(to right, #6f47ff, #5d38f2, #4829e4, #3017d7)`,
        color: '#fff',
        display: 'flex',
        justifyContent: 'space-between',
        padding: theme.spacing.unit *2
    },
    closeButton: {
        cursor: 'pointer',
        color: theme.palette.grey[500],
        marginTop: theme.spacing.unit
    }
}))(props => {
    const {children, classes, onClose} = props;
    return (
        <MuiDialogTitle disableTypography className={classes.loc_rec_dialog_title}>
            <div>
                <Typography variant="subheading" style={{color: "#fff"}}>Request Missing Info</Typography>
                <Typography variant="caption" style={{color: "#fff"}}>We're constantly adding more locations and services everyday, we will notify you as soon as the locations or services requested by you are live</Typography>
            </div>
            <div>
                <CloseIcon className={classes.closeButton} onClick={onClose} fontSize="small"/>
            </div>     
        </MuiDialogTitle>
    );
});


class LocationDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            submitting: false,
            success: false,
            failure: false
        };
        this.closeDialog = this.closeDialog.bind(this);
        this.handleSubmit = this
            .handleSubmit
            .bind(this);
        this.handleReset = this
            .handleReset
            .bind(this);
    }

    closeDialog(){
        const {dispatch} = this.props;
        dispatch(toggleLocationRequestDialog(false));
    }

    handleSubmit(data) {
        const {formData} = data;

        let currentLoc = '';
        if (window.location && window.location.pathname) {
            currentLoc = window.location.pathname
        }

        this.setState({submitting: true});
        fetch("/", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: encode({
                "form-name": "user_request_missing_loc_ser",
                "path": currentLoc,
                ...formData
            })
        }).then(() => this.setState({
            submitting: false,
            success: true
        })).catch(error => this.setState({submitting: false, failure: true}));
    }

    handleReset() {
        this.setState({submitting: false, success: false, failure: false});
    }

    render() {
        const {classes, userRequests} = this.props;
        const {showLocRequestDialog} = userRequests;
        const {
            submitting,
            success,
            failure,
        } = this.state;


        return (
            <Dialog
                open={showLocRequestDialog}
                scroll="body"
                className={classes.user_requests_dialog_dialog}
                onClose={this.closeDialog}
                aria-labelledby="login-dialog-title"
                aria-describedby="login-dialog-description">
                <DialogTitle id="customized-dialog-title" onClose={this.closeDialog}>
                    Request Missing Info
                </DialogTitle>
        {success ? (<div className={classes.user_requests_thanks}>
                            <SvgIcon style={{fontSize: 64, color: '#fff'}} className={classes.user_requests_thanks_icon}>
                                <path fill="none" d="M0 0h24v24H0V0zm0 0h24v24H0V0z" />
                                <path d="M16.59 7.58L10 14.17l-3.59-3.58L5 12l5 5 8-8zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
                            </SvgIcon>
                            <Typography variant="heading" style={{color: "#fff"}}>
                                Thank you, we will notify you soon!
                            </Typography>
                        </div>)
        : (failure ? (<div className={classes.user_requests_thanks}>
                           
                            <Typography variant="heading" style={{color: "#fff"}}>
                              Something went wrong!
                            </Typography>
                        </div>)
        : <DialogContent style={{marginTop: 16}}>
                <Form
                    idPrefix={"user_request_missing_loc_ser"}
                    name={"user_request_missing_loc_ser"}
                    schema={dialogFsSchema}
                    uiSchema={dialogUiSchema}
                    onChange={() => {}}
                    onSubmit={this.handleSubmit}
                    widgets={widgets}
                    ObjectFieldTemplate={ObjectFieldTemplate}
                    FieldTemplate={CustomFieldTemplate}
                    ErrorList={ErrorListTemplate}
                    onError={() => {}}>
                    <div className={classes.reminder_card_form_button_container}>
                        {submitting
                            ? (
                                <Button
                                    type="button"
                                    disabled
                                    variant="outlined"
                                    color="primary"
                                    className={classes.button}>
                                    Submitting ...
                                </Button>
                            )
                            : (
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}>
                                    Add
                                </Button>
                            )}
                    </div>
                </Form>
            </DialogContent>)
}
                
            </Dialog>
        );
    }
}

LocationDialog.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = function (state, ownProps) {
    return {
        ...state,
        ...ownProps
    };
};

export default connect(mapStateToProps)(withStyles(styles)(LocationDialog));