import * as PropTypes from "prop-types"
import React from "react"
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import ContactDetails from '../components/ContactDetails';
import HorizontalListItem from '../components/HorizontalListItem';
import HorizontalList from '../components/HorizontalList';
import MemberListItem from '../components/MemberListItem';
import SearchResult from '../components/SearchResult';
import withRoot from '../withRoot';

const styles = theme => ({
    media: {
        width: 150,
        height: 150,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: "50%",
        margin: theme.spacing.unit * 2,
        boxShadow: '0px 0px 2px 1px lightGray'
    },
    mediaContainer: {
        borderRadius: 3,
        display: 'flex',
        boxShadow: `0 0 10px 5px ${theme.palette.primary["A200"]}`
    }
});

class MemberDetail extends React.Component {
    static propTypes = {
        data: PropTypes.shape({postsJson: PropTypes.object.isRequired})
    }

    componentDidMount() {
        const {org_id, id} = this.props;
        const eventParams = {
            event_type: 'overview_query',
            type: 'membership',
            org_id,
            id
        }

        // fire & forget
        const payloadParams = Object
            .keys(eventParams)
            .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(eventParams[k])}`)
            .join('&');

        fetch(`https://track.localgov.fyi/localgov.fyi/track.png?${payloadParams}`).then(function (data) {
            // pass
        }).catch(function (error) {
                // pass
            });
    }

    render() {
        const {classes} = this.props;
        const {
            contact_details,
            person_name,
            person_image,
            org_id,
            org_name,
            related_members
        } = this.props.pathContext.data;

        let relatedSection = null;
        const personOrg = (
            <Grid container spacing={8}>
                <Grid item xs={12}>
                    <Typography variant="subheading" gutterBottom>
                        Member of
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <SearchResult key={org_id} toLink={`/organization/${org_id}`} title={org_name}/>
                </Grid>
            </Grid>
        );

        if (related_members) {
            relatedSection = (
                <Grid container spacing={8}>
                    <Grid item xs={12}>
                        <Typography variant="subheading" gutterBottom>
                            Other members from {org_name}
                            &nbsp; ({related_members.length})
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <HorizontalList list={related_members} component={MemberListItem}/>
                    </Grid>
                </Grid>
            );
        }

        return (
            <Grid container spacing={0}>
                <Grid item xs={12} sm={12} md={7}>
                    <br/>
                    <Card className={classes.mediaContainer}>
                        {person_image
                            ? <CardMedia className={classes.media} image={person_image} title={person_name}/>
                            : <div className={classes.media}>
                                <Icon
                                    color="primary"
                                    style={{
                                    fontSize: 96
                                }}>
                                    person_outline
                                </Icon>
                            </div>}
                        <CardContent>
                            <Typography variant="headline">{person_name}</Typography>
                            <Typography variant="body1">Member</Typography>
                        </CardContent>
                    </Card>
                    <br/>
                    <div>{personOrg}</div>
                    <br/> {relatedSection}
                </Grid>
                <Grid tem xs={12} sm={12} md={1}/>
                <Grid item xs={12} sm={12} md={4}>
                    <br/>
                    <div>
                        {contact_details && <ContactDetails info={contact_details}/>}
                    </div>
                    <br/>
                </Grid>
            </Grid>
        )
    }
}

const Detail = withRoot(withStyles(styles)(MemberDetail));

export default Detail;