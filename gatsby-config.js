const path = require(`path`)
let activeEnv = 'staging'

if (process.env.PROJECT_ID && process.env.PROJECT_ID==='evergov-prod'){
  activeEnv ='production'
}

const pt = __dirname + `/.env.${activeEnv}`

require('dotenv').config({
  path : pt
});


module.exports = {
  siteMetadata: {
    title: `Evergov: Search for local government organizations, and services`,
    siteUrl: `https://evergov.com`
  },
  plugins: [
    /*
     * Gatsby's data processing layer begins with “source”
     * plugins.  You can source data nodes from anywhere but
     * most sites, like Gatsbygram, will include data from
     * the filesystem so we start here with
     * “gatsby-source-filesystem”.
     *
     * A site can have as many instances of
     * gatsby-source-filesystem as you need.  Each plugin
     * instance is configured with a root path where it then
     * recursively reads in files and adds them to the data
     * tree.
     */
    // `gatsby-plugin-react-next`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `orgs`,
        path: path.join(__dirname, `data/orgs`)
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `logos`,
        path: path.join(__dirname, `data/logos`)
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `illus`,
        path: path.join(__dirname, `data/illus`)
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `sers`,
        path: path.join(__dirname, `data/sers`)
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `all_locations`,
        path: path.join(__dirname, `data/all_locations`)
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `service_glossary`,
        path: path.join(__dirname, `data/service_glossary`)
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `logos`,
        path: path.join(__dirname, `data/logos`)
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `img`,
        path: path.join(__dirname, `src/images`)
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: path.join(__dirname, `tos`),
        name: "tos"
      }
    },
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }
            allSitePage(filter : {
              path: {
               nin : ["/404/","/dev-404-page/","/app/", "/app/profile/",  "/app/auth/callback/", "/app/auth/", "/deep_link/"],
        
              }
            }) {
              edges {
                
                node {

                  path

                }
              }
            }
        }`,
        serialize: ({ site, allSitePage }) =>
          allSitePage.edges.map(edge => {
            return {
              url: site.siteMetadata.siteUrl + edge.node.path,
              changefreq: `weekly`,
              priority: 0.9
            };
          })
      }
    },
    // This plugin transforms JSON file nodes.
    `gatsby-transformer-json`,
    // This plugin sets up the popular css-in-js library Glamor. It handles adding a
    // Babel plugin and webpack configuration as well as setting up optimized
    // server rendering and client re-hydration. This plugin takes your
    // configuration and generates a web manifest file so Gatsbygram can be added to
    // your homescreen on Android.
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: ` evergov`,
        short_name: `Evergov`,
        start_url: `/`,
        background_color: `#f7f7f7`,
        theme_color: `#0000ca`,
        display: `minimal-ui`,
        icon: "src/favicon.png"
      }
    },
    {
      resolve: "gatsby-plugin-webpack-bundle-analyser-v2",
      options: {
        devMode: true,
      },
    },
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: {
        prefixes: [`/search/*`, `/app/*`, `/deep_link/*`]
      }
    },
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        // Setting a color is optional.
        color: `#0000ca`,
        // Disable the loading spinner.
        showSpinner: false
      }
    },
    {
      resolve: `gatsby-plugin-favicon`,
      options: {
        logo: "./src/favicon.png",
        injectHTML: true,
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          coast: true,
          favicons: true,
          firefox: true,
          twitter: true,
          yandex: true,
          windows: true
        }
      }
    },
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        host: "https://evergov.com",
        sitemap: "https://evergov.com/sitemap.xml",
        policy: [{ userAgent: "*", disallow: [`/app/*`, `/deep_link/*`] }]
      }
    },
    `gatsby-plugin-remove-serviceworker`,
    'gatsby-plugin-brotli',
    `gatsby-plugin-react-helmet`,
    {
      resolve: 'gatsby-plugin-purgecss',
      options: {
        printRejected: true,
      }
    },
    `gatsby-plugin-netlify`
    // This plugin generates a service worker and AppShell html file so the site
    // works offline and is otherwise resistant to bad networks. Works with almost
    // any site!
  ]
};
