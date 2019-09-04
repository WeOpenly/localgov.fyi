const path = require(`path`);
let activeEnv = "staging";

if (process.env.PROJECT_ID && process.env.PROJECT_ID === "evergov-prod") {
  activeEnv = "production";
}

const pt = __dirname + `/.env.${activeEnv}`;

require("dotenv").config({
  path: pt
});

module.exports = {
  siteMetadata: {
    title: `Evergov QuickPay: Lightning fast government service payments`,
    siteUrl: `https://pay.evergov.com`
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
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        stripMetadata: true,
        defaultQuality: 90
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `illus`,
        path: path.join(__dirname, `src/illus`)
      }
    },
    `gatsby-transformer-remark`,
    `gatsby-transformer-json`,
    {
      resolve: "gatsby-plugin-webpack-bundle-analyser-v2",
      options: {
        devMode: false
      }
    },
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: {
        prefixes: [`/dashboard/*`]
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
        policy: [{ userAgent: "*", disallow: [`*`] }]
      }
    },
    `gatsby-plugin-remove-serviceworker`,
    "gatsby-plugin-brotli",
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-netlify`
    // This plugin generates a service worker and AppShell html file so the site
    // works offline and is otherwise resistant to bad networks. Works with almost
    // any site!
  ]
};
