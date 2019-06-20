import React, {Component} from "react";
import {connect} from "react-redux";
import {navigate} from '@reach/router';

import {withStyles} from '@material-ui/core';
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

import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {isMobileOnly} from 'react-device-detect';
import HeaderAccountMenu from './HeaderAccountMenu';

// import Feedback from './Feedback';


const styles = theme => ({
  h_w_s_header: {
    background: theme.palette.common.white,
    color: theme.palette.primary['700'],
    padding: theme.spacing(1),
    boxShadow: 'none',
    borderBottom: `1px solid ${theme.palette.primary['50']}`
  },
h_w_s_flex : {
    flexGrow: 1,
    justifyContent: 'space-between'
  },
h_w_s_title : {
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2)
  },
h_w_s_menuButton : {
    marginLeft: -12,
    marginRight: 20
  },
h_w_s_right : {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: theme.spacing(2)
  },
  heaer_search_grid: {

  },
  heaer_search_grid_item: {

  },
header_search_grid_container:{

},
});

class HeaderWithSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: false
    }
  }

  componentDidMount(){
    this.setState({
      isMobile: isMobileOnly
    })
  }

  render() {
    const {classes} = this.props;

    return (
      <AppBar position="static" className={classes.h_w_s_header}>
        {this.state.isMobile ? (<Grid className={classes.header_search_grid_container} container spacing={0}>
          <Grid
            className='heaer_search_grid_item' 
            item
            xs={10}
            style={{
            'cursor': 'pointer'
          }}
            onClick={() => navigate('/')}>
            <Typography
              variant="h4"
              color="inherit"
              component="h1"
              className={classes.h_w_s_title}>
              evergov
            </Typography>
          </Grid>
            <Grid className='heaer_search_grid' item xs={2} className={classes.h_w_s_right}>
              <HeaderAccountMenu location={this.props.location} />
          </Grid>
        
        </Grid>) : (<Grid className={classes.header_search_grid_container} container spacing={0}>
          <Grid
            className='heaer_search_grid_item' 
            item
            xs={12}
            sm={3}
            style={{
            'cursor': 'pointer'
          }}
            onClick={() => navigate('/')}>
            <Typography
                variant="h4"
              color="inherit"
              component="h1"
              className={classes.h_w_s_title}>
              evergov
            </Typography>
          </Grid>
          <Grid className='heaer_search_grid' item xs={12} md={3} className={classes.h_w_s_right}>
              <HeaderAccountMenu location={this.props.location} />
          </Grid>
        </Grid>)}
       
      </AppBar>
    );
  }
}

const mapStateToProps = function (state, ownProps) {
  return {
    ...ownProps
  };
};

const ConnHeaderWithSearch = connect(mapStateToProps)(withStyles(styles)(HeaderWithSearch));

export default ConnHeaderWithSearch;