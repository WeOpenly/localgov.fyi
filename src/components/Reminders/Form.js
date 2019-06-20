import React, { Component, Fragment } from 'react';

import { connect } from "react-redux";
import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SvgIcon from '@material-ui/core/SvgIcon';
import MoodBad from '@material-ui/icons/MoodBad';

import Form from "react-jsonschema-form";
import TextField from '@material-ui/core/TextField';
import { trackInput } from "../common/tracking";



const styles = theme => ({
    "@global" : {
        ul: {
            listStyle: 'none'
        }
    },
    feedback_wrapper: {
        position: 'relative',
    },
    feedback_paper: {
        position: 'absolute',
        top: 30,
        left: -230,
        height: 280,
        width: 332,
        zIndex: 10,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingTop: theme.spacing(2),
        marginBottom: theme.spacing(3),
        borderTop: `6px solid ${theme.palette.primary["500"]}`,
    },
    feedback_bootstrapInput: {
        borderRadius: 3,
        // backgroundColor: theme.palette.primary['50'],
        color: theme.palette.primary['200'],
        border: '1px solid #ced4da',
        padding: '10px 12px 12px 12px',
        marginTop: theme.spacing(1),
        width: '100%',
        transition: theme.transitions.create(['border-color', 'box-shadow'])
    },
    feedback_bootstrapInputComment: {
        borderRadius: 3,
        // backgroundColor: theme.palette.primary['50'],
        color: theme.palette.primary['200'],
        border: '1px solid #ced4da',
        padding: '10px 12px 12px 12px',
        marginTop: theme.spacing(1),
        width: '100%',
        height: '100px',
        'wordBreak': 'break-word',
        transition: theme.transitions.create(['border-color', 'box-shadow'])
    },
    feedback_button: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(1),
    },
    feedback_afterSubmit: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    feedback_spinner: {
        color: theme.palette.primary['500'],
    },
    feedback_icon: {
        color: theme.palette.primary['500'],
        fontSize: 32,
        marginBottom: theme.spacing(2),
    },
reminder_card_form_button_container:{
    display: 'flex',
    padding: `${theme.spacing(2)}px 0 ${theme.spacing(2)}px 0`
},
    reminder_card_form_container:{
        padding: theme.spacing()
    }
});

const encode = (data) => {
    return Object.keys(data)
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
        .join("&");
}

function ObjectFieldTemplate(props) {
    return (
        <div>
            {props.properties.map(element => <div className="property-wrapper">{element.content}</div>)}
        </div>
    );
}

function CustomFieldTemplate(props) {
    const { id, classNames, label, help, required, description, errors, children } = props;

    return (
        <div className={classNames}>
            {description}
            {children}
            <Typography variant="caption" color="error">
                {errors}
            </Typography>
               
            {help}
        </div>
    );
}

function ErrorListTemplate(props) {
    const { errors } = props;
    return (
        <ul style={{display: 'none'}}>
            {errors.map(error => (
                <li key={error.stack}>
                    {error.stack}
                </li>
            ))}
        </ul>
    );
}

class matTextWidget extends Component{
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
            variant="outlined"
        />)
    }
}


const widgets = {
    TextWidget : matTextWidget,
    EmailWidget: matTextWidget,
};

class SerRemForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitting: false,
            success: false,
            failure: false,
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    handleClick() {
        this.setState({ open: !this.state.open });
    }


    handleSubmit(data) {
        const { id, service_id, org_id, submittedCb } = this.props;
 

        const {formData} = data;
        let currentLoc = '';
        if (window.location && window.location.pathname) {
            currentLoc = window.location.pathname
        }


        this.setState({ submitting: true });
        fetch("/", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: encode({
                "form-name": id,
                service_id,
                org_id,
                ...formData,
            })
        }).then(() => this.setState({
            submitting: false,
            success: true,
        }, () => submittedCb() )).catch(error => this.setState({
            submitting: false,
            failure: true,
        }));
    }


    handleReset() {
        this.setState({
            submitting: false,
            success: false,
            failure: false,
        });
    }

    render() {
        const { classes, id, field_schema, ui_schema, key } = this.props;
        const {
            submitting,
            success,
            failure,
        } = this.state;

    
        return (
            <div  className={classes.reminder_card_form_container}>
                <Form idPrefix={id} name={id} schema={field_schema} 
                    onChange={() => {}}
                    onSubmit={this.handleSubmit}
                    widgets={widgets}
                    ObjectFieldTemplate={ObjectFieldTemplate}
                    FieldTemplate={CustomFieldTemplate}
                    ErrorList={ErrorListTemplate}
                    onError={() => {}} >
                    <div className={classes.reminder_card_form_button_container}>
                        {submitting ? (<Button
                            type="button"
                            disabled
                            variant="outlined"
                            color="primary"
                            className={classes.button}>
                            Submitting ...
                        </Button>) :(<Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.button}>
                            Get Notified
                        </Button>)}
                    </div>
                    </Form>
            </div>
        );
    }
}

export default withStyles(styles)(SerRemForm);
