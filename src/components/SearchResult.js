import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { navigateTo } from "gatsby-link";
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import withRoot from '../withRoot';

import { trackClick} from "./Search/tracking";

const styles = theme => ({
  card: {
    marginBottom: theme.spacing.unit,
    cursor: 'pointer',
    boxShadow: `0 0 1px 1px #EBE5FF`,
  }
});

class SearchResult extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick(){
        const { trackClick, resultType, id, toLink, title,  listIndex} = this.props;
        trackClick('card_item', resultType, id, title, listIndex);
        navigateTo(toLink);
    }

    render() {
        const {classes, title} = this.props;
        let key = title
        if (this.props.key) {
            key = this.props.key
        }

        let subtitle = null;
        if (this.props.subtitle){
            subtitle = this.props.subtitle;
        }

        return (
            <Card className={classes.card} onClick={this.onClick} >
                <CardContent>
                    <Typography variant="body1" component="h1">
                        {title}
                    </Typography>
                    <Typography variant="caption">
                        {subtitle}
                    </Typography>
                </CardContent>
            </Card>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        trackClick: (click_type, resultType, id, title, listIndex) => {
            dispatch(trackClick(click_type, resultType, id, title, listIndex));
        }
    }
}

const mapStateToProps = function (state, ownProps) {
    return {
        ...ownProps
    };
};

const ConnSearchResult = connect(
    mapStateToProps,
    mapDispatchToProps
)(withRoot(withStyles(styles)(SearchResult)));

export default ConnSearchResult;