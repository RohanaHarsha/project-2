import React, { Component } from 'react';
import axios from 'axios';
import Navbar from '../components/AdminNavbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import './AddHouse.css';

class AddHouse extends Component {
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
      no_of_bathrooms: '',
      land_size: '',
      distance: '',
      houseType: '',
      storey:'',
      keyWord:'',
      price:'',
      lat:'',
      lng:'',
      responseMsg: {
        status: '',
        message: '',
        error: '',
      },
      houses: [],
    };
  }

  fetchHouses = () => {
    axios.get('http://127.0.0.1:5000/displayHouses')
      .then((response) => {
        console.log(response.data);
        this.setState({ houses: response.data });
      })
      .catch((error) => {
        console.error('Error fetching houses:', error);
      });
  };

  componentDidMount() {
    this.fetchHouses();
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
    const { district, address, no_of_rooms, no_of_bathrooms, land_size, distance, houseType, storey, keyWord,lng,lat,price } = this.state;
  
    const message = `
      District: ${district}
      Address: ${address}
      Number of Rooms: ${no_of_rooms}
      Number of Bathrooms: ${no_of_bathrooms}
      Land Size: ${land_size}
      Distance: ${distance}
      House Type: ${houseType}
      Storey: ${storey}
      Key Word: ${keyWord}
      lng: ${lng}
      lat: ${lat}
      price: ${price}
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
      data.append('no_of_bathrooms', no_of_bathrooms);
      data.append('land_size', land_size);
      data.append('distance', distance);
      data.append('houseType', houseType);
      data.append('storey', storey);
      data.append('keyWord', keyWord);
      data.append('lng', lng);
      data.append('lat', lat);
      data.append('price', price);
  
      axios.post('http://127.0.0.1:5000/addLuxuryHouse', data)
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
  
            this.fetchHouses(); // Assuming fetchHouses() updates your house list after successful upload
  
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
                no_of_bathrooms: '',
                land_size: '',
                distance: '',
                houseType: '',
                storey: '',
                keyWord: '',
                lng: '',
                lat: '',
                price: '',
                responseMsg: {
                  status: '',
                  message: '',
                  error: '',
                },
              });
              document.querySelector('#houseForm').reset(); // Reset the form
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
    if (window.confirm('Are you sure you want to delete this image?')) {
      axios.delete(`http://127.0.0.1:5000/deleteHouse/${id}`)
        .then((response) => {
          if (response.status === 200) {
            this.fetchHouses();
          }
        })
        .catch((error) => {
          console.error("There was an error deleting the image!", error);
        });
    }
  };
  render() {
    const { responseMsg, houses } = this.state;

    return (
      <div>
        <Navbar />
        <div className='body'>
          <form onSubmit={this.submitHandler} encType="multipart/form-data" id="houseForm">
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
                    <label htmlFor="lat">Latitude</label><br />
                    <input
                      type="number"
                      name="lat"
                      value={this.state.lat}
                      onChange={this.handleInputChange}
                      className="form-control"
                    /><br />
                  </Col>
                  <Col>  
                    <label htmlFor="lng">Longitude</label><br />
                    <input
                      type="number"
                      name="lng"
                      value={this.state.lng}
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
                    <label htmlFor="no_of_bathrooms">Number of Bathrooms</label><br />
                    <input
                      type="number"
                      name="no_of_bathrooms"
                      value={this.state.no_of_bathrooms}
                      onChange={this.handleInputChange}
                      className="form-control"
                    /><br />
                </Col> 
                </Row>
                <Row>
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
                </Row>
                <Row>
                  <Col>
                    <label htmlFor="storey">storey</label><br />
                    <input
                      type="number"
                      name="storey"
                      value={this.state.storey}
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
                
                <Row>
                  <Col>
                  <label htmlFor="description">Description</label><br />
                    <textarea
                      name="description"
                      value={this.state.description}
                      onChange={this.handleInputChange}
                      className="form-control"
                      rows={4}
                      cols={50}
                    /><br />
                  </Col>
                  <Col>  
                    <label htmlFor="price">Price in Million</label><br />
                    <input
                      type="number"
                      name="price"
                      value={this.state.price}
                      onChange={this.handleInputChange}
                      className="form-control"
                    /><br />
                </Col> 
                </Row>
                
                
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
                    <label htmlFor="image5">360-Image 1</label><br />
                    <input type="file" name="image5" onChange={this.handleFileChange} className="form-control" /><br />
                  </Col>
                  <Col>
                    <label htmlFor="image6">360-Image 2</label><br />
                    <input type="file" name="image6" onChange={this.handleFileChange} className="form-control" /><br />
                  </Col>
                </Row>
              </Container>
            </div>

            <div className='bodyProperties'>
              <h5>Select House Type</h5>

              <input
                type="radio"
                id="LuxuryHouse"
                name="houseType"
                value="Luxury House"
                onChange={this.handleInputChange}
              />
              <label htmlFor="LuxuryHouse">Luxury House</label><br />
              <input
                type="radio"
                id="BudgetHouse"
                name="houseType"
                value="Budget House"
                onChange={this.handleInputChange}
              />
              <label htmlFor="BudgetHouse">Budget House</label><br />

              <input
                type="radio"
                id="Apartment"
                name="houseType"
                value="Apartment"
                onChange={this.handleInputChange}
              />
              <label htmlFor="LuxuryHouse">Apartment</label><br /><br />
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
              <th>Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {houses.map((house, index) => (
              <tr key={house.id}>
                <td>{index + 1}</td>
                <td>{house.id}</td>
                <td>{house.district}</td>
                <td>{house.address}</td>
                <td>{house.no_of_rooms}</td>
                <td>{house.land_size}</td>
                <td>
                  {house.images && house.images.length > 0 && house.images[0].image1 ? (
                    <img
                      src={`http://127.0.0.1:5000/static/uploads/${house.images[0].image1}`}
                      alt={`House ${index + 1}`}
                      style={{ width: '100px' }}
                    />
                  ) : (
                    <span>No Image</span>
                  )}
                </td>
                <td>{house.houseType}</td>
                <td>
                  <button className="btn btn-danger" onClick={() => this.deleteImage(house.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default AddHouse;
