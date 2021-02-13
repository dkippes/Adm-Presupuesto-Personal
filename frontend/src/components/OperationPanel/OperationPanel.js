import axios from 'axios';
import React, { Component } from 'react';

import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';


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
      userLogged: sessionStorage.getItem('userLogged'),
    },
  };
  getRequest = () => {
    axios
      .get('http://localhost:3000/api/administrations/listOperations')
      .then((response) => {
        this.setState({ data: response.data });
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

  modalInsertar = () => {
    this.setState({ modalInsertar: !this.state.modalInsertar });
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
      <div>
        <button
          className="btn btn-success"
          onClick={() => this.modalInsertar()}
        >
          Agregar
        </button>
        <br />
        <br />
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Concept</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Acciones</th>
            </tr>
          </thead>
          {this.state.data.map((operation) => {
            return (
              <tr>
                <td>{operation.id}</td>
                <td>{operation.concept}</td>
                <td>{operation.amount}</td>
                <td>{operation.type == 1 ? 'Ingreso' : 'Egreso'}</td>
                <td>
                  <button className="btn btn-primary">Edit</button>
                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
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
              >
                <option value="0">Egreso</option>
                <option value="1">1ngreso</option>
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
            <button
              className="btn btn-success"
              onClick={() => this.postRequest()}
            >
              Insertar
            </button>
            <button
              className="btn btn-danger"
              onClick={() => this.modalInsertar()}
            >
              Cancelar
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default OperationPanel;
