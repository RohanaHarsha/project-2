import React, { Component } from "react";
import axios from "axios";
import Navbar from "../components/AdminNavbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import "./AddHouse.css";
import Sidebar from "../components/common/sidebar";

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
      description: "",
      district: "",
      address: "",
      no_of_rooms: "",
      no_of_bathrooms: "",
      land_size: "",
      distance: "",
      houseType: "",
      storey: "",
      keyWord: "",
      price: "",
      lat: "",
      lng: "",
      responseMsg: {
        status: "",
        message: "",
        error: "",
      },
      houses: [],
    };
  }

  componentDidMount() {
    this.fetchHouses();
  }

  fetchHouses = () => {
    axios
      .get("https://project-2-vdwg.onrender.com/house/displayHouses")
      .then((response) => {
        console.log("GET /house/displayHouses status:", response.status);
        console.log("GET /house/displayHouses data:", response.data);
        this.setState({ houses: response.data || [] });
      })
      .catch((error) => {
        console.error(
          "Error fetching houses:",
          error,
          error.response && error.response.data
        );
      });
  };

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

    const {
      district,
      address,
      no_of_rooms,
      no_of_bathrooms,
      land_size,
      distance,
      houseType,
      storey,
      keyWord,
      lng,
      lat,
      price,
    } = this.state;

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
      const data = new FormData();
      for (let i = 1; i <= 6; i++) {
        data.append(`image${i}`, this.state[`image${i}`]);
      }
      data.append("description", this.state.description);
      data.append("district", district);
      data.append("address", address);
      data.append("no_of_rooms", no_of_rooms);
      data.append("no_of_bathrooms", no_of_bathrooms);
      data.append("land_size", land_size);
      data.append("distance", distance);
      data.append("houseType", houseType);
      data.append("storey", storey);
      data.append("keyWord", keyWord);
      data.append("lng", lng);
      data.append("lat", lat);
      data.append("price", price);

      axios
        .post("https://project-2-vdwg.onrender.com/house/addLuxuryHouse", data)
        .then((response) => {
          if (response.status === 200 || response.status === 201) {
            this.setState({
              responseMsg: {
                status: "success",
                message: "Successfully Uploaded",
                error: "",
              },
            });
            this.fetchHouses();
            setTimeout(() => {
              this.setState({
                image1: null,
                image2: null,
                image3: null,
                image4: null,
                image5: null,
                image6: null,
                description: "",
                district: "",
                address: "",
                no_of_rooms: "",
                no_of_bathrooms: "",
                land_size: "",
                distance: "",
                houseType: "",
                storey: "",
                keyWord: "",
                lng: "",
                lat: "",
                price: "",
                responseMsg: {
                  status: "",
                  message: "",
                  error: "",
                },
              });
              document.querySelector("#houseForm").reset();
            }, 1000);
          }
        })
        .catch((error) => {
          if (error.response) {
            this.setState({
              responseMsg: {
                status: "failed",
                message: "",
                error: "Upload Failed",
              },
            });
          }
        });
    }
  };

  deleteImage = (id) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      axios
        .delete(`https://project-2-vdwg.onrender.com/house/deleteHouse/${id}`)
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
      <div className="page-with-sidebar">
        <Sidebar />

        <div className="page-content">
          <form
            onSubmit={this.submitHandler}
            id="houseForm"
            encType="multipart/form-data"
          >
            {responseMsg.status === "success" && (
              <div className="msg-success">{responseMsg.message}</div>
            )}
            {responseMsg.status === "failed" && (
              <div className="msg-error">{responseMsg.error}</div>
            )}

            <Container className="px-4">
              <h3 className="page-title">Add House Details</h3>

              <Row className="mb-3">
                <Col md={6}>
                  <input
                    name="district"
                    placeholder="District"
                    className="form-control"
                    onChange={this.handleInputChange}
                  />
                </Col>
                <Col md={6}>
                  <input
                    name="address"
                    placeholder="Address"
                    className="form-control"
                    onChange={this.handleInputChange}
                  />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <input
                    name="lat"
                    type="number"
                    placeholder="Latitude"
                    className="form-control"
                    onChange={this.handleInputChange}
                  />
                </Col>
                <Col md={6}>
                  <input
                    name="lng"
                    type="number"
                    placeholder="Longitude"
                    className="form-control"
                    onChange={this.handleInputChange}
                  />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={4}>
                  <input
                    name="no_of_rooms"
                    type="number"
                    placeholder="Rooms"
                    className="form-control"
                    onChange={this.handleInputChange}
                  />
                </Col>
                <Col md={4}>
                  <input
                    name="no_of_bathrooms"
                    type="number"
                    placeholder="Bathrooms"
                    className="form-control"
                    onChange={this.handleInputChange}
                  />
                </Col>
                <Col md={4}>
                  <input
                    name="storey"
                    type="number"
                    placeholder="Storey"
                    className="form-control"
                    onChange={this.handleInputChange}
                  />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <input
                    name="land_size"
                    type="number"
                    placeholder="Land Size (Perches)"
                    className="form-control"
                    onChange={this.handleInputChange}
                  />
                </Col>
                <Col md={6}>
                  <input
                    name="distance"
                    type="number"
                    placeholder="Distance to Town (KM)"
                    className="form-control"
                    onChange={this.handleInputChange}
                  />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <input
                    name="keyWord"
                    placeholder="Keyword"
                    className="form-control"
                    onChange={this.handleInputChange}
                  />
                </Col>
                <Col md={6}>
                  <input
                    name="price"
                    type="number"
                    placeholder="Price (in Millions)"
                    className="form-control"
                    onChange={this.handleInputChange}
                  />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col>
                  <textarea
                    name="description"
                    rows={3}
                    placeholder="Description"
                    className="form-control"
                    onChange={this.handleInputChange}
                  />
                </Col>
              </Row>

              <h5 className="mt-4">Upload Images</h5>
              <Row>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Col md={4} className="mb-3" key={i}>
                    <input
                      type="file"
                      name={`image${i}`}
                      className="form-control"
                      onChange={this.handleFileChange}
                    />
                  </Col>
                ))}
              </Row>

              <h5 className="mt-3">House Type</h5>
              <Row className="mb-3">
                <Col md={4}>
                  <div className="form-check">
                    <input
                      type="radio"
                      id="LuxuryHouse"
                      name="houseType"
                      value="Luxury House"
                      className="form-check-input"
                      onChange={this.handleInputChange}
                    />
                    <label htmlFor="LuxuryHouse" className="form-check-label">
                      Luxury House
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="radio"
                      id="BudgetHouse"
                      name="houseType"
                      value="Budget House"
                      className="form-check-input"
                      onChange={this.handleInputChange}
                    />
                    <label htmlFor="BudgetHouse" className="form-check-label">
                      Budget House
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="radio"
                      id="Apartment"
                      name="houseType"
                      value="Apartment"
                      className="form-check-input"
                      onChange={this.handleInputChange}
                    />
                    <label htmlFor="Apartment" className="form-check-label">
                      Apartment
                    </label>
                  </div>
                </Col>
              </Row>

              <button type="submit" className="btn btn-primary mt-3">
                Upload
              </button>
            </Container>
          </form>

          <Container fluid className="px-5 mt-5">
            <h4>Listed Properties</h4>
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
                      {house.images &&
                      house.images.length > 0 &&
                      house.images[0].image1 ? (
                        <img
                          src={`https://project-2-vdwg.onrender.com/static/uploads/${house.images[0].image1}`}
                          alt={`House ${index + 1}`}
                          style={{ width: "100px" }}
                        />
                      ) : (
                        <span>No Image</span>
                      )}
                    </td>
                    <td>{house.houseType}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => this.deleteImage(house.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Container>
        </div>
      </div>
    );
  }
}

export default AddHouse;
