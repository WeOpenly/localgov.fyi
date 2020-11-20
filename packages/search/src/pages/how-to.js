import React, { Fragment } from "react"
import GuideLink from "../components/GuideLink"
import SearchNav from "../components/Nav/Search";
import FooterNew from "../components/FooterNew";
import styles from "../components/spectre.min.module.css";
import { render } from "react-dom";
import Helmet from "react-helmet";


const Posts = null; 

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
  
    const GuidesPage = ({
      data: {
        allMarkdownRemark: { edges },
          },
      }) => {
      const Posts = edges
        .filter(edge => !!edge.node.frontmatter.date) 
        .map(edge => <GuideLink key={edge.node.id} post={edge.node} />)


  return(
  <Fragment>

    <Helmet>
          <title>{`How-to Guides | papergov`}</title>
     

          <link rel="canonical" href={`https://papergov.com/how-to/`} />
          <meta
            property="og:title"
            content={`How-to Guides | papergov`}
          />
          <meta
            property="og:url"
            content={`https://papergov.com/how-to/`}
          />


            <meta
              name="description"
              content={`All How-to Online Guides about local government services on Papergov`}
            />


          <meta
            property="og:description"
            content={`All How-to Guides about local government services on Papergov`}
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
                 <div className={`${styles.column} ${styles.col12}`} >
                   <h3> Papergov How-to Guides  </h3>
                   <br></br>
                   <div> {Posts} </div>
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
                  <div className={`${styles.column} ${styles.col12}`} >
                   <h3> Papergov How-to Guides  </h3>
                   <br></br>
                   <div> {Posts} </div>
                  </div>
                 </div>
                </div>
              </div>
           </div>
          <FooterNew />
        </div>
      </Fragment>
      );
    }

export default GuidesPage;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___title] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            slug
            title
          }
        }
      }
    }
  }
`
