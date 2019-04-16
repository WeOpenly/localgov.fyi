import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { isMobileOnly } from 'react-device-detect';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Grid from '@material-ui/core/Grid';
import Link from 'gatsby-link';
import HeaderAccountMenu from '../HeaderAccountMenu';
import AreaSuggestions from '../IndexPage/AreaSuggestions'
import SerSuggestions from '../IndexPage/SerSuggestions'
import MobileSuggestions from '../IndexPage/MobileSuggestions'

import { fetchAreaGuess, executeSearch } from '../IndexPage/actions';
import { trackClick } from "../common/tracking";
import ContentLoader from "react-content-loader"

const SuggestionBoxLoader = () => (
    <ContentLoader
        height={50}
        width={700}
        speed={100}
        primaryColor="#f3f3f3"
        secondaryColor="#d5d9f3"
    >
        <circle cx="27" cy="26" r="1" />
        <circle cx="46" cy="49" r="1" />
        <rect x="65" y="109" rx="0" ry="0" width="0" height="0" />
        <rect x="384" y="243" rx="0" ry="0" width="0" height="0" />
        <rect x="673" y="174" rx="0" ry="0" width="0" height="1" />
        <rect x="148" y="192" rx="0" ry="0" width="0" height="0" />
        <rect x="229" y="71" rx="0" ry="0" width="0" height="0" />
        <rect x="66" y="48" rx="0" ry="0" width="16" height="1" />
        <rect x="30" y="4" rx="0" ry="0" width="180" height="39" />
        <rect x="221" y="4" rx="0" ry="0" width="465" height="37" />
    </ContentLoader>
)


const styles = theme => ({
    header_search_cont: {
        display: 'flex',

    },
    search_nav:{
        background: '#fff',
        boxShadow: '0px 3px 5px 0px rgba(0,0,0,0.1),0px 1px 1px 0px rgba(0,0,0,0.07),0px 2px 6px 1px rgba(0,0,0,0.06)'
    },
    search_header_nav_items_mob:{
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: theme.spacing.unit,
    },
    search_header_nav_items: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: `${theme.spacing.unit}px ${theme.spacing.unit*2}px`,
    },
    search_header_app_name: {
        textDecoration: 'none',
        cursor: 'pointer',
        '&:hover': {
            color: theme.palette.primary['700'],
        }
    },
});


class SearchNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMobileOnly: false
        };
        this.onSearch = this.onSearch.bind(this);
    }

    componentDidMount() {
        this.setState({ isMobileOnly: isMobileOnly });
        this.props.fetchAreaGuess();
    }

    onSearch() {
        this.props.executeSearch()
    }

    render() {
        const { classes, location, areaGuessLoading, areaGuessResult } = this.props;
        let suggestionSection = null;

        if (!areaGuessLoading && areaGuessResult){
            suggestionSection = this.state.isMobileOnly ? (<div className={classes.header_search_cont}><MobileSuggestions inHeader={true} onSearch={this.onSearch} />    <HeaderAccountMenu location={location} /></div>) : (<Fragment><div className={classes.header_search_cont}>
                        <AreaSuggestions inHeader={true} />
                        <SerSuggestions inHeader={true} onSearch={this.onSearch} />
                    </div>
                        <HeaderAccountMenu location={location} />
                    </Fragment>
                    )
        }

    
        return (
            <Grid container className={classes.search_nav}>
                <Grid item xs="auto"  />
                <Grid item xs={12}  align="center" className={this.state.isMobileOnly ? classes.search_header_nav_items_mob: classes.search_header_nav_items}>
                    <Typography
                        variant="title">
                        <Link
                            to="/"
                            className={classes.search_header_app_name}>
                            evergov
                           </Link>
                    </Typography>
                    {suggestionSection}
                   
                </Grid>
                <Grid item xs="auto" />
            </Grid>
        );
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        trackClick: (click_type, resultType, id, title, listIndex) => {
            dispatch(trackClick(click_type, resultType, id, title, listIndex));
        },
        fetchAreaGuess: () => {
            dispatch(fetchAreaGuess())
        },
        executeSearch: () => {
            dispatch(executeSearch())
        }
    }
}

const mapStateToProps = function (state, ownProps) {
    return {
        ...state.indexPage,
        ...ownProps
    };
};

const ConnSearchNav = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SearchNav));

export default ConnSearchNav;
