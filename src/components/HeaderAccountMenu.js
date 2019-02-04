import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import {navigate} from '@reach/router';
import Typography from '@material-ui/core/Typography';
import ListItemText from '@material-ui/core/ListItemText';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import {isLoggedIn, getCurrentUser} from './Account/Auth';
import {logOut, toggleAccountForm} from './Account/actions';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ListItem from '@material-ui/core/ListItem';
import Spinner from 'react-spinkit';
import MoreIcon from '@material-ui/icons/MoreVert';
import { isMobileOnly } from "react-device-detect";

const windowGlobal = typeof window !== 'undefined' && window

const styles = theme => ({
h_a_m_login : {
  zIndex: '2000',

},
h_a_m_avatar : {
  width: 32,
  height: 32,
  border : `1px solid ${theme.palette.primary['50']}`,
},
h_a_m_headerMenu : {
  maxHeight: 280,
  zIndex: '2000',
  overflow: 'hidden',
},
h_a_m_profileHeading : {
  cursor: 'none',
  margin: theme.spacing.unit,
},
h_a_m_login_button:{
  display : 'flex',
  alignSelf : 'center',
  fontWeight: '600'
},
h_a_m_signup_button:{
  border: '1px solid #fff',

},
h_a_m_loging_signup_container:{
  display: 'flex',
}
});

class HeaderAccountMenu extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this
      .handleChange
      .bind(this);
    this.handleClose = this
      .handleClose
      .bind(this);
    this.handleMenu = this
      .handleMenu
      .bind(this);
    this.logout = this
      .logout
      .bind(this);
    this.state = {
      anchorEl: null, 
      loggedin: false,
      logincheckloading: true,
      isMobile: false,
    }

  }

  componentDidMount(){
    const loggedin = isLoggedIn();
    this.setState({
      logincheckloading: false,
      isMobile: isMobileOnly,
    });

    if (loggedin){
      this.setState({
        loggedin: true,
      })
    }
  }

  handleChange = event => {
    this.setState({auth: event.target.checked});
  };

  handleMenu = event => {
    this.setState({anchorEl: event.currentTarget});
  };

  handleClose = () => {
    this.setState({anchorEl: null});
  };

  logout() {
    const {location} = this.props;
    this.props.logout(location.path);
  }

  render() {
    const {classes} = this.props;
    const {anchorEl} = this.state;
    const user = getCurrentUser();
    const open = Boolean(anchorEl);

    if (this.state.logincheckloading) {
      return (<Spinner className='account_menu_spinner' name="ball-beat" color="blue"/> )
    }

    const mobNotLoggeInMenu = (<div className={classes.h_a_m_login}>
          <IconButton
            aria-owns={open
            ? 'menu-appbar'
            : null}
            aria-haspopup="true"
            onClick={this.handleMenu}
            color="inherit">
            <MoreIcon />
          </IconButton>
          <Menu
            className={classes.h_a_m_headerMenu}
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
            transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
            open={open}
            onClose={this.handleClose}>
            <MenuItem onClick={() => navigate('/login/')}>  <Typography variant="body1" className={classes.h_a_m_title}>
              Log In
              </Typography></MenuItem>
            <MenuItem onClick={() => navigate('/signup/')}><Typography variant="body1" className={classes.h_a_m_title}>
             Sign Up
              </Typography></MenuItem>
          </Menu>
        </div>)


    return (this.state.loggedin
      ? (
        <div className={classes.h_a_m_login}>
          <IconButton
            aria-owns={open
            ? 'menu-appbar'
            : null}
            aria-haspopup="true"
            onClick={this.handleMenu}
            color="inherit">
            <Avatar
              alt={user.email}
              src={user.picture}
              className={classes.h_a_m_avatar}/>
          </IconButton>
          <Menu
            className={classes.h_a_m_headerMenu}
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
            transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
            open={open}
            onClose={this.handleClose}>
            <MenuItem onClick={() => navigate('/app/profile/')}>  <Typography variant="body1" className={classes.h_a_m_title}>
              Profile
              </Typography></MenuItem>
            <MenuItem onClick={() => this.logout()}><Typography variant="body1" className={classes.h_a_m_title}>
              Log out
              </Typography></MenuItem>
          </Menu>
        </div>
      )
      : ( this.state.isMobile ? mobNotLoggeInMenu : (
        <div className={classes.h_a_m_loging_signup_container}>
          <Button
                variant="text"
                className={classes.h_a_m_login_button}
                            href="/login"
                  color="inherit">Login</Button>
      
            <Button
            variant="outlined"
            href="/signup"
            className={classes.h_a_m_signup_button}
              color="inherit">SignUp</Button>
      
        </div>) )
      );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: (path) => {
      dispatch(logOut(path));
    },
    openLogin: () => {
      dispatch(toggleAccountForm(true));
    }
  }
}

const mapStateToProps = function (state, ownProps) {
  return {
    ...ownProps
  };
};

const ConnHeaderAccountMenu = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(HeaderAccountMenu));

export default ConnHeaderAccountMenu;