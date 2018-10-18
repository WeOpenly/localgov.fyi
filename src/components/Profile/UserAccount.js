import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    profile_user_account_root: {
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2
    }
});

class UserAccount extends React.Component {
    render(){
        const {classes} = this.props;

        return (
            <div>
                <Paper className={classes.profile_user_account_root} elevation={1}>
                    <Typography variant="h5" component="h3">
                        Edit your account details
                    </Typography>
                    <Typography component="p">
                        Paper can be used to build surface or other elements for your application.
                    </Typography>
                </Paper>
            </div>
        );
    }
}

UserAccount.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UserAccount);