import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Helmet from "react-helmet";
import styles from "../components/spectre.min.module.css";
import iconStyles from "../components/typicons.min.module.css";
import ComboBox from "../components/ComboBox";

import { graphql } from "gatsby";

import FooterNew from "../components/FooterNew";

const windowGlobal = typeof window !== "undefined" && window;

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTemplate: "",
      serUrl: ""
    };
    this.selectTemplate = this.selectTemplate.bind(this);
    this.setSerUrl = this.setSerUrl.bind(this);
  }

  setSerUrl(ev) {
    this.setState({
      serUrl: ev.target.value
    });
  }

  selectTemplate(id) {
    this.setState({
      selectedTemplate: id
    });
  }

  render() {
    const { classes } = this.props;
    const { services } = this.props.data;
    const { edges } = services;

    return (
      <Fragment>
        <Helmet>
          <title>{`Papergov Widgets`}</title>
        </Helmet>
        <div className={`${styles.container} ${styles.gridXl}`}>
          <div className={`${styles.columns} `}>
            <div
              style={{
                background: "#5627ff",
                color: "#fff",
                padding: "5rem 5rem",
                marginBottom: "2rem"
              }}
              className={`${styles.column} ${styles.col12} ${styles.textCenter} ${styles.hero}`}
            >
              <div className={`${styles.columns} `}>
                <div className={`${styles.column} ${styles.col2}`}></div>
                <div className={`${styles.column} ${styles.col8}`}>
                  <h2>
                    Find out how you can start providing your users with an easy
                    to use government service search solution!
                  </h2>
                </div>

                <div className={`${styles.column} ${styles.col2}`}></div>
              </div>
            </div>

            <div className={`${styles.column} ${styles.col1}`}></div>
            <div
              style={{ margin: "2rem 0" }}
              className={`${styles.column} ${styles.col10}`}
            >
              <h3 style={{ color: "#0000ca" }}>Papergov Search Widget</h3>
              <p>
                Our Search Widget provides a simple way for your users to
                discover and act on all local government services on your site.
              </p>
            </div>
            <div className={`${styles.column} ${styles.col1}`}></div>

            <div className={`${styles.column} ${styles.col1}`}></div>
            <div
              style={{ margin: "4rem 0", padding: "1rem" }}
              className={`${styles.column} ${styles.col5}`}
            >
              <div>
                <b>How to use this widget?</b>
                <br />
                <br />
                <div>
                  Just copy and paste the following code snippet in the webpage
                  you want to embed the search bar & you are all set!
                </div>
              </div>
            </div>
            <div
              style={{ marginBottom: "1rem" }}
              className={`${styles.column} ${styles.col5}`}
            >
              <pre type="text" className={styles.code} data-lang="HTML">
                <code
                  dangerouslySetInnerHTML={{
                    __html: `<textarea style=" font-family: inherit; font-size: inherit; line-height: inherit; margin: 0; height: auto; -webkit-appearance: none; -moz-appearance: none; appearance: none; background: #fff; background-color: rgb(255, 255, 255); background-image: none; background-image: none; border: .05rem solid #bcc3ce; border-radius: .1rem; color: #3b4351; display: block; font-size: .8rem; height: 10.8rem; line-height: 1.2rem; max-width: 100%; outline: 0; padding: .25rem .4rem; position: relative; transition: background .2s,border .2s,box-shadow .2s,color .2s; width: 100%; "><div style="position: relative; overflow: hidden; padding-top: 56.25%; height: auto;"> <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; max-height: 320px; border: 0;" frameborder="0" gesture="media" allow="encrypted-media" sandbox="allow-forms allow-scripts allow-popups allow-top-navigation allow-same-origin" src="${process.env.EMBED_BACKEND}/dynamic/search" ></iframe> </div></textarea>`
                  }}
                />
              </pre>
            </div>
            <div className={`${styles.column} ${styles.col1}`}></div>

            <div className={`${styles.column} ${styles.col1}`}></div>
            <div
              style={{ margin: "3rem 0" }}
              className={`${styles.column} ${styles.col10}`}
            >
              <div className={styles.divider} data-content=""></div>
            </div>
            <div className={`${styles.column} ${styles.col1}`}></div>

            <div className={`${styles.column} ${styles.col1}`}></div>
            <div
              style={{ margin: "2rem 0" }}
              className={`${styles.column} ${styles.col10}`}
            >
              <h3 style={{ color: "#0000ca" }}>Papergov Service Widget</h3>
              <p>
                Give your users an easy way to take action on a given local
                government service or topic with this powerful widget.   
              </p>
            </div>
            <div className={`${styles.column} ${styles.col1}`}></div>

            <div className={`${styles.column} ${styles.col1}`}></div>
            <div
              style={{ marginBottom: "4rem", padding: "1rem" }}
              className={`${styles.column} ${styles.col5}`}
            >
              <div>
                <label className={styles.formLabel} for="input-example-1">
                  <b>How to use this widget?</b>
                  <br />

                  <ol>
                    <li>
                      Copy and paste the “url slug” of the service page you want
                      to embed.
                      <br />
                      For example, if you want to embed the service page whose
                      link is
                      “https://papergov.com/services/register-to-vote-ca/“ then
                      just paste the “register-to-vote-ca” in the field below
                    </li>
                    <li>
                      Just copy and paste the following code snippet in the
                      webpage you want to embed the search bar & you are all
                      set!
                    </li>
                  </ol>
                </label>
                <input
                  className={`${styles.formInput}`}
                  name="flex_service_name"
                  type="text"
                  placeholder="service slug"
                  onChange={this.setSerUrl}
                  value={this.state.serUrl || ""}
                />
                <span className={styles.textGray}>
                  eg: online-recreational-activityclass-registration-denver-co
                </span>
              </div>
            </div>
            <div
              style={{ marginBottom: "1rem" }}
              className={`${styles.column} ${styles.col5}`}
            >
              {this.state.serUrl ? (
                <pre type="text" className={styles.code} data-lang="HTML">
                  <code
                    dangerouslySetInnerHTML={{
                      __html: `<textarea style=" font-family: inherit; font-size: inherit; line-height: inherit; margin: 0; height: auto; -webkit-appearance: none; -moz-appearance: none; appearance: none; background: #fff; background-color: rgb(255, 255, 255); background-image: none; background-image: none; border: .05rem solid #bcc3ce; border-radius: .1rem; color: #3b4351; display: block; font-size: .8rem; height: 10.8rem; line-height: 1.2rem; max-width: 100%; outline: 0; padding: .25rem .4rem; position: relative; transition: background .2s,border .2s,box-shadow .2s,color .2s; width: 100%; "><div style="position: relative; overflow: hidden; padding-top: 56.25%; height: auto;"> <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; max-height: 320px; border: 0;" frameborder="0" gesture="media" sandbox="allow-forms allow-scripts allow-popups allow-top-navigation allow-same-origin" allow="encrypted-media" src="${process.env.EMBED_BACKEND}/services/${this.state.serUrl}" ></iframe> </div></textarea>`
                    }}
                  />
                </pre>
              ) : null}
            </div>
            <div className={`${styles.column} ${styles.col1}`}></div>
            <div className={`${styles.column} ${styles.col1}`}></div>
            <div
              style={{ margin: "3rem 0" }}
              className={`${styles.column} ${styles.col10}`}
            >
              <div className={styles.divider} data-content=""></div>
            </div>
            <div className={`${styles.column} ${styles.col1}`}></div>
            <div className={`${styles.column} ${styles.col1}`}></div>
            <div
              style={{ margin: "2rem 0" }}
              className={`${styles.column} ${styles.col10}`}
            >
              <h3 style={{ color: "#0000ca" }}>
                Papergov Service Category Widget
              </h3>
              <p>
                Our Service Category Widget is an extension of our service embed
                making any topic related to local government services
                actionable.
              </p>
            </div>
            <div className={`${styles.column} ${styles.col1}`}></div>

            <div className={`${styles.column} ${styles.col1}`}></div>
            <div
              style={{ marginBottom: "4rem", padding: "1rem" }}
              className={`${styles.column} ${styles.col5}`}
            >
              <div>
                <label className={styles.formLabel} for="input-example-1">
                  <b>How to use this widget?</b>
                  <br />
                  <br />
                  Just select a service from the list below & we will generate a
                  code snippet you can add to embed this widget on your website.
                </label>
                {edges ? (
                  <ComboBox
                    services={edges}
                    selectTemplate={this.selectTemplate}
                  />
                ) : null}
              </div>
            </div>
            <div
              style={{ marginBottom: "1rem" }}
              className={`${styles.column} ${styles.col5}`}
            >
              {this.state.selectedTemplate ? (
                <pre type="text" className={styles.code} data-lang="HTML">
                  <code
                    dangerouslySetInnerHTML={{
                      __html: `<textarea style=" font-family: inherit; font-size: inherit; line-height: inherit; margin: 0; height: auto; -webkit-appearance: none; -moz-appearance: none; appearance: none; background: #fff; background-color: rgb(255, 255, 255); background-image: none; background-image: none; border: .05rem solid #bcc3ce; border-radius: .1rem; color: #3b4351; display: block; font-size: .8rem; height: 10.8rem; line-height: 1.2rem; max-width: 100%; outline: 0; padding: .25rem .4rem; position: relative; transition: background .2s,border .2s,box-shadow .2s,color .2s; width: 100%; "><div style="position: relative; overflow: hidden; padding-top: 56.25%; height: auto;"> <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; max-height: 320px; border: 0;" frameborder="0" gesture="media" sandbox="allow-forms allow-scripts allow-popups allow-top-navigation allow-same-origin" allow="encrypted-media" src="${process.env.EMBED_BACKEND}/dynamic/ser_locations/?id=${this.state.selectedTemplate}" ></iframe> </div></textarea>`
                    }}
                  />
                </pre>
              ) : null}
            </div>
            <div className={`${styles.column} ${styles.col1}`}></div>
            <div className={`${styles.column} ${styles.col1}`}></div>
            <div
              style={{ margin: "3rem 0" }}
              className={`${styles.column} ${styles.col10}`}
            >
              <div className={styles.divider} data-content=""></div>
            </div>
            <div className={`${styles.column} ${styles.col1}`}></div>

            <div className={`${styles.column} ${styles.col1}`}></div>
            <div className={`${styles.column} ${styles.col10}`}>
              <FooterNew />
            </div>
            <div className={`${styles.column} ${styles.col1}`}></div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export const query = graphql`
  query servicesQuery {
    services: allServiceGlossaryJson {
      edges {
        node {
          id
          service_name
          service_name_slug
        }
      }
    }
  }
`;

export default Index;
