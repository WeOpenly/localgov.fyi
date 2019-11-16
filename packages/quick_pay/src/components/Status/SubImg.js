import React, { Component, Fragment } from "react";

import styles from "../spectre.min.module.css";
import iconStyles from "../typicons.min.module.css";

class SubImg extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { imgUrl, createdAt } = this.props;
    if (!(imgUrl && createdAt)){
        return null;
    }

    let createdAtDate = new Date(createdAt).toDateString(); // The 0 there is the key, which sets the date to the epoch
    console.log(createdAt, createdAtDate);

     return (
       <div
         className={`${styles.card} ${styles.textLeft}`}
         style={{
           marginBottom: "1rem",

         }}
       >
         <div className={styles.cardHeader}>
   
             <img
               style={{ width: "100%", height: "auto" }}
               src={imgUrl}
               alt={imgUrl}
             />
      
         </div>
         <div className={styles.cardHeader}>
           <h5 className={`${styles.cardTitle}`}>Your Submission</h5>
           <small className={`${styles.cardSubitle}`}>Submitted on {" "} {createdAtDate}</small>
         </div>
       </div>
     );
  }
}

export default SubImg;

