import React from 'react';
import PropTypes from 'prop-types';
import { navigateTo } from 'gatsby-link';
import { connect } from "react-redux";

import Spinner from 'react-spinkit';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

import NewSuggestBox from './NewSuggestBox';
import HeaderSuggestBox from './HeaderSuggestBox';
import withRoot from '../../withRoot';

import {fetchMeta, setMetaFromUrl,  toggleSearchResultLayout, fetchSearchResults} from "./actions";

const windowGlobal = typeof window !== 'undefined' && window

const styles = theme => ({
    gridList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)'
    }
});

class Search extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {dispatch} = this.props;
        const { pathname } = windowGlobal.location;
 
        if (pathname === '/') {
            dispatch(fetchMeta);
            // if (pathNameFragments[2] === 'search') {
            //     dispatch(setMetaFromUrl(pathNameFragments[1]));
            // } else { //overview
            //     dispatch(setMetaFromUrl(pathNameFragments[1]));
            // }
        } 
    }

    render() {
        const { classes, inHeader, searchText} = this.props;
        
        const {metaLoadingFailed, metaLoading, searchSuggestionsLoading} = this.props.search;

        if (metaLoading){
            return (<Spinner name="ball-beat" color="blue" />);
        }

        if (inHeader) {
            return (<HeaderSuggestBox searchText={searchText}/>);
        }

        return (<NewSuggestBox />);
    }
}

Search.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = function (state, ownProps) {
    return {
        ...state,
        ...ownProps
    };
};


export default connect(mapStateToProps)(withRoot(withStyles(styles)(Search)));