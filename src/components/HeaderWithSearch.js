import React, {Component} from "react";
import {connect} from "react-redux";
import {navigate} from '@reach/router';

import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {isLoggedIn} from './Account/Auth';
import {logOut, toggleLogin} from './Account/actions';
import LoginDialog from '../components/Account/LoginDialog';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import Search from './Search/Search';
// import Feedback from './Feedback';
import withRoot from '../withRoot';

const styles = theme => ({
  header: {
    background: theme.palette.common.white,
    color: theme.palette.primary['700'],
    boxShadow: `0 0 0 0 ${theme.palette.common.white}`,
    borderBottom: `1px solid ${theme.palette.primary['50']}`
  },
  flex: {
    flexGrow: 1,
    justifyContent: 'space-between'
  },
  title: {
    paddingTop: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  right: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: theme.spacing.unit * 2
  }
});

class HeaderWithSearch extends Component {
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
      anchorEl: null
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
    this.props.logout();
  }

  render() {
    const {classes} = this.props;
    const {anchorEl} = this.state;
    const open = Boolean(anchorEl);
    const headerMenu = isLoggedIn()
      ? (
        <div className={classes.login}>
          <IconButton
            aria-owns={open
            ? 'menu-appbar'
            : null}
            aria-haspopup="true"
            onClick={this.handleMenu}
            color="inherit">
            <AccountCircle/>
          </IconButton>
          <Menu
            className={classes.headerMenu}
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
            transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
            open={open}
            onClose={this.handleClose}>
            <MenuItem onClick={() => navigate('/app/profile')}>Profile</MenuItem>
            <MenuItem onClick={() => this.logout()}>Logout</MenuItem>
          </Menu>
        </div>
      )
      : (
        <Button
          className={classes.login}
          onClick={() => this.props.openLogin()}
          color="inherit">Login</Button>
      )
    return (
      <AppBar position="static" className={classes.header}>
        <Grid container spacing={0}>
          <Grid
            item
            xs={12}
            sm={3}
            style={{
            'cursor': 'pointer'
          }}
            onClick={() => navigate('/')}>
            <Typography
              variant="display1"
              color="inherit"
              component="h1"
              className={classes.title}>
              Localgov.fyi
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Search inHeader={true}/>
          </Grid>
          <Grid item xs={12} md={3} className={classes.right}>
              {headerMenu}
          </Grid>
        </Grid>
         <LoginDialog location={this.props.location}/>
      </AppBar>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(logOut());
    },
openLogin: () =>{
dispatch(toggleLogin(true));
}
  }
}

const mapStateToProps = function (state, ownProps) {
  return {
    ...ownProps
  };
};

const ConnHeaderWithSearch = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(HeaderWithSearch));

export default ConnHeaderWithSearch;