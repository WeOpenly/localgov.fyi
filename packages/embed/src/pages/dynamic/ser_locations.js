import React from "react";

import { graphql } from "gatsby";
import queryString from "query-string";

import SerLocationShell from "../../components/SerLocations";

import styles from "../../components/spectre.min.module.css";

class SerLocations extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { location } = this.props;
    const { services } = this.props.data;
    const { edges } = services;

    let defaultTemplateName = null;
    let defaultTemplateUrlSlug = null;
    let defaultTemplateDesc = null;

    const searchValues = queryString.parse(location.search);
    if (searchValues && searchValues.id){
        const currentTemplate = edges.filter((ser => ser.node.id === searchValues.id))
        if (currentTemplate.length > 0){
          defaultTemplateName = currentTemplate[0].node.service_name
          defaultTemplateUrlSlug = currentTemplate[0].node.service_name_slug
          defaultTemplateDesc = currentTemplate[0].node.service_glossary_description
        }
    }

    
    return (
      <div className={`${styles.container} ${styles.gridXl}`}>
        <div
          className={styles.columns}
          style={{
            background: "#fff",
            margin: "0.6rem",
            border: "1px solid rgba(86, 39, 255, .2)",
            boxShadow: "0 .1rem 0.1rem rgba(48,55,66,.10)"
          }}
        >
          <div className={`${styles.column} ${styles.col12}`}>
            <div
              className={styles.panel}
              style={{
                border: "none",
                borderRadius: "0.3rem"
              }}
            >
              <div
                style={{
                  margin: "0"
                }}
                className={styles.panelBody}
              >
                <SerLocationShell
                  defaultTemplateName={defaultTemplateName}
                  defaultTemplateSlug={defaultTemplateUrlSlug}
                  defaultTemplateDesc={defaultTemplateDesc}
                  location={this.props.location}
                />
              </div>

              <div
                className={styles.panelFooter}
                style={{
                  borderTop: "1px solid rgba(48,55,66,.10)",
                  margin: "1rem 0 0.6rem 0",
                  padding: "0.4rem 0 0 0",
                  display: "flex",
                  justifyContent: "right"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    width: "160px"
                  }}
                >
                  <div className={styles.textGray}> powered by</div>
                  <a href="https://papergov.com" target="_blank">
                    <h6>papergov</h6>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export const query = graphql`
         query servicesQueryDynamic {
           services: allServiceGlossaryJson {
             edges {
               node {
                 id
                 service_name
                 service_glossary_description
                 service_name_slug
               }
             }
           }
         }
       `;

export default SerLocations;
