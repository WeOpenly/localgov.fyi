import React, { Component, Fragment } from 'react';
import Link, {navigateTo} from 'gatsby-link';
import { isMobileOnly } from 'react-device-detect';
import {connect} from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import withRoot from '../withRoot';
import HeaderWithSearch from '../components/HeaderWithSearch';

import {trackView, trackClick} from "../components/Search/tracking";

const styles = theme => ({
  titleWrapper: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 6,
    marginBottom: theme.spacing.unit * 2,
  },
  title:{
    marginBottom: theme.spacing.unit * 2,
  },
  section: {
    marginBottom: theme.spacing.unit,
  },
  link: {
    padding: theme.spacing.unit,
  },
locGrid:{
  display : 'flex',
  alignItems : 'center',
  justifyContent : 'center',
  alignContent: 'center',
  flexDirection : 'row',
  flexWrap : 'wrap',
},
gridItemLocation:{
  display : 'flex',
  alignItems : 'center',
  justifyContent : 'center',
    width: 250,
    height: 45,
},
  heading: {
    fontWeight: 600,
  },
  listItem: {
    display: 'flex',
    marginTop: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 2,
  },
  
});


class Locations extends Component {
  constructor(props) {
    super(props);
    this.handleOrgClick = this.handleOrgClick.bind(this);
  }

  handleOrgClick(id, name, index, url) {
    this.props.trackClick('locations', 'list',  id, name, index);
    navigateTo(url);
  }

  componentDidMount() {
    this.props.trackView();
  }

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <HeaderWithSearch />
        <Grid container>
          <Grid item md={2} />
          <Grid item md={8} className={classes.titleWrapper}>
            <Typography variant="display1" color="primary" className={classes.title}>More places on Localgov</Typography>
            <Divider />
          </Grid>
          <Grid item md={2} />
          <Grid item md={2} />
          <Grid item md={8} align="center" >
            <div className={classes.locGrid} > 
            {this.props.data.orgs.edges.map((loc, idx) => (
              <div className={classes.gridItemLocation}>
                <a style={{textDecoration: 'underline', cursor: 'pointer'}} onClick={() => this.handleOrgClick(loc.node.details.id, loc.node.details.name, idx, `/organization/${loc.node.details.id}/`) } className={classes.link}>
                  <Typography variant="body1" color="primary" className={classes.heading}>
                    {loc.node.details.name}
                  </Typography>
                </a>
                </div>
            ))}
            </div>
          </Grid>
          <Grid item md={2} />
        </Grid>
      </Fragment>
    );
  }
}

export const query = graphql `
query orgsQuery  {
orgs : allOrgsJson{
    edges {
      node {
        id
        details {id name}
      }
    }
  }
}
`;

const mapDispatchToProps = (dispatch) => {
  return {
    trackView: (click_type, resultType, id, title, listIndex) => {
        dispatch(trackView('locations', null, null, null));
    },
     trackClick: (click_type, resultType, id, title, listIndex) => {
      dispatch(trackClick(click_type, resultType, id, title, listIndex));
    }
  }
}

const mapStateToProps = function (state, ownProps) {
  return {
    ...ownProps
  };
};

const ConnLocations = connect(mapStateToProps, mapDispatchToProps)(withRoot(withStyles(styles)(Locations)));

export default ConnLocations;
