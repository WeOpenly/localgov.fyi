import React, {Fragment} from 'react';
import Img from "gatsby-image";;
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {isMobileOnly} from 'react-device-detect';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search'
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import withRoot from '../withRoot';

const styles = theme => ({
    headerLogo: {
        marginTop: theme.spacing.unit *3,
        marginBottom: theme.spacing.unit * 3
    },
    headerNav: {
        marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 3
    },  
    heroSectionLeft: {
        paddingTop: theme.spacing.unit * 16,
        marginBottom: theme.spacing.unit *4,
    },
    heroSectionRight: {},
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
'heroSectionLeft' : !isMobileOnly,
'heroSectionLeftMob' : isMobileOnly
        });
        const heroSectionRight = classNames({
'heroSectionRight' : !isMobileOnly,
'heroSectionRightMob' : isMobileOnly
        });
        const dashboardSectionLeft = classNames({
'dashboardSectionLeft' : !isMobileOnly,
'dashboardSectionLeftMob' : isMobileOnly
        });
        const dashboardSectionRight = classNames({
'dashboardSectionRight' : !isMobileOnly,
'dashboardSectionRightMob' : isMobileOnly
        });
        const trendsSectionLeft = classNames({
'trendsSectionLeft' : !isMobileOnly,
'trendsSectionLeftMob' : isMobileOnly
        });
        const trendsSectionRight = classNames({
'trendsSectionRight' : !isMobileOnly,
'trendsSectionRightMob' : isMobileOnly
        });

        return (
            <Grid container spacing={0}>
                {/* header section start */}
                <Grid item md={1}/>
                <Grid item xs={12} sm={12} md={2} className={classes.headerLogo}>
                    <Typography align="left" variant="title" component="span">
                        Openly
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={8} className={classes.headerNav}>
                    <span>
                        hello
                    </span>
                    <span>
                        hello2
                    </span>
                </Grid>
                <Grid item  md={1}/> {/* hero section end */}

                {/* hero section start */}

                <Grid xs={1} item sm={1} md={2} /> {!isMobileOnly
                    ? (
                        <Fragment>
                            <Grid item xs={10} sm={10} md={4} className={classes[heroSectionLeft]}>
                                <Typography align="left" variant="display1" component="h1" gutterBottom>
                                    Serve your citizen
                                </Typography>
                                <Typography align="left" variant="subheading" component="span">
                                    Starting a company is hard. Carta gets you on the right track without spending
                                    thousands in fees.
                                </Typography>
                            </Grid>
                            <Grid item md={1}/>
                            <Grid item xs={10} sm={3} className={classes[heroSectionRight]}>
                                <Img
                                    title="Spotlight"
                                    alt="Spotlight search"
                                    sizes={this.props.data.gal1.sizes}/>

                            </Grid>
                        </Fragment>
                    )
                    : (
                        <Fragment>
                            <Grid item xs={10} sm={6} className={classes[heroSectionLeft]}>
                                <Img
                                    title="Spotlight"
                                    alt="Spotlight search"
                                    sizes={this.props.data.gal1.sizes} />

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
                <br/>
                {/* trends section start */}

                <Grid item xs={1} sm={1} md={2} /> {!isMobileOnly
                    ? (
                        <Fragment>
                            <Grid item xs={10} sm={10} md={4} className={classes[heroSectionLeft]}>
                                <Typography align="left" variant="display1" component="h1" gutterBottom>
                                    Understand what your constituents are looking for
                                </Typography>
                                <Typography align="left" variant="subheading" component="span">
                                   Make it easy for them to access
                                </Typography>
                            </Grid>
                            <Grid item md={1} />
                            <Grid item xs={10} sm={3} className={classes[heroSectionRight]}>
                                <Img
                                    title="Spotlight"
                                    alt="Spotlight search"
                                    sizes={this.props.data.trends.sizes} />

                            </Grid>
                        </Fragment>
                    )
                    : (
                        <Fragment>
                            <Grid item xs={10} sm={6} className={classes[heroSectionLeft]}>
                                <Img
                                    title="Spotlight"
                                    alt="Spotlight search"
                                    sizes={this.props.data.gal1.sizes} />

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
                <Grid item item xs={1} sm={1} md={2} /> {/* trends section end */}

            </Grid>
        );
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired
};

export const query = graphql `
  query imagesQuery {
    gal1: imageSharp(id: { regex: "gal1.jpeg/" }) {
    sizes {
...GatsbyImageSharpSizes_tracedSVG
      }
    }
    gal2: imageSharp(id: { regex: "gal2.jpeg/"}) {
       sizes {
            ...GatsbyImageSharpSizes_tracedSVG
      }
    }
    gal3: imageSharp(id: { regex: "gal3.jpeg/"}) {
      sizes {
            ...GatsbyImageSharpSizes_tracedSVG
      }
    }
    gal4: imageSharp(id: { regex: "gal4.jpeg/"}) {
       sizes {
            ...GatsbyImageSharpSizes_tracedSVG
      }
    }
    trends: imageSharp(id: { regex: "trends.jpg/"}) {
      sizes {
            ...GatsbyImageSharpSizes_tracedSVG
      }
    }
  }
`

export default withRoot(withStyles(styles)(Index));
