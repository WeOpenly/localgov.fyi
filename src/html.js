import React from "react"
import {withPrefix} from 'gatsby-link'

let stylesStr
if (process.env.NODE_ENV === `production`) {
  try {
    stylesStr = require(`!raw-loader!../public/styles.css`)
  } catch (e) {
  }
}

let fontStyleCss 
if (process.env.NODE_ENV === `production`) {
  try {
    fontStyleCss = require(`!raw-loader!../static/css/fonts.css`)
  } catch (e) {}
}

let iconStyleCss
if (process.env.NODE_ENV === `production`) {
  try {
    iconStyleCss = require(`!raw-loader!../static/css/ionicons.min.css`)
  } catch (e) { }
}



module.exports = class HTML extends React.Component {
  render() {
    let css
    if (process.env.NODE_ENV === `production`) {
      css = (
        <style
          id="gatsby-inlined-css"
          dangerouslySetInnerHTML={{ __html: stylesStr }}
        />
      )
    }

    let fontcss
    if (process.env.NODE_ENV === `production`) {
      fontcss = (
        <style
          id="gatsby-inlined-css-fonts"
          dangerouslySetInnerHTML={{ __html: fontStyleCss }}
        />
      )
    }

    let iconcss
    if (process.env.NODE_ENV === `production`) {
      iconcss = (
        <style
          id="gatsby-inlined-css-icons"
          dangerouslySetInnerHTML={{ __html: iconStyleCss }}
        />
      )
    }

    return (
      <html {...this.props.htmlAttributes}>
        <head>
          <meta charSet="UTF-8"/>
          <meta name="google-site-verification" content= "uH1LpzdwISxquJSjjpqad8DL6vkOs_OVsdLLu8wNXSM" />
          <meta name="description" content="Search for local government organizations, members, and services"/>
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />

          <script defer src="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyC1d6ej2p77--6Wf8m6dzdrbvKhfBnb3Ks&libraries=places" type="text/javascript"></script>

          {(process.env.NODE_ENV !== `production`) ? <link href={withPrefix('/css/fonts.css')} rel="stylesheet"/>  : null}
          {(process.env.NODE_ENV !== `production`) ? <link href={withPrefix('/css/ionicons.min.css')} rel="stylesheet" /> : null}

          {this.props.headComponents}
          {css}
          {fontcss}
          {iconStyleCss}
        </head>
        <body {...this.props.bodyAttributes}>
          {this.props.preBodyComponents}
          <div
            key={`body`}
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          {this.props.postBodyComponents}
        </body>
      </html>
    )
  }
}
