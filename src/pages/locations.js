import React, {Component, Fragment} from 'react';
import Link from 'gatsby-link';
import {navigate} from '@reach/router';

import {isMobileOnly} from 'react-device-detect';
import {connect} from "react-redux";
import Masonry from 'react-masonry-component';
import NavSearch from '../components/Nav/Search';
import queryString from 'query-string'
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import {graphql} from "gatsby";
import withRoot from '../withRoot';
import HeaderWithSearch from '../components/HeaderWithSearch';
import LocatioDialog from '../components/UserRequests/LocationDialog';
import { toggleLocationRequestDialog } from "../components/UserRequests/actions.js";

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
  masonryGrid: {
    display: 'flex',
    marginLeft: '-10px',
    width: 'auto'
  },
  masonryGridColumn: {
    paddingLeft: '30px',
    backgroundClip: 'padding-box'
  },
  gridBlockTitle: {
    paddingTop: theme.spacing.unit *2
  },
  link: {
    padding: theme.spacing.unit
  },
  gridBlockItem: {
    width: 200
  },
  heading: {
    fontWeight: 600
  },
  listItem: {
    display: 'flex',
    marginTop: theme.spacing.unit,
    marginLeft: theme.spacing.unit
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
    navigate(url);
  }

  componentDidMount() {
    this
      .props
      .trackView();
    const { search } = this.props.location;
    const values = queryString.parse(this.props.location.search);
    if (values && values.show_add_loc) {
      this.props.openDialog()
    }
  }

  render() {
    const {classes} = this.props;
    const locLen = this.props.data.orgs.details.length;

    let stateGroupMap = {};

    this
      .props
      .data
      .orgs
      .details
      .map((loc, idx) => {
        const {org_name, id, area, url_slug} = loc['_source']
        const {hierarchy} = area;

        for (const hie of hierarchy) {

          const {area_name, area_classification, area_classsification_level_number} = hie;

          if (area_classsification_level_number === 1 && hierarchy.length > 1) {

            if (stateGroupMap[area_name]) {

              const vals = stateGroupMap[area_name];
              vals.push({org_name: org_name, id: id, url_slug: url_slug})
              stateGroupMap[area_name] = vals;
            } else {

              stateGroupMap[area_name] = [
                {
                  org_name: org_name,
                  id: id,
                  url_slug: url_slug
                }
              ]
            }
          }

        }
      });
    let sortedStateGroup = [];
    for (const [state,
      orgs]of Object.entries(stateGroupMap)) {
      sortedStateGroup.push({state: state, orgs: orgs});
    }
    sortedStateGroup.sort((a, b) => a.state.localeCompare(b.state))

    let locComponents = []
    for (const sortedState of sortedStateGroup) {
      const {state, orgs} = sortedState;
      const orgComps = orgs.map((org, idx) => {
        const {org_name, id, url_slug} = org;

        let strippedName = org_name.replace("Independent City of ", "")
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
          <div key={`${id}-${idx}`} className={classes.gridBlockListItem}>
            <a
              style={{
              textDecoration: 'underline',
              cursor: 'pointer'
            }}
              onClick={() => this.handleOrgClick(id, org_name, idx, `/${url_slug}/`)}
              className={classes.link}>
              <Typography variant="body1">
                {strippedName}
              </Typography>
            </a>
          </div>
        )
      });

      const stateComp = (
        <div key={`${state}-container`} className={classes.gridBlockItem}>
          <div className={classes.gridBlockTitle}>

            <Typography id={`${state}`} variant="subheading" className={classes.heading}>
              <a href={`#${state}`}>
                {state}
              </a>
            </Typography>
          </div>
          <div className={classes.gridBlockBody}>
            {orgComps}
          </div>
        </div>
      );
      locComponents.push(stateComp);
    }

    return (
      <Fragment>
        <NavSearch />
        <LocatioDialog />
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
            <Masonry >
              {locComponents}
            </Masonry>

          </Grid>
          <Grid item md={2}/>
        </Grid>
      </Fragment>
    );
  }
}

export const query = graphql `
query orgsQuery {
  orgs : allLocationsJson {
    details {
      _source {
        org_name id 
        area {
          hierarchy {area_name area_classification area_classsification_level_number}
        }
        url_slug
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
    },
    openDialog: () => {
      dispatch(toggleLocationRequestDialog(true))
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
