import axios from 'axios';
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import './OperationPanel.css';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Link } from 'react-router-dom';

class OperationPanel extends Component {
  state = {
    data: [],
    modalInsertar: false,
    form: {
        id: '',
      concept: '',
      amount: '',
      type: 0,
      category: '',
      tipoModal: '',
    },
  };
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
        this.modalInsertar();
        this.getRequest();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  putRequest = () => {
      axios
        .put(
          `http://localhost:3000/api/administrations/modifyOperation/${this.state.form.id}`, this.state.form
        )
        .then((response) => {
          this.modalInsertar();
          this.getRequest();
        })
        .catch((err) => {
          console.log(err.message);
        });
  }

  modalInsertar = () => {
    this.setState({ modalInsertar: !this.state.modalInsertar });
  };

  seleccionarOperacion = (operation) => {
    this.setState({
      tipoModal: 'actualizar',
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
    console.log(this.state.form);
  };

  componentDidMount() {
    this.getRequest();
  }

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
                  this.setState({ form: null, tipoModal: 'insertar' });
                  this.modalInsertar();
                }}
              >
                <FontAwesomeIcon icon={faPlus} />
                Add
              </button>
            </div>
            <div>
              <Link to="/login">ah</Link>
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
                          this.seleccionarOperacion(operation);
                          this.modalInsertar();
                        }}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button className="btn btn-danger">
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </button>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>

          <Modal isOpen={this.state.modalInsertar}>
            <ModalHeader style={{ display: 'block' }}>
              <span
                style={{ float: 'right' }}
                onClick={() => this.modalInsertar()}
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
              {this.state.tipoModal == 'insertar' ? (
                <button
                  className="btn btn-success"
                  onClick={() => this.postRequest()}
                >
                  Insertar
                </button>
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={() => this.putRequest()}
                >
                  Actualizar
                </button>
              )}

              <button
                className="btn btn-danger"
                onClick={() => this.modalInsertar()}
              >
                Cancelar
              </button>
            </ModalFooter>
          </Modal>
        </div>
      </>
    );
  }
}

export default OperationPanel;
