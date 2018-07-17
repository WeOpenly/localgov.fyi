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

    return (
      <html {...this.props.htmlAttributes}>
        <head>
          <meta charSet="UTF-8"/>

          <meta name="google-site-verification" content= "uH1LpzdwISxquJSjjpqad8DL6vkOs_OVsdLLu8wNXSM" />

          <meta property="og:site_name" content={`Localgov.fyi`} />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />

          {(process.env.NODE_ENV !== `production`) ? <link href={withPrefix('/css/fonts.css')} rel="stylesheet"/>  : null}

          {this.props.headComponents}
          {css}
          {fontcss}

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
