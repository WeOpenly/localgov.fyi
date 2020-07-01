import React, {Fragment} from 'react';
import {connect} from "react-redux";

import Helmet from "react-helmet";

import CircularProgress from '@material-ui/core/CircularProgress';
import {withStyles} from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import withRoot from '../withRoot';

import IndexHero from '../components/IndexPage/Hero';

import Footer from '../components/Footer';
import { fetchAreaGuess } from "../components/IndexPage/actions";

import {trackView, trackClick} from "../components/common/tracking";
import FooterNew from '../components/FooterNew';

import styles from "../components/spectre.min.module.css";
import iconStyles from "../components/typicons.min.module.css";


import { navigate } from 'gatsby-link'
import Layout from '../layout'

function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

export default function Contact() {
  const [state, setState] = React.useState({})

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...state,
      }),
    })
      .then(() => navigate(form.getAttribute('action')))
      .catch((error) => alert(error))
  }


class GIndex extends React.Component {
  constructor(props) {
    super(props);
  }


  componentDidMount() {
    const {dispatch} = this.props;

    if (this.props.location.pathname === '/') {
      dispatch(trackView('index', null, null, null));
    }
    dispatch(fetchAreaGuess())
  }


  render() {
    const { classes, appReady } = this.props;

    return (
      <Fragment>
        <Helmet
          defaultTitle={`Papergov: Find All Government Services in a Single Place`}
          titleTemplate={`%s | Papergov`}
        >
          <meta name="og:type" content="website" />
          <meta
            name="description"
            content={`Search and get notfied when you're due for local government services like payments of utility bill, property tax, parking citation & renewing business licence`}
          />
          <meta
            property="og:site_name"
            content={`Find All Government Services in a Single Place`}
          />

          <link
            rel="canonical"
            href={`https://papergov.com${this.props.location.pathname}`}
          />
          <meta
            property="og:url"
            content={`https://papergov.com${this.props.location.pathname}`}
          />
          <html lang="en" />
        </Helmet>
        <div
          className={`${styles.container}`}
          style={{ background: "#f8f9fc" }}
        >
          <div className={`${styles.columns} `}>
            <div
              className={`${styles.column} ${styles.col12}`}
              style={{
                padding: "1.5rem"
              }}
            >
              <IndexHero
                isMobile={this.props.isMobile}
                appReady={appReady}
                location={this.props.location}
              />
            </div>      
           <div>
             return (
    <Layout>
      <h1>Contact</h1>
      <form
        name="contact"
        method="post"
        action="/thanks/"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
      >
        {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
        <input type="hidden" name="form-name" value="contact" />
        <p hidden>
          <label>
            Don’t fill this out: <input name="bot-field" onChange={handleChange} />
          </label>
        </p>
        <p>
          <label>
            Your name:
            <br />
            <input type="text" name="name" onChange={handleChange} />
          </label>
        </p>
        <p>
          <label>
            Your email:
            <br />
            <input type="email" name="email" onChange={handleChange} />
          </label>
        </p>
        <p>
          <label>
            Message:
            <br />
            <textarea name="message" onChange={handleChange} />
          </label>
        </p>
        <p>
          <button type="submit">Send</button>
        </p>
      </form>
    </Layout>
  )
}

           </div>
    
          </div>

          <FooterNew />
        </div>
      </Fragment>
    );
  }
}


const mapStateToProps = function (state, ownProps) {
  return {
    ...state.indexPage,
    ...ownProps
  };
};

const GlobalIndex = connect(mapStateToProps)(Index);

export default GlobalIndex;
