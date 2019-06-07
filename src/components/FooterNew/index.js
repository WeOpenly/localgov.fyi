import React, { Component } from "react";

import _ from "lodash";

import { isMobileOnly } from 'react-device-detect';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import FooterSocial from './social';
import FooterDiscover from './discover';
import FooterSupport from './support';

const styles = theme => ({
    new_footer:{
        display: 'flex',
        flexDirection: 'column',
        marginTop: theme.spacing.unit,
    },
    new_footer_links:{
        display: 'flex',
        justifyContent: 'space-around'
    },
    new_footer_links_mob:{
        display: 'flex',
        justifyContent: 'space-around',
        textAlign: 'center',
    },
    new_footer_copyright:{
        padding: theme.spacing.unit,
        display: 'flex',
        marginBottom: theme.spacing.unit *2,
        justifyContent: 'center',
    }
});


class FooterNew extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMob: false,
        }
    }

    componentDidMount() {
        this.setState({ isMob: isMobileOnly });
    }

    render() {
        const { classes } = this.props;
        const date = new Date().getFullYear();
        return (
            <div className={classes.new_footer}>
                <div className={this.state.isMob ? classes.new_footer_links_mob : classes.new_footer_links}>
                    <FooterSocial />
                    <FooterDiscover />
                    <FooterSupport />
                </div>
                <div className={classes.new_footer_copyright}>
                    <Typography variant="caption">
                        © {date}, Openly Technologies, Inc.
                    </Typography>
         
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(FooterNew);
