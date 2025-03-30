import React, { useEffect, useState, useCallback } from "react";
import axios from 'axios';
import "./HouseCards.css";
import { useParams, useNavigate} from 'react-router-dom';
import Navbar from '../../components/commen/navbar';
import LatestProjects from '../../components/LatestProjects';
import Filter from '../../components/commen/filter';
import Footer from '../../components/Footer/footer';

const HouseDisplay = () => {
  const { houseType } = useParams(); // Get houseType from URL params
  const [filteredHouses, setFilteredHouses] = useState([]); // State to store filtered houses
  const navigate = useNavigate();
  // const userRole = localStorage.getItem('userRole');

  // Function to fetch houses from backend
  const fetchHouses = useCallback(() => {
    axios.get(`http://127.0.0.1:5000/displayHouses/${houseType}`)
      .then(response => {
        setFilteredHouses(response.data); // Set all houses initially
      })
      .catch(error => {
        console.error("There was an error fetching the houses!", error);
      });
  }, [houseType]);

  useEffect(() => {
    fetchHouses();
  }, [fetchHouses]);

  // Function to handle updating filtered houses based on filter results
  const updateFilteredHouses = (data) => {
    if (data.length === 0) {
      alert("No houses found matching the criteria.");
    }
    setFilteredHouses(data);
  };
  const handleViewMore = (id) => {
    navigate(`/propertyinfo/${id}`);  
  };

  return (
    <div>
      <Navbar /> {/* Render Navbar component */}
      <LatestProjects /> {/* Render LatestProjects component */}
      <Filter houseType={houseType} onFilter={updateFilteredHouses} /> {/* Pass houseType and update function */}
      <div className='house-display-content grid3 mtop'>
        {filteredHouses.length > 0 ? (
          filteredHouses.map((house, index) => {
            const { id, district, houseType, images, keyWord } = house;
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
                    <span style={{ background: houseType === "Budget House" ? "#25b5791a" : "#ff98001a", color: houseType === "Luxury House" ? "#25b579" : "#ff9800" }}>{houseType}</span>
                    <i className='fa fa-heart'></i>
                  </div>
                  <h4 className="keyWord">{keyWord}</h4>
                  <p className="district">
                    <i className='fa fa-location-dot'></i> {district}
                  </p>
                </div>
                  <div className="btn">
                    <button className="btnviewmore btn-primary" onClick={() => handleViewMore(id)}> View More </button>
                  </div>
                </div>
            );
          })
        ) : (
          <p>No houses available.</p>
        )}
        <br /><br />
      </div>
      <Footer />
    </div>
  );
};

export default HouseDisplay;
