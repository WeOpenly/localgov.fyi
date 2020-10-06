import React from "react"
import axios from "axios"
import * as qs from "query-string"
import styles from "../spectre.min.module.css";


// import axios and query-string


class CommunityQuestion extends React.Component {
  constructor(props) {
    // Do intro stuff ...
    super(props)
    this.domRef = React.createRef()
    this.state = {
      feedbackMsg: null,
      showForm: true

    }
  }
  
   
  handleSubmit(event) {
    // Do form submission stuff ...
    // Do not submit form via HTTP, since we're doing that via XHR request.
    event.preventDefault()
    // Loop through this component's refs (the fields) and add them to the
    // formData object. What we're left with is an object of key-value pairs
    // that represent the form data we want to send to Netlify.
    const formData = {}
    Object.keys(this.refs).map(key => (formData[key] = this.refs[key].value))
     

    let currentLoc = "";
      if (window.location && window.location.pathname) {
        currentLoc = window.location.pathname;
      }

    // check url location
    const urlLocations = typeof window !== 'undefined' ? window.location.href : '';
    // Set options for axios. The URL we're submitting to

    const axiosOptions = {

      method: "POST",
      
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded" 
      },
      body: encodeBody({
        "form-name": "AskQuestion",
         path: currentLoc,
      }),
      data: qs.stringify(formData),
      url: urlLocations,
    }

    // Submit to Netlify. Upon success, set the feedback message and clear all
    // the fields within the form. Upon failure, keep the fields as they are,
    // but set the feedback message to show the error state.
    axios(axiosOptions)
      
      .then(response => {
        this.setState({
          feedbackMsg: "Form submitted successfully!",
          showForm: !this.state.showForm
        })
        this.domRef.current.reset()
      })
      .catch(err =>
        this.setState({
          feedbackMsg: "Form could not be submitted.",
        })
      )
  }

  

  render() {

    return (
      <>
        <div class="divider"></div>
        <div className="faq" style={{ margin: "1rem 0rem" }}>
            <h4 style={{ margin: "2rem 0" }}>Ask the Community</h4>
            <p> You can ask any questions related to this service here. We will answer them as soon as possible!</p>

              {/* this will show wether the form is succesfully be sent or not */}
              {this.state.feedbackMsg && <p style={{ color: "#420EFF" }}>{this.state.feedbackMsg}</p>}


              <div style={this.state.showForm ? {} : { display: "none" }}>

                <form ref={this.domRef} 
                   name="AskQuestion" 
                   method="POST" 
                   action="/"
                   data-netlify="true" 
                   onSubmit={event => this.handleSubmit(event)}
                >

                  {/* this  is hidden but netlify need it to make sure netlify bot can see the form */}
                  <input ref="form-name" 
                      type="hidden" 
                      name="form-name" 
                      value="AskQuestion" 
                  />
                  
                  <p hidden>
                    <label>
                      Don’t fill this out:{" "}
                      <input name="bot-field" onChange={this.handleChange} />
                    </label>
                  </p>

                  {/* collects the service page path */}
                  <p hidden>
                    <label>
                      Don’t fill this out:{" "}
                      <input name="path" type="href" value= ""/>
                    </label>
                  </p>

      

                  {/* text area */}
                  <textarea class="form-control"
                    required
                    id="message" ref="message" name="message" placeholder="What is your question?" />
                  <p> </p>
                 <label>
                    <input
                      required
                      name="email"
                      type="email"
                      placeholder="you@email.com"
                    />
                    <p> </p>
                    <h6 class="form-input-hint"> * We will only use your email to notify about the Q&A!</h6>
                  </label>
                  <p> </p>
                  <button
                    className={`${styles.btn} ${styles.btnPrimary} ${styles.inputGroupBtn} ${styles.btnLg}`}
                    type="submit"
                  >
                    Submit
                  </button>
                
                </form>
              </div>
              <p> </p>
              <div class="divider"></div>
        </div>
      </>
    )
  }
}

export default CommunityQuestion
