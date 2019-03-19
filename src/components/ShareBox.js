import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';

import InsertLink from '@material-ui/icons/InsertLink';
import DoneAll from '@material-ui/icons/DoneAll';
import {withStyles} from '@material-ui/core/styles';
import {Twitter, Facebook} from 'react-social-sharing';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Tooltip from '@material-ui/core/Tooltip';

import HighFive from '../svgIcons/highFive';

const styles = theme => ({
    share_box_root: {
        textAlign: 'center',
        padding: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 3,
        display: 'flex',
        flexDirection: 'column'
    },
    share_box_title:{
        color: '#fff',
        padding: theme.spacing.unit/2,
    },
    share_box_hero:{
        textAlign: 'center',
        padding: theme.spacing.unit * 2,
        display: 'flex',
        flexDirection: 'column'
    },
    share_box_share_icons:{
        display: 'flex',
        justifyContent: 'center',
    },
    share_box_button:{
        minWidth: '32px',
        height: '32px',
        margin: theme.spacing.unit,
        boxShadow: '0px 3px 5px 0px rgba(0,0,0,0.1),0px 1px 1px 0px rgba(0,0,0,0.07),0px 2px 6px 1px rgba(0,0,0,0.06)'
    },
    share_box_tt:{
        maxHeight: theme.spacing.unit *3,
    }
});

class ShareBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            copied: false,
        }
    }

    onLinkCopy = () => {
        this.setState({
            copied: !this.state.copied,
        })
    }

    render() {
        const {classes, title, messageToShare} = this.props;
        const fbShareMessage = `${messageToShare} @evergov`;
        const twitterShareMessage = `${messageToShare} @myevergov`;
      
        const windowGlobal = typeof window !== 'undefined' && window
        let linkToShare = '';

        if (windowGlobal) {
            linkToShare = windowGlobal.location.href
        }
        
        const linkMsg = `${messageToShare} ${linkToShare}`;

        return (
            <div className={classes.share_box_root}>
                <div className={classes.share_box_hero}>
                    <div className={classes.share_box_img}>
                        <HighFive style={{fontSize: "48px"}} />
                    </div>
                    <div className={classes.share_box_title_container}>
                        <Typography variant="title" className={classes.share_box_title}>
                            Share with your friends
                        </Typography>
                        <Typography variant="caption" className={classes.share_box_title}>
                            {title}
                        </Typography>
                    </div>
                </div>
                <div className={classes.share_box_share_icons}>
                    <Twitter style={{ boxShadow: '0px 3px 5px 0px rgba(0,0,0,0.1),0px 1px 1px 0px rgba(0,0,0,0.07),0px 2px 6px 1px rgba(0,0,0,0.06)'}}  IconCircleSolid small link={linkToShare} message={twitterShareMessage} />
                    <Facebook style={{ boxShadow: '0px 3px 5px 0px rgba(0,0,0,0.1),0px 1px 1px 0px rgba(0,0,0,0.07),0px 2px 6px 1px rgba(0,0,0,0.06)'}} IconCircleSolid small link={linkToShare} message={fbShareMessage}/>
                    <CopyToClipboard onCopy={this.onLinkCopy} text={linkMsg}>
                       {this.state.copied ? (<Button size="small" variant="contained" className={classes.share_box_button}>
                                <DoneAll style={{ fontSize: "26px" }} />
                        </Button>) : (<Button size="small" variant="contained" className={classes.share_box_button}>
                                <InsertLink style={{ fontSize: "26px" }} />
                        </Button>)}
                    </CopyToClipboard>
                </div>
            </div>
        );
    }
}

ShareBox.propTypes = {
    classes: PropTypes.object.isRequired,
    messageToShare: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
};

export default withStyles(styles)(ShareBox);
