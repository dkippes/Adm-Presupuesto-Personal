import axios from 'axios';
import React, { Component } from 'react';
import Balance from './Balance/Balance';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import './OperationPanel.css';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';


class OperationPanel extends Component {

  // STATES
  state = {
    data: [],
    insertModal: false,
    deleteModal: false,
    form: {
      id: '',
      concept: '',
      amount: '',
      type: 0,
      category: '',
      modalType: '',
    },
  };


  // HTTP REQUEST
  getRequest = () => {
    axios
      .get('http://localhost:3000/api/administrations/listOperations')
      .then((response) => {
        this.setState({ data: response.data });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  postRequest = async () => {
    await axios
      .post(
        'http://localhost:3000/api/administrations/addOperation',
        this.state.form
      )
      .then((response) => {
        this.insertModal();
        this.getRequest();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  putRequest = () => {
    axios
      .put(
        `http://localhost:3000/api/administrations/modifyOperation/${this.state.form.id}`,
        this.state.form
      )
      .then((response) => {
        this.insertModal();
        this.getRequest();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  deleteRequest = () => {
    axios
      .delete(`http://localhost:3000/api/administrations/deleteOperation/${this.state.form.id}`)
      .then((response) => {
        this.setState({deleteModal: false})
        this.getRequest();
      });
  };


  // MODAL OPERATIONS
  insertModal = () => {
    this.setState({ insertModal: !this.state.insertModal });
  };

  selectOperation = (operation) => {
    this.setState({
      modalType: 'update',
      form: {
        id: operation.id,
        concept: operation.concept,
        amount: operation.amount,
        type: operation.type,
        category: operation.category,
      },
    });
  };

  handleChange = async (e) => {
    e.persist();

    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  componentDidMount() {
    this.getRequest();
  }


  // OPERATION PANEL RENDER
  render() {
    const { form } = this.state;
    return (
      <>
        <div className="container container-sm operationPanel-container">
          <div className="div-button-add">
            <div>
              <button
                className="btn btn-success btn-add-op"
                onClick={() => {
                  this.setState({ form: null, modalType: 'insert' });
                  this.insertModal();
                }}
              >
                <FontAwesomeIcon icon={faPlus} />
                Add
              </button>
            </div>
            <div>
              <Balance></Balance>
            </div>
          </div>

          <br />
          <br />
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th>Concept</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Accions</th>
              </tr>
            </thead>
            {this.state.data.map((operation) => {
              return (
                <tbody>
                  <tr>
                    <td>{operation.concept}</td>
                    <td>{operation.amount}</td>
                    <td>{operation.type == 1 ? 'Income' : 'Spent'}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          this.selectOperation(operation);
                          this.insertModal();
                        }}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          this.selectOperation(operation);
                          this.setState({ deleteModal: true });
                        }}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </button>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>

          {/* MODAL ADD/UPDATE */}
          <Modal isOpen={this.state.insertModal}>
            <ModalHeader style={{ display: 'block' }}>
              <span
                style={{ float: 'right', cursor: 'pointer' }}
                onClick={() => this.insertModal()}
              >
                x
              </span>
            </ModalHeader>

            <ModalBody>
              <div className="form-group">
                <label htmlFor="concept">Concept</label>
                <input
                  type="hidden"
                  name="id"
                  readOnly
                  value={form ? form.id : ''}
                />
                <input
                  value={form ? form.concept : ''}
                  onChange={this.handleChange}
                  className="form-control"
                  id="concept"
                  name="concept"
                  type="text"
                />
                <br />
                <label htmlFor="amount">Amount</label>
                <input
                  value={form ? form.amount : ''}
                  onChange={this.handleChange}
                  className="form-control"
                  id="amount"
                  name="amount"
                  type="text"
                />
                <br />
                <label htmlFor="type">Type</label>
                {this.state.modalType == 'update' ? (
                  <select
                    className="form-control"
                    onChange={this.handleChange}
                    name="type"
                    id="type"
                    disabled
                  >
                    <option value="0">Spent</option>
                    <option value="1">Income</option>
                  </select>
                ) : (
                  <select
                    className="form-control"
                    onChange={this.handleChange}
                    name="type"
                    id="type"
                  >
                    <option value="0">Spent</option>
                    <option value="1">Income</option>
                  </select>
                )}
                <label htmlFor="category">Category</label>
                <input
                  value={form ? form.category : ''}
                  onChange={this.handleChange}
                  className="form-control"
                  id="category"
                  name="category"
                  type="text"
                />
              </div>
            </ModalBody>

            <ModalFooter>
              {this.state.modalType == 'insert' ? (
                <button
                  className="btn btn-success"
                  onClick={() => this.postRequest()}
                >
                  Insert
                </button>
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={() => this.putRequest()}
                >
                  Update
                </button>
              )}

              <button
                className="btn btn-danger"
                onClick={() => this.insertModal()}
              >
                Cancel
              </button>
            </ModalFooter>
          </Modal>

          {/* MODAL DELETE */}
          <Modal isOpen={this.state.deleteModal}>
            <ModalBody style={{ textAlign: 'center' }}>
              Are you sure you want to delete this operation?
            </ModalBody>
            <ModalFooter>
              <button
                className="btn btn-danger"
                onClick={() => this.deleteRequest()}
              >
                Sí
              </button>
              <button
                className="btn btn-secundary"
                onClick={() => this.setState({ deleteModal: false })}
              >
                No
              </button>
            </ModalFooter>
          </Modal>
        </div>
      </>
    );
  }
}

export default OperationPanel;
