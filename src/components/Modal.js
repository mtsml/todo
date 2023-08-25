import React, { Component, createRef } from 'react';
import {
    MDBBtn,
    MDBInput,
    MDBTextArea,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
} from 'mdb-react-ui-kit'


class Modal extends Component {
    constructor(props) {
        super(props);
        this.ref = createRef(null);
        this.state = {
            title: "",
            detail: ""
        }
    }

    componentDidUpdate(prev) {
        if (this.props.isOpen && (prev.isOpen !== this.props.isOpen)) {
            this.ref.current.focus();
            if (this.props.selectedTask) {
                this.setState({
                    title: this.props.selectedTask.value,
                    detail: this.props.selectedTask.detail
                })
            }
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit = () => {
        const { addTask, setModalIsOpen } = this.props;
        const { title, detail } = this.state;
        addTask(title, detail);
        this.setState({title: "", detail: ""});
        setModalIsOpen(false);
    }

    toggleShow = () => this.props.setModalIsOpen(!this.props.isOpen)

    render() {
        const { isOpen, setModalIsOpen } = this.props;
    
        return (
            <MDBModal show={isOpen} setShow={setModalIsOpen} tabIndex='-1'>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>タスクを追加する</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={this.toggleShow}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <MDBInput
                                className="mb-2"
                                ref={this.ref}
                                name="title"
                                label="タイトル"
                                type="text"
                                value={this.state.title}
                                onChange={this.handleChange}
                            />
                            <MDBTextArea
                                name="detail"
                                label="説明"
                                type="textarea"
                                value={this.state.detail}
                                onChange={this.handleChange}
                            />
                        </MDBModalBody>

                        <MDBModalFooter>
                            <MDBBtn color='secondary' onClick={this.toggleShow}>
                                やめる
                            </MDBBtn>
                            <MDBBtn onClick={this.handleSubmit}>
                                ついか
                            </MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        )
    }
}


export default Modal;