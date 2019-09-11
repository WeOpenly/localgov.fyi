import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {navigate} from '@reach/router';

import { connect } from 'react-redux';
import ContentLoader from "react-content-loader"
import specStyles from "./spectre.min.module.css";
import AnchorLink from 'react-anchor-link-smooth-scroll'

import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

import Divider from '@material-ui/core/Divider';
import { trackClick} from "./common/tracking";
const windowGlobal = typeof window !== 'undefined'
    ? window
    : null

const styles = theme => ({
    serviceDetailStepNumber:{
        margin: theme.spacing.unit,
        fontWeight: 700,
    },
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
        height={475}
        width={800}
        speed={2}
        primaryColor="#f3f3f3"
        secondaryColor="#ecebeb"
    >
        <rect x="14" y="7" rx="4" ry="4" width="100" height="13" />
        <rect x="14" y="47" rx="0" ry="0" width="606" height="92" />
        <rect x="16" y="213" rx="0" ry="0" width="576" height="50" />
        <rect x="16" y="179" rx="4" ry="4" width="429" height="16" />
        <rect x="131" y="7" rx="4" ry="4" width="100" height="13" />
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


   
    render() {

    const {
              classes,
              name,
              orgHieSlug,
              description,
              price,
              alltimings,
              allForms,
              allfaq,
              allSteps
            } = this.props;
        let tabs = [];
        let tabContent = []

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
               <div disableGutters>
                 <div
                   primary={openTime}
                   secondary={day}
                   secondaryTypographyProps={{
                     variant: "subheading"
                   }}
                 />
               </div>
             );
           });
         }
                 let stepList = null;
                 if (allSteps.length > 0) {
                   stepList = allSteps.map((step, index) => {
                     const { description } = step;
                     const text = <RawHTML>{description}</RawHTML>;
                     return (
                       <div style={{ display: "flex" }} disableGutters>
                         <Typography
                           type="caption"
                           className={classes.serviceDetailStepNumber}
                           gutterBottom
                         >
                           {index + 1}
                         </Typography>
                         <Typography
                           type="body1"
                           className={classes.serviceDetailStepText}
                           gutterBottom
                         >
                           {text}
                         </Typography>
                       </div>
                     );
                   });
                 }

                 let formList = null;
                 if (allForms.length > 0) {
                   formList = allForms.map((form, index) => {
                     const { name, url, price } = form;
                     return (
                       <div button disableGutters>
                         <a
                           primary={name}
                           onClick={() => {
                             if (url) {
                               windowGlobal.open(url, "_blank");
                             }
                           }}
                           secondary={price}
                           className={classes.ser_detail_formLink}
                         />
                       </div>
                     );
                   });
                 }

                 let qaList = null;
                 if (allfaq.length > 0) {
                   qaList = allfaq.map((qa, index) => {
                     const { answer, question } = qa;
                     const text = <RawHTML>{answer}</RawHTML>;

                     return (
                       <Fragment>
                         <div
                           style={{ display: "flex", flexDirection: "column", margin: '1rem 0.2rem 0.2rem 0.2rem' }}
                           disableGutters
                         >
                           <h5>
                            {question}
                           </h5>
                            
                          <p style={{fontSize: '0.9rem', margin: '0.2rem'}}>
                             {text}
                           </p>
                         </div>
                         {index !== allfaq.length - 1 ? (
                           <div className={specStyles.divider} />
                         ) : null}
                       </Fragment>
                     );
                   });
                 }

                 if (description) {
                   tabContent.push(
                     <Fragment>
                       <div
                         className={classes.ser_detail_cardContent}
                         id={`about`}
                       >
                         <p style={{ fontSize: "1rem" }}>
                           <RawHTML>{description}</RawHTML>
                         </p>

                         {price && (
                           <Fragment>
                             <h5>Price</h5>

                             <p style={{ fontSize: "1rem" }}>{price}</p>
                           </Fragment>
                         )}
                       </div>
                     </Fragment>
                   );
                 } else {
                   tabContent.push(
                     <Fragment>
                       <div
                         className={classes.ser_detail_cardContent}
                         id={`about`}
                       >
                         <p style={{ fontSize: "1rem" }}>
                           {name} in the {orgHieSlug} using this service
                         </p>
                       </div>
                     </Fragment>
                   );
                 }

                 if (qaList) {
                   tabContent.push(
                     <Fragment>
                          <h4>
                         FAQs
                      </h4>
                       <p
                         className={classes.ser_detail_cardContent}
                         id={`faqs`}
                       >
                         {qaList}
                       </p>
                     </Fragment>
                   );
                 }

                 if (stepList) {
                   tabContent.push(
                     <Fragment>
                       <h4>Steps</h4>
                       <p
                         className={classes.ser_detail_cardContent}
                         id={`steps`}
                       >
                         {stepList}
                       </p>
                     </Fragment>
                   );
                 }

                 if (formList) {
                   tabContent.push(
                     <Fragment>
                       <h4>Forms</h4>
                       <p
                         className={classes.ser_detail_cardContent}
                         id={`forms`}
                       >
                         {formList}
                       </p>
                     </Fragment>
                   );
                 }

                 if (timingList) {
                   tabContent.push(
                     <Fragment>
                      <h4>
                        Timings
                      </h4>
                    
                       <p
                        
                         id={`timings`}
                       >
                         {timingList}
                       </p>
                     </Fragment>
                   );
                 }

         return (<Fragment>
        
             <Divider style={{ margin: '8px 8px 24px 0px' }} />
             {tabContent}
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