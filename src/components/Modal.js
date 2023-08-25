import React, { Component, createRef } from 'react';
import {
    MDBBtn,
    MDBInput,
    MDBTextArea,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalBody,
    MDBModalFooter,
} from 'mdb-react-ui-kit'


class Modal extends Component {
    constructor(props) {
        super(props);
        this.ref = createRef(null);
        this.state = {
            isEditMode: false,
            title: "",
            detail: ""
        }
    }

    componentDidUpdate(prev) {
        if (this.props.isOpen && (prev.isOpen !== this.props.isOpen)) {
            if (this.props.selectedTask) {
                this.setState({
                    isEditMode: true,
                    title: this.props.selectedTask.value,
                    detail: this.props.selectedTask.detail
                })
            } else {
                this.ref.current.focus();
            }
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit = () => {
        const { addTask, updateTask, setModalIsOpen } = this.props;
        this.state.isEditMode
            ? updateTask(this.props.selectedTask.id, this.state.title, this.state.detail)
            : addTask(this.state.title, this.state.detail);
        this.setState({
            isEditMode: false,
            title: "",
            detail: ""
        });
        setModalIsOpen(false);
    }

    render() {
        const { isOpen, setModalIsOpen } = this.props;
    
        return (
            <MDBModal show={isOpen} setShow={setModalIsOpen} tabIndex='-1'>
                <MDBModalDialog>
                    <MDBModalContent>
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
                            <MDBBtn color='secondary' onClick={() => setModalIsOpen(false)}>
                                やめる
                            </MDBBtn>
                            <MDBBtn onClick={this.handleSubmit}>
                                {this.state.isEditMode
                                    ? "更新"
                                    : "追加"
                                }
                            </MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        )
    }
}


export default Modal;