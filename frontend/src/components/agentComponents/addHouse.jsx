import React, { Component } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../../pages/AddHouse.css';

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
      storey: '',
      keyWord: '',
      user_id: props.userId || '', // Get the userId from props
      user_email: props.user_email || '', // Add user_email to state
      lng: '',
      lat: '',
      price: '',
      responseMsg: {
        status: '',
        message: '',
        error: '',
      },
      houseId: null,
    };
  }

  componentDidMount() {
    const { user_id, user_email } = this.state;
    console.log('User ID:', user_id);
    console.log('User Email:', user_email);
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
    e.preventDefault(); 
  
    const { district, address, no_of_rooms, no_of_bathrooms, land_size, distance, houseType, storey, keyWord, user_id, user_email,lng,lat,price } = this.state;
  
    // Simple validation logic
    if (!district || !address || !no_of_rooms || !no_of_bathrooms || !land_size || !houseType || !keyWord || !lng || !lat || !price) {
      this.setState({
        responseMsg: {
          status: 'failed',
          error: 'Please fill in all required fields!',
        }
      });
      return;
    }
  
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
    data.append('house_type', houseType);
    data.append('storey', storey);
    data.append('keyWord', keyWord);
    data.append('agentId', user_id);
    data.append('agentEmail', user_email);
    data.append('lng', lng);
    data.append('lat', lat);
    data.append('price', price);
  
    axios.post('http://127.0.0.1:5000/addAgentHouse', data)
      .then((response) => {
        // Handle successful response
        this.setState({
          responseMsg: {
            status: 'success',
            message: 'Successfully Uploaded',
            error: '',
          }
        });
        // Reset form
        document.querySelector('#houseForm').reset();
      })
      .catch((error) => {
        console.error(error);
        if (error.response) {
          this.setState({
            responseMsg: {
              status: 'failed',
              error: 'Upload Failed!',
            }
          });
        }
      });
  };

  render() {
    const { responseMsg} = this.state;

    return (
      <div>
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
                    <label htmlFor="price">Price</label><br />
                    <input
                      type="text"
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
                    <input type="file" id="image1" name="image1" onChange={this.handleFileChange} className="form-control" /><br />
                  </Col>
                  <Col>
                    <label htmlFor="image2">Image 2</label><br />
                    <input type="file" id="image2" name="image2" onChange={this.handleFileChange} className="form-control" /><br />
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <label htmlFor="image3">Image 3</label><br />
                    <input type="file" id="image3" name="image3" onChange={this.handleFileChange} className="form-control" /><br />
                  </Col>
                  <Col>
                    <label htmlFor="image4">Image 4</label><br />
                    <input type="file" id="image4" name="image4" onChange={this.handleFileChange} className="form-control" /><br />
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <label htmlFor="image5">Image 5</label><br />
                    <input type="file" id="image5" name="image5" onChange={this.handleFileChange} className="form-control" /><br />
                  </Col>
                  <Col>
                    <label htmlFor="image6">Image 6</label><br />
                    <input type="file" id="image6" name="image6" onChange={this.handleFileChange} className="form-control" /><br />
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
        
      </div>
    );
  }
}

export default AddHouse;
