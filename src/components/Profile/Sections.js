import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import AccountCircle from '@material-ui/icons/AccountCircle';

import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';

const styles = theme => ({
    profile_sections_root: {
          borderRadius: 5,
  boxShadow: `0 0 0 0`,
  border: `1px solid ${theme.palette.primary['100']}`,
  borderTop: 'none',
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper
    }
});

class Sections extends React.Component {
    render(){
        const {classes, active, onSelectSection} = this.props;
        return (
            <div className={classes.profile_sections_root}>
                <List dense>
                      <ListItem button selected={active === 'user_account'} onClick={() => onSelectSection('user_account')}>
                        <Avatar>
                            <AccountCircle/>
                        </Avatar>
                        <ListItemText primary="User Account"/>
                    </ListItem>
                    <ListItem button selected={active === 'organizations'} onClick={() => onSelectSection('organizations')}>
                        <Avatar>
                            <FavoriteBorder/>
                        </Avatar>
                        <ListItemText primary="Organizations"/>
                    </ListItem>
                    <ListItem  button selected={active === 'services'} onClick={() => onSelectSection('services')}>
                        <Avatar>
                           <FavoriteBorder/>
                        </Avatar>
                        <ListItemText primary="Services"/>
                    </ListItem>
                </List>
            </div>
        );
    }
}

Sections.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Sections);
