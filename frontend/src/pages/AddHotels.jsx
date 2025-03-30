import React, { Component } from 'react';
import axios from 'axios';
import Navbar from '../components/AdminNavbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import './AddHouse.css';

class AddHotel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image1: null,
      image2: null,
      image3: null,
      image4: null,
      image5: null,
      image6: null,
      description: '',
      district: '',
      address: '',
      no_of_rooms: '',
      land_size: '',
      distance: '',
      keyWord:'',
      responseMsg: {
        status: '',
        message: '',
        error: '',
      },
      hotels: [],
    };
  }

  fetchHotels = () => {
    axios.get('http://127.0.0.1:5000/displayHotel')
      .then((response) => {
        console.log(response.data);
        this.setState({ hotels: response.data });
      })
      .catch((error) => {
        console.error('Error fetching hotels:', error);
      });
  };

  componentDidMount() {
    this.fetchHotels();
  }

  handleFileChange = (e) => {
    const { name, files } = e.target;
    this.setState({ [name]: files[0] });
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  submitHandler = (e) => {
    const { district, address, no_of_rooms,land_size, distance,keyWord } = this.state;
  
    const message = `
      District: ${district}
      Address: ${address}
      Number of Rooms: ${no_of_rooms}
      Land Size: ${land_size}
      Distance: ${distance}
      Key Word: ${keyWord}
    `;
  
    if (window.confirm(`Please confirm the following details:\n${message}`)) {
      e.preventDefault();
      
      const data = new FormData();
      data.append('image1', this.state.image1);
      data.append('image2', this.state.image2);
      data.append('image3', this.state.image3);
      data.append('image4', this.state.image4);
      data.append('image5', this.state.image5);
      data.append('image6', this.state.image6);
      data.append('description', this.state.description);
      data.append('district', district);
      data.append('address', address);
      data.append('no_of_rooms', no_of_rooms);
      data.append('land_size', land_size);
      data.append('distance', distance);
      data.append('keyWord', keyWord);
  
      axios.post('http://127.0.0.1:5000/addHotel', data)
        .then((response) => {
          console.log(response);
          if (response.status === 201) {
            this.setState({
              responseMsg: {
                status: 'success',
                message: 'Successfully Uploaded',
                error: '',
              },
            });
  
            this.fetchHotels(); 
  
            setTimeout(() => {
              this.setState({
                image1: null,
                image2: null,
                image3: null,
                image4: null,
                image5: null,
                image6: null,
                description: '',
                district: '',
                address: '',
                no_of_rooms: '',
                land_size: '',
                distance: '',
                keyWord: '',
                responseMsg: {
                  status: '',
                  message: '',
                  error: '',
                },
              });
              document.querySelector('#hotelForm').reset(); 
            }, 1000);
          }
        })
        .catch((error) => {
          console.error(error);
          if (error.response) {
            this.setState({
              responseMsg: {
                status: 'failed',
                message: '',
                error: 'Upload Failed',
              },
            });
          }
        });
    }
  };

  deleteImage = (id) => {
    if (window.confirm('Are you sure you want to delete this?')) {
      axios.delete(`http://127.0.0.1:5000/deleteHotel/${id}`)
        .then((response) => {
          if (response.status === 200) {
            this.fetchHotels();
          }
        })
        .catch((error) => {
          console.error("There was an error deleting the image!", error);
        });
    }
  };
  render() {
    const { responseMsg, hotels } = this.state;

    return (
      <div>
        <Navbar />
        <div className='body'>
          <form onSubmit={this.submitHandler} encType="multipart/form-data" id="hotelForm">
            {responseMsg.status === 'success' && <div style={{ color: 'green' }}>{responseMsg.message}</div>}
            {responseMsg.status === 'failed' && <div style={{ color: 'red' }}>{responseMsg.error}</div>}
            {responseMsg.error && <div style={{ color: 'red' }}>{responseMsg.error}</div>}<br />
            
            <div className='bodyProperties'>
              <h5>Add Details</h5>
              <Container className="custom-container">
                <Row>
                  <Col>
                    <label htmlFor="district">District</label><br />
                    <input
                      type="text"
                      name="district"
                      value={this.state.district}
                      onChange={this.handleInputChange}
                      className="form-control"
                    /><br />
                  </Col>
                  <Col>
                    <label htmlFor="address">Address</label><br />
                    <input
                      type="text"
                      name="address"
                      value={this.state.address}
                      onChange={this.handleInputChange}
                      className="form-control"
                    /><br />
                  </Col>

                </Row>
                <Row>
                  <Col>
                    <label htmlFor="no_of_rooms">Number of Rooms</label><br />
                    <input
                      type="number"
                      name="no_of_rooms"
                      value={this.state.no_of_rooms}
                      onChange={this.handleInputChange}
                      className="form-control"
                    /><br />
                  </Col>
                  <Col>
                    <label htmlFor="land_size">Land Size(perches)</label><br />
                    <input
                      type="number"
                      name="land_size"
                      value={this.state.land_size}
                      onChange={this.handleInputChange}
                      className="form-control"
                    /><br />
                  </Col>
                </Row>
                <Row>
                 
                  <Col>
                    <label htmlFor="distance">Distance to town (KM)'</label><br />
                    <input
                      type="number"
                      name="distance"
                      value={this.state.distance}
                      onChange={this.handleInputChange}
                      className="form-control"
                    /><br />
                  </Col>
                  <Col>
                    <label htmlFor="keyWord">Key word</label><br />
                    <input
                      type="text"
                      name="keyWord"
                      value={this.state.keyWord}
                      onChange={this.handleInputChange}
                      className="form-control"
                    /><br />
                  </Col>
                </Row>
                
                <label htmlFor="description">Description</label><br />
                <textarea
                  name="description"
                  value={this.state.description}
                  onChange={this.handleInputChange}
                  className="form-control"
                  rows={4}
                  cols={50}
                /><br />
              </Container>
            </div>
            
            <div className='bodyProperties'>
              <h5>Add Images</h5>
              <Container className="custom-container">
                <Row>
                  <Col>
                    <label htmlFor="image1">Image 1</label><br />
                    <input type="file" name="image1" onChange={this.handleFileChange} className="form-control" /><br />
                  </Col>
                  <Col>
                    <label htmlFor="image2">Image 2</label><br />
                    <input type="file" name="image2" onChange={this.handleFileChange} className="form-control" /><br />
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <label htmlFor="image3">Image 3</label><br />
                    <input type="file" name="image3" onChange={this.handleFileChange} className="form-control" /><br />
                  </Col>
                  <Col>
                    <label htmlFor="image4">Image 4</label><br />
                    <input type="file" name="image4" onChange={this.handleFileChange} className="form-control" /><br />
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <label htmlFor="image5">Image 5</label><br />
                    <input type="file" name="image5" onChange={this.handleFileChange} className="form-control" /><br />
                  </Col>
                  <Col>
                    <label htmlFor="image6">Image 6</label><br />
                    <input type="file" name="image6" onChange={this.handleFileChange} className="form-control" /><br />
                  </Col>
                </Row>
              </Container>
            </div>

            

            <button type="submit">Upload</button>
          </form><br /><br />
        </div>

        <h4 style={{ marginLeft: 15 }}>Listed Properties</h4>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>ID</th>
              <th>District</th>
              <th>Address</th>
              <th>Number of Rooms</th>
              <th>Land Size</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {hotels.map((hotel, index) => (
              <tr key={hotel.id}>
                <td>{index + 1}</td>
                <td>{hotel.id}</td>
                <td>{hotel.district}</td>
                <td>{hotel.address}</td>
                <td>{hotel.no_of_rooms}</td>
                <td>{hotel.land_size}</td>
                <td>
                  {hotel.images && hotel.images.length > 0 && hotel.images[0].image1 ? (
                    <img
                      src={`http://127.0.0.1:5000/static/uploads/${hotel.images[0].image1}`}
                      alt={`Hotel ${index + 1}`}
                      style={{ width: '100px' }}
                    />
                  ) : (
                    <span>No Image</span>
                  )}
                </td>
                
                <td>
                  <button className="btn btn-danger" onClick={() => this.deleteImage(hotel.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default AddHotel;
