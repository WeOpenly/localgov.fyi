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
    // The “graphql” function allows us to run arbitrary queries against this
    // Gatsbygram's graphql schema. Think of it like Gatsbygram has a built-in
    // database constructed from static data that you can run queries against.
    //
    // Post is a data node type derived from data/posts.json which is created when
    // scrapping Instagram. “allPostsJson” is a "connection" (a GraphQL convention
    // for accessing a list of nodes) gives us an easy way to query all Post nodes.

    resolve(
      graphql(`
        {
          allServicesJson {
            edges {
              node {
                title
                name
                url_slug
                uploadable
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

        // org pages

        const setTemplate = path.resolve(`src/templates/service.js`);

        _.each(result.data.allServicesJson.edges, edge => {
          createPage({
            path: `${edge.node.url_slug}/`,
            component: slash(setTemplate),
            context: {
              data: edge.node
            }
          });
        });

        return;
      })
    );
  });
};

// exports.onCreateBabelConfig = ({ actions}) => {   actions.setBabelPlugin({
// name: `@babel/plugin-transform-regenerator`,   }) }
