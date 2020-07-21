import React, { Component } from 'react'
import { ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from "axios"
import * as qs from "query-string"


// import axios and query-string

export default class ServicePositive extends Component {
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
        const urlLocations = typeof window !== 'undefined' ? window.location.href : '';
        // Set options for axios. The URL we're submitting to
        // (this.props.location.pathname) is the current page.
        const axiosOptions = {

            method: "post",

            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            data: qs.stringify(formData),

            url: urlLocations
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
                <div className="rating" >

                    <form className="rating-form" ref={this.domRef} name="FeedbackServicePositive" method="POST" data-netlify="true" onSubmit={event => this.handleSubmit(event)} >

                        <ModalHeader toggle={this.toggle}>Awesome!</ModalHeader>
                        <ModalBody>
                            <div className="text-center">
                                {/* this will show wether the form is succesfully be sent or not */}
                                {this.state.feedbackMsg && <p style={{ color: "#420EFF" }}>{this.state.feedbackMsg}</p>}

                                {/* this  is hidden but netlify need it to make sure netlify bot can see the form */}
                                <input ref="form-name" type="hidden" name="form-name" value="FeedbackServicePositive" />

                                <label for="message" style={this.state.showForm ? {} : { display: "none" }}>If you have a minute more, can you share a sentence or two about how this website helped you?</label>
                                <textarea ref="message" class="form-control" id="message" name="message" placeholder="Your feedback here ..." style={this.state.showForm ? {} : { display: "none" }}></textarea>

                            </div>
                        </ModalBody>
                        <ModalFooter style={this.state.showForm ? {} : { display: "none" }}>
                            <p>
                                <button style={{ background: "#420EFF", color: "white", textTransform: "uppercase", fontWeight: "bold" }} type="submit" className="btn btn-dark">Submit</button>
                            </p>
                        </ModalFooter>
                    </form>


                </div>

            </>
        )
    }
}
