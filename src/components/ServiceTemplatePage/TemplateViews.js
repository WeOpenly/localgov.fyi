import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import Grid from '@material-ui/core/Grid';
import { isMobileOnly } from 'react-device-detect';
import Typography from '@material-ui/core/Typography';
import SUC from '@material-ui/icons/SupervisedUserCircle'
import { withStyles } from '@material-ui/core';
import SvgUsers from '../../svgIcons/users';
import Avatar from "@material-ui/core/Avatar";

import LocationCity from "@material-ui/icons/LocationCity";

import ContentLoader from "react-content-loader"

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
)

const styles = theme => ({
  template_views_card_item: {
    display: "flex",
    paddingRight: theme.spacing(2)
  },
  template_views_card_item_mob: {
    display: "flex",
  },
  template_views_card_mob: {
    display: "flex",
    flexWrap: "wrap",
    paddingLeft: theme.spacing(1),
  },
  template_views_card: {
    display: "flex",
    flexWrap: "wrap",
    padding: theme.spacing()
  },
  template_views_message: {
    paddingLeft: theme.spacing(1),
    paddingTop: '2px'
  },
  template_views_message_text: {
    fontWeight: 500,
    textAlign: "left"
  }
});

class TemplateViews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMob: false
        }
    }

    componentDidMount() {
        this.setState({ isMob: isMobileOnly });
    }

    render() {
        const { views, orgsCnt, classes } = this.props;
        let moreThan = 50;
  

        if(views){
          let viewsAgg = views.map(item => item.views).reduce((a, b) => a + b);

          if(viewsAgg && viewsAgg/100 > 1){
            moreThan = 100 * Math.ceil(viewsAgg / 100);
          }  
        }

        return (
          <div className={this.state.isMob ? classes.template_views_card_mob : classes.template_views_card}>
            <div className={this.state.isMob ? classes.template_views_card_item_mob : classes.template_views_card_item}>
              <div style={{marginBottom: '4px'}}>
                {" "}
                <LocationCity
             
                  style={{
                    color: "#AB93FF",
                    background: "#fff",
                    fontSize: "22px"
                  }}
                />
              </div>{" "}
              <div className={classes.template_views_message}>
                <Typography
                  variant="caption"
                  className={classes.template_views_message_text}
                >
                  Offered in {orgsCnt} locations
                </Typography>
              </div>
            </div>
            <div className={this.state.isMob ? classes.template_views_card_item_mob : classes.template_views_card_item}>
              <div>
                {" "}
                <SvgUsers style={{ fontSize: "26px" }} />{" "}
              </div>{" "}
              <div className={classes.template_views_message}>
                <Typography
                  variant="caption"
                  className={classes.template_views_message_text}
                >
                  <b>{moreThan}</b> people accessed this
                  service in the last month
                </Typography>
              </div>
            </div>
          </div>
        );
    }
}


export default withStyles(styles)(TemplateViews);
