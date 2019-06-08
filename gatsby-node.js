const _ = require(`lodash`)
const Promise = require(`bluebird`)
const path = require(`path`)
const slug = require(`slug`)
const slash = require(`slash`)
const fs = require("fs");
// Implement the Gatsby API “createPages”. This is called after the Gatsby
// bootstrap is finished so you have access to any information necessary to
// programmatically create pages.







exports.createPages = ({graphql, actions}) => {
  const {createPage} = actions

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
          allServiceGlossaryJson {
  edges {
    node {
      id
      service_name
      service_name_slug
      service_glossary_description
      views {
        date
        views
      }
      orgs {
        organization {
          org_name
          id
          logo_url
        }
        area {
          hierarchy {
            area_classification
            area_id
            area_name
            area_classsification_level_number
          }
        }
        id
        url_slug
      }
    }
  }
}
allOrgsJson {
  edges {
    node {
      id
      org_name
      area {
        hierarchy {
          area_name
          area_classification
        }
      }
      url_slug
      logo_url
      contact_details {
        contact_type
        contact_value
      }
      other_orgs_from_state {
        org_name
        url_slug
        id
      }
      other_orgs_from_state_heading
      hierarchial_service_details {
        org {
          name
        }
        services {
          service_name
          service_del_links {
            link_name
            url
          }
          service_description
          url_slug
        }
      }
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
          logo_url
          description
        }
      }
      additional_sers {
        url_slug
        service_name
        service_price
        service_faq {
          answer
          question
        }
        service_forms {
          url
          price
          name
        }
        service_steps {
          step_number
          description
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

          allLogos: allFile(
            filter: { sourceInstanceName: { eq: "logos" } }
          ) {
            edges {
              node {
                name
                childImageSharp {
                  fluid {
                    base64
                    tracedSVG
                    aspectRatio
                    src
                    srcSet
                    srcWebp
                    srcSetWebp
                    sizes
                    originalImg
                    originalName
                  }
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

        const orgLogoMap = {};
        const serviceLogoMap = {};

        // logos

        if (result.data && result.data.allLogos) {
          _.each(result.data.allLogos.edges, edge => {
            if (edge.node.name.endsWith("_org_logo")) {
              orgLogoMap[edge.node.name] = edge.node.childImageSharp;
            }
            if (edge.node.name.endsWith("_ser_logo")) {
              serviceLogoMap[edge.node.name] = edge.node.childImageSharp;
            }
          });
        }

        // service glossary page

        const serGlossaryTemplate = path.resolve(
          `src/templates/service-glossary.js`
        );
        _.each(result.data.allServiceGlossaryJson.edges, edge => {
          createPage({
            path: `services/${edge.node.service_name_slug}/`,
            component: slash(serGlossaryTemplate),
            context: {
              data: edge.node
            }
          });
        });

        // org pages

        const orgTemplate = path.resolve(
          `src/templates/organization-detail.js`
        );

        _.each(result.data.allOrgsJson.edges, edge => {
          createPage({
            path: `${edge.node.url_slug}/`,
            component: slash(orgTemplate),
            context: {
              data: edge.node,
              logoSizes: orgLogoMap[`${edge.node.id}_org_logo`]
            }
          });
        });

        //service page

        const serTemplate = path.resolve(
          `src/templates/service-detail-2.js`
        );

        _.each(result.data.allSersJson.edges, edge => {
          const { node } = edge;
          const { service_reminder_bp_json } = node;
          const ser_rem_has_data =
            service_reminder_bp_json &&
            "field_schema" in service_reminder_bp_json &&
            service_reminder_bp_json["field_schema"] !== null;
          const { service, org_details, additional_sers, state_org_details } = node;

          createPage({
            path: `${service.url_slug}/`,
            component: slash(serTemplate),
            context: {
              data: {
                id: service.id,
                views: service.views,
                url_slug: service.url_slug,
                state_org_details: state_org_details,
                contact_details: service.contact_details,
                service_parent: service.service_parent || null,
                service_delivery_enabled: service.delivery_enabled,
                name: service.service_name,
                allForms: service.service_forms || [],
                description: service.service_description,
                price: service.price,
                allSteps: service.service_steps || [],
                allMems: [],
                alllocations: [],
                alltimings: service.service_timing || [],
                allfaq: service.service_faq || [],
                service_reminder_bp_json: ser_rem_has_data
                  ? service_reminder_bp_json
                  : null,
                service_del_links: service.service_del_links || [],
                org_id: org_details.id,
                org_slug: org_details.url_slug,
                org_area_hie: org_details.area.hierarchy || [],
                org_logo_sizes: orgLogoMap[`${org_details.id}_org_logo`],
                org_name: org_details.org_name,
                otherServices: additional_sers,
                logoSizes: serviceLogoMap[`${service.id}_ser_logo`]
              }
            }
          });
        });

        return;
      })
    );
  })
}

// exports.onCreateBabelConfig = ({ actions}) => {   actions.setBabelPlugin({
// name: `@babel/plugin-transform-regenerator`,   }) }