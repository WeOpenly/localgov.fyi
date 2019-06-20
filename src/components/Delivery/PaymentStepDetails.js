import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import {navigate} from '@reach/router';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
    fave_orgs_root: {
        padding: theme.spacing(2)
    },
    fave_orgs_head: {
        padding: theme.spacing()
    }
});

class FaveOrgs extends React.Component {

    render() {
        const {classes, orgs} = this.props;
        const orgItems = orgs.map((org) => {
            return (
                <ListItem key={org.id} dense button><ListItemText
                    primary={org.heading}
                    onClick={() => navigate(`/organization/${org.id}/`)}/>
                </ListItem>
            );
        });

        return (
            <div>
                <Paper className={classes.fave_orgs_root} elevation={1}>
                    <Typography varant="subtitle1" className={classes.fave_orgs_head}>
                        Your saved organizations
                    </Typography>
                    <Divider/>
                    <List>
                        {orgItems}
                    </List>
                </Paper>
            </div>
        );
    }
}

FaveOrgs.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FaveOrgs);