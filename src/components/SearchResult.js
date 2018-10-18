import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { navigateTo } from "gatsby-link";

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import withRoot from '../withRoot';

const styles = theme => ({
  search_result_card: {
    marginBottom: theme.spacing.unit,
    cursor: 'pointer',
    boxShadow: `0 0 1px 1px #EBE5FF`,
  }
});

class SearchResult extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {classes, title, toLink} = this.props;
        let key = title
        if (this.props.key) {
            key = this.props.key
        }

        let subtitle = null;
        if (this.props.subtitle){
            subtitle = this.props.subtitle;
        }

        return (
            <Card className={classes.search_result_card} onClick={() => navigateTo(toLink)} >
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

export default withStyles(styles)(SearchResult);