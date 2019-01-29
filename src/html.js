import React, {Fragment} from "react"

import PropTypes from "prop-types"



let fontStyleCss;
if (process.env.NODE_ENV === `production`) {   try {
fontStyleCss = require(`!raw-loader!../static/css/fonts.css`)   } catch (e)
{} }

const JsonLd = ({data}) => <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
  __html: JSON.stringify(data)
}}/>;




let fontcss     
if  (process.env.NODE_ENV === `production`) {      
   fontcss = (<style id="gatsby-inlined-css-fonts" dangerouslySetInnerHTML={{
__html: fontStyleCss }} />)
}

const searchLinksSchema = {
  "@context": "http://schema.org",
  "@type": "WebSite",
  "url": "https://localgov.fyi/",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://localgov.fyi/search/?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}

//     return (       <html {...this.props.htmlAttributes}>         <head>
//     <meta charSet="UTF-8"/>           <meta name="google-site-verification"
// content= "uH1LpzdwISxquJSjjpqad8DL6vkOs_OVsdLLu8wNXSM" />           <meta
// name="msvalidate.01" content="D1BADF38847C730E9DC76BE0CCC4B42B" />
// <meta name="yandex-verification" content="25711aadc401a373" />
// <JsonLd data={searchLinksSchema} />           <meta name="description"
// content={`Localgov.fyi - Search for local government organizations, and
// services`} />           <meta property="og:site_name"
// content={`Localgov.fyi`} />           <meta property="twitter:card"
// name="twitter:card" content="summary_large_image" />           <meta
// property="twitter:site" name="twitter:site" content="@weopenly" />
// <meta httpEquiv="x-ua-compatible" content="ie=edge" />           <meta
//      name="viewport"             content="width=device-width,
// initial-scale=1, shrink-to-fit=no"           />           <link
// href={'/css/fonts.css'} rel="stylesheet"/>
// {this.props.headComponents}           {css}           {/* {fontcss} */}
//   </head>         <body {...this.props.bodyAttributes}>
// {this.props.preBodyComponents}           <div             key={`body`}
//      id="___gatsby"             dangerouslySetInnerHTML={{ __html:
// this.props.body }}           />           {this.props.postBodyComponents}
//     </body>       </html>     )   } }

export default class HTML extends React.Component {
  render() {
    return (
      <html {...this.props.htmlAttributes}>
        <head>
          <meta charSet="utf-8"/>
      
          <meta
            name="google-site-verification"
            content="uH1LpzdwISxquJSjjpqad8DL6vkOs_OVsdLLu8wNXSM"/>
          <meta name="msvalidate.01" content="D1BADF38847C730E9DC76BE0CCC4B42B"/>
          <meta name="yandex-verification" content="25711aadc401a373"/>

          <JsonLd data={searchLinksSchema}/>
          <meta
            name="description"
            content={`Localgov.fyi - Search for local government organizations, and services`}/>
          <meta property="og:site_name" content={`Localgov.fyi`}/>
          <meta
            property="twitter:card"
            name="twitter:card"
            content="summary_large_image"/>
          <meta property="twitter:site" name="twitter:site" content="@weopenly"/>
          <meta httpEquiv="x-ua-compatible" content="ie=edge"/>
          
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
          {/* <link href={'/css/fonts.css'} rel="stylesheet"/>  */}

         
          {this.props.headComponents}
 
   
        </head>
        <body {...this.props.bodyAttributes}>
          {this.props.preBodyComponents}
          <div
            key={`body`}
            id="___gatsby"
            dangerouslySetInnerHTML={{
            __html: this.props.body
          }}/> {this.props.postBodyComponents}
          <link href={'/css/stripe.css'} rel="stylesheet" /> 
        </body>
        <style>
          {fontcss}
        </style>
      </html>
    )
  }
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array
}
