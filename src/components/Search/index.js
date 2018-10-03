import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { navigateTo } from 'gatsby-link';
import { connect } from "react-redux";
import Helmet from "react-helmet";
import Spinner from 'react-spinkit';
import { isMobileOnly } from 'react-device-detect';

import { withStyles } from '@material-ui/core/styles';
import { fade } from "@material-ui/core/styles/colorManipulator";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import ServiceSuggestBox from './ServiceSuggestBox';
import NewSuggestBox from './NewSuggestBox';
import HeaderSuggestBox from './HeaderSuggestBox';
import withRoot from '../../withRoot';

// import { fetchMeta, setMetaFromUrl,  toggleSearchResultLayout } from "./actions";

const windowGlobal = typeof window !== 'undefined' && window

const styles = theme => ({
  combinedSearch: {
    display: 'flex',
    width: '100%',
    fontFamily: theme.typography.fontFamily,
    position: "relative",
    borderRadius : 1,
    border : `8px solid rgba(30, 30, 50,0.25)`,
    background: fade(theme.palette.common.white, 0.25),
    // boxShadow: `0 0 3px 1px ${theme.palette.primary["100"]}`,
    // "&input": {
    //   transition: theme.transitions.create("width"),
    //   width: "100%"
    // },
    // "&form": {
    //   transition: theme.transitions.create("width"),
    //   width: "100%"
    // }
  },
  mobile: {
    width: '100%'
  },
  serviceSuggestWrapper: {
    border: '1px solid lightGray',
    borderRadius: 4,
    marginTop: theme.spacing.unit * 6,
    marginBottom: theme.spacing.unit * 2,
  },
  newSuggestWrapper: {
    border: '1px solid lightGray',
    borderRadius: 4,
  }
});

class Search extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { pathname } = windowGlobal.location;
 
    if (pathname === '/') {
      // dispatch(fetchMeta);
      // if (pathNameFragments[2] === 'search') {
      //     dispatch(setMetaFromUrl(pathNameFragments[1]));
      // } else { //overview
      //     dispatch(setMetaFromUrl(pathNameFragments[1]));
      // }
    }
  }

  render() {
    const { classes, inHeader } = this.props;
    const { metaLoadingFailed, metaLoading, searchSuggestionsLoading } = this.props.search;

    if (metaLoading) {
      return (<Grid container spacing={0}>
        <Grid item xs={12} align="center">
          <Spinner name="ball-beat" color="blue" />
        </Grid>
      </Grid>);
    }

    if (inHeader) {
      return (<HeaderSuggestBox />);
    }

    return (
      <Fragment>
        {!isMobileOnly
          ? <div className={classes.combinedSearch}>
              <ServiceSuggestBox />
              <NewSuggestBox />
            </div>
          : <div className={classes.mobile}>
              <div className={classes.serviceSuggestWrapper}>
                <ServiceSuggestBox />
              </div>
              <div className={classes.newSuggestWrapper}>
                <NewSuggestBox />
              </div>
            </div>
        }
      </Fragment>
    );
  }
}

Search.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = function (state, ownProps) {
  return {
    ...state,
    ...ownProps
  };
};

export default connect(mapStateToProps)(withRoot(withStyles(styles)(Search)));