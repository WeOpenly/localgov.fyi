const path = require(`path`)

module.exports = {
  siteMetadata: {
    title: `Search for local government organizations, members, and services`,
    siteUrl: `https://localgov.fyi`
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
    `gatsby-plugin-react-next`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: path.join(__dirname, `data`)
      }
    }, {
      resolve: `gatsby-plugin-sitemap`
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
        name: `Local Gov`,
        short_name: `localgov`,
        start_url: `/`,
        background_color: `#f7f7f7`,
        theme_color : `#0000ca`,
        display: `minimal-ui`
      }
    }, {
      resolve: `gatsby-plugin-create-client-paths`,
      options: {
      prefixes : [`/search/*`]
      }
    },
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        // Setting a color is optional.
        color: `#0000ca`,
        // Disable the loading spinner.
        showSpinner: false,
      },
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
          twitter: false,
          yandex: false,
          windows: true
        }
      }
    },
    `gatsby-plugin-robots-txt`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-netlify`,
    // This plugin generates a service worker and AppShell html file so the site
    // works offline and is otherwise resistant to bad networks. Works with almost
    // any site!
  ]
}
