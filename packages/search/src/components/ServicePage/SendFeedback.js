


import React, { Component } from 'react'
import { Button, Modal } from 'reactstrap';

import PositiveFeedback from "../ServicePage/ServicePositive"
import NegativeFeedback from "../ServicePage/ServiceNegative"


// import components for feedback


export default class SendFeedback extends Component {
    constructor(props) {
        // Do intro stuff ...
        super(props)
        this.domRef = React.createRef()
        this.state = {

            modal: false,
            showNegativeFeedback: false,
            showPositiveFeedback: false

        }

    }


    //Toggle between showing pop up or not

    toggle = () => {


        this.setState({
            modal: !this.state.modal
        })

    }

    render() {

        return (
            <div>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" ></link>


                {/* //Send feedback button */}
                <Button style={{
                    background: "#fff",
                    border: ".05rem solid #5627ff",
                    borderRadius: ".2rem",
                    color: "#5627ff",
                    cursor: "pointer",
                    display: "inline-block",
                    fontSize: ".7rem",
                    fontWeight: "700",
                    height: "1.4rem",
                    lineHeight: "1.2rem",
                    outline: 0,
                    padding: ".05rem .3rem",
                    textAlign: "center",
                    textDecoration: "none",
                    transition: " background .2s,border .2s,box-shadow .2s,color .2s",
                    userSelect: "none",
                    verticalAlign: "middle",
                    whiteSpace: "nowrap"
                }} onClick={this.toggle}>{this.props.buttonLabel}</Button>



                {/* Pop up toggle*/}

                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>


                    {/* check first if negative or positive feedback already clicked if not show this div */}

                    <div className="" style={this.state.showNegativeFeedback || this.state.showPositiveFeedback ? { display: "none" } : {}} >
                        <div className="text-center mt-1 mb-5" toggle={this.toggle}>

                            <h5>  How was your experience with papergov?</h5>
                        </div>

                        <div style={{ textAlign: "center" }}>
                            <div className="text-center">
                                <p>
                                    {/* 
                                    button positive feedback */}
                                    <Button style={{
                                        background: "#fff",
                                        border: ".05rem solid #5627ff",
                                        borderRadius: ".2rem",
                                        color: "#5627ff",
                                        cursor: "pointer",
                                        display: "inline-block",
                                        fontSize: ".9rem",
                                        fontWeight: "700",
                                        height: "2rem",
                                        lineHeight: "1.2rem",
                                        outline: 0,
                                        padding: ".35rem .6rem",
                                        textAlign: "center",
                                        textDecoration: "none",
                                        transition: " background .2s,border .2s,box-shadow .2s,color .2s",


                                        userSelect: "none",
                                        verticalAlign: "middle",
                                        whiteSpace: "nowrap"
                                    }} onClick={() => this.setState({
                                        showPositiveFeedback: !this.state.showPositiveFeedback
                                    })}> Good so far &#128515; </Button>
                                </p>




                                <p>

                                    {/* 
button negative feedback */}

                                    <Button style={{
                                        background: "#fff",
                                        border: ".05rem solid #5627ff",
                                        borderRadius: ".2rem",
                                        color: "#5627ff",
                                        cursor: "pointer",
                                        display: "inline-block",
                                        fontSize: ".9rem",
                                        fontWeight: "700",
                                        height: "2rem",
                                        lineHeight: "1.2rem",
                                        outline: 0,
                                        padding: ".35rem .6rem",
                                        textAlign: "center",
                                        textDecoration: "none",
                                        transition: " background .2s,border .2s,box-shadow .2s,color .2s",
                                        userSelect: "none",
                                        verticalAlign: "middle",
                                        whiteSpace: "nowrap"
                                    }} onClick={() => this.setState({
                                        showNegativeFeedback: !this.state.showNegativeFeedback
                                    })}>It could have been better &#128528; </Button>
                                </p>

                            </div>

                        </div>

                    </div>

                    {/* if button good feedback is clicked this will showup */}

                    <div style={this.state.showPositiveFeedback ? {} : { display: "none" }}>


                        <PositiveFeedback />
                    </div>

                    {/* if button negative feedback is clicked this will showup */}

                    <div style={this.state.showNegativeFeedback ? {} : { display: "none" }}>
                        <NegativeFeedback />
                    </div>

                </Modal>
            </div>
        )
    }
}
