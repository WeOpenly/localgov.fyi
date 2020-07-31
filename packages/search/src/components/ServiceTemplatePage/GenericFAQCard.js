import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";

import styles from "../spectre.min.module.css";
import {navigate} from '@reach/router';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import iconStyles from '../typicons.min.module.css';



const FaqItem = props => (
    <Fragment key={props.name}>
      <div key={props.name} className={styles.accordion}>
        <input type="checkbox" id={props.name} name={props.name} hidden />
        <label className={styles.accordionHeader} htmlFor={props.name}>
          <h5>
            {" "}
            {props.header}
            <span
            className={`${iconStyles.typcn} ${iconStyles.typcnArrowSortedDown}`}
            />
          </h5>
        </label>
        <div className={styles.accordionBody}>
          <div style={{ padding: "0.5rem 0.5rem" }}
             dangerouslySetInnerHTML={{__html: props.description}}>
          </div>
        </div>
      </div>
  
      <div className={styles.divider} />
    </Fragment>
  );

const propertyfaqs = [
    {
      q: "Wbat are the options for paying Property taxes?",
      a:
        "<p>Yes. If it’s not in the list above, you can reach out to us once </p>"
    },
    {
      q: "Do I need to connect my bank account?",
      a:
        "<p>We offer different payment options including credit card payment & different transfer by linking your account </p>"
    },
    {
      q: "Can you help me with single payments for things like tickets?",
      a:
        "<p>Sure, try out lightning fast payment service <a href='https://pay.papergov.com'>here</a></p>"
    }
  ];

  const propertyfaqComps = propertyfaqs.map((faq, idx) => {
    return (
        <divider> 
         <FaqItem header={faq.q} name={`home-faq-${idx}`} description={faq.a} />
        </divider>
    );
  });
  
  const parkingfaqs = [
    {
      q: "How can I challenge a parkign ticket?",
      a:
        "<p>Yes. If it’s not in the list above, you can reach out to us once </p>"
    },
    {
      q: "Do I need to connect my bank account?",
      a:
        "<p>We offer different payment options including credit card payment & different transfer by linking your account </p>"
    },
    {
      q: "Can you help me with single payments for things like tickets?",
      a:
        "<p>Sure, try out lightning fast payment service <a href='https://pay.papergov.com'>here</a></p>"
    }
  ];

  const parkingfaqComps = parkingfaqs.map((faq, idx) => {
    return (
        <divider> 
         <FaqItem header={faq.q} name={`home-faq-${idx}`} description={faq.a} />
        </divider>
    );
  });
  
  const genericfaqs = [
    {
      q: "How can I access this service for my city?",
      a:
        "<p>You can access the online service page of your city by typing your location in the search bar above. </p>"
    },
    {
      q: "What can I do if my location isn't listed?",
      a:
        "Sorry that your location isn't listed. Please click on the 'Add it now' options below so we can add your location soon.</p>"
    },
  ];

  const genericfaqComps = genericfaqs.map((faq, idx) => {
    return (
        <divider> 
         <FaqItem header={faq.q} name={`home-faq-${idx}`} description={faq.a} />
        </divider>
    );
  });

  
  class GenericFAQ extends Component {
    constructor(props) {
        super(props);
    }; 
    
    render() {

        return(
          <div
           className={`${styles.columns}`}
           style={{
             margin: "3rem 0 1rem 0",
             padding: "1rem 0.5rem"
           }}
          > 
            
             <div
              className={`${styles.column} ${styles.col12} ${styles.textCenter}`}
             >
              {genericfaqComps}
             </div>

           </div>
         )
       
        }
    }

export default GenericFAQ;
