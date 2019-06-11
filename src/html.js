import React, {Fragment} from "react"

import PropTypes from "prop-types"

let fontStyleCss;
if (process.env.NODE_ENV === `production`) {
  try {
    fontStyleCss = require(`!raw-loader!../static/css/fonts.css`)
  } catch (e) {}
}

const JsonLd = ({data}) => <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
  __html: JSON.stringify(data)
}}/>;



// let GmapScript = () => (<Fragment></Fragment>)
// const windowGlobal = typeof window !== 'undefined' && window
// if (windowGlobal){
//   GmapScript =  () => (<Fragment>
//   <script>
//   {windowGlobal.myCallbackFunc = function () {
//       windowGlobal.initIndex && windowGlobal.initIndex()
//       windowGlobal.initTemplate && windowGlobal.initTemplate()
//   }}
//   </script>
//     <script async defer
//     src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBr4RixcEvuxgGr9EwNeiHCqUITczxvvuc&callback=initMapIndex&libraries=placescallback=myCallbackFunc" > </script> </Fragment>)
// }
      


let fontcss = null;
if (process.env.NODE_ENV === `production`) {
  fontcss = (<style
    id="gatsby-inlined-css-fonts"
    dangerouslySetInnerHTML={{
      __html: fontStyleCss
    }} />)
}

const searchLinksSchema = {
  "@context": "http://schema.org",
  "@type": "WebSite",
  "url": "https://evergov.com/",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://evergov.com/search/?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}

//     return (       <html {...this.props.htmlAttributes}>         <head> <meta
// charSet="UTF-8"/>           <meta name="google-site-verification" content=
// "uH1LpzdwISxquJSjjpqad8DL6vkOs_OVsdLLu8wNXSM" />           <meta
// name="msvalidate.01" content="D1BADF38847C730E9DC76BE0CCC4B42B" /> <meta
// name="yandex-verification" content="25711aadc401a373" /> <JsonLd
// data={searchLinksSchema} />           <meta name="description"
// content={`evergov.com - Search for local government organizations, and
// services`} />           <meta property="og:site_name" content={`evergov.com`}
// />           <meta property="twitter:card" name="twitter:card"
// content="summary_large_image" />           <meta property="twitter:site"
// name="twitter:site" content="@weopenly" /> <meta httpEquiv="x-ua-compatible"
// content="ie=edge" />           <meta      name="viewport"
// content="width=device-width, initial-scale=1, shrink-to-fit=no"           />
// <link href={'/css/fonts.css'} rel="stylesheet"/> {this.props.headComponents}
//      {css}           {/* {fontcss} */} </head>         <body
// {...this.props.bodyAttributes}> {this.props.preBodyComponents}           <div
//             key={`body`} id="___gatsby" dangerouslySetInnerHTML={{ __html:
// this.props.body }}           /> {this.props.postBodyComponents}     </body>
// </html>     )   } }

export default class HTML extends React.Component {
  render() {
    return (
      <html lang="en" {...this.props.htmlAttributes}>
        <head>
          <meta charSet="utf-8" />
          <meta
            name="google-site-verification"
            content="p3v6COYIhh8GXmPp7G12ZTegImSx88kJ8mmc-AAOPoc"
          />
          <meta
            name="msvalidate.01"
            content="D1BADF38847C730E9DC76BE0CCC4B42B"
          />
          <JsonLd data={searchLinksSchema} />
          <meta
            name="description"
            content={`Search and get notfied when you're due for local government services like payments of utility bill, property tax, parking citation & renewing business licence`}
          />
          <meta
            property="og:site_name"
            content={`Evergov: all your gov services in a single place`}
          />
          <meta
            property="twitter:card"
            name="twitter:card"
            content="summary_large_image"
          />
          <meta
            property="twitter:site"
            name="twitter:site"
            content="@myevergov"
          />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <script
            async
            defer
            src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBr4RixcEvuxgGr9EwNeiHCqUITczxvvuc&libraries=places&callback=allCallBacks"
          />
        
          {fontcss}
          {/* <link href={"/css/fonts.css"} rel="stylesheet" /> */}
          {this.props.headComponents}
        </head>
        <body {...this.props.bodyAttributes}>
          {this.props.preBodyComponents}
          <div
            key={`body`}
            id="___gatsby"
            dangerouslySetInnerHTML={{
              __html: this.props.body
            }}
          />{" "}
          {this.props.postBodyComponents}
        </body>
   
      </html>
    );
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
