


import React, { Component } from 'react'
import { Button, Modal } from 'reactstrap';
import ContributeForm from './ContributeForm';
import styles from "../components/spectre.min.module.css";


// import components for feedback


export default class ContributeTime extends Component {
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


                {/* //Contribute button */}
                <Button style={{
                    background: "#fff",
                    border: ".05rem solid #5627ff",
                    borderRadius: ".2rem",
                    color: "#5627ff",
                    cursor: "pointer",
                    display: "inline-block",
                    fontSize: "0.9rem",
                    fontWeight: "700",
                    height: "1.7rem",
                    lineHeight: "1.2rem",
                    padding: ".10rem .5rem",
                    textAlign: "center",
                    textDecoration: "none",
                    transition: " background .2s,border .2s,box-shadow .2s,color .2s",
                    userSelect: "none",
                    verticalAlign: "middle",
                    whiteSpace: "nowrap"
                }} onClick={this.toggle}>{this.props.buttonLabel}</Button>



                {/* Pop up toggle*/}

                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>




                    <div className={`${styles.column} ${styles.col12}`}>
                        <div className="text-center mt-1 mb-5" toggle={this.toggle}>
                            <ContributeForm></ContributeForm>
                        </div>

                    </div>



                </Modal>
            </div>
        )
    }
}
