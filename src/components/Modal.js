import React, { Component, createRef } from 'react';
import {
    MDBBtn,
    MDBInput,
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
            newTask: ""
        }
    }

    componentDidUpdate(prev) {
        if (this.props.isOpen && (prev.isOpen !== this.props.isOpen)) {
            this.ref.current.focus();
        }
    }

    handleChange = (e) => {
        this.setState({newTask: e.target.value});
    }

    handleSubmit = () => {
        const { setTodoList, setModalIsOpen, todoList } = this.props;
        const { newTask } = this.state;
        const id = crypto.randomUUID();
        setTodoList([...todoList, { id, value: newTask, done: false }]);
        this.setState({newTask: ""});
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
                                ref={this.ref}
                                type="text"
                                name="task"
                                value={this.state.newTask}
                                onChange={this.handleChange}
                            />
                        </MDBModalBody>

                        <MDBModalFooter>
                            <MDBBtn color='secondary' onClick={this.toggleShow}>
                                Close
                            </MDBBtn>
                            <MDBBtn onClick={this.handleSubmit}>
                                追加
                            </MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        )
    }
}


export default Modal;