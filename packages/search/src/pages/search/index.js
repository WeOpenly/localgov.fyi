import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import queryString from 'query-string'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import SearchResults from '../../components/SearchPage/Results';
import CommonNav from '../../components/Nav/Common';

import Footer from '../../components/Footer';

import withRoot from "../../withRoot";

import { trackView, trackEvent } from "../../components/common/tracking";
import {fetchSearchResults} from '../../components/SearchPage/actions.js';
import { navigate } from '@reach/router';
import FooterNew from '../../components/FooterNew';


import spStyles from "../../components/spectre.min.module.css";
const windowGlobal = typeof window !== 'undefined' && window

const styles = theme => ({
    "@global": {
        html: {
            WebkitFontSmoothing: "antialiased", // Antialiasing.
            MozOsxFontSmoothing: "grayscale", // Antialiasing.
            height: "100%"
        },
        body: {
            margin: 0,
            padding: 0,
            height: "100%",
            width: "100%",
            background: '#fff',
            overflowWrap: "break-word",
            overflowY: "scroll",
            overflowX: "hidden"
        },
        "body>div": {
            display: "block",
            height: "100%"
        },
        "body>div>div": {
            display: "block",
            height: "100%"
        },
    },
    search_page_search_results_container:{
        minHeight: '700px'
    },
    search_page_container:{

    },
    search_page_footer : {
        width: '100%',
        bottom: '0',
        borderTop: `1px solid #dcdcdc`,
        paddingTop: theme.spacing.unit,
        marginTop: theme.spacing.unit * 6
    }
});

class Search extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { search } = this.props.location;
        const {dispatch} = this.props;

        if (search) { 
            const values = queryString.parse(this.props.location.search);
            if (!values){
                if (windowGlobal){
                    windowGlobal.location.href = '/'
                }
            }
            const {lat, lng, service_template_id, service_text} = values;
            if (!lat || !lng){
                if (windowGlobal) {
                    windowGlobal.location.href = '/'
                }
            }
            dispatch(fetchSearchResults(lat, lng, service_template_id, service_text));
            dispatch(trackEvent('index_search_query', {
                lat,
                lng,
                service_template_id,
                service_text
            }));
        }
        else{
            if (windowGlobal) {
                windowGlobal.location.href = '/'
            }
        }

        dispatch(trackView('search', null, null, null));

    }

    render() {
        const {classes } = this.props;
        const { location } = this.props;

        return (
          <div
            className={`${spStyles.container}`}
            style={{ background: "#f8f9fc" }}
          >
            <div className={`${spStyles.columns} `}>
              <div className={`${spStyles.column} ${spStyles.col1}`}></div>
              <div className={`${spStyles.column} ${spStyles.col10}`}>
                <CommonNav location={location} />
              </div>
              <div className={`${spStyles.column} ${spStyles.col1}`}></div>
              <div className={`${spStyles.column} ${spStyles.col1}`}></div>
              <div className={`${spStyles.column} ${spStyles.col10}`}>
                <SearchResults location={this.props.location} />
              </div>
            </div>

            <div className={`${spStyles.column} ${spStyles.col1}`}></div>
            <FooterNew />
          </div>
        );
    }
}

Search.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = function (state, ownProps) {
    return {
        ...state.searchPage
    };
};

export default connect(mapStateToProps)(withRoot(withStyles(styles)(Search)));