import React, { Component } from "react";
import { connect } from "react-redux";

import Grid from "@material-ui/core/Grid";

import SuggestedRow from "./SuggestedRow";
import Fuse from "fuse.js";
import { withStyles } from "@material-ui/core/styles";
import ContentLoader from "react-content-loader";

const SuggestedLoader = () => (
  <ContentLoader
    height={200}
    width={400}
    speed={100}
    primaryColor="#f3f3f3"
    secondaryColor="#d5d9f3"
  >
    <rect x="11" y="75" rx="0" ry="0" width="166" height="61" />
    <rect x="8" y="12" rx="0" ry="0" width="304" height="19" />
  </ContentLoader>
);

const styles = theme => ({
  ser_template_card: {
    cursor: "pointer",
    width: "240px",
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing.unit,
    margin: theme.spacing.unit,
    boxShadow: `0 2px 5px 2px ${theme.palette.primary["100"]}`
  },
  ser_template_card_img: {
    display: "flex",
    justifyContent: "center",
    minHeight: "80px",
    padding: theme.spacing.unit * 3
  },
  ser_template_card_content: {
    textAlign: "center",
    display: "flex",
    justifyContent: "center"
  },
  ser_gloss_suggested_row: {
    paddingLeft: theme.spacing.unit,
    marginTop: theme.spacing.unit * 2
  },
  ser_gloss_suggested_failed_row: {
    display: "flex",
    justifyContent: "center"
  }
});

class OtherStateLocations extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    const {
           autoLocLoading,
          autoLocRegion,
         } = this.props;

    const { classes, allOrgs, isMobile} = this.props;
    
    const {
           googLocLoading,
           googleLocRegion
         } = this.props;


    if (autoLocLoading || googLocLoading) {
      return (
        <Grid container>
          <Grid item sm={1} />
          <Grid item sm={5} className={classes.ser_gloss_suggested_row}>
            <SuggestedLoader />
          </Grid>
          <Grid item sm={6} />
        </Grid>
      );
    }

     let filteredOrgs = allOrgs;


     const stateOptions = {
       shouldSort: true,
       tokenize: false,
       threshold: 0,
       location: 0,
       distance: 5,
       maxPatternLength: 32,
       minMatchCharLength: 1,
       keys: ["area.hierarchy.area_name"]
     };

    let locationCards = null;
    if (googleLocRegion){  
        const stateFuse = new Fuse(allOrgs, stateOptions);
        filteredOrgs = stateFuse.search(googleLocRegion);

        if (filteredOrgs.length === 0){
            return null;
        }
         return (
           <SuggestedRow
             isMobile={isMobile}
             key={`goog-STATE-LOC`}
             header={`Suggestions from ${googleLocRegion}`}
             results={filteredOrgs}
           />
         );
    }

    if (autoLocRegion){
         const stateFuse = new Fuse(allOrgs, stateOptions);
         filteredOrgs = stateFuse.search(autoLocRegion);
       if (filteredOrgs.length === 0){
            return null;
        }
          return (
            <SuggestedRow
              isMobile={isMobile}
              key={`AUTO-state-LOC`}
              header={`Suggestions from ${autoLocRegion}`}
              results={filteredOrgs}
            />
          );
    }

    return locationCards
  }
}

const mapStateToProps = function(state, ownProps) {
  return {
    ...state.serTemplate,
    ...ownProps
  };
};

export default connect(mapStateToProps)(withStyles(styles)(OtherStateLocations));
