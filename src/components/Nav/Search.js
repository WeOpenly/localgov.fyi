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


const SearchLoader = () => (
  <ContentLoader 
    height={30}
    width={600}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    <rect x="33" y="5" rx="3" ry="3" width="143" height="32" /> 
    <rect x="193" y="5" rx="3" ry="3" width="429" height="32" />
  </ContentLoader>
)

const styles = theme => ({
    header_search_cont: {
        display: 'flex',
        
    },
    header_search_cont_desk:{
        display: 'flex'
    },
    search_nav:{
        background: '#fff',
        minHeight: theme.spacing.unit * 6,
        boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.1),0px 1px 1px 0px rgba(0,0,0,0.07),0px 2px 6px 1px rgba(0,0,0,0.06)'
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
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: `${theme.spacing.unit}px ${theme.spacing.unit*2}px`,
    },
    search_header_app_name: {
        marginRight: theme.spacing.unit *4,
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
        let suggestionSection = (
          <div className={classes.header_search_cont_desk}>
            <SearchLoader />
          </div>
        );
 
        if (!areaGuessLoading && areaGuessResult){
            if(this.state.isMobileOnly){
                suggestionSection = (<div className={classes.header_search_cont}><MobileSuggestions inHeader={true} onSearch={this.onSearch} /></div> )
            }
            else{
                suggestionSection = (<Fragment>
                    <div className={classes.header_search_cont_desk}>
                        <AreaSuggestions inHeader={true} />
                        <SerSuggestions inHeader={true} onSearch={this.onSearch} />
                    </div>
                </Fragment>)
            }


        }

    
        return (
          <Grid container className={classes.search_nav}>
            <Grid item xs="auto" />
            <Grid
              item
              xs={12}
              sm={9}
              align="center"
              className={
                this.state.isMobileOnly
                  ? classes.search_header_nav_items_mob
                  : classes.search_header_nav_items
              }
            >
              <Typography variant="title">
                <Link to="/" className={classes.search_header_app_name}>
                  evergov
                </Link>
              </Typography>
              {suggestionSection}
            </Grid>
            <Grid item xs="auto" sm={3}  style={{'display': 'flex', justifyContent: 'flex-end'}}>
              {!this.state.isMobileOnly && (
                <HeaderAccountMenu location={location} />
              )}
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
