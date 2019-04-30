import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {navigate} from '@reach/router';
import { isMobileOnly } from 'react-device-detect';
import { connect } from 'react-redux';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {Info} from 'react-feather';
import ContentLoader from "react-content-loader"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AnchorLink from 'react-anchor-link-smooth-scroll'
import Paper from '@material-ui/core/Paper';
import InfoOutlined from '@material-ui/icons/InfoOutlined'
import AccessTimeOutlined from '@material-ui/icons/AccessTimeOutlined'
import FolderOpenOutlined from '@material-ui/icons/FolderOpenOutlined'
import HelpOutline from '@material-ui/icons/HelpOutline'
import PriorityHigh from '@material-ui/icons/PriorityHigh';


import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import Divider from '@material-ui/core/Divider';
import { trackClick} from "./common/tracking";
const windowGlobal = typeof window !== 'undefined'
    ? window
    : null

const styles = theme => ({

    ser_detail_tab_item:{
    display: 'flex',
    margin: `0 ${theme.spacing.unit * 2}px 0 ${theme.spacing.unit}px`,
},
    set_list_link_anchor:{
        textDecoration: 'none',
        color: '#5627FF',
        position: 'relative',
        '&:hover::after': {
            content: '""',
            position: 'absolute',
            bottom: '-9px',
            left: 0,
            height: '4px',
            width: '100%',
            background: `linear-gradient(bottom, #AB93FF 0%, #5627FF 35%,transparent 60%, transparent 100%)`
        },
        '@media only screen and (max-width: 768px)': {
            '&:hover': {
                color: '#fff',
                background: theme.palette.primary['700']
            }
        }
    },
ser_detail_cardContent : {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 3}px ${theme.spacing.unit*4}px ${theme.spacing.unit}px`,
},
ser_detail_tab_container_mob:{
    display: 'flex',
    marginTop: theme.spacing.unit * 2,
    position: 'relative',
    justifyContent: 'center'
},
ser_detail_tab_container:{
    display: 'flex',
   marginTop: theme.spacing.unit * 2,
    position: 'relative',
},
ser_detail_dummyfaq:{
    display: 'flex',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center'
},
ser_detail_dummyfaq_details:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
}
});



const Tabloader = () => (
    <ContentLoader
        height={300}
        width={400}
        speed={100}
        primaryColor="#f3f3f3"
        secondaryColor="#d5d9f3"
    >
        <circle cx="27" cy="26" r="1" />
        <circle cx="46" cy="49" r="1" />
        <rect x="65" y="109" rx="0" ry="0" width="0" height="0" />
        <rect x="384" y="243" rx="0" ry="0" width="0" height="0" />
        <rect x="673" y="174" rx="0" ry="0" width="0" height="1" />
        <rect x="148" y="192" rx="0" ry="0" width="0" height="0" />
        <rect x="229" y="71" rx="0" ry="0" width="0" height="0" />
        <rect x="11" y="53" rx="0" ry="0" width="410" height="139" />
        <rect x="11" y="4" rx="0" ry="0" width="66" height="33" />
        <rect x="86" y="5" rx="0" ry="0" width="66" height="33" />
        <rect x="66" y="48" rx="0" ry="0" width="16" height="1" />
        <rect x="166" y="4" rx="0" ry="0" width="66" height="33" />
    </ContentLoader>
)


const RawHTML = ({ children, className = "" }) => (
    <div
        className={className}
        style={{padding:0, margin: 0, color: "rgba(30, 30, 50,0.87)"}}
        dangerouslySetInnerHTML={{ __html: children.replace(/\n/g, " ") }}
    />
);

class ServiceDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTab: 0,
            isMob: false,
            tabContent : [],
            tabs: []
        };
    }
    
    handleChange = (event, value) => {
        this.setState({currentTab: value});
    };

    componentDidMount(){

        const { classes, name, orgHieSlug, description, price, alltimings, allForms, allfaq, allSteps } = this.props;
        let tabs = []
        let timingList = null;
        if (alltimings.length > 0) {
            timingList = alltimings.map((timing, index) => {
                const { day, open } = timing;
                const breakTime = timing["break"];
                let openTime = "";

                if (open && breakTime) {
                    openTime = `OPEN: ${open} CLOSED: ${breakTime}`;
                }

                return (
                    <ListItem disableGutters>
                        <ListItemText
                            primary={openTime}
                            secondary={day}
                            secondaryTypographyProps={{
                                variant: "subheading"
                            }} />
                    </ListItem>
                );
            });
        }

        let stepList = null;
        if (allSteps.length > 0) {
            stepList = allSteps.map((step, index) => {
                const { description } = step;
                const text = (
                    <RawHTML>
                        {description}
                    </RawHTML>
                );
                return <ListItem disableGutters>
                    <Typography type="caption" className={classes.serviceDetailStepNumber} gutterBottom>
                        {index + 1}
                    </Typography>
                    <Typography type="body1" className={classes.serviceDetailStepText} gutterBottom>
                        {text}
                    </Typography>

                </ListItem>;
            });
        }

        let formList = null;
        if (allForms.length > 0) {
            formList = allForms.map((form, index) => {
                const { name, url, price } = form;
                return <ListItem button disableGutters>
                    <ListItemText
                        primary={name}
                        onClick={() => {
                            if (url) {
                                windowGlobal.open(url, "_blank");
                            }
                        }}
                        secondary={price}
                        className={classes.ser_detail_formLink} />
                </ListItem>;
            });
        }

        let qaList = null;
        if (allfaq.length > 0) {
            qaList = allfaq.map((qa, index) => {
                const { answer, question } = qa;
                const text = (
                    <RawHTML>
                        {answer}
                    </RawHTML>
                );

                return <Fragment>
                    <ListItem disableGutters>
                        <ListItemText primary={<Typography component="h3" style={{ color: "rgba(30, 30, 50, 0.78)"}}variant='subheading'>{question}</Typography>} secondary={<Typography color="textPrimary">{text}</Typography>} />
                    </ListItem>
                    {(index !== allfaq.length - 1) ? <Divider style={{ margin: '8px' }} /> : null}
                </Fragment>;
            });
        }
 
        tabs.push(
            <div className={classes.ser_detail_tab_item}>
                <AnchorLink
                    style={{
                        textDecoration: 'none'
                    }}
                    offset='48'
                    href={`#details`}>
                    <Typography className={classes.set_list_link_anchor} variant="subheading">Details
                </Typography>
                </AnchorLink>
            </div>
        )


        //  push this regardless
        if (qaList){
            tabs.push(<div className={classes.ser_detail_tab_item}>
                <AnchorLink
                    style={{
                        textDecoration: 'none'
                    }}
                    offset='48'
                    href={`#faqs`}>
                    <Typography className={classes.set_list_link_anchor} variant="subheading">FAQs
                </Typography>
                </AnchorLink>
            </div>)
        }
       

        if (stepList) {
            tabs.push(<div className={classes.ser_detail_tab_item}>
                <AnchorLink
                    style={{
                        textDecoration: 'none'
                    }}
                    offset='48'
                    href={`#steps`}>
                    <Typography className={classes.set_list_link_anchor} variant="subheading">Steps
                </Typography>
                </AnchorLink>
            </div>)
        }


        if (formList) {
            tabs.push(<div className={classes.ser_detail_tab_item}>
                <AnchorLink
                    style={{
                        textDecoration: 'none'
                    }}
                    offset='48'
                    href={`#forms`}>
                    <Typography className={classes.set_list_link_anchor} variant="subheading">Forms
                </Typography>
                </AnchorLink>
            </div>)
        }

        if (timingList) {
            tabs.push(<div className={classes.ser_detail_tab_item}>
                <AnchorLink
                    style={{
                        textDecoration: 'none'
                    }}
                    offset='48'
                    href={`#timings`}>
                    <Typography className={classes.set_list_link_anchor} variant="subheading">Timings
                </Typography>
                </AnchorLink>
            </div>)
        }

        let tabContent = []

        if(description){
            tabContent.push(<Fragment>
 
                <div className={classes.ser_detail_cardContent} id={`details`}>
                 
                    <Typography variant="body1" gutterBottom>
                        <RawHTML>{description}</RawHTML>
                    </Typography>

                    {price && (<Fragment>
                      <Typography variant="subheading" gutterBottom>
                        Price
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                       {price}
                    </Typography> 
               </Fragment>)}
                  
                </div>
            </Fragment>)
        }else{
            tabContent.push(<Fragment>
                    <div className={classes.ser_detail_cardContent} id={`details`}>
                    <Typography variant="body1" gutterBottom>
                        {name} in the {orgHieSlug} using this service
                    </Typography>
                </div>
            </Fragment>)
        }
        
        if(qaList){
            tabContent.push(<Fragment>
                <Typography className={classes.ser_tab_content_heading} component="h2" variant="title">FAQs
                      </Typography>
                <div className={classes.ser_detail_cardContent} id={`faqs`}>
                   {qaList}
                </div>
            </Fragment>)
        }

        if(stepList){
            tabContent.push(<Fragment>
                <Typography className={classes.ser_tab_content_heading} component="h2" variant="title">Steps
                      </Typography>
                <div className={classes.ser_detail_cardContent} id={`steps`}>
                   {stepList}
                </div>
            </Fragment>)
        }

        if(formList){
            tabContent.push(<Fragment>
                <Typography className={classes.ser_tab_content_heading} component="h2" variant="title">Forms
                      </Typography>
                <div className={classes.ser_detail_cardContent} id={`forms`}>
                   {formList}
                </div>
            </Fragment>)
        }
       
        if(timingList){
            tabContent.push(<Fragment>
                <Typography className={classes.ser_tab_content_heading} component="h2" variant="title">Timings
                      </Typography>
                <div className={classes.ser_detail_cardContent} id={`timings`}>
                   {timingList}
                </div>
            </Fragment>)
        }

        this.setState({
            tabs,
            tabContent,
            isMob: isMobileOnly,
        })
    }

   
    render() {
        const { classes, description, price, timingList, formList, qaList, stepList, locList } = this.props;
        const {tabs} = this.state;


        if (!tabs || tabs.length === 0 || tabs.length !== this.state.tabContent.length){
            return <Tabloader />
        }
    

         return (<Fragment>
             <div className={this.state.isMob ? classes.ser_detail_tab_container_mob : classes.ser_detail_tab_container}>
            {tabs}

            </div>
             <Divider style={{ margin: '8px 8px 24px 0px' }} />
             {this.state.tabContent}
             </Fragment>
       )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        trackClick: (click_type, resultType, id, title, listIndex) => {
            dispatch(trackClick(click_type, resultType, id, title, listIndex));
        }
    }
}

const mapStateToProps = function (state, ownProps) {
    return {
        ...ownProps
    };
};

const ConnServiceDetail = connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(ServiceDetail));

export default ConnServiceDetail;