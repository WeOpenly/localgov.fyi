import React, {Component, Fragment} from 'react';
import Link, {navigateTo} from 'gatsby-link';
import {isMobileOnly} from 'react-device-detect';
import {connect} from "react-redux";
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { graphql } from "gatsby";
import withRoot from '../withRoot';
import HeaderWithSearch from '../components/HeaderWithSearch';

import {trackView, trackClick} from "../components/common/tracking";

const styles = theme => ({
  titleWrapper: {
    textAlign: 'center',
    padding: theme.spacing.unit *4,
    margin: theme.spacing.unit *2
  },
  subtitle: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 4
  },
  section: {
    marginBottom: theme.spacing.unit
  },
  link: {
    padding: theme.spacing.unit
  },
  locGrid: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  gridItemLocation: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 250,
    height: 45
  },
  heading: {
    fontWeight: 600
  },
  listItem: {
    display: 'flex',
    marginTop: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 2
  }
});

class Locations extends Component {
  constructor(props) {
    super(props);
    this.handleOrgClick = this
      .handleOrgClick
      .bind(this);
  }

  handleOrgClick(id, name, index, url) {
    this
      .props
      .trackClick('locations', 'list', id, name, index);
    navigateTo(url);
  }

  componentDidMount() {
    this
      .props
      .trackView();
  }

  render() {
    const {classes} = this.props;
    const locLen = this.props.data.orgs.edges.length;
    const locs = this
      .props
      .data
      .orgs
      .edges
      .map((loc, idx) => {
        const name = loc.node.details.name;
        let strippedName = name.replace("Independent City of ", "")
        strippedName = strippedName.replace("City & County of ", "")
        strippedName = strippedName.replace("City and County of ", "")
        strippedName = strippedName.replace("City Council of ", "")
        strippedName = strippedName.replace("Metro Government of ", "")
        strippedName = strippedName.replace("Metropolitan Government of ", "")
        strippedName = strippedName.replace("City of ", "")
        strippedName = strippedName.replace("Borough of ", "")
        strippedName = strippedName.replace("County of ", "")
        strippedName = strippedName.replace("Town of ", "")

        return (
          <div className={classes.gridItemLocation}>
            <a
              style={{
              textDecoration: 'underline',
              cursor: 'pointer'
            }}
              onClick={() => this.handleOrgClick(loc.node.details.id, loc.node.details.name, idx, `/organization/${loc.node.details.id}/`)}
              className={classes.link}>
              <Typography variant="body2" className={classes.heading}>
                {strippedName}
              </Typography>
            </a>
          </div>
        )
      })
    return (
      <Fragment>
        <HeaderWithSearch/>
        <Grid container className={classes.titleWrapper}>
          <Grid item xs={2}/>
          <Grid item xs={8} align="center">
            <Typography variant="display1" className={classes.title}>{`Currently serving ${locLen} governments`}</Typography>
            <Typography variant="caption" className={classes.subtitle}>.. and adding more every day</Typography>
            <Divider/>
          </Grid>
          <Grid item xs={2}/>
        </Grid>

        <Grid container>
          <Grid item md={2}/>
          <Grid item md={8} align="center">
            <div className={classes.locGrid}>
              {locs}
            </div>
          </Grid>
          <Grid item md={2}/>
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
