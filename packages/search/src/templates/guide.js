import React from "react"
import { Helmet } from "react-helmet"
import { graphql } from "gatsby"
import SearchNav from "../components/Nav/Search";
import FooterNew from "../components/FooterNew";
import styles from "../components/spectre.min.module.css";

// import '../css/blog-post.css';

export default function guideTemplate({ pageContext}) {
  const {data} = pageContext;
  const { slug, title, html } = data
  
  console.log(pageContext,data)
  
  let hieLinks = null;

  hieLinks = (
    <ul
      itemScope
      itemType="https://schema.org/BreadcrumbList"
      className={styles.breadcrumb}
    >
      <li
        itemScope
        itemProp="itemListElement"
        itemType="https://schema.org/ListItem"
        className={styles.breadcrumbItem}
      >
        <a itemProp="item" itemType="https://schema.org/WebPage" href="/">
          {" "}
          <span itemProp="name">Home</span>
        </a>
        <meta itemProp="position" content="1" />
      </li>
      <li
        itemScope
        itemProp="itemListElement"
        itemType="https://schema.org/ListItem"
        className={styles.breadcrumbItem}
      >
        <a
          itemProp="item"
          itemType="https://schema.org/WebPage"
          href={`/how-to`}
        >
          <span itemProp="name">Guides</span>
        </a>
        <meta itemProp="position" content="2" />
      </li>
      
    </ul>
  )

  return (
   <div>
    <Helmet>
          <title>{`${title} | How-to Guides | papergov`}</title>

          <link rel="canonical" href={`https://papergov.com/${slug}/`} />
          <meta
            property="og:title"
            content={`${title} | How-to Guides | papergov`}
          />
          <meta
            property="og:url"
            content={`https://papergov.com/${slug}/`}
          />

            <meta
              name="description"
              content={`${title}`}
            />

          <meta
            name="keywords"
            content={`${title} `}
          />
          <meta
            property="og:description"
            content={`${title} | Papergov`}
          />
        </Helmet>
        <div
          className={`${styles.container}`}
          style={{ background: "#f8f9fc" }}
        >
          <div className={`${styles.columns} ${styles.hideMd}`}>
            <div
              className={`${styles.column} ${styles.col12}`}
              style={{ background: "#fff" }}
            >
              <SearchNav />
            </div>
           
            <div
              className={`${styles.column} ${styles.col8}`}
              style={{
                marginTop: "3rem",
                padding: "1.5rem",
                marginLeft: "10rem",
                background: "#fff",
                borderRadius: "0.8rem",
                boxShadow: "0 0 1px rgba(0,0,0,.08),0 2px 4px rgba(0,0,0,.03)"
              }}
            >
              
              <div className={styles.columns}>
          
                <div className={`${styles.column} ${styles.col12}`}>
                {hieLinks}
                 <div className="blog-post">
                    
                    <h1>{title}</h1>
                     <div className="blog-content"
                          dangerouslySetInnerHTML={{ __html: html }}
                     />
                     </div>

                  </div>
                </div>
             </div>
           </div>
          
          <div
            className={`${styles.columns} ${styles.showMd} ${styles.textCenter}`}
          >
            <div className={`${styles.column} ${styles.col12}`}>
              <SearchNav />
            </div>
            
            

            <div className={`${styles.column} ${styles.colMd12}`}>
              <div
                style={{
                  margin: "1rem 0.2rem",
                  padding: "2rem 0.5rem",
                  background: "#fff",
                  transition: "opacity .2s ease-in-out",
                  borderRadius: "0.8rem",
                  boxShadow: "0 0 1px rgba(0,0,0,.08),0 2px 4px rgba(0,0,0,.03)"
                }}
                className={styles.columns}
              >
                <div className={`${styles.column} ${styles.col12}`}>
                  {hieLinks}
                  <div className="blog-post">
                    <h1>{title}</h1>
                     <div className="blog-content"
                          dangerouslySetInnerHTML={{ __html: html }}
                     />
                     </div>
                  </div>
                </div>
            </div>
            </div>
          </div>
          <FooterNew />
        </div>
    
  )
}


