import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
    profile_user_account_root: {
        padding: theme.spacing.unit * 2,
    },
    profile_name:{
           padding: theme.spacing.unit,
    }
});

class UserAccount extends React.Component {
    render(){
        const {classes, user} = this.props;
     
        return (
                <Paper className={classes.profile_user_account_root} elevation={1}>
                    <Typography variant="subheading" className={classes.profile_namw}>
                        {user.email}
                    </Typography>
                    <Divider />
                    {user.email_verified ? (<Typography variant="body1" >Your email is verified  </Typography>) : (<Typography variant="body1">Your email is not verified yet!</Typography>)}   
                </Paper>
        );
    }
}

UserAccount.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UserAccount);