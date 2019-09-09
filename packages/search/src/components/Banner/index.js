import React, { Component } from "react";

import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DirectionsIcon from '@material-ui/icons/Close';

const styles = theme => ({
    banner: {
        position: 'fixed',
        display: 'flex',
        height: '104px',
        width: '100%',
        zIndex: '3000',
        backgroundColor: 'rgba(86, 39, 255, 0.8)',
        marginTop: theme.spacing.unit,

        right: 0,
        bottom: 0,
        justifyContent: 'center'
    },
    banner_content_container:{
        margin: theme.spacing.unit * 2,
        display: 'flex',
        width: '800px',
        justifyContent: 'center'
    },
    banner_content: {
        display: 'flex',
        
        alignItems: 'center',
        flex: '80'
    },
    banner_buttons:{
        display: 'flex',
        alignItems: 'center',
        margin: theme.spacing.unit,
        flexShrink: 0
    },
    banner_close:{
        cursor: 'pointer',
        position: 'absolute',
        right: '4px',
        top: '4px',
    }
});


class Banner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showing: true,
        }
        this.toggleShow = this.toggleShow.bind(this);
    }

    toggleShow(){
        this.setState({
            showing: !this.state.showing
        })
    }

    render() {
        const { classes, isMobile, title, button } = this.props;

        if (!this.state.showing){
            return null;
        }

        return (
            <div className={classes.banner}>
                <div className={classes.banner_content_container}>
                    <div onClick={this.toggleShow} className={classes.banner_close}>
                        <DirectionsIcon fontSize="small" />
                    </div>

                <div className={classes.banner_content}>
                    <div>
                        <Typography
                            style={{fontSize: '1.15rem', color: '#fff'}}
                            variant="display1">
                  Introducing QuickPay 
                    </Typography> 
                            <Typography
                                style={{ color: '#fff', paddingTop: '4px' }}
                                variant="caption">
                                Snap a picture of your ticket or bill & pay securely online in 30 seconds.
                             </Typography>
                    </div>

                 
                </div>
                <div className={classes.banner_buttons}>
                    <div>
                        <Button
                                size="small"
                                color="primary"
                            variant="contained"
                            aria-label="quick pay"
                            href="https://pay.evergov.com"
                                style={{ color: '#fff' }}
                        >
                            Try now   ⚡
        </Button>
                    </div>
                   
                </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Banner);
