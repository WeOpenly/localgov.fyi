import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {navigate} from '@reach/router';

import {connect} from "react-redux";
import Helmet from "react-helmet";
import Spinner from 'react-spinkit';
import {isMobileOnly} from 'react-device-detect';
import {withStyles} from '@material-ui/core/styles';
import {fade} from "@material-ui/core/styles/colorManipulator";
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Fade from '@material-ui/core/Fade';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import {getUserSavedItems, saveItem, unSaveItem, addLocalItem, removeLocalItem} from './actions';
const windowGlobal = typeof window !== 'undefined'
    ? window
    : null

const styles = theme => ({
    saveButton: {
        marginLeft: theme.spacing.unit
    },
    saveButtonIconLoading:{
        width : '60px',
        height: '60px',
    },
    saveButtonIcon:{
        marginRight: theme.spacing.unit,
        marginBotton: theme.spacing.unit
    },
    saveButtonspinner: {
        top: theme.spacing.unit,
        position: 'absolute',
        width: 100,
        height: 0
    },
    saveButtonLoading: {
        width: '100',
        marginLeft: theme.spacing.unit
    }

});

class SaveButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showMsg: false,
            msg: ''
        }
        this.saveItem = this
            .saveItem
            .bind(this);
        this.unSaveItem = this
            .unSaveItem
            .bind(this);
        this.handleClose = this
            .handleClose
            .bind(this);
    }

    handleClose() {
        this.setState({showMsg: false, msg: ''})
    }

    saveItem() {
        const {dispatch, organization, service} = this.props;
        dispatch(saveItem(organization, service));
        dispatch(addLocalItem(organization, service));

        this.setState({showMsg: true, msg: 'Saved Sucessfully'});
    }

    unSaveItem() {
        const {dispatch, organization, service} = this.props;
        dispatch(unSaveItem(organization, service));
        dispatch(removeLocalItem(organization, service));

        this.setState({showMsg: true, msg: 'Removed Successfully'});
    }

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(getUserSavedItems());
    }

    render() {
        const {classes, service, organization, icon} = this.props;
        const {
            saveRequest,
            loadingUserSavedItems,
            saveSuccess,
            saveFailure,
            savedOrgs,
            savedServices
        } = this.props.profile;

        if (saveRequest || loadingUserSavedItems) {
            return (icon ? ( <IconButton            
                        aria-label="loading" color="inherit"
                         className={classes.saveButtonIconLoading}
                      >
                         <Spinner className={classes.saveButtonspinner} name="ball-beat" color="blue"/>
                    </IconButton>
            ): (<Button
                    variant="outlined"
                    color="primary"
                    className={classes.saveButtonLoading}>
                    <Spinner className={classes.saveButtonspinner} name="ball-beat" color="blue"/>
                </Button>)
            )
        }

        let isSaved = false;

        if (organization && savedOrgs.indexOf(organization) !== -1) {
            isSaved = true;
        }
        if (service && savedServices.indexOf(service) !== -1) {
            isSaved = true;
        }

        if (icon){
             return (isSaved
            ? (
                <Fragment>
                    <IconButton
                        className={classes.saveButtonIcon}
                        onClick={this.unSaveItem}
             
                        aria-label="Fave" color="inherit"
                      >
                         <Favorite color="primary"/>
                    </IconButton>
                    <Snackbar
                        anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                    }}
                        open={this.state.showMsg}
                        onClose={this.handleClose}
                        autoHideDuration={1000}
                        TransitionComponent={Fade}
                        ContentProps={{
                        'aria-describedby': 'message-id'
                    }}
                        message={<span id = "message-id" > {this.state.msg} </span>}/>
                </Fragment>
            )
            : (
                <Fragment>
                    <IconButton
                        className={classes.saveButtonIcon}
                        onClick={this.saveItem}
        
                        aria-label="Fave" color="inherit"
                      
                      >
                         <FavoriteBorder color="primary"/>
                    </IconButton>
                    <Snackbar
                        anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                    }}
                        open={this.state.showMsg}
                        onClose={this.handleClose}
                        autoHideDuration={1000}
                        TransitionComponent={Fade}
                        ContentProps={{
                        'aria-describedby': 'message-id'
                    }}
                        message={<span id = "message-id" > {this.state.msg} </span>}/>
                </Fragment>
            ));
        }

        return (isSaved
            ? (
                <Fragment>
                    <Button
                        className={classes.saveButton}
                        onClick={this.unSaveItem}
                        variant="outlined"
                        color="primary"
                        aria-label="close">
                        Remove from favourites
                    </Button>
                    <Snackbar
                        anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                    }}
                        open={this.state.showMsg}
                        onClose={this.handleClose}
                        autoHideDuration={1000}
                        TransitionComponent={Fade}
                        ContentProps={{
                        'aria-describedby': 'message-id'
                    }}
                        message={<span id = "message-id" > {this.state.msg} </span>}/>
                </Fragment>
            )
            : (
                <Fragment>
                    <Button
                        className={classes.saveButton}
                        onClick={this.saveItem}
                        variant="outlined"
                        color="primary"
                        aria-label="close">
                        Save to favourites
                    </Button>
                    <Snackbar
                        anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                    }}
                        open={this.state.showMsg}
                        onClose={this.handleClose}
                        autoHideDuration={1000}
                        TransitionComponent={Fade}
                        ContentProps={{
                        'aria-describedby': 'message-id'
                    }}
                        message={<span id = "message-id" > {this.state.msg} </span>}/>
                </Fragment>
            ));
    }
}

SaveButton.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = function (state, ownProps) {
    return {
        ...state,
        ...ownProps
    };
};

export default connect(mapStateToProps)(withStyles(styles)(SaveButton));