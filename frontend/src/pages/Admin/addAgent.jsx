import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table } from 'reactstrap';
import Navbar from '../../components/AdminNavbar';
import axios from 'axios';

export default function AddAgent() {
  const [state, setState] = useState({
    name: '',
    address: '',
    NIC: '',
    email: '',
    TP: '',
    password: '',
  });

  const [agents, setAgents] = useState([]);
  const [responseMsg, setResponseMsg] = useState({
    status: '',
    message: '',
    error: ''
  });

  const fetchAgents = () => {
    axios.get('http://127.0.0.1:5000/displayAgents')
      .then((response) => {
        setAgents(response.data);
      })
      .catch((error) => {
        console.error('Error fetching agents:', error);
      });
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const deleteAgent = (id) => {
    if (window.confirm('Are you sure you want to remove this Agent?')) {
      axios.delete(`http://127.0.0.1:5000/deleteAgent/${id}`)
        .then((response) => {
          if (response.status === 200) {
            fetchAgents();
          }
        })
        .catch((error) => {
          console.error("There was an error deleting the agent!", error);
        });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const { name, address, NIC, email, TP, password } = state;

    const message = `
      Name: ${name}
      Address: ${address}
      NIC: ${NIC}
      Email: ${email}
      TP: ${TP}
      Password: ${password}
    `;

    if (window.confirm(`Please confirm the following details:\n${message}`)) {
      const data = {
        name,
        address,
        NIC,
        email,
        TP,
        password,
      };

      axios.post('http://127.0.0.1:5000/addAgent', data)
        .then((response) => {
          if (response.status === 201) {
            setResponseMsg({
              status: 'success',
              message: 'Successfully Uploaded',
              error: '',
            });

            setTimeout(() => {
              setState({
                name: '',
                address: '',
                NIC: '',
                email: '',
                TP: '',
                password: '',
              });
              setResponseMsg({
                status: '',
                message: '',
                error: '',
              });
              document.querySelector('#agentForm').reset();
              fetchAgents();
            }, 1000);
          }
        })
        .catch((error) => {
          if (error.response) {
            setResponseMsg({
              status: 'failed',
              message: '',
              error: 'Upload Failed',
            });
          }
        });
    }
  };

  return (
    <div>
      <Navbar />
      <div className='body'>
        <form onSubmit={submitHandler} id="agentForm">
          {responseMsg.status === 'success' && <div style={{ color: 'green' }}>{responseMsg.message}</div>}
          {responseMsg.status === 'failed' && <div style={{ color: 'red' }}>{responseMsg.error}</div>}<br />

          <div className='bodyProperties'>
            <h5>Add Agent</h5>
            <Container className="custom-container">
              <Row>
                <Col>
                  <label htmlFor="name">Name</label><br />
                  <input
                    type="text"
                    name="name"
                    value={state.name}
                    onChange={handleInputChange}
                    className="form-control"
                  /><br />
                </Col>
                <Col>
                  <label htmlFor="address">Address/area</label><br />
                  <input
                    type="text"
                    name="address"
                    value={state.address}
                    onChange={handleInputChange}
                    className="form-control"
                  /><br />
                </Col>
              </Row>
              <Row>
                <Col>
                  <label htmlFor="NIC">NIC</label><br />
                  <input
                    type="text"
                    name="NIC"
                    value={state.NIC}
                    onChange={handleInputChange}
                    className="form-control"
                  /><br />
                </Col>
                <Col>
                  <label htmlFor="email">Email</label><br />
                  <input
                    type="email"
                    name="email"
                    value={state.email}
                    onChange={handleInputChange}
                    className="form-control"
                  /><br />
                </Col>
              </Row>
              <Row>
                <Col>
                  <label htmlFor="TP">Telephone Number</label><br />
                  <input
                    type="number"
                    name="TP"
                    value={state.TP}
                    onChange={handleInputChange}
                    className="form-control"
                  /><br />
                </Col>
                <Col>
                  <label htmlFor="password">Password</label><br />
                  <input
                    type="password"
                    name="password"
                    value={state.password}
                    onChange={handleInputChange}
                    className="form-control"
                  /><br />
                </Col>
              </Row>
             <br />
            </Container>
          </div>
          <button type="submit">Upload</button>
        </form><br /><br />
      </div>

      <h4 style={{ marginLeft: 15 }}>Listed Agents</h4>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Address</th>
            <th>NIC</th>
            <th>Email</th>
            <th>Telephone</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {agents.map((agent) => (
            <tr key={agent.id}>
              <td>{agent.id}</td>
              <td>{agent.name}</td>
              <td>{agent.address}</td>
              <td>{agent.NIC}</td>
              <td>{agent.email}</td>
              <td>{agent.TP}</td>
              <td>
                <button onClick={() => deleteAgent(agent.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
