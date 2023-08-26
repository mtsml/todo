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
        // モダールオープン
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

        // モーダルクローズ
        if (!this.props.isOpen && ((prev.isOpen !== this.props.isOpen))) {
            this.setState({
                isEditMode: false,
                title: "",
                detail: ""
            });
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
        setModalIsOpen(false);
    }

    handleRemove = () => {
        const { removeTask, setModalIsOpen } = this.props;
        removeTask(this.props.selectedTask.id);
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

                        <MDBModalFooter className="d-flex justify-content-between">
                            <MDBBtn color='secondary' onClick={() => setModalIsOpen(false)}>
                                閉じる
                            </MDBBtn>
                            {this.state.isEditMode && (
                                <MDBBtn color='danger' onClick={this.handleRemove}>
                                    削除
                                </MDBBtn>
                            )}
                            <MDBBtn onClick={this.handleSubmit}>
                                {this.state.isEditMode
                                    ? "保存"
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