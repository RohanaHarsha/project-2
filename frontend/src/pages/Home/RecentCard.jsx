import React, { Component } from "react";
import axios from 'axios';
import "../Home/RecentCard.css";
import { useNavigate } from 'react-router-dom';

const RecentCard = () => {
  const [houses, setHouses] = React.useState([]); // State to store the fetched houses
  const navigate = useNavigate(); // Use the useNavigate hook

  // Fetch houses when component mounts
  React.useEffect(() => {
    fetchHouses();
  }, []);

  // Method to fetch houses from the backend
  const fetchHouses = () => {
    axios.get('http://127.0.0.1:5000/displayRecentCard')
      .then(response => {
        setHouses(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the houses!", error);
      });
  };

  const handleViewMore = (id) => {
    navigate(`/propertyinfo/${id}`); // Navigate to the property info page
  };

  return (
    <div className='content grid3 mtop'>
      {houses.map((house, index) => {
        const { id, district, houseType, images, keyWord } = house; // Destructure id from house
        return (
          <div className='box shadow' key={index}>
            <div className='img'>
              {images.length > 0 && images[0].image1 ? (
                <img src={`http://127.0.0.1:5000/static/uploads/${images[0].image1}`} alt='' />
              ) : (
                <span>No Image</span>
              )}
            </div>
            <div className='text'>
              <div className='category flex'>
                <span style={{ background: houseType === "Budget House" ? "#25b5791a" : "#ff98001a", color: houseType === "Luxury House" ? "#25b579" : "#ff9800" }}>
                  {houseType}
                </span>
                <i className='fa fa-heart'></i>
              </div>
              <h4>{keyWord}</h4>
              <p>
                <i className='fa fa-location-dot'></i> {district}
              </p>
            </div>
            <div className="btn">
              <button className="btnviewmore btn-primary" onClick={() => handleViewMore(id)}> View More </button>
            </div>
          </div>
        );
      })}
      <br /><br />
    </div>
  );
};

export default RecentCard;
