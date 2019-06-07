import React, { Component } from "react";

import _ from "lodash";

import { isMobileOnly } from 'react-device-detect';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    more_links: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: theme.spacing.unit*3,
    },
    more_links_container: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    more_links_container_mob: {
        display: 'flex',
        justifyContent: 'space-around',
        textAlign: 'center',
    },
    ser_more_links_header:{
        marginBottom: theme.spacing.unit,
    }
});


class MoreLinks extends Component {
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
        const { classes, state_name, org_name, stateServices, otherServices } = this.props;
        let glossaries = [

            {
                name: 'Pay Property Taxes ',
                link: 'pay-property-taxes/'
            }, {
                name: 'Pay Parking Citation',
                link: 'pay-parking-citation/'
            },
            {
                name: 'Register for Recreational Classes',
                link: 'register-for-recreational-activity-or-class/'
            }, {
                name: 'Pay Utility Bill',
                link: 'pay-utility-bill/'
            }, {
                name: 'Renew Business License',
                link: 'renew-business-license/'
            },
        ]

        const glosaaryLinks = _.shuffle(glossaries).map((gl, idx) => 
            (<Typography key={idx}>
                <a
                    href={`/services/${gl.link}`}
                    className={classes.footer_social_icon}

                    target="_blank">

                    {gl.name}
                </a>
            </Typography>)
    )

        const otherSers = otherServices.slice(0,4).map((ser, idx) => (<Typography key={idx}>
                    <a
                        href={`/${ser.url_slug}`}
                        className={classes.footer_social_icon}

                        target="_blank">
                 
                        {ser.service_name}
                    </a>
                    </Typography>))
                
        const additionalServices = (<div className={classes.disco_footer}>
            <div className={classes.ser_more_links_header}>
                <Typography variant="body2" >
                    More Services {org_name}
                 </Typography>
            </div>
            <div className={classes.disco_footer_links}>
                {otherSers}
            </div>
        </div>)

        const stateSerLinks = _.shuffle(stateServices).map((ss, idx) =>
            (<Typography key={idx}>
                <a
                    href={`/${ss.url_slug}`}
                    className={classes.footer_social_icon}

                    target="_blank">

                    {ss.name}
                </a>
            </Typography>)
        )

        const stateSers = (<div className={classes.disco_footer}>
            <div className={classes.ser_more_links_header}>
                <Typography variant="body2" >
                    Services from {state_name}
                 </Typography>
            </div>
            <div className={classes.disco_footer_links}>
                {stateSerLinks}
            </div>
        </div>)

        const glossLinks = (<div className={classes.disco_footer}>
            <div className={classes.ser_more_links_header}>
                <Typography variant="body2" >
                    Popular Services
                 </Typography>
            </div>
            <div className={classes.disco_footer_links}>
                {glosaaryLinks}
            </div>
        </div>)

        return (
            <div className={classes.more_links}>
                <div className={this.state.isMob ? classes.more_links_container_mob : classes.more_links_container}>
                    {additionalServices}
                    {stateSers}
                    {glossLinks}
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(MoreLinks);
