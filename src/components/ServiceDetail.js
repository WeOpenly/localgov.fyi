import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {navigate} from '@reach/router';

import { connect } from 'react-redux';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
    FacebookShareButton,
    TwitterShareButton,
} from 'react-share';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import InfoOutlined from '@material-ui/icons/InfoOutlined'
import AccessTimeOutlined from '@material-ui/icons/AccessTimeOutlined'
import FolderOpenOutlined from '@material-ui/icons/FolderOpenOutlined'
import HelpOutline from '@material-ui/icons/HelpOutline'
import PriorityHigh from '@material-ui/icons/PriorityHigh';
import List from '@material-ui/icons/List'

import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import Divider from '@material-ui/core/Divider';
import { trackClick} from "./common/tracking";

const styles = theme => ({
    ser_detail_tab_root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
ser_detail_tab_tabSelected : {},
ser_detail_tab_tabRoot : {
 
    fontWeight: theme.typography.fontWeightRegular,
    letterSpacing: '2px',
    marginTop: theme.spacing.unit,
    '&:hover': {
        color: theme.palette.primary['500'],
        opacity: 1
    },
    '&$tabSelected': {
        color: theme.palette.primary['500'],
   
    },
    '&:focus': {
        color: theme.palette.primary['700'],
    }
},
    ser_detail_tab_tabsRoot : {
    borderBottom: '1px solid #f1f1f1',
  },
    ser_detail_tab_tabsIndicator : {
    backgroundColor: theme.palette.primary['500'],
  },
    ser_detail_cardWrapper:{
        margin: theme.spacing.unit,
        boxShadow : `1px 1px 3px 1px ${theme.palette.primary['100']}`,
    },
ser_detail_cardContent : {
    padding: theme.spacing.unit *4
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
            tabContent : []
        };
    }
    
    handleChange = (event, value) => {
        this.setState({currentTab: value});
    };

    componentDidMount(){
        const { classes, description, price, timingList, formList, qaList, stepList, locList } = this.props;
        let tabContent = []
        if(description){
            tabContent.push(<Fragment>
                <div className={classes.ser_detail_cardContent}>
                    <Typography variant="body1" gutterBottom>
                        <RawHTML>{description}</RawHTML>
                    </Typography>

                    {price && (<Fragment>
                      <Typography variant="subheading" gutterBottom>
                        Price
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                       {price}
                    </Typography>  </Fragment>)}
                </div>
            </Fragment>)
        }
        if(timingList){
            tabContent.push(<Fragment>
                <div className={classes.ser_detail_cardContent}>
                   {timingList}
                </div>
            </Fragment>)
        }
        if(formList){
            tabContent.push(<Fragment>
                <div className={classes.ser_detail_cardContent}>
                   {formList}
                </div>
            </Fragment>)
        }
        if(qaList){
            tabContent.push(<Fragment>
                <div className={classes.ser_detail_cardContent}>
                   {qaList}
                </div>
            </Fragment>)
        }else{
                tabContent.push(<Fragment>
                <div className={classes.ser_detail_dummyfaq}>
                    <div className={classes.ser_detail_dummyfaq_details}>
                          <PriorityHigh size="small" />
                       <Typography variant="body1" gutterBottom>
                          
                        Looks like we don't have any FAQs yet!
                    </Typography>
                        </div>
                   
                  
                </div>
            </Fragment>)
        }
        if(stepList){
            tabContent.push(<Fragment>
                <div className={classes.ser_detail_cardContent}>
                   {stepList}
                </div>
            </Fragment>)
        }
        this.setState({
            tabContent
        })
    }

   
    render() {
        const { classes, description, price, timingList, formList, qaList, stepList, locList } = this.props;
        let tabs = []
        if (description){
tabs.push(
    <Tab
        classes={{
        root: classes.ser_detail_tab_tabRoot,
        selected: classes.ser_detail_tab_tabSelected
    }}
        label="Details"
        icon={< InfoOutlined />}/>
)
        }
        if (timingList){
tabs.push(
    <Tab
        classes={{
        root: classes.ser_detail_tab_tabRoot,
selected : classes.ser_detail_tab_tabSelected
    }}
        label="Timings"
        icon={< AccessTimeOutlined />}/>
)
        }
        if(formList){
tabs.push(
    <Tab
        classes={{
        root: classes.ser_detail_tab_tabRoot,
        selected: classes.ser_detail_tab_tabSelected
    }}
        label="Forms"
        icon={< FolderOpenOutlined />}/>
)
        }
        //  push this regardless
        tabs.push(<Tab  classes={{ root: classes.ser_detail_tab_tabRoot, selected: classes.ser_detail_tab_tabSelected }} label="FAQs" icon={<HelpOutline />} />)
        
        if(stepList){
            tabs.push(<Tab      classes={{ root: classes.ser_detail_tab_tabRoot, selected: classes.ser_detail_tab_tabSelected }} label="Checklist" icon={<List />} />)
        }


         return (<Paper className={classes.ser_detail_cardWrapper} elevation={2}>
                            <Tabs
            value={this.state.currentTab}
            onChange={this.handleChange}
             variant="scrollable"
            classes={{ root: classes.ser_detail_tab_tabsRoot, indicator: classes.ser_detail_tab_tabsIndicator }}
            indicatorColor="primary"
            textColor="primary"
          >
          {tabs}
           </Tabs>
          {this.state.tabContent[this.state.currentTab]}
        </Paper>)
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