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


    // check url location
    const urlLocations = typeof window !== 'undefined' ? window.location.href : '';
    // Set options for axios. The URL we're submitting to

    const axiosOptions = {

      method: "post",

      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: qs.stringify(formData),

      url: urlLocations,
    }

    // Submit to Netlify. Upon success, set the feedback message and clear all
    // the fields within the form. Upon failure, keep the fields as they are,
    // but set the feedback message to show the error state.
    axios(axiosOptions)
      .then(response => {
        this.setState({
          feedbackMsg: "Thanks! We will try to answer it soon!",
          showForm: !this.state.showForm
        })
        this.domRef.current.reset()
      })
      .catch(err =>
        this.setState({
          feedbackMsg: "Sorry! There was some issue in submitting your question!",
        })
      )
  }

  render() {
    return (
      <>
            
        <div className="faq" style={{ margin: "4rem 0rem" }}>
            <h3 style={{ margin: "2rem 0" }}>Community Q&A</h3>

              {/* this will show wether the form is succesfully be sent or not */}
              {this.state.feedbackMsg && <p style={{ color: "#420EFF" }}>{this.state.feedbackMsg}</p>}


              <div style={this.state.showForm ? {} : { display: "none" }}>

                <form ref={this.domRef} name="AskQuestion" method="POST" data-netlify="true" onSubmit={event => this.handleSubmit(event)}>

                  {/* this  is hidden but netlify need it to make sure netlify bot can see the form */}
                  <input ref="form-name" type="hidden" name="form-name" value="AskQuestion" />

                  {/* text area  */}

                  <textarea class="form-control"
                    id="message" ref="message" name="message" placeholder="What is your question about this service?" />

                   <div className="mt-2">
                     <button class="btn"
                       style={{
                         background: "#420EFF",
                         color: "white",
                         textTransform: "uppercase",
                         fontWeight: "bold",
                       }} type="submit">
                         Submit
                      </button>
                   </div>
                </form>
              </div>
              <p> </p>
        </div>
      </>
    )
  }
}

export default CommunityQuestion
