import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import {navigate} from '@reach/router';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
    fave_services_root: {
        padding: theme.spacing.unit * 2,
    },
    fave_services_head:{
        padding: theme.spacing.unit,
    }
});

class FaveServices extends React.Component {
  render() {
        const {classes, sers} = this.props;
        const serItems = sers.map((ser) => {
            return (<ListItem key={ser.id} dense button><ListItemText  primary={ser.heading} secondary={ser.subheading} onClick={() => navigate(`/${ser.id}/`) } />
                </ListItem>);
        });

        return (
            <div>
                <Paper className={classes.fave_services_root} elevation={1}>
                <Typography variant="subheading" className={classes.fave_services_head}>
                     Your saved services
                    </Typography>
                    <Divider />
                    <List>
                        {serItems}
                    </List>
                </Paper>
            </div>
        );
    }
}

FaveServices.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FaveServices);