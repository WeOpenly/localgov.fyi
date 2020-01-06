import React, { Fragment } from "react";
import PropTypes from "prop-types";

import { graphql } from "gatsby";

import ComboBox from '../components/ComboBox';

import { connect } from "react-redux";
import Helmet from "react-helmet";

import FooterNew from '../components/FooterNew';

import styles from "../components/spectre.min.module.css";
import iconStyles from "../components/typicons.min.module.css";


const windowGlobal = typeof window !== "undefined" && window;

class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTemplate: ""
    };
    this.selectTemplate = this.selectTemplate.bind(this);
  }

  selectTemplate(id){
    console.log(id);
    this.setState({
      selectedTemplate: id
    });
  }

  render() {
    const { classes } = this.props;
    const { services } = this.props.data;
    const { edges } = services;


    return (
      <Fragment>
        <Helmet>
          <title>{`papergov One`}</title>
        </Helmet>
        <div className={`${styles.container} ${styles.gridXl}`}>
          <div className={`${styles.columns} `}>
            <div className={`${styles.column} ${styles.col3}`}></div>
            <div
              className={`${styles.column} ${styles.col6} ${styles.textCenter} ${styles.hero}`}
            >
              <h1>
                Papergov <code> embed </code>
              </h1>
            </div>
            <div className={`${styles.column} ${styles.col3}`}></div>

            <div className={`${styles.column} ${styles.col2}`}></div>
            <div
              style={{ marginBottom: "4rem" }}
              className={`${styles.column} ${styles.col2}`}
            >
              {edges ? (
                <ComboBox
                  services={edges}
                  selectTemplate={this.selectTemplate}
                />
              ) : null}
            </div>

            <div style={{}} className={`${styles.column} ${styles.col1}`}>
              <div className={styles.dividerVert} data-content=""></div>
            </div>

            <div
              style={{ marginBottom: "4rem" }}
              className={`${styles.column} ${styles.col5}`}
            >
              {this.state.selectedTemplate ? (
                <pre type="text" className={styles.code} data-lang="HTML">
                  <code
                    dangerouslySetInnerHTML={{
                      __html: `<textarea style=" font-family: inherit; font-size: inherit; line-height: inherit; margin: 0; height: auto; -webkit-appearance: none; -moz-appearance: none; appearance: none; background: #fff; background-color: rgb(255, 255, 255); background-image: none; background-image: none; border: .05rem solid #bcc3ce; border-radius: .1rem; color: #3b4351; display: block; font-size: .8rem; height: 10.8rem; line-height: 1.2rem; max-width: 100%; outline: 0; padding: .25rem .4rem; position: relative; transition: background .2s,border .2s,box-shadow .2s,color .2s; width: 100%; "><div style="position: relative; overflow: hidden; padding-top: 56.25%; height: auto;"> <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; max-height: 320px; border: 0;" frameborder="0" gesture="media" allow="encrypted-media" src="${process.env.EMBED_BACKEND}/dynamic/ser_locations/?id=${this.state.selectedTemplate}" ></iframe> </div></textarea>`
                    }}
                  />
                </pre>
              ) : null}
            </div>
            <div className={`${styles.column} ${styles.col2}`}></div>

            <div className={`${styles.column} ${styles.col12}`}>
              <FooterNew />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}


export const query = graphql`
  query servicesQuery {
    services: allServiceGlossaryJson {
      edges {
        node {
          id
          service_name
          service_name_slug
        }
      }
    }
  }
`;

const mapStateToProps = function(state, ownProps) {
  return {
    oneService: state.oneServices,
    oneUser: state.oneUser
  };
};


export default connect(mapStateToProps)(Create);
