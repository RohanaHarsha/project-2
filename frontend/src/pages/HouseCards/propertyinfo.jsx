import React, { useEffect, useState, useCallback } from "react";
import axios from 'axios';
import "./HouseCards.css";
import { useParams } from 'react-router-dom';
import Navbar from '../../components/commen/navbar';
import 'aframe';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import MapContainer from './googlemap';
import './propertyinfo.css';
import defimg from '../../img/1st.jpg';
import PopupModal from "./PopupModal";
import Footer from '../../components/Footer/footer';

const HouseDisplay = () => {
  const { houseType } = useParams(); // Get houseType from URL params
  const [filteredHouses, setFilteredHouses] = useState([]); // State to store filtered houses
  const [openDialog, setOpenDialog] = useState(false); // State for dialog visibility
  const [selectedHouse, setSelectedHouse] = useState(null); // State for the selected house
  const [bookingDate, setBookingDate] = useState(''); // State for booking date
  const [bookingTime, setBookingTime] = useState(''); // State for booking time

  // Function to fetch houses from backend
  const fetchHouses = useCallback(() => {
    axios.get(`http://127.0.0.1:5000/displayHouses/${houseType}`)
      .then(response => {
        setFilteredHouses(response.data); // Set all houses initially
        // console.log(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the houses!", error);
      });
  }, [houseType]);

  useEffect(() => {
    fetchHouses();
  }, [fetchHouses]);

  // Open the booking dialog
  const handleBookNowClick = (house) => {
    const userId = localStorage.getItem("userId"); // Check for userid in localStorage

    if (!userId) {
      alert("You need to log in to book a house.");
      return; // Exit the function if the user is not logged in
    }

    setSelectedHouse(house); // Store selected house
    setOpenDialog(true); // Show booking dialog
  };

  // Close the booking dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedHouse(null); // Clear selected house
    setBookingDate(''); // Reset date
    setBookingTime(''); // Reset time
  };

  // Handle booking submission
  const handleBookingSubmit = () => {
    const userId = localStorage.getItem("userId"); // Retrieve user_id from localStorage

    // Check if all necessary data is available before proceeding
    if (!userId || !selectedHouse || !bookingDate || !bookingTime) {
      alert("Please provide all the required information.");
      return;
    }

    // Ensure booking_time is in HH:MM:SS format
    const formattedBookingTime = `${bookingTime}:00`; // Append ":00" to match HH:MM:SS format

    // Prepare the booking data to be sent to the backend
    const bookingData = {
      house_id: selectedHouse.id, // Get house_id from the selected house
      user_id: userId, // Get user_id from localStorage
      booking_date: bookingDate, // Use the selected booking date
      booking_time: formattedBookingTime, // Use the formatted booking time
    };

    console.log(bookingData);

    // Send the booking request to the backend
    axios.post('http://127.0.0.1:5000/addBooking', bookingData)
      .then(response => {
        alert("Booking successful!"); // Notify the user of success
        handleCloseDialog(); // Close the dialog
      })
      .catch(error => {
        console.error("There was an error making the booking:", error);
        // Check if the error response exists and has a message
        if (error.response && error.response.data && error.response.data.error) {
          alert(`Booking failed: ${error.response.data.error}`); // Show the specific error message from the server
        } else {
          alert("Booking failed. Please try again."); // Fallback error message
        }
      });
  };

  return (
    <div>
      <Navbar />
      <Propertyinfo onBookNowClick={handleBookNowClick} />
      
      {/* Booking dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Book Now</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Booking Date"
            type="date"
            fullWidth
            value={bookingDate}
            onChange={(e) => setBookingDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="dense"
            label="Booking Time"
            type="time"
            fullWidth
            value={bookingTime}
            onChange={(e) => setBookingTime(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleBookingSubmit} variant="contained" color="primary">
            Confirm Booking
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const Propertyinfo = ({ onBookNowClick }) => {
  const { id } = useParams(); // Get the id from the URL
  const [house, setHouse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (id) {
      const fetchHouses = async () => {
        try {
          console.log("Fetching house with ID:", id);
          
          const response = await axios.post('http://127.0.0.1:5000/displayHouse', { id: id });

          const houses = response.data;
          console.log("House data:", houses);
          setHouse(houses);  // Set house data in state

        } catch (err) {
          console.error("Error fetching property data:", err);
          setError("Failed to fetch property data.");
        } finally {
          setLoading(false);
        }
      };

      fetchHouses();
    }
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!house) {
    return <p>No property found</p>;
  }
  const openModal = (url) => {
    setImageUrl(url);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setImageUrl('');
  };

  return (
    <div className="capitalize camp-details">
      <div className="camp-title">
        
        <h1>{house.keyWord}</h1>

        <div className="row">
            <p><i className="fas fa-map-marker-alt"></i> <b>{house.district}</b></p>
        </div>

        <div className="gallery">
          <div className="scene-container galleryimg01">
            <a-scene embedded style={{width: '100%', height: '100%'}}>
              <a-sky src={house.images && house.images[0] ? `http://127.0.0.1:5000/static/uploads/${house.images[0].image5}` : defimg} alt="House" rotation="0 -130 0"></a-sky>
            </a-scene>
          </div>

          <div><img src={house.images && house.images[0] ? `http://127.0.0.1:5000/static/uploads/${house.images[0].image1}` : defimg}  alt="House" onClick={() => openModal(`http://127.0.0.1:5000/static/uploads/${house.images[0].image1}`)} /> </div>
          <div><img src={house.images && house.images[0] ? `http://127.0.0.1:5000/static/uploads/${house.images[0].image2}` : defimg} alt="House"  onClick={() => openModal(`http://127.0.0.1:5000/static/uploads/${house.images[0].image2}`)} /></div>
          <div><img src={house.images && house.images[0] ? `http://127.0.0.1:5000/static/uploads/${house.images[0].image3}` : defimg} alt="House"  onClick={() => openModal(`http://127.0.0.1:5000/static/uploads/${house.images[0].image3}`)} /></div>
          <div><img src={house.images && house.images[0] ? `http://127.0.0.1:5000/static/uploads/${house.images[0].image4}` : defimg} alt="House"  onClick={() => openModal(`http://127.0.0.1:5000/static/uploads/${house.images[0].image4}`)} /></div>
          
          <div className="scene-container">
            <a-scene embedded style={{width: '100%', height: '100%'}}>
              <a-sky src={house.images && house.images[0] ? `http://127.0.0.1:5000/static/uploads/${house.images[0].image6}` : defimg} alt="House" rotation="0 -130 0"></a-sky>
            </a-scene>
          </div>
          <PopupModal isOpen={isOpen} onRequestClose={closeModal} imageUrl={imageUrl} />
        </div>


        <div className="details">
          <h2>Managed by Daffodillzone (PVT)LTD</h2>
          <p><b>100% settled proof &nbsp;</b></p>
          <h4><b>Price Rs.{house.price || "Not mentioned"}M</b></h4>
        </div>

        <hr className="line" />
        <button className="btn btn-primary">
          <a href={`tel:${house.phone_number}`} className="call-button">
            Call Now
          </a>
        </button>&nbsp;&nbsp;
        <button type="button" className="btn btn-primary" onClick={() => onBookNowClick(house)}>
          <b>
              Set Appointment
          </b>
        </button>
          <hr className="line" />
        <div className="capitalize house_description">
          <h2>Description</h2>
          <br />
          • {house.houseType || "Type Not mentioned"}
          <br />
          • {house.district || "Not mentioned"} district
          <br />
          • {house.address || "Not mentioned"}
          <br />
          • {house.no_of_rooms || "Not mentioned"} rooms
          <br />
          • {house.no_of_bathrooms || "Not mentioned"} bathrooms
          <br />
          • Land Size {house.land_size || "Not mentioned"} perch
          <br />
          • {house.distance || "Not mentioned"} km to the city
          <br />
          • {house.storey || "Not mentioned"} storey
          <br />
          • Power and water supply
          <br />
          • Lighting system and fan fittings
          <br />
          • All necessary facilities like Cargills, Keels, bank, petrol shed etc. within 150m range.
          <br />
          • Other: {house.description || "Not mentioned"}
        </div>
        <hr className="line" />
      </div>

      <div className='map'>
        <MapContainer lat={house.lat} lng={house.lng} />
      </div>

      <div className="map-button" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px 0' }}>
        <button
          className="btn btn-primary"
          onClick={() => window.open(`https://www.google.com/maps?q=${house.lat || 6.982641},${house.lng || 81.076837}`, '_blank')}
        >
          View on Google Maps
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default HouseDisplay;
