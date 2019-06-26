import React, { Component } from "react";

import { isMobileOnly } from 'react-device-detect';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import SvgIcon from '@material-ui/core/SvgIcon';


const styles = theme => ({
    svgIconMed:{
        paddingTop:'3px',
         fontSize: '19px',
        margin: '2px'
    },
    svgIconIg:{
        paddingTop: '3px',
        fontSize: '16px',
                margin: '2px'
    },
    social_footer:{
        margin: `${theme.spacing.unit *3}px 0` ,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left'
    },
    social_footer_header:{
        marginBottom: theme.spacing.unit,
    },
    social_footer_links:{
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        alignItems: 'left'
    },
    svgIcon:{
        fontSize: '18px',
        margin: '2px'
    },
    social_container:{
        display: 'flex',
        marginTop: theme.spacing.unit,
        justifyContent: 'space-around'
    }
});


class FooterSocial extends Component {
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
        const { classes, } = this.props;

        const facebookLogo = (<a
            href={`https://www.facebook.com/evergov/`}
            className={classes.org_header_buttonContent}
           
            target="_blank">
            <SvgIcon
                className={classes.svgIcon}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512">
                <path
                    d="M426.8 64H85.2C73.5 64 64 73.5 64 85.2v341.6c0 11.7 9.5 21.2 21.2 21.2H256V296h-45.9v-56H256v-41.4c0-49.6 34.4-76.6 78.7-76.6 21.2 0 44 1.6 49.3 2.3v51.8h-35.3c-24.1 0-28.7 11.4-28.7 28.2V240h57.4l-7.5 56H320v152h106.8c11.7 0 21.2-9.5 21.2-21.2V85.2c0-11.7-9.5-21.2-21.2-21.2z" />
            </SvgIcon>
        </a>)


        const twitterLogo = (<a
            href={`https://twitter.com/myevergov`}
            className={classes.footer_social_icon}
            target="_blank">
            <SvgIcon
            className={classes.svgIcon}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512">
            <path
                d="M492 109.5c-17.4 7.7-36 12.9-55.6 15.3 20-12 35.4-31 42.6-53.6-18.7 11.1-39.4 19.2-61.5 23.5C399.8 75.8 374.6 64 346.8 64c-53.5 0-96.8 43.4-96.8 96.9 0 7.6.8 15 2.5 22.1-80.5-4-151.9-42.6-199.6-101.3-8.3 14.3-13.1 31-13.1 48.7 0 33.6 17.2 63.3 43.2 80.7-16-.4-31-4.8-44-12.1v1.2c0 47 33.4 86.1 77.7 95-8.1 2.2-16.7 3.4-25.5 3.4-6.2 0-12.3-.6-18.2-1.8 12.3 38.5 48.1 66.5 90.5 67.3-33.1 26-74.9 41.5-120.3 41.5-7.8 0-15.5-.5-23.1-1.4C62.8 432 113.7 448 168.3 448 346.6 448 444 300.3 444 172.2c0-4.2-.1-8.4-.3-12.5C462.6 146 479 129 492 109.5z" />
        </SvgIcon></a>)

        const mediumLogo = (<a
            href={`https://www.medium.com/evergov/`}
            className={classes.footer_social_icon}

            target="_blank"><SvgIcon
                className={classes.svgIconIg}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 203"
                preserveAspectRatio="xMidYMid">
                <path
                    d="M256 29.867h-10.125c-3.759 0-9.075 5.423-9.075 8.894v125.826c0 3.475 5.316 8.213 9.075 8.213H256v29.867h-91.733V172.8h19.2V40.533h-.941L137.69 202.667h-34.712L58.72 40.533H57.6V172.8h19.2v29.867H0V172.8h9.835c4.049 0 9.365-4.738 9.365-8.213V38.76c0-3.471-5.316-8.894-9.365-8.894H0V0h96.034l31.53 117.333h.87L160.253 0H256v29.867"
                    fill="#1A1918"
                />
            </SvgIcon></a>)
        const igLogo = (<a
            href={`https://www.instagram.com/myevergov/`}
            className={classes.footer_social_icon}
           
            target="_blank"><SvgIcon
            className={classes.svgIconIg}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512">
                <path d="M352 0H160C71.648 0 0 71.648 0 160v192c0 88.352 71.648 160 160 160h192c88.352 0 160-71.648 160-160V160C512 71.648 440.352 0 352 0zm112 352c0 61.76-50.24 112-112 112H160c-61.76 0-112-50.24-112-112V160C48 98.24 98.24 48 160 48h192c61.76 0 112 50.24 112 112z" />
                <path d="M256 128c-70.688 0-128 57.312-128 128s57.312 128 128 128 128-57.312 128-128-57.312-128-128-128zm0 208c-44.096 0-80-35.904-80-80 0-44.128 35.904-80 80-80s80 35.872 80 80c0 44.096-35.904 80-80 80z" />
                <circle cx={393.6} cy={118.4} r={17.056} />
            </SvgIcon></a>)


       

        return (
            <div className={classes.social_footer}>
                <div className={classes.social_footer_header}>
                    <Typography variant="display1" style={{ fontSize: "0.85rem"}} >
                        Evergov
                    </Typography>
                </div>
                <div className={classes.social_footer_links}>
                    <Typography variant="caption">
                    <a
                        href={`/about`}
                        className={classes.footer_social_icon}
                        target="_blank">
                        About
                        </a>
                    </Typography>
                    <Typography variant="caption">
                    <a
                        href={`https://evergov.com/blog`}
                        className={classes.footer_social_icon}

                        target="_blank">
                        Blog
                        </a>
                        </Typography>
                    <div className={classes.social_container}>
                        {facebookLogo}
                        {twitterLogo}
                        {mediumLogo}
                        {igLogo}
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(FooterSocial);
