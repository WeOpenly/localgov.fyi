import React, {Component} from 'react';
import Link from 'gatsby-link';

import {withStyles} from '@material-ui/core/styles';
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
        const {searchQuery} = this.props;
        this.setState({
            searchQuery
        })
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
        }).then(() => this.setState({submitting: false, success: true})).catch(error => this.setState({submitting: false, failure: true}));

        e.preventDefault();
    }


    render() {
        const { classes, searchQuery} = this.props;

        const otherPlaces = {

        }

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
                        {`We couldn't find any results for your query ${searchQuery}`} 
                </Typography>
                </Grid>
                <Grid item xs='auto' sm={4} />

                <Grid item xs='auto' sm={4} />
                <Grid item xs={12} sm={4} >
                <Typography variant="caption">
{`We are constantly adding more cities and we can drop you a note when results for ${searchQuery} are available`}
                </Typography>
                </Grid>
                <Grid item xs='auto' sm={4} />
                <Grid item xs='auto' sm={4} />
                <Grid item xs={12} sm={4} >
                    <form
                        name="feedback"
                        onSubmit={this.handleSubmit}
                        data-netlify="true"
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
                </Grid>
                <Grid item xs='auto' sm={4} />
                <Grid item xs='auto' sm={4} />
                <Grid item xs={12} sm={4} >
                    <Divider className={classes.divider}/>
                    <Typography variant="caption" component="h1" className={classes.otherCitiesHeader}>
                        {`Here are some other cities you can checkout`}
                    </Typography>
                    <Grid container spacing={8}> 
                        <Grid item xs={4}>
                            <Link to="/terms/" className={classes.link}>
                                <Typography variant="caption">San Francisco</Typography>
                            </Link>
                            </Grid>
                        <Grid item xs={4}>
                           
                            <Link to="/terms/" className={classes.link}>
                                <Typography variant="caption">New York City</Typography>
                            </Link>
                            </Grid>
                        <Grid item xs={4}>
                            <Link to="/terms/" className={classes.link}>
                                <Typography variant="caption">Seattle</Typography>
                            </Link>
                            </Grid>
                    </Grid>
                </Grid>
                <Grid item xs='auto' sm={4} />
            </Grid>
        );
    }
}

export default withRoot(withStyles(styles)(NoResults));