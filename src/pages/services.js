import React, {Component, Fragment} from 'react';
import Link from 'gatsby-link';
import {navigate} from '@reach/router';

import {isMobileOnly} from 'react-device-detect';
import {connect} from "react-redux";

import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import AnchorLink from 'react-anchor-link-smooth-scroll'
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import {graphql} from "gatsby";
import withRoot from '../withRoot';
import HeaderWithSearch from '../components/HeaderWithSearch';
import ServiceTemplateCard from '../components/ServiceTemplateCard';
import {trackView, trackClick} from "../components/common/tracking";

const styles = theme => ({
    ser_list_heading: {
        marginTop: theme.spacing.unit *8,
        marginBottom: theme.spacing.unit * 5
    },
    ser_list_container: {
        display: 'flex',
        padding: theme.spacing.unit
    },
    ser_list_cat_item: {
        display: 'flex',
        width: theme.spacing.unit *20,
        padding: theme.spacing.unit
    },
    ser_list_cat_list_container: {
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing.unit
    },
    set_list_link_anchor: {
        textDecoration: 'none',
        color: '#5627FF',
        position: 'relative',
        '&:hover::after': {
            content: '""',
            position: 'absolute',
            bottom: '1px',
            left: 0,
            height: '2px',
            width: '100%',
            background: `linear-gradient(bottom, #5627FF 0%, #5627FF 40%, transparent 100%)`
        }
    },
    ser_list_service_card_container: {
        display: 'flex',
        flexWrap: 'wrap',
        padding: theme.spacing.unit
    }
});

const LiteSerTemplate = (props) => {
    return (
        <Card
            style={{
            cursor: 'pointer',
            width: '240px',
            display: 'flex',
            flexDirection: 'column',
            margin: 16,
            borderTop: `2px solid #AB93FF`,
            boxShadow: '0px 3px 5px 0px rgba(0,0,0,0.1),0px 1px 1px 0px rgba(0,0,0,0.07),0px 2px 6px 1px rgba(0,0,0,0.06)'
        }}
            onClick={() => navigate(`/services/${props.slug}`, {replace: true})}>
            <CardContent>
                <Typography variant="bosy2" gutterBottom>
                    {props.name}
                </Typography>
                <Typography variant="caption">
                    {`Offered in ${props.org_count} locations`}
                </Typography>
            </CardContent>
        </Card>
    )
}

class ServiceList extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this
            .props
            .trackView();
    }

    render() {
        const {classes} = this.props;
        let catGroupMap = {};

        this
            .props
            .data
            .services
            .edges
            .map((ser, idx) => {
                const {service_category_kind, orgs, service_name_slug, service_glossary_description, service_name} = ser.node;
                if (catGroupMap[service_category_kind]) {
                    const vals = catGroupMap[service_category_kind];
                    vals.push({org_count: orgs.length, service_name_slug: service_name_slug, service_glossary_description: service_glossary_description, service_name: service_name})
                    catGroupMap[service_category_kind] = vals;
                } else {
                    catGroupMap[service_category_kind] = [
                        {
                            org_count: orgs.length,
                            service_name_slug: service_name_slug,
                            service_glossary_description: service_glossary_description,
                            service_name: service_name
                        }
                    ]
                }
            });

        let sortedCatMap = [];
        for (const [cat,
            sers]of Object.entries(catGroupMap)) {
            sortedCatMap.push({cat: cat, sers: sers});
        }
        sortedCatMap.sort((a, b) => a.cat.localeCompare(b.cat))

        let serComponents = []
        let catComponents = []

        for (const sortedCat of sortedCatMap) {
            const {cat, sers} = sortedCat;
            let catSerComps = sers.map((ser, idx) => {
                const {service_name, service_name_slug, org_count} = ser;
                return <div>
                    <LiteSerTemplate
                        name={service_name}
                        slug={service_name_slug}
                        org_count={org_count}/>
                </div>
            });
            serComponents.push(
                <div
                    style={{
                    display: 'flex',
                    flexDirection: 'column',
                    margin: 16
                }}
                    id={`${cat}`}>
                    <Typography variant="subheading">
                        {cat}
                    </Typography>
                    <div
                        style={{
                        display: 'flex',
                        flexWrap: 'wrap'
                    }}>
                        {catSerComps}
                    </div>
                </div>
            )

            catComponents.push(
                <div className={classes.ser_list_cat_item}>
                    <AnchorLink
                        className={classes.set_list_link_anchor}
                        offset='48'
                        href={`#${cat}`}>{cat}</AnchorLink>
                </div>
            );
        }

        return (
            <Fragment>
                <HeaderWithSearch/>
                <Grid container>
                    <Grid item xs="auto" sm={4}/>
                    <Grid className={classes.ser_list_heading} item xs={4} align="center">
                        <Typography variant="display1">
                            Services on Evergov
                        </Typography>
                    </Grid>
                    <Grid item xs="auto" sm={4}/>
                </Grid>
                <Grid container>
                    <Grid item xs="auto" sm={1}/>
                    <Grid className={classes.ser_list_container} item xs={10} align="left">

                        <div className={classes.ser_list_cat_list_container}>
                            {catComponents}
                        </div>
                        <div className={classes.ser_list_service_card_container}>
                            {serComponents}
                        </div>

                    </Grid>
                    <Grid item xs="auto" sm={1}/>
                </Grid>
            </Fragment>
        );
    }
}

export const query = graphql ` query servicesQuery {services : allServiceGlossaryJson {
                        edges {
                            node {
                                id service_name service_name_slug service_glossary_description
                                service_category_kind
                                orgs {id}
                            }
                        }
                    }
}`;

const mapDispatchToProps = (dispatch) => {
    return {
        trackView: () => {
            dispatch(trackView('service_list', null, null, null));
        }
    }
}

const mapStateToProps = function (state, ownProps) {
    return {
        ...ownProps
    };
}

const ConnServiceList = connect(mapStateToProps, mapDispatchToProps)(withRoot(withStyles(styles)(ServiceList)));

export default ConnServiceList;