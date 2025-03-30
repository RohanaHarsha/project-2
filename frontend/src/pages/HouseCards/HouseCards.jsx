import React, { useEffect, useState } from "react";
import axios from 'axios';
import "./HouseCards.css";

const HouseDisplay = ({ filterData }) => {
  const [houses, setHouses] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        let response;
        if (filterData) {
          // If filter data exists, apply the filter to fetch houses
          response = await axios.post('http://127.0.0.1:5000/filter', filterData);
        } else {
          // Otherwise, fetch all default houses (Luxury or Budget based on default)
          response = await axios.get('http://127.0.0.1:5000/displayHouses/default');
        }

        if (response.data.length > 0) {
          setHouses(response.data);
          setMessage(""); // Clear any previous message
        } else {
          setHouses([]);
          setMessage("No houses found with the selected criteria.");
        }
      } catch (error) {
        console.error("Error fetching houses:", error);
        setMessage("An error occurred while fetching houses.");
      }
    };

    fetchHouses();
  }, [filterData]);

  return (
    <div className='house-display-content grid3 mtop'>
      {message && <p>{message}</p>}
      {houses.length > 0 && houses.map((house, index) => {
        const { district, houseType, images, keyWord } = house;
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
              <h4 className="keyWord">{keyWord}</h4>
              <p className="district">
                <i className='fa fa-location-dot'></i> {district}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HouseDisplay;
