import React, { Component } from "react";



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
        width: '800px',
        justifyContent: 'space-between',
        alignSelf: 'center',
    },
    new_footer_links_mob:{
        display: 'flex',
        justifyContent: 'space-between',
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
    }

    render() {
        const { classes, isMobile } = this.props;
        const date = new Date().getFullYear();

        return (
            <div className={classes.new_footer}>
                <div className={this.props.isMobile ? classes.new_footer_links_mob : classes.new_footer_links}>
                    <FooterSocial isMobile={isMobile}/>
                    <FooterDiscover isMobile={isMobile}/>
                    <FooterSupport isMobile={isMobile}/>
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
