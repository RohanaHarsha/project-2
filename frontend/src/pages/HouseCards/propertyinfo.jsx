import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "./HouseCards.css";
import { useParams } from "react-router-dom";
import Navbar from "../../components/commen/navbar";
import "aframe";
import "./propertyinfo.css";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

import defimg from "../../img/1st.jpg";
import PopupModal from "./PopupModal";
import Footer from "../../components/Footer/footer";

const HouseDisplay = () => {
  const { houseType } = useParams();
  const [filteredHouses, setFilteredHouses] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");

  const fetchHouses = useCallback(() => {
    axios
      .get(`http://127.0.0.1:5000/house/displayHouses/${houseType}`)
      .then((response) => {
        setFilteredHouses(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the houses!", error);
      });
  }, [houseType]);

  useEffect(() => {
    fetchHouses();
  }, [fetchHouses]);

  const handleBookNowClick = (house) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("You need to log in to book a house.");
      return;
    }
    setSelectedHouse(house);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedHouse(null);
    setBookingDate("");
    setBookingTime("");
  };

  const handleBookingSubmit = () => {
    const userId = localStorage.getItem("userId");
    if (!userId || !selectedHouse || !bookingDate || !bookingTime) {
      alert("Please provide all the required information.");
      return;
    }
    const formattedBookingTime = `${bookingTime}:00`;
    const bookingData = {
      house_id: selectedHouse.id,
      user_id: userId,
      booking_date: bookingDate,
      booking_time: formattedBookingTime,
    };

    axios
      .post("http://127.0.0.1:5000/booking/addBooking", bookingData)
      .then((response) => {
        alert("Booking successful!");
        handleCloseDialog();
      })
      .catch((error) => {
        console.error("There was an error making the booking:", error);
      });
  };

  return (
    <div>
      <Navbar />
      <Propertyinfo onBookNowClick={handleBookNowClick} />
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
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            label="Booking Time"
            type="time"
            fullWidth
            value={bookingTime}
            onChange={(e) => setBookingTime(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleBookingSubmit}
            variant="contained"
            color="primary"
          >
            Confirm Booking
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const Propertyinfo = ({ onBookNowClick }) => {
  const { id } = useParams();
  const [house, setHouse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (id) {
      const fetchHouses = async () => {
        try {
          const response = await axios.post(
            "http://127.0.0.1:5000/house/displayHouse",
            { id: id }
          );
          setHouse(response.data);
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!house) return <p>No property found</p>;

  const openModal = (url) => {
    setImageUrl(url);
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
    setImageUrl("");
  };

  return (
    <div className="capitalize camp-details">
      <div className="camp-title">
        <div className="row">
          <p>
            <i className="fas fa-map-marker-alt"></i> <b>{house.district}</b>
          </p>
        </div>
        <div className="gallery">
          <div className="gallery">
            <div>
              <img
                src={
                  house.images && house.images[0]
                    ? `http://127.0.0.1:5000/static/uploads/${house.images[0].image1}`
                    : defimg
                }
                alt="House"
                onClick={() =>
                  openModal(
                    `http://127.0.0.1:5000/static/uploads/${house.images[0].image1}`
                  )
                }
              />
            </div>

            {/* 2D Image 2 */}
            <div>
              <img
                src={
                  house.images && house.images[0]
                    ? `http://127.0.0.1:5000/static/uploads/${house.images[0].image2}`
                    : defimg
                }
                alt="House"
                onClick={() =>
                  openModal(
                    `http://127.0.0.1:5000/static/uploads/${house.images[0].image2}`
                  )
                }
              />
            </div>

            {/* 2D Image 3 */}
            <div>
              <img
                src={
                  house.images && house.images[0]
                    ? `http://127.0.0.1:5000/static/uploads/${house.images[0].image3}`
                    : defimg
                }
                alt="House"
                onClick={() =>
                  openModal(
                    `http://127.0.0.1:5000/static/uploads/${house.images[0].image3}`
                  )
                }
              />
            </div>

            {/* 2D Image 4 */}
            <div>
              <img
                src={
                  house.images && house.images[0]
                    ? `http://127.0.0.1:5000/static/uploads/${house.images[0].image4}`
                    : defimg
                }
                alt="House"
                onClick={() =>
                  openModal(
                    `http://127.0.0.1:5000/static/uploads/${house.images[0].image4}`
                  )
                }
              />
            </div>

            {/* Popup Modal */}
            <PopupModal
              isOpen={isOpen}
              onRequestClose={closeModal}
              imageUrl={imageUrl}
            />
          </div>

          <PopupModal
            isOpen={isOpen}
            onRequestClose={closeModal}
            imageUrl={imageUrl}
          />
        </div>
        <div className="details">
          <h2>Daffodillzone (PVT)LTD</h2>
          <p>
            <b>100% settled proof &nbsp;</b>
          </p>
          <h4>
            <b>Price Rs.{house.price || "Not mentioned"}M</b>
          </h4>
        </div>
        <hr className="line" />
        <hr className="line" />
        <div className="house_description text-gray-800 text-base leading-relaxed space-y-6">
          <div className="house_description text-gray-800 text-base leading-relaxed space-y-6">
            {/* Property Highlights */}
            <div className="property_highlights">
              <h2 className="text-xl font-semibold mb-2 text-black">
                Property Highlights
              </h2>
              <ul className="list-disc pl-6 text-gray-800">
                <li>Type: {house.houseType || "Not mentioned"}</li>
                <li>District: {house.district || "Not mentioned"}</li>
                <li>Address: {house.address || "Not mentioned"}</li>
              </ul>
            </div>

            {/* Property Features */}
            <div className="property_features">
              <h2 className="text-xl font-semibold mb-2 text-black">
                Property Features
              </h2>
              <ul className="list-disc pl-6 text-gray-800">
                <li>{house.no_of_rooms || "Not mentioned"} Bed Rooms</li>
                <li>{house.no_of_bathrooms || "Not mentioned"} Bathrooms</li>
                <li>
                  {house.land_size || "Not mentioned"} sqm<sup>2</sup>
                </li>
                <li>{house.distance || "Not mentioned"} To The Nearest City</li>
                <li>{house.storey || "Not mentioned"} Storey</li>
              </ul>
            </div>

            {/* Property Description */}
            <div className="property_description">
              <h2 className="text-xl font-semibold mb-2 text-black">
                Property Description
              </h2>
              <p className="text-justify text-gray-800">
                {house.description ||
                  "No additional description provided by the seller."}
              </p>
            </div>
          </div>
        </div>
        <hr className="line" />
        <button className="btn btn-primary">
          <a href={`tel:${house.phone_number}`} className="call-button">
            Call Now
          </a>
        </button>
        &nbsp;&nbsp;
      </div>
      <Footer />
    </div>
  );
};

export default HouseDisplay;
