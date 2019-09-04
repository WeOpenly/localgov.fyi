import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { navigate } from '@reach/router';
import Typography from '@material-ui/core/Typography';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';

import ListItem from '@material-ui/core/ListItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import MoreIcon from '@material-ui/icons/MoreVert';

const windowGlobal = typeof window !== 'undefined' && window

const styles = theme => ({
  h_a_m_login: {
    zIndex: '109',
  },
  h_a_m_avatar: {
    width: 32,
    height: 32,
    border: `1px solid ${theme.palette.primary['50']}`,
  },
  h_a_m_headerMenu: {
    maxHeight: 280,
    zIndex: '198',
    overflow: 'hidden',
  },
  h_a_m_profileHeading: {
    cursor: 'none',
    margin: theme.spacing.unit,
  },
  h_a_m_login_button: {

    alignSelf: 'center',
    fontWeight: '500',

    display: 'flex',

    justifyContent: 'center'

  },
  h_a_m_signup_button: {
    alignSelf: 'center',
    fontWeight: '500',
    display: 'flex',
    border: 'none',
    justifyContent: 'center'
  },
  h_a_m_loging_signup_container: {
    display: 'flex',
  }
});

class HeaderAccountMenu extends Component {
  constructor(props) {
    super(props);



  }



  render() {
    const { classes, isMobile } = this.props;


    // if (isMobile) {
    //   return null;
    // }

    return (
      <div className={classes.h_a_m_loging_signup_container}>
        <Button
          variant="outlined"
          aria-label="quick pay"
          className={classes.h_a_m_login_button}
          href="/quick_pay"
          color="inherit"
        >
          Quick pay
        </Button>
      </div>
    );
  }
}



const mapStateToProps = function (state, ownProps) {
  return {
    ...ownProps
  };
};

const ConnHeaderAccountMenu = connect(mapStateToProps)(withStyles(styles)(HeaderAccountMenu));

export default ConnHeaderAccountMenu;