import React, { Component } from "react";



import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import ExitToApp from '@material-ui/icons/ExitToApp'
import SvgIcon from '@material-ui/core/SvgIcon';

import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
    disco_footer: {
        margin: `${theme.spacing.unit * 3}px 0`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left'
    },
    disco_footer_header: {
        marginBottom: theme.spacing.unit,
    },
    disco_footer_links: {
        display: 'flex',
        justifyContent: 'space-evenly',
        flexDirection: 'column',
        alignItems: 'left'
    },
    svgIcon: {
        fontSize: '20px'
    },
    social_container: {
        display: 'flex',
        justifyContent: 'space-between'
    }
});


class FooterDiscover extends Component {
    constructor(props) {
        super(props);

    }


    render() {
        const { classes, isMobile } = this.props;

        const facebookLogo = (<a
            href={`https://www.facebook.com/papergov/`}
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
            href={`https://twitter.com/mypapergov`}
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
            href={`https://medium.com/papergov`}
            className={classes.footer_social_icon}

            target="_blank"><SvgIcon
                className={classes.svgIcon}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512">
                <path
                    d="M492 109.5c-17.4 7.7-36 12.9-55.6 15.3 20-12 35.4-31 42.6-53.6-18.7 11.1-39.4 19.2-61.5 23.5C399.8 75.8 374.6 64 346.8 64c-53.5 0-96.8 43.4-96.8 96.9 0 7.6.8 15 2.5 22.1-80.5-4-151.9-42.6-199.6-101.3-8.3 14.3-13.1 31-13.1 48.7 0 33.6 17.2 63.3 43.2 80.7-16-.4-31-4.8-44-12.1v1.2c0 47 33.4 86.1 77.7 95-8.1 2.2-16.7 3.4-25.5 3.4-6.2 0-12.3-.6-18.2-1.8 12.3 38.5 48.1 66.5 90.5 67.3-33.1 26-74.9 41.5-120.3 41.5-7.8 0-15.5-.5-23.1-1.4C62.8 432 113.7 448 168.3 448 346.6 448 444 300.3 444 172.2c0-4.2-.1-8.4-.3-12.5C462.6 146 479 129 492 109.5z" />
            </SvgIcon></a>)

        const igLogo = (<a
            href={`https://www.instagram.com/papergov/`}
            className={classes.footer_social_icon}

            target="_blank"><SvgIcon
                className={classes.svgIcon}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512">
                <path
                    d="M492 109.5c-17.4 7.7-36 12.9-55.6 15.3 20-12 35.4-31 42.6-53.6-18.7 11.1-39.4 19.2-61.5 23.5C399.8 75.8 374.6 64 346.8 64c-53.5 0-96.8 43.4-96.8 96.9 0 7.6.8 15 2.5 22.1-80.5-4-151.9-42.6-199.6-101.3-8.3 14.3-13.1 31-13.1 48.7 0 33.6 17.2 63.3 43.2 80.7-16-.4-31-4.8-44-12.1v1.2c0 47 33.4 86.1 77.7 95-8.1 2.2-16.7 3.4-25.5 3.4-6.2 0-12.3-.6-18.2-1.8 12.3 38.5 48.1 66.5 90.5 67.3-33.1 26-74.9 41.5-120.3 41.5-7.8 0-15.5-.5-23.1-1.4C62.8 432 113.7 448 168.3 448 346.6 448 444 300.3 444 172.2c0-4.2-.1-8.4-.3-12.5C462.6 146 479 129 492 109.5z" />
            </SvgIcon></a>)




        return (
          <div className={classes.disco_footer}>
            <div className={classes.disco_footer_header}>
              <Typography variant="display1" style={{ fontSize: "0.85rem" }}>
                Discover
              </Typography>
            </div>
            <div className={classes.disco_footer_links}>
              <Typography variant="caption">
                <a
                  href={`https://pay.papergov.com`}
                  className={classes.footer_social_icon}
                  target="_blank"
                >
                  Quick Pay
                </a>
              </Typography>
              <Typography variant="caption">
                <a
                  href={`/locations`}
                  className={classes.footer_social_icon}
                  target="_blank"
                >
                  Locations
                </a>
              </Typography>
              <Typography variant="caption">
                <a
                  href={`/services`}
                  className={classes.footer_social_icon}
                  target="_blank"
                >
                  Services
                </a>
              </Typography>
            </div>
          </div>
        );
    }
}

export default withStyles(styles)(FooterDiscover);
