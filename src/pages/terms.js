import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import withRoot from '../withRoot';

const styles = theme => ({
  container: {
    marginTop: theme.spacing.unit * 3,
  },
});

class Terms extends React.Component {
  render() {
    const { classes, data } = this.props;
    const { html } = data.tos;
    return (
      <Grid container className={classes.container}>
        <Grid item md={1}/>
        <Grid item md={10}>
          <Typography align="left" variant="headline">
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
    );
  }
}

Terms.propTypes = {
  classes: PropTypes.object.isRequired,
};

export const pageQuery = graphql`
 query tosQuery {
    tos: markdownRemark(id: { regex: "/terms/"}) {
      html
    }
  }
`;

export default withRoot(withStyles(styles)(Terms));
