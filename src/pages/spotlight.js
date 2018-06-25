import React, {Fragment} from 'react';
import Img from "gatsby-image";;
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search'
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

import {isMobileOnly} from 'react-device-detect';
import Animate from 'react-simple-animate';

import withRoot from '../withRoot';

const styles = theme => ({
    headerLogo: {
        marginTop: theme.spacing.unit *3,
        marginBottom: theme.spacing.unit * 3,
        color: theme.palette.primary['500'],
    },
    headerNav: {
        marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 3,
        display: 'flex',
        justifyContent: 'end',
        alignItems: 'flex-end'
    },
    trendsSectionLeft: {
        marginTop: theme.spacing.unit * 4
    },
    heroSectionLeft: {
        marginTop: theme.spacing.unit * 16,
        marginBottom: theme.spacing.unit *4
    },
    dashboardSection: {
        paddingtop: theme.spacing.unit * 2,
        background: theme.palette.primary['500']
    },
    trendsSectionLeft: {
        marginTop: theme.spacing.unit * 8,
        marginBottom: theme.spacing.unit * 4
    },
    trendsSectionLeftMob:{
        marginTop: theme.spacing.unit * 8,
        marginBottom: theme.spacing.unit * 4
    },
    trendsSectionleftHeader: {
        color: '#fff'
    },
    trendsSection: {
        paddingtop: theme.spacing.unit * 2,
        background: theme.palette.primary['400'],
        boxShadow: `0 0 10px 10px ${theme.palette.primary["50"]}`
    },
    heroSection: {
        background: '#fff',
        paddingBottom: theme.spacing.unit * 8
    },
    heroSectionRight: {
        marginTop: theme.spacing.unit * 8,
        marginBottom: theme.spacing.unit * 4
    },
    getInTouchSection: {
        paddingTop: theme.spacing.unit * 8,
        paddingBottom: theme.spacing.unit * 8,
        background: theme.palette.primary['400']
    },
    headerTitle: {
        color: theme.palette.primary['500']
    },
    image: {
        boxShadow: `0 0 15px 10px ${theme.palette.primary["A400"]}`
    },
    heroLogo: {
        fontSize: theme.spacing.unit *8,
        color: theme.palette.primary["700"]
    }
});

class Index extends React.Component {
    state = {
        open: false
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleClick = () => {
        this.setState({open: true});
    };

    render() {
        const {classes, data} = this.props;
        console.log(data);

        const {open} = this.state;

        const heroSectionLeft = classNames({
            'heroSectionLeft': !isMobileOnly,
            'heroSectionLeftMob': isMobileOnly
        });
        const heroSectionRight = classNames({
            'heroSectionRight': !isMobileOnly,
            'heroSectionRightMob': isMobileOnly
        });
        const dashboardSectionLeft = classNames({
            'dashboardSectionLeft': !isMobileOnly,
            'dashboardSectionLeftMob': isMobileOnly
        });
        const dashboardSectionRight = classNames({
            'dashboardSectionRight': !isMobileOnly,
            'dashboardSectionRightMob': isMobileOnly
        });
        const trendsSectionLeft = classNames({
            'trendsSectionLeft': !isMobileOnly,
            'trendsSectionLeftMob': isMobileOnly
        });
        const trendsSectionRight = classNames({
            'trendsSectionRight': !isMobileOnly,
            'trendsSectionRightMob': isMobileOnly
        });
        console.log(this.props.data);
        return (
            <Grid container spacing={0}>
                {/* header section start */}
                <Grid item md={1}/>
                <Grid item xs={12} sm={12} md={2} className={classes.headerLogo}>
                    <Typography align="left" variant="headline" component="span">
                        Openly
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={8} className={classes.headerNav}>
                    <span>
                        about
                    </span>

                    <span>
                        privacy
                    </span>

                    <span>
                        terms of service
                    </span>
                </Grid>
                <Grid item md={1}/> {/* hero section end */}

                {/* hero section start */}
                <Grid container className={classes.heroSection} spacing={0}>
                    <Grid xs={1} item sm={1} md={2}/> {!isMobileOnly
                        ? (
                            <Fragment>
                                <Grid item xs={10} sm={10} md={4} className={classes[heroSectionLeft]}>
                                    <Typography
                                        className={classes.headerTitle}
                                        align="left"
                                        variant="display1"
                                        component="h1"
                                        gutterBottom>
                                        Serve your citizen
                                    </Typography>
                                    <Typography align="left" variant="caption" component="span">
                                        Starting a company is hard. Carta gets you on the right track without spending
                                        thousands in fees.
                                    </Typography>
                                </Grid>
                                <Grid item md={1}/>
                                <Grid item xs={10} sm={3} md={3} className={classes[heroSectionRight]}>
                                    <Animate
                                        startAnimation
                                        startStyle={{
                                        "transform": "translateY(700px)"
                                    }}
                                        endStyle={{
                                        "transform": "translateY(0px)"
                                    }}
                                        durationSeconds="0.5"
                                        easeType="easeInExpo">
                                        <Img
                                            title="Spotlight"
                                            className={classes.image}
                                            alt="Spotlight search"
                                            sizes={this.props.data.gal1.sizes}/>
                                    </Animate>
                                </Grid>
                            </Fragment>
                        )
                        : (
                            <Fragment>
                                <Grid item xs={10} sm={6} className={classes[heroSectionLeft]}>
                                    <Img
                                        title="Spotlight"
                                        alt="Spotlight search"
                                        sizes={this.props.data.gal1.sizes}/>

                                </Grid>
                                <Grid item xs={12} sm={4} className={classes[heroSectionRight]}>
                                    <Typography align="center" variant="display1" component="h1" gutterbottom>
                                        Serve your citizen
                                    </Typography>
                                    <Typography align="center" variant="subheading" component="span">
                                        Starting a company is hard. Carta gets you on the right track without spending
                                        thousands in fees.
                                    </Typography>
                                </Grid>
                            </Fragment>
                        )}
                    <Grid item xs={1} sm={1} md={2}/> {/* hero section end */}
                </Grid>

                {/* trends section start */}
                <Grid container className={classes.trendsSection} spacing={0}>
                    <Grid item xs={1} sm={1} md={1}/> {!isMobileOnly
                        ? (
                            <Fragment>
                                <Grid item xs={10} sm={10} md={4} className={classes[trendsSectionLeft]}>
                                    <Typography
                                        align="left"
                                        className={classes.trendsSectionleftHeader}
                                        variant="display1"
                                        component="h1"
                                        gutterBottom>
                                        Understand what your constituents are looking for
                                    </Typography>
                                    <Typography
                                        align="left"
                                        className={classes.trendsSectionleftHeader}
                                        variant="caption"
                                        component="span">
                                        Make it easy for them to access
                                    </Typography>
                                </Grid>
                                <Grid item md={1}/>
                                <Grid item xs={10} sm={10} md={6}>
                                    <Animate
                                        startAnimation
                                        startStyle={{
                                        "transform": "translateY(500px)"
                                    }}
                                        endStyle={{
                                        "transform": "translateY(0)"
                                    }}
                                        durationSeconds="0.5"
                                        easeType="linear">
                                        <Img
                                            title="Trends"
                                            alt="Spotlight Trends"
                                            sizes={this.props.data.trends.sizes}/>
                                    </Animate>

                                </Grid>
                            </Fragment>
                        )
                        : (
                            <Fragment>
                                <Grid item xs={10} sm={6} className={classes[heroSectionLeft]}>
                                    <Animate
                                        startAnimation
                                        startStyle={{
                                        "transform": "translateY(500px)"
                                    }}
                                        endStyle={{
                                        "transform": "translateY(0)"
                                    }}
                                        durationSeconds="0.5"
                                        easeType="linear">
                                        <Img title="Trends" alt="Spotlight Trends" sizes={this.props.data.gal1.sizes}/>
                                    </Animate>
                                </Grid>
                                <Grid item xs={12} sm={4} className={classes[heroSectionRight]}>
                                    <Typography align="center" variant="display1" component="h1" gutterbottom>
                                        Serve your citizen
                                    </Typography>
                                    <Typography align="center" variant="subheading" component="span">
                                        Starting a company is hard. Carta gets you on the right track without spending
                                        thousands in fees.
                                    </Typography>
                                </Grid>
                            </Fragment>
                        )}

                    <Grid item item xs={1} sm={1} md={0}/> {/* trends section end */}
                </Grid>

                {/* dashboard section start */}
                <Grid container className={classes.dashboardSection} spacing={0}>
                    {!isMobileOnly
                        ? (
                            <Fragment>
                                <Grid item xs={10} sm={10} md={6}>
                                    <Animate
                                        startAnimation
                                        startStyle={{
                                        "transform": "translateY(500px)"
                                    }}
                                        endStyle={{
                                        "transform": "translateY(0)"
                                    }}
                                        durationSeconds="0.5"
                                        easeType="linear">
                                        <Img
                                            title="Services"
                                            alt="Spotlight Services"
                                            sizes={this.props.data.services.sizes}/>
                                    </Animate>

                                </Grid>
                                <Grid item md={1}/>
                                <Grid item xs={10} sm={10} md={4} className={classes[trendsSectionLeft]}>
                                    <Typography
                                        align="right"
                                        className={classes.trendsSectionleftHeader}
                                        variant="display1"
                                        component="h1"
                                        gutterBottom>
                                        Service discovery made easy
                                    </Typography>
                                    <Typography
                                        align="right"
                                        className={classes.trendsSectionleftHeader}
                                        variant="caption"
                                        component="span">
                                        Make it easy for them to access
                                    </Typography>
                                </Grid>
                            </Fragment>
                        )
                        : (
                            <Fragment>
                                <Grid item xs={1}/>
                                <Grid item xs={10} sm={6} className={classes[heroSectionLeft]}>
                                    <Animate
                                        startAnimation
                                        startStyle={{
                                        "transform": "translateY(500px)"
                                    }}
                                        endStyle={{
                                        "transform": "translateY(0)"
                                    }}
                                        durationSeconds="0.5"
                                        easeType="linear">
                                        <Img title="Trends" alt="Spotlight Trends" sizes={this.props.data.gal1.sizes}/>
                                    </Animate>
                                </Grid>
                                <Grid item xs={12} sm={4} className={classes[heroSectionRight]}>
                                    <Typography align="center" variant="display1" component="h1" gutterbottom>
                                        Serve your citizen
                                    </Typography>
                                    <Typography align="center" variant="subheading" component="span">
                                        Starting a company is hard. Carta gets you on the right track without spending
                                        thousands in fees.
                                    </Typography>
                                </Grid>
                            </Fragment>
                        )}

                    <Grid item item xs={1} sm={1} md={0}/>
                </Grid>
                {/* dashboard section end */}

                {/* get in touch section start */}
                <Grid container className={classes.getInTouchSection} spacing={0}>

                    <Grid item md={1}/>
                    <Grid item xs={10} sm={10} md={4} className={classes.trendsSectionleftHeader}>
                        about
                        <br/>
                        privacy
                        <br/>
                        terms of service
                        <br/>
                    </Grid>
                    <Grid item md={1}/>
                    <Grid item xs={10} sm={10} md={5}>
                        <Typography
                            align="right"
                            variant="caption"
                            component="h1"
                            className={classes.trendsSectionleftHeader}
                            gutterBottom>
                            leave email here
                        </Typography>
                        <Typography
                            align="right"
                            variant="title"
                            component="h1"
                            className={classes.trendsSectionleftHeader}
                            gutterBottom>
                            Get in touch
                        </Typography>
                    </Grid>

                    <Grid item item xs={1} sm={1} md={0}/>
                </Grid>
                {/* dashboard section end */}
            </Grid>
        );
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired
};

export const query = graphql `
  query imagesQuery {
    gal1: imageSharp(id: { regex: "/gal1/" }) {
    sizes {
        ...GatsbyImageSharpSizes_tracedSVG
      }
    }
    services: imageSharp(id: { regex: "/services/"}) {
      sizes {
            ...GatsbyImageSharpSizes_tracedSVG
      }
    }
    gal3: imageSharp(id: { regex: "/gal3/"}) {
      sizes {
            ...GatsbyImageSharpSizes_tracedSVG
      }
    }
    gal4: imageSharp(id: { regex: "/gal4/"}) {
       sizes {
            ...GatsbyImageSharpSizes_tracedSVG
      }
    }
    trends: imageSharp(id: { regex: "/trends/"}) {
      sizes {
            ...GatsbyImageSharpSizes_tracedSVG
      }
    }
   
  }
`

export default withRoot(withStyles(styles)(Index));
