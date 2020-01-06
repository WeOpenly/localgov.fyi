const _ = require(`lodash`);
const Promise = require(`bluebird`);
const path = require(`path`);
const slug = require(`slug`);
const slash = require(`slash`);
const fs = require("fs");
// Implement the Gatsby API “createPages”. This is called after the Gatsby
// bootstrap is finished so you have access to any information necessary to
// programmatically create pages.

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {

    resolve(
      graphql(`
        {
          allServiceGlossaryJson {
            edges {
              node {
                id
                service_name
                service_name_slug
                service_glossary_description
              }
            }
          }
        }
      `).then(result => {
        if (result.errors) {
          reject(new Error(result.errors));
        }

        if (result.data === undefined) {
          console.log(result.data, "rejecting page creation");
          reject(new Error());
        }

        
        // service glossary page

        return;
      })
    );
  });
};

// exports.onCreateBabelConfig = ({ actions}) => {   actions.setBabelPlugin({
// name: `@babel/plugin-transform-regenerator`,   }) }
