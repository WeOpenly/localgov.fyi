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
          allSersJson {
            edges {
              node {
                service {
                  id
                  url_slug
                  logo_url
                  delivery_enabled
                  service_name
                  views {
                    date
                    views
                  }
                  service_faq {
                    answer
                    question
                  }
                  service_forms {
                    url
                    price
                    name
                  }
                  service_attachments {
                    url
                    group
                    name
                    description
                  }
                  service_price
                  service_steps {
                    step_number
                    description
                  }
                  contact_details {
                    contact_type
                    contact_value
                  }
                  service_timing {
                    break
                    open
                    day
                  }
                  service_location {
                    id
                  }
                  service_del_links {
                    url
                    link_name
                  }
                  service_description
                  service_reminder_bp_json {
                    id
                  }
                  service_parent {
                    name
                    description
                    logo_url
                  }
                }
                state_org_details {
                  offered_services {
                    name
                    url_slug
                  }
                  url_slug
                  area {
                    name
                  }
                }
                org_details {
                  org_name
                  contact_details {
                    contact_type
                    contact_value
                  }
                  id
                  area {
                    hierarchy {
                      area_name
                    }
                  }
                  url_slug
                }
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

        const serTemplate = path.resolve(`src/templates/service-detail.js`);

        _.each(result.data.allSersJson.edges, edge => {
          const { node } = edge;
          const { service, org_details, state_org_details } = node;

          createPage({
            path: `${service.url_slug}/`,
            component: slash(serTemplate),
            context: {
              data: {
                id: service.id,
                views: service.views,
                url_slug: `${process.env.GATSBY_CANONICAL_DOMAIN}/${service.url_slug}`,
                contact_details: service.contact_details,
                state_org_details: state_org_details,
                service_parent: service.service_parent || null,
                service_delivery_enabled: service.delivery_enabled,
                service_attachments: service.service_attachments || [],
                name: service.service_name,
                description: service.service_description,
                price: service.price,
                service_del_links: service.service_del_links || [],
                org_id: org_details.id,
                org_slug: `${process.env.GATSBY_CANONICAL_DOMAIN}/${org_details.url_slug}`,
                org_area_hie: org_details.area.hierarchy || [],
                org_name: org_details.org_name
              }
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
