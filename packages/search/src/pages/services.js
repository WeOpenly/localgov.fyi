import React, {Component, Fragment} from 'react';
import Link from 'gatsby-link';
import {navigate} from '@reach/router';
import {graphql} from "gatsby";

import {connect} from "react-redux";
import Helmet from "react-helmet";
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import AnchorLink from 'react-anchor-link-smooth-scroll'
import NavSearch from '../components/Nav/Search';
import Typography from '@material-ui/core/Typography';
import withRoot from '../withRoot';
import Footer from '../components/Footer';
import HeaderWithSearch from '../components/HeaderWithSearch';
import {trackView, trackClick} from "../components/common/tracking";

const styles = theme => ({
    ser_list_heading: {
        marginTop: theme.spacing.unit *8,
        marginBottom: theme.spacing.unit * 5
    },
    ser_list_container: {
        display: 'flex',
        padding: theme.spacing.unit,
        '@media only screen and (max-width: 768px)': {
            flexDirection: 'column'
        }
    },
    ser_list_cat_item: {
        display: 'flex',
        width: theme.spacing.unit *20,
        padding: theme.spacing.unit,
        '@media only screen and (max-width: 768px)': {
            width: '33%'
        }
    },
    ser_list_cat_list_container: {
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing.unit,
        '@media only screen and (max-width: 768px)': {
            flexDirection: 'row',
            flexWrap: 'wrap'
        }
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
            height: '3px',
            width: '100%',
            background: `linear-gradient(bottom, #AB93FF 0%, #5627FF 55%,transparent 60%, transparent 100%)`
        },
        '@media only screen and (max-width: 768px)': {
            '&:hover': {
                color: '#fff',
                background: theme.palette.primary['700']
            }
        }
    },
    ser_list_service_card_container: {
        display: 'flex',
        flexWrap: 'wrap',
        padding: theme.spacing.unit
    },
    ser_list_footer: {
        width: '100%',
        borderTop: `1px solid #dcdcdc`,
        paddingTop: theme.spacing.unit,
        marginTop: theme.spacing.unit * 6
    }
});

const LiteSerTemplate = (props) => {
    return (
        
        <a
            style={{
            cursor: 'pointer',
            width: '240px',
            display: 'flex',
            flexDirection: 'column',
            margin: 16,
            textDecoration: 'none',
            borderTop: `2px solid #AB93FF`,
            boxShadow: '0px 3px 5px 0px rgba(0,0,0,0.1),0px 1px 1px 0px rgba(0,0,0,0.07),0px 2px 6px 1px rgba(0,0,0,0.06)'
        }}
            href={`/services/${props.slug}`}>
            <CardContent>
                <Typography variant="body2" gutterBottom>
                    {props.name}
                </Typography>
                <Typography variant="caption">
                    {`Offered in ${props.org_count} locations`}
                </Typography>
            </CardContent>
        </a>
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
                    margin: 16,
                    width: '100%',
                    '@media only screen and (max-width: 768px)': {
                        alignItems: 'center'
                    }
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
                        style={{
                        textDecoration: 'none'
                    }}
                        offset='48'
                        href={`#${cat}`}>
                        <Typography className={classes.set_list_link_anchor} variant="body1">{cat}
                        </Typography>
                    </AnchorLink>
                </div>
            );
        }

        return (
          <Fragment>
            <Helmet>
              <title>{`Services | Evergov`}</title>

              <link rel="canonical" href={`https://evergov.com/services/`} />
              <meta property="og:title" content={`Services | Evergov`} />
              <meta
                property="og:url"
                content={`https://evergov.com/services/`}
              />

              <meta name="description" content={`Services on Evergov`} />

              <meta property="og:description" content={`Services on Evergov`} />
            </Helmet>
            <NavSearch />
            <Grid container>
              <Grid item xs={1} sm={4} />
              <Grid
                className={classes.ser_list_heading}
                item
                xs={10}
                sm={4}
                align="center"
              >
                <Typography variant="display1">Services on Evergov</Typography>
              </Grid>
              <Grid item xs={1} sm={4} />
            </Grid>
            <Grid container>
              <Grid item xs="auto" sm={1} />
              <Grid
                className={classes.ser_list_container}
                item
                xs={12}
                sm={10}
                align="left"
              >
                <div className={classes.ser_list_cat_list_container}>
                  {catComponents}
                </div>
                <div className={classes.ser_list_service_card_container}>
                  {serComponents}
                </div>
              </Grid>
              <Grid item xs="auto" sm={1} />
            </Grid>
            <div className={classes.ser_list_footer}>
              <Footer page={this.props.location.pathname} />
            </div>
          </Fragment>
        );
    }
}

export const query = graphql `query servicesQuery {services : allServiceGlossaryJson {
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