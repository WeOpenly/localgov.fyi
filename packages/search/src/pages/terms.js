import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';

import { withStyles } from '@material-ui/core/styles';
import Nav from '../components/Nav/Common'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { graphql } from "gatsby"

// import Feedback from '../components/Feedback';
import withRoot from '../withRoot';

const styles = theme => ({
  container: {
    marginTop: theme.spacing.unit * 3,
  },
  header: {
    color: theme.palette.primary['700'],
    background: theme.palette.common.white,
    boxShadow: `0 0 10px 5px ${theme.palette.primary["A200"]}`,
  },
  headerMobile: {
    width: 'auto',
    color: theme.palette.primary['700'],
    background: theme.palette.common.white,
    boxShadow: `0 0 10px 5px ${theme.palette.primary["A200"]}`,
    marginLeft: theme.spacing.unit * -2,
    marginRight: theme.spacing.unit * -2,
  },
  logo:{
    paddingTop: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2,
  },
  right: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: theme.spacing.unit * 2,
  },
  title: {
    marginBottom: theme.spacing.unit * 6,
  },
});

class Terms extends React.Component {
  render() {
    const { classes, data } = this.props;
    const { html } = data.tos;
    return (
      <Fragment>
        <Nav />
        <Grid container className={classes.container}>
          <Grid item md={1}/>
          <Grid item md={10}>
            <Typography align="left" variant="headline" className={classes.title}>
              Terms of Service
            </Typography>
          </Grid>
          <Grid item md={1}/>
          <Grid item md={1}/>
          <Grid item md={10}>
            <div
              className="blog-post-content"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </Grid>
          <Grid item md={1}/>
        </Grid>
      </Fragment>
    );
  }
}

Terms.propTypes = {
  classes: PropTypes.object.isRequired,
};

export const pageQuery = graphql`
 query tosQuery {
    tos: markdownRemark(id: { regex: "terms/"}) {
      html
    }
  }
`;

export default withRoot(withStyles(styles)(Terms));
