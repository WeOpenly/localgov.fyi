const _ = require(`lodash`)
const Promise = require(`bluebird`)
const path = require(`path`)
const slug = require(`slug`)
const slash = require(`slash`)

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

    resolve(graphql(`
{
allOrgsJson {
  edges {
    node {
      id
      details {
        id,
        name,
        contact_details {
          contact_value,
          contact_type
        },
        services {
          services {
            id
            contact_details {contact_value, contact_type}
            service_name
            delivery_enabled
            service_timing {break, open, day}
            service_description
            service_faq {question answer}
            service_del_links {url link_name}
            service_forms {url name}
          }
          org {
            id
            name
            contact_details {contact_value, contact_type}
          }
        }
      }
    }
  }
}
allLogos: allFile (filter : {
  sourceInstanceName: {
    eq: "logos"
  }
}) {
  edges {
    node {
      name
      childImageSharp {
        sizes {
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
        reject(new Error(result.errors))
      }

      if(result.data === undefined){
        console.log(result.data, "rejecting page creation");
        reject(new Error());
      }
      
      // Create image post pages.
      const orgTemplate = path.resolve(`src/templates/organization-detail.js`)
      // We want to create a detailed page for each Instagram post. Since the scrapped
      // Instagram data already includes an ID field, we just use that for each page's
      // path.
      const orgLogoMap = {}
      const serviceLogoMap = {}
      _.each(result.data.allLogos.edges, edge => {
        if(edge.node.name.endsWith("_org_logo")){
          orgLogoMap[edge.node.name] = edge.node.childImageSharp
        }
        if (edge.node.name.endsWith("_ser_logo")) {
          serviceLogoMap[edge.node.name] = edge.node.childImageSharp
        }
      });



      _.each(result.data.allOrgsJson.edges, edge => {

        // Gatsby uses Redux to manage its internal state. Plugins and sites can use
        // functions like "createPage" to interact with Gatsby.
        createPage({
          // Each page is required to have a `path` as well as a template component. The
          // `context` is optional but is often necessary so the template can query data
          // specific to each page.
          path: `organization/${edge.node.details.id}/`,
          component: slash(orgTemplate),
          context: {
            data: edge.node.details,
            logoSizes : orgLogoMap[`${edge.node.details.id}_org_logo`]
          }
        })
      })

      // const memTemplate = path.resolve(`src/templates/member-detail.js`)
      // // We want to create a detailed page for each Instagram post. Since the scrapped
      // // Instagram data already includes an ID field, we just use that for each page's
      // // path.
      // _.each(result.data.allOrgsJson.edges, edge => {

      //   _.each(edge.node.details.members, member => {

      //     // Gatsby uses Redux to manage its internal state. Plugins and sites can use
      //     // functions like "createPage" to interact with Gatsby.
      //     const related_members = edge
      //       .node
      //       .details
      //       .members
      //       .filter((mem) => mem.id !== member.id)

      //     createPage({
      //       // Each page is required to have a `path` as well as a template component. The
      //       // `context` is optional but is often necessary so the template can query data
      //       // specific to each page.
      //       path: `member/${member.id}`,
      //       component: slash(memTemplate),
      //        layout: "detailTemplate",
      //       context: {
      //         data: {
      //           contact_details: member.contact_details,
      //           id: member.id,
      //           person_name: member.person_name,
      //           person_image: member.person_image,
      //           org_id: edge.node.details.id,
      //           org_name: edge.node.details.name,
      //           related_members: related_members
      //         }
      //       }
      //     })
      //   })
      // })


      const serTemplate = path.resolve(`src/templates/service-detail-2.js`)
      // We want to create a detailed page for each Instagram post. Since the scrapped
      // Instagram data already includes an ID field, we just use that for each page's
      // path.
      _.each(result.data.allOrgsJson.edges, edge => {

        _.each(edge.node.details.services, ser => {
          // Gatsby uses Redux to manage its internal state. Plugins and sites can use
          // functions like "createPage" to interact with Gatsby.
          _.each(ser.services, service => {
            createPage({
              path: `service/${service.id}/`,
              component: slash(serTemplate),
              context: {
                data: {
                  id: service.id,
                  contact_details: service.contact_details,
                  service_delivery_enabled : service.delivery_enabled,
                  name: service.service_name,
                  allForms: service.service_forms || [],
                  description: service.service_description,
                  price: service.price,
                  allSteps: [],
                  allMems: [],
                  alllocations: [],
                  alltimings: service.service_timing || [],
                  allfaq: service.service_faq || [],
                  service_del_links: service.service_del_links || [],
                  service_flow_steps: service.service_flow_steps || [],
                  org_id: ser.org.id,
                  org_name: ser.org.name,
                  otherServices: ser.services.filter(otherService => otherService.id !== service.id),
                  logoSizes : serviceLogoMap[`${service.id}_ser_logo`]
                }
              }
            })
          });
        });
      });

      return
    }))
  })
}

// exports.onCreateBabelConfig = ({ actions}) => {
//   actions.setBabelPlugin({
//     name: `@babel/plugin-transform-regenerator`,
//   })
// }