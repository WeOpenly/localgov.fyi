import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";

import { isMobileOnly } from 'react-device-detect';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { navigate } from '@reach/router';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ExitToApp from '@material-ui/icons/ExitToApp'
import SvgIcon from '@material-ui/core/SvgIcon';
import Img from "gatsby-image";
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
    org_agg_card:{
        borderTop: `2px solid ${theme.palette.primary["700"]}`,
        margin: 0,
        padding: 0,
        boxShadow: '2px 4px 16px 8px rgba(0,0,0,0.1),0px 1px 1px 0px rgba(0,0,0,0.07),0px 2px 6px 1px rgba(0,0,0,0.06)'
    },
    org_agg_ser_list:{
        display: 'flex',
        flexWrap: 'wrap',
    },
    org_agg_name:{
        alignItems: 'center',
        display: 'flex',
        cursor: 'pointer',
        flexDirection: 'column',
        padding: theme.spacing.unit,
        '&:hover': {
            textDecoration: 'underline',
        }
    },
org_agg_cd:{
    margin: theme.spacing.unit,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
},
    ser_list_item:{
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        flex: '1 1 30%',
        position: 'relative',
        minWidth: '150px',
        padding: theme.spacing.unit,
        margin: theme.spacing.unit/2,
        '&:hover':{
            background: '#f1f1f1',
        }
    },
    ser_list_item_load_more:{
        padding: theme.spacing.unit,
        marginTop: theme.spacing.unit,
        cursor: 'pointer',
        display: 'flex',
        flex: '1 1 100%',
    },
    svgIcon: {
        fontSize: '12px',
        marginRight: 8,
        color: '#fff'
    },
    org_header_buttonContent: {
        display: 'flex',
        fontWeight: '500',
        alignItems: 'center',
        fontSize: '10px',
        color: '#fff'
    },
    org_aggregate_container:{
        display: 'flex',
        background: theme.palette.primary["700"],
    },
    org_agg_org_section:{
        display: 'flex',
        minWidth: '300px',
        flexDirection: 'column',
        aignitems: 'center',
        margin: theme.spacing.unit *2, 
        padding: theme.spacing.unit*2,
    },
    org_agg_logo:{
        alignSelf: 'center',
        display: 'flex',
        marginBottom: theme.spacing.unit,
        height: theme.spacing.unit *9,
        width: theme.spacing.unit *9,
        boxShadow: '0px 3px 5px 0px rgba(0,0,0,0.1),0px 1px 1px 0px rgba(0,0,0,0.07),0px 4px 4px 8px rgba(0,0,0,0.09)',
        border: '2px solid #fff'
    },
    org_agg_ser_section:{
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px ${theme.spacing.unit}px ${theme.spacing.unit * 4}px`,
        background: '#fdfdfd',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    org_agg_service_header:{
        paddingTop: theme.spacing.unit*2,
        paddingBottom: theme.spacing.unit*2,
    },
    org_aggregate_container_mob:{
        display: 'flex',
        background: theme.palette.primary["700"],
        flexDirection: 'column',
        width: '320px'
    }
});


class OrgAggregate extends Component {
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
        const { classes, org_name, area, offered_services, logo_url, contact_details, url_slug } = this.props;

        const serviceList = offered_services.map((s,i)=> {
            return (<div className={classes.ser_list_item} key={i}>
                <Typography style={{
                    color: '#5627FF',
                    position: 'relative',
                    fontWeight: '500',
                    '&:hover': {
                        textDecoration: 'underline'
                    }}} variant="body2">
                    {s.name}
                </Typography>
            </div>)
        })

        let slicedServices = null;
        if (serviceList.length > 9){
            slicedServices = serviceList.slice(0, 9)

            slicedServices.push(<div className={classes.ser_list_item_load_more} key={'load-more'}>
                <Typography style={{ color: '#5627FF'}} variant="caption">
                    See More 
            </Typography> <ExitToApp style={{ fontSize: '20px', marginLeft: '4px', color: '#5627FF' }}/>
            </div>)
        } else{
            slicedServices = serviceList;
        }
     
       
        let state = null;
        let areaName = null;
        if (area.hierarchy.length === 1) {
            areaName = area.name || org_name
            areaName = `State of ${areaName}`
        }
        else {
            areaName = area.name || org_name
            state = `State of ${area.hierarchy[area.hierarchy.length - 1].area_name}`;
        }

        let contactAddress;
        if (contact_details)
            contactAddress = contact_details.find((detail) => detail.contact_type === 'ADDRESS');
        let contactAddressValue = null;
        if (contactAddress)
            contactAddressValue = contactAddress.contact_value || null;

        const sortedInfo = []
        const sortInfo = (contact_details) => {
            contact_details.forEach((detail) => {
                let type = detail.contact_type;
                if (type === 'FACEBOOK') {
                    sortedInfo[0] = detail;
                } else if (type === 'TWITTER') {
                    sortedInfo[1] = detail;
                } else if (type === 'EMAIL') {
                    sortedInfo[2] = detail;
                } else if (type === 'PHONE') {
                    sortedInfo[3] = detail;
                } else if (type === 'ADDRESS') {
                    sortedInfo[4] = detail;
                }
            })
        }
        if (contact_details)
            sortInfo(contact_details);

        const contactDetailButtons = sortedInfo.map((cd, idx, arr) => {
            const icons = {
                phone: (
                    <SvgIcon
                        className={classes.svgIcon}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512">
                        <path
                            d="M436.9 364.8c-14.7-14.7-50-36.8-67.4-45.1-20.2-9.7-27.6-9.5-41.9.8-11.9 8.6-19.6 16.6-33.3 13.6-13.7-2.9-40.7-23.4-66.9-49.5-26.2-26.2-46.6-53.2-49.5-66.9-2.9-13.8 5.1-21.4 13.6-33.3 10.3-14.3 10.6-21.7.8-41.9C184 125 162 89.8 147.2 75.1c-14.7-14.7-18-11.5-26.1-8.6 0 0-12 4.8-23.9 12.7-14.7 9.8-22.9 18-28.7 30.3-5.7 12.3-12.3 35.2 21.3 95 27.1 48.3 53.7 84.9 93.2 124.3l.1.1.1.1c39.5 39.5 76 66.1 124.3 93.2 59.8 33.6 82.7 27 95 21.3 12.3-5.7 20.5-13.9 30.3-28.7 7.9-11.9 12.7-23.9 12.7-23.9 2.9-8.1 6.2-11.4-8.6-26.1z" />
                    </SvgIcon>
                ),
                address: (
                    <SvgIcon
                        className={classes.svgIcon}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512">
                        <path
                            d="M256 32c-88.004 0-160 70.557-160 156.801C96 306.4 256 480 256 480s160-173.6 160-291.199C416 102.557 344.004 32 256 32zm0 212.801c-31.996 0-57.144-24.645-57.144-56 0-31.357 25.147-56 57.144-56s57.144 24.643 57.144 56c0 31.355-25.148 56-57.144 56z" />
                    </SvgIcon>
                ),
                email: (
                    <SvgIcon
                        className={classes.svgIcon}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512">
                        <path
                            d="M437.332 80H74.668C51.199 80 32 99.198 32 122.667v266.666C32 412.802 51.199 432 74.668 432h362.664C460.801 432 480 412.802 480 389.333V122.667C480 99.198 460.801 80 437.332 80zM432 170.667L256 288 80 170.667V128l176 117.333L432 128v42.667z" />
                    </SvgIcon>
                ),
                facebook: (
                    <SvgIcon
                        className={classes.svgIcon}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512">
                        <path
                            d="M426.8 64H85.2C73.5 64 64 73.5 64 85.2v341.6c0 11.7 9.5 21.2 21.2 21.2H256V296h-45.9v-56H256v-41.4c0-49.6 34.4-76.6 78.7-76.6 21.2 0 44 1.6 49.3 2.3v51.8h-35.3c-24.1 0-28.7 11.4-28.7 28.2V240h57.4l-7.5 56H320v152h106.8c11.7 0 21.2-9.5 21.2-21.2V85.2c0-11.7-9.5-21.2-21.2-21.2z" />
                    </SvgIcon>
                ),
                twitter: (
                    <SvgIcon
                        className={classes.svgIcon}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512">
                        <path
                            d="M492 109.5c-17.4 7.7-36 12.9-55.6 15.3 20-12 35.4-31 42.6-53.6-18.7 11.1-39.4 19.2-61.5 23.5C399.8 75.8 374.6 64 346.8 64c-53.5 0-96.8 43.4-96.8 96.9 0 7.6.8 15 2.5 22.1-80.5-4-151.9-42.6-199.6-101.3-8.3 14.3-13.1 31-13.1 48.7 0 33.6 17.2 63.3 43.2 80.7-16-.4-31-4.8-44-12.1v1.2c0 47 33.4 86.1 77.7 95-8.1 2.2-16.7 3.4-25.5 3.4-6.2 0-12.3-.6-18.2-1.8 12.3 38.5 48.1 66.5 90.5 67.3-33.1 26-74.9 41.5-120.3 41.5-7.8 0-15.5-.5-23.1-1.4C62.8 432 113.7 448 168.3 448 346.6 448 444 300.3 444 172.2c0-4.2-.1-8.4-.3-12.5C462.6 146 479 129 492 109.5z" />
                    </SvgIcon>
                )
            };

            let value = cd.contact_value
            if (!value)
                value = cd.value;

            const contactType = cd
                .contact_type
                .toLowerCase();
            if (contactType.toLowerCase() === 'phone') {
                value = (
                    <Typography variant="caption" style={{
                        display: 'flex'
                    }}>
                        <a
                            href={`tel:${value}`}
                            className={classes.org_header_buttonContent}
                            onClick={() => this.trackClickSocialIcon(contactType, cd.contact_value)}
                            target="_blank">
                            {icons[contactType]}
                            {value}
                        </a>
                    </Typography>
                );
            } else if (contactType.toLowerCase() === 'address') {
                value = (
                    <Typography variant="caption">
                        <a
                            href={`http://maps.google.com/?q=${value}`}
                            className={classes.org_header_buttonContent}
                            onClick={() => this.trackClickSocialIcon(contactType, cd.contact_value)}
                            target="_blank">
                            {icons[contactType]}
                            {value}
                        </a>
                    </Typography>
                );
            } else if (contactType.toLowerCase() === 'email') {
                value = (
                    <Typography variant="caption" style={{
                        display: 'flex'
                    }}>
                        <a
                            href={`mailto:${value}`}
                            className={classes.org_header_buttonContent}
                            onClick={() => this.trackClickSocialIcon(contactType, cd.contact_value)}
                            target="_blank">
                            {icons[contactType]}
                            {value}
                        </a>
                    </Typography>
                );
            } else {
                value = (
                    <Typography variant="caption" style={{
                        display: 'flex'
                    }}>
                        <a
                            href={`${value}`}
                            className={classes.org_header_buttonContent}
                            onClick={() => this.trackClickSocialIcon(contactType, cd.contact_value)}
                            target="_blank">
                            {icons[contactType]}
                            {value}
                        </a>
                    </Typography>
                )

            }

            return <div className={classes.org_header_contactIcons}>{value}
            </div>;
        });

        return (<Card
            className={classes.org_agg_card}>
            <div className={this.state.isMob ? classes.org_aggregate_container_mob : classes.org_aggregate_container}>
           
                <div className={classes.org_agg_org_section}>
                    {logo_url ? <Avatar className={classes.org_agg_logo} src={logo_url}>
                    </Avatar> : null}
                    <div className={classes.org_agg_name} onClick={() => navigate(`/organization/${url_slug}`)}>
                        <Typography style={{
                            color: '#fff',
                            textAlign: 'center',
                        }} variant="title" gutterBottom>
                            {org_name}
                        </Typography>
                        <Typography style={{
                            color: '#fff'
                        }} variant="caption">
                            {state}
                        </Typography>
                    </div>
                    <div className={classes.org_agg_cd}>
                        {contactDetailButtons}
                    </div>
                </div>
                {serviceList.length > 0 ? (<div className={classes.org_agg_ser_section}>
                    <div className={classes.org_agg_service_header}>
                        <Typography style={{ fontSize: '1.1rem' }} variant="title" gutterBottom>
                            Services from {org_name}
                        </Typography>
                    </div>

                    <div className={classes.org_agg_ser_list}>
                        {slicedServices}
                    </div>
                </div>) : null}
            </div>
        </Card>)
    }
}

export default withStyles(styles)(OrgAggregate);
