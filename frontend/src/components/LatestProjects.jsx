import React, { Component } from 'react';
import axios from 'axios';
import './LatestProjects.css';

class LatestProjects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],      // Fetched images from backend
      activeIndex: 0,  // Currently displayed banner index
    };
  }

  componentDidMount() {
    this.fetchImages();
  }

  // Fetch images from the backend
  fetchImages = () => {
    axios.get('http://127.0.0.1:5000/banner/displayBanner')
      .then(response => {
        this.setState({ images: response.data });
      })
      .catch(error => {
        console.error("There was an error fetching the images!", error);
      });
  };

  // Go to previous image (wraps around)
  goToPrevious = () => {
    this.setState(prevState => {
      const newIndex = (prevState.activeIndex - 1 + prevState.images.length) % prevState.images.length;
      return { activeIndex: newIndex };
    });
  };

  // Go to next image (wraps around)
  goToNext = () => {
    this.setState(prevState => {
      const newIndex = (prevState.activeIndex + 1) % prevState.images.length;
      return { activeIndex: newIndex };
    });
  };

  render() {
    const { images, activeIndex } = this.state;
    if (images.length === 0) {
      return <div className="latest-project-container">Loading banners...</div>;
    }

    // Calculate indices for previous and next previews (with wrap-around)
    const prevIndex = (activeIndex - 1 + images.length) % images.length;
    const nextIndex = (activeIndex + 1) % images.length;

    return (
      <div className="latest-project-container">
        <div className="banner-wrapper">
          {/* Left preview container */}
          <div className="preview left" onClick={this.goToPrevious}>
            <img
              src={`http://127.0.0.1:5000/static/uploads/${images[prevIndex].title}`}
              alt="Previous Banner"
            />
          </div>

          {/* Main banner container */}
          <div className="main-banner">
            <img
              src={`http://127.0.0.1:5000/static/uploads/${images[activeIndex].title}`}
              alt="Active Banner"
            />
          </div>

          {/* Right preview container */}
          <div className="preview right" onClick={this.goToNext}>
            <img
              src={`http://127.0.0.1:5000/static/uploads/${images[nextIndex].title}`}
              alt="Next Banner"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default LatestProjects;
