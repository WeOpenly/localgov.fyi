import React, { Component } from "react";

import { connect } from "react-redux";

import CircularProgress from '@material-ui/core/CircularProgress';;

import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';

import SearchResult from "./SearchResult";

import withRoot from '../withRoot';

const styles = theme => ({
    search_res_root: {
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
search_res_searchResults : {
        paddingTop: theme.spacing.unit * 3
    },
search_res_errorMsgContainer : {
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
search_res_errorText : {},
search_res_errorStateIcon : {
        fontSize: 64
    }
});

class SearchResults extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        const { search, classes } = this.props;
        const { searchResults } = search;

        const searchResultCards = []

        searchResults.map((result, index) => {
           
            if (result) {
                const entityResultCards = result.suggestions.map((entResult, index) => {
                    const org_id = entResult.id;
                    const type = entResult.type;

                    return (<SearchResult key={org_id} toLink={`/${type}/${org_id}`} title={entResult.head} subtitle={type}/>
                    );
                });
                if (entityResultCards.length > 0){
searchResultCards.push(entityResultCards)
                }
            }
        });
      
        return <Grid container spacing={8}>
            <Grid item xs={12} sm={12}>
            {searchResultCards}
            </Grid>
        </Grid>;
    }
}

const mapStateToProps = function (state, ownProps) {
    return {
        ...state
    };
};

export default connect(mapStateToProps)(withStyles(styles)(SearchResults));
