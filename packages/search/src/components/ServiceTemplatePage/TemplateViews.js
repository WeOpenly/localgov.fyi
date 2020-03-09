import React, { Component } from "react";
import { connect } from "react-redux";

import SvgUsers from '../../svgIcons/users';

import specIconStyles from "../spectre-icons.min.module.css";
import spStyles from "../spectre.min.module.css";


class TemplateViews extends Component {
    constructor(props) {
        super(props);
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
          <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: "1rem", marginTop: "1rem" }}>
            <div
              style={{ marginRight: "1rem" }}
              className={`${spStyles.textLinkGray} ${spStyles.textSemibold}`}
            >
              <i
                style={{ margin: "0 0.1rem" }}
                className={`${spStyles.formIcon} ${specIconStyles.icon} ${specIconStyles.iconLocation}`}
              />{" "}
              Offered in {orgsCnt} locations
            </div>

            <div
              className={`${spStyles.textLinkGray} ${spStyles.textSemibold}`}
            >
              <i
                style={{ margin: "0 0.1rem" }}
                className={`${specIconStyles.icon} ${specIconStyles.iconPerson}`}
              />{" "}
              <b>{moreThan}</b> people accessed this service in the last month
            </div>
          </div>
        );
    }
}


export default TemplateViews;
