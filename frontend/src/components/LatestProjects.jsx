import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';

class LatestProjects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [], // State to store the fetched images
    };
  }

  componentDidMount() {
    this.fetchImages();
  }

  // Method to fetch images from the backend
  fetchImages = () => {
    axios.get('http://127.0.0.1:5000/displayBanner')
      .then(response => {
        this.setState({ images: response.data });
      })
      .catch(error => {
        console.error("There was an error fetching the images!", error);
      });
  };

  render() {
    return (
      <div className="container" style={{ border: '3px solid #444444', padding: '10px', borderLeft: '3px solid #444444'  }}>
        <div className="latestProjectBanner">
          <Carousel data-bs-theme="dark">
            {this.state.images.map((image, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100 carousel-image"
                  src={`http://127.0.0.1:5000/static/uploads/${image.title}`}
                  alt={`Slide ${index + 1}`}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </div>
    );
  }
}

export default LatestProjects;
