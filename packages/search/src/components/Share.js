import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ShareIcon from '@material-ui/icons/Share';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        textAlign: 'center',
        paddingTop: theme.spacing.unit * 20
    },
    floatingButton: {
        color: theme.palette.common.white,
        background: theme.palette.primary['700'],
        position: 'fixed',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
        zIndex: 1
    },
    dialogContainer: {
        padding: theme.spacing.unit *2
    }

});

class Share extends React.Component {
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
        const {classes} = this.props;
        const {open} = this.state;
        const windowGlobal = typeof window !== 'undefined' && window
        return (
            <div className={classes.root}>
                <Dialog open={open} onClose={this.handleClose}>
                    <Grid container spacing={32} className={classes.dialogContainer}>
                        <Grid item xs={12} align="center">
                            <Typography variant="subheading" align="center" gutterBottom>
                                COPY LINK TO SHARE
                            </Typography>
                        </Grid>
                        <Grid item xs={12} align="center">
                            <Typography variant="body2" component="code" align="center" gutterBottom>
                                {windowGlobal
                                    ? windowGlobal.location.href
                                    : ''}
                            </Typography>
                            <br/>
                        </Grid>
                        <Grid item xs={12} align="center">
                            <Grid container spacing={16}>
                                <Grid item xs={5}/>
                                <Grid item xs={1}>
                                    {/* <FacebookShareButton style={{}} url={window.location.href}>
                                        <FacebookIcon size={32} round/>
                                    </FacebookShareButton> */}
                                </Grid>
                                <Grid item xs={1}>
                                    {/* <TwitterShareButton url={window.location.href}>
                                        <TwitterIcon size={32} round/>
                                    </TwitterShareButton> */}
                                </Grid>
                                <Grid item xs={5}/>
                            </Grid>
                            <Grid container>
                                <Grid item xs={5}/>
                                <Grid item xs={2}>
                                    <Button onClick={this.handleClose} variant="contained" aria-label="close">
                                        Close
                                    </Button>

                                </Grid>
                                <Grid item xs={5}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Dialog>

                <Button
                    variant="fab"
                    color="default"
                    aria-label="share"
                    className={classes.floatingButton}
                    onClick={this.handleClick}>
                    <ShareIcon/>
                </Button>
            </div>
        );
    }
}

Share.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Share);
