import React, { Component } from 'react';
import {navigateTo} from "gatsby-link";

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import withRoot from '../withRoot';

import HorizontalListItem from './HorizontalListItem';

const styles = theme => ({
    card: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '98%',
        margin: 2,
    },
    cardMedia: {
        width: 80,
        height: 80,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: "50%",
        margin: theme.spacing.unit * 2,
        boxShadow: '0px 0px 2px 1px lightGray',
    },
});

class MemberListItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { item, classes } = this.props;
        let subheading = "";

        if (item.headline) {
            subheading = item.headline;
        } else if (item.post_label) {
            subheading = `${item.post_label}`;
        } else {
            subheading = 'Member';
        }

        const content = (
            <Card className={classes.card} onClick={() => navigateTo(`/member/${item.id}`)}>
                {item.image
                    ? <CardMedia className={classes.cardMedia} image={item.image} />
                    : <div className={classes.cardMedia}>
                        <Icon color="primary" style={{ fontSize: 64 }}>
                            person_outline
              </Icon>
                    </div>
                }
                <CardContent>
                    <Typography variant="heading">
                        {item.person_name}
                    </Typography>
                    <Typography variant="caption">
                        {subheading}
                    </Typography>
                </CardContent>
            </Card>
        );

        return (
            <HorizontalListItem item={content} />
        );
    }
}

export default withRoot(withStyles(styles)(MemberListItem));