import React, { Component } from 'react';
import Link, { navigateTo } from 'gatsby-link';
import { connect } from "react-redux";

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SentimentDissatisfied from '@material-ui/icons/SentimentDissatisfied';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import withRoot from '../withRoot';

import { trackView } from "./Search/tracking";

const styles = theme => ({
    wrapper: {
        position: 'relative',
    },
    icon: {
        fontSize: 48,
        color: theme.palette.primary['500'],
        marginBottom: theme.spacing.unit * 2,
    },
    paper: {
        position: 'absolute',
        top: -284,
        left: -230,
        height: 280,
        width: 332,
        paddingLeft: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 2,
        paddingTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 3,
        borderTop: `6px solid ${theme.palette.primary["500"]}`,
    },
    bootstrapInput: {
        borderRadius: 3,
        // backgroundColor: theme.palette.primary['50'],
        color: theme.palette.primary['200'],
        border: '1px solid #ced4da',
        padding: '10px 12px 12px 12px',
        marginTop: theme.spacing.unit,
        width: '300px',
        transition: theme.transitions.create(['border-color', 'box-shadow'])
    },
    button: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit,
    },
    afterSubmit: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    spinner: {
        color: theme.palette.primary['500'],
    },
    icon: {
        color: theme.palette.primary['100'],
        fontSize: 64,
        marginBottom: theme.spacing.unit * 2,
    },
    divider:{
        marginRight: theme.spacing.unit * 4,
        marginLeft: theme.spacing.unit * 4,
        marginBottom: theme.spacing.unit * 3,
    },
    otherCitiesHeader:{
        marginBottom: theme.spacing.unit * 1,
    }
});


const xah_randomize_array = ((arr) => {
    /* [ Fisher-Yates shuffle. can be used on array-like object
    Modify array inplace.
    http://xahlee.info/js/javascript_random_array.html
    version 2017-09-18
    ] */
    let i = arr.length - 1;
    let j;
    while (i >= 1) {
        // random element up to i, include i
        j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
        i--;
    }
    return arr;
});

const encode = (data) => {
    return Object.keys(data)
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
        .join("&");
}


class NoResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            searchQuery: '',
            submitting: false,
            success: false,
            failure: false
        };

        this.handleChange = this
            .handleChange
            .bind(this);
        this.handleSubmit = this
            .handleSubmit
            .bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    componentDidMount(){
        const { searchQuery, trackView} = this.props;
        this.setState({
            searchQuery
        })
        trackView();
    }

    handleSubmit(e) {
        let currentLoc = '';
        if (window.location && window.location.pathname) {
            currentLoc = window.location.pathname
        }

        this.setState({submitting: true});
        fetch("/", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: encode({ "form-name": "no-results", "path": currentLoc, "searchQuery": this.state.searchQuery, "email": this.state.email})
        })
        .then(() => {
            this.setState({ submitting: false, success: true });
            setTimeout(() => {navigateTo('/')}, 1000);
        })
        .catch(error => this.setState({submitting: false, failure: true}));

        e.preventDefault();
    }


    render() {
        const { classes, searchQuery } = this.props;
console.log(searchQuery);
        const otherPlaces = [{
            name: 'Atlanta',
            url : '/organization/910e5bde-1b39-4990-b4af-6e374e3df06d'
        },
    {
        name: 'San Francisco',
        url : '/organization/49ab4440-1176-4791-a7cf-1e27a756488d'
    },
    {
        name: 'Las Vegas',
        url : '/organization/ff101ead-22ab-4f46-97d1-07abdcc8e9fa'
    },
    {
        name: 'San Jose',
        url : '/organization/d3c866ec-13f3-41da-b6dc-a74a83d36ea7'
    },
    {
        name: 'San Mateo',
url : '/organization/64398076-1dd4-4c06-bba0-f46bf893b2ae'
    },
    {
        name: 'Los Angles',
        url : '/organization/206843c1-890c-435c-85d6-5e2350200c1e'
    },
    {
        name: 'Houston',
url : '/organization/f212a1f8-d95e-4448-a6c7-659a4aa88934'
    },
    {
        name: 'New York',
        url : '/organization/2c3e6f85-25ee-420d-a31b-25662e2e6a2e'
    },
    {
        name: 'Philadelphia',
    url : '/organization/c91151b6-d989-4163-ab1c-f8680ad6b9f5'
    },
    {
        name: 'Phoenix',
    url : '/organization/b26c8d4f-74b9-4a80-9723-d696089aea99'
    },
    {
        name: 'San Diego',
url : '/organization/1fcd5489-5736-432a-88c7-fb720b134044'
    },
    {
        name: 'Seattle',
url : '/organization/28d8e00d-ee9c-49d0-97d8-18c1bf3cc707'
    }
]
    const shuffledArray = xah_randomize_array(otherPlaces);

    const otherLinks = shuffledArray.slice(0,3).map((item, idx) => {
        return (
            <Grid item xs={4}>
                <Link to={item.url} className={classes.link}>
                    <Typography variant="caption">{item.name}</Typography>
                </Link>
            </Grid>
        )
    })

        return (
            <Grid container spacing={16} align="center" >
                <Grid item xs='auto' sm={4} />
                <Grid item xs={12} sm={4} >
                    <SentimentDissatisfied className={classes.icon} />
                </Grid>
                <Grid item xs='auto' sm={4} />


                <Grid item xs='auto' sm={4} />
                <Grid item xs={12} sm={4} >
                <Typography variant="title">
                        {`We couldn't find any results for your query '${searchQuery}'`} 
                </Typography>
                </Grid>
                <Grid item xs='auto' sm={4} />

                <Grid item xs='auto' sm={4} />
                <Grid item xs={12} sm={4} >
                <Typography variant="caption">
{`We are constantly adding more cities and we can drop you a note when results for '${searchQuery}' are available`}
                </Typography>
                </Grid>
                <Grid item xs='auto' sm={4} />
                <Grid item xs='auto' sm={4} />
                <Grid item xs={12} sm={4} >
                    <form
                        name="no-results"
                        onSubmit={this.handleSubmit}
                        data-netlify="true"
                        netlify="true"
                        netlify
                        data-netlify-honeypot="bot-field"
                    >
                        <label>
                            <input
                                name="email"
                                type="email"
                                placeholder="your@email.com"
                                value={this.state.email}
                                onChange={this.handleChange}
                                className={classes.bootstrapInput}
                            />
                        </label>
                        <br/>
                        <Button size="small" variant="outlined" type="submit" className={classes.button}>
                            Notify me
                        </Button>
                    </form>
                    {this.state.submitting && <Typography>Submitting...</Typography>}
                    {this.state.success && <Typography>Thanks! Redirecting home...</Typography>}
                </Grid>
                <Grid item xs='auto' sm={4} />
                <Grid item xs='auto' sm={4} />
                <Grid item xs={12} sm={4} >
                    <Divider className={classes.divider}/>
                    <Typography variant="caption" component="h1" className={classes.otherCitiesHeader}>
                        {`Here are some other cities you can checkout`}
                    </Typography>
                    <Grid container spacing={8}> 
                        {otherLinks}
                    </Grid>
                </Grid>
                <Grid item xs='auto' sm={4} />
            </Grid>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        trackView: () => {
            dispatch(trackView('no_search_results', null));
        }
    }
}

const mapStateToProps = function (state, ownProps) {
    return {
        ...ownProps
    };
};

const ConnNoResults = connect(
    mapStateToProps,
    mapDispatchToProps
)(withRoot(withStyles(styles)(NoResults)));

export default ConnNoResults;