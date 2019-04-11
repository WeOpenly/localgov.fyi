import React, { Component } from 'react';
import { connect } from "react-redux";
import { isMobileOnly } from 'react-device-detect';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from 'gatsby-link';
import HeaderAccountMenu from '../HeaderAccountMenu';
import AreaSuggestions from '../IndexPage/AreaSuggestions'
import SerSuggestions from '../IndexPage/SerSuggestions'

import { fetchAreaGuess, executeSearch } from '../IndexPage/actions';
import { trackClick } from "../common/tracking";

const styles = theme => ({
    header_search_cont: {
        display: 'flex',

    },
    search_nav:{
        background: '#fff',
        boxShadow: '0px 3px 5px 0px rgba(0,0,0,0.1),0px 1px 1px 0px rgba(0,0,0,0.07),0px 2px 6px 1px rgba(0,0,0,0.06)'
    },
    index_hero_nav_items: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: theme.spacing.unit,
    },
    index_hero_app_name: {
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
    }

    componentDidMount() {
        this.setState({ isMobileOnly: isMobileOnly });
        this.props.fetchAreaGuess();
    }

    render() {
        const { classes, location } = this.props;

        return (
            <Grid container className={classes.search_nav}>
                <Grid item sm={1} />
                <Grid item sm={10} align="center" className={classes.index_hero_nav_items}>
                    <Typography
                        variant="title">
                        <Link
                            to="/"
                            className={classes.index_hero_app_name}>
                            evergov
                           </Link>
                    </Typography>
                    <div className={classes.header_search_cont}>
                        <AreaSuggestions inHeader={true} />
                        <SerSuggestions inHeader={true} onSearch={this.onSearch} />
                    </div>
                    <HeaderAccountMenu location={location} />
                </Grid>
                <Grid item sm={1} />
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
