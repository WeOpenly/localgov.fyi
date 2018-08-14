import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { navigateTo } from "gatsby-link";
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia form '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import withRoot from '../withRoot';

import { trackClick} from "./Search/tracking";

const styles = theme => ({
  card: {
    maxWidth: 345
    marginBottom: theme.spacing.unit,
    cursor: 'pointer',
    boxShadow: `0 0 1px 1px #EBE5FF`,
  },
  media: {
    height: 0,
    paddingTop: '56.25',
  },
});

class SearchResult extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleDeliveryClick = this.handleDeliveryClick.bind(this);
    }

    handleClick() {
        const { trackClick, resultType, id, toLink, title,  listIndex} = this.props;
        trackClick('card_item', resultType, id, title, listIndex);
        navigateTo(toLink);
    }

    handleDeliveryClick() {
        const { trackClick, deliveryLink } = this.props;
        trackClick('external', 'service_delivery_link', deliveryLink.url, deliveryLink.link_name, 0);
        navigateTo(deliveryLink.url);
    }

    render() {
        const { classes, title, description, deliveryLink } = this.props;
        let key = title
        if (this.props.key) {
            key = this.props.key
        }

        let subtitle = '';
        if (description){
            subtitle = description;
        }

        return (
            <Card className={classes.card}>
                <CardMedia
                    image="https://via.placeholder.com/345x345"
                    className={classes.media}
                />
                <CardContent>
                    <Typography variant="body1" component="h1">
                        {title}
                    </Typography>
                    <Typography variant="caption">
                        {subtitle}
                    </Typography>
                </CardContent>
                <CardActions>
                    {(deliveryLink && deliveryLink.link_name) && <Button size="small" color="primary" onClick={this.handleDeliveryClick}>
                        {deliveryLink.link_name}
                    </Button>}
                    <Button size="small" color="primary" onClick={this.handleClick}>
                        More details
                    </Button>
                </CardActions>
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