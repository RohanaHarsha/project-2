import React, { useEffect, useState } from "react";
import axios from "axios";
import "./HouseCards.css";
import "./propertyinfo.css";
import { useParams } from "react-router-dom";
import Navbar from "../../components/common/navbar";
import PopupModal from "./PopupModal";
import Footer from "../../components/Footer/footer";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import defimg from "../../img/1st.jpg";

const safeImage = (imgObj, key) => {
  if (!imgObj) return null;
  const val = imgObj[key];
  if (!val) return null;
  return `https://daffodilzone-b-end.onrender.com/static/uploads/${val}`;
};

export default function PropertyInfoPage() {
  const { id } = useParams();
  const [house, setHouse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Image lightbox & selected thumb
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxUrl, setLightboxUrl] = useState("");
  const [activeThumb, setActiveThumb] = useState(null);

  // Booking dialog
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.post("https://daffodilzone-b-end.onrender.com/house/displayHouse", { id });
        setHouse(res.data || null);
        // set a sensible active thumb
        const first = res.data?.images?.[0];
        setActiveThumb(
          safeImage(first, "image1") ||
            safeImage(first, "image2") ||
            safeImage(first, "image3") ||
            safeImage(first, "image4") ||
            defimg
        );
      } catch (err) {
        console.error(err);
        setError("Failed to load property details.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const openLightbox = (url) => {
    setLightboxUrl(url || defimg);
    setLightboxOpen(true);
  };
  const closeLightbox = () => {
    setLightboxOpen(false);
    setLightboxUrl("");
  };

  const openBooking = () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please log in to make a booking.");
      return;
    }
    setBookingOpen(true);
  };
  const closeBooking = () => {
    setBookingOpen(false);
    setBookingDate("");
    setBookingTime("");
  };
  const submitBooking = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId || !bookingDate || !bookingTime || !house) {
      alert("Provide date and time.");
      return;
    }
    try {
      await axios.post("https://daffodilzone-b-end.onrender.com/booking/addBooking", {
        house_id: house.id,
        user_id: userId,
        booking_date: bookingDate,
        booking_time: `${bookingTime}:00`,
      });
      alert("Booking successful.");
      closeBooking();
    } catch (err) {
      console.error(err);
      alert("Booking failed. Try again later.");
    }
  };

  if (loading) return <div><Navbar /><main className="pi-loading">Loading property…</main></div>;
  if (error) return <div><Navbar /><main className="pi-error">{error}</main></div>;
  if (!house) return <div><Navbar /><main className="pi-error">Property not found.</main></div>;

  const imagesObj = house.images && house.images[0] ? house.images[0] : {};
  const thumbs = [
    safeImage(imagesObj, "image1"),
    safeImage(imagesObj, "image2"),
    safeImage(imagesObj, "image3"),
    safeImage(imagesObj, "image4"),
  ].filter(Boolean);

  const mainImage = activeThumb || thumbs[0] || defimg;

  return (
    <>
      <Navbar />
      <main className="pi-container">
        <div className="pi-grid">
          <section className="pi-gallery" aria-label="Property images">
            <div className="pi-main-image" role="button" onClick={() => openLightbox(mainImage)}>
              <img src={mainImage} alt={house.keyWord || house.district || "Property image"} loading="lazy" />
            </div>

            {thumbs.length > 0 && (
              <div className="pi-thumbs" role="list">
                {thumbs.map((t, i) => (
                  <button
                    key={t + i}
                    className={`pi-thumb ${t === activeThumb ? "active" : ""}`}
                    onClick={() => { setActiveThumb(t); }}
                    aria-label={`View image ${i + 1}`}
                    type="button"
                  >
                    <img src={t} alt={`Thumbnail ${i + 1}`} loading="lazy" />
                  </button>
                ))}
              </div>
            )}
          </section>

          <aside className="pi-sidebar" aria-labelledby="pi-title">
           
            <p className="pi-sub">Loc {house.district}</p>

            <div className="pi-price">MiL {house.price ? Number(house.price).toLocaleString() : "Contact"}</div>

            {/* DETAILS: rendered as a simple table for clear reading */}
            <table className="pi-details-table" aria-label="Property details">
              <tbody>
                <tr>
                  <th>Storey</th><td>{house.storey || "—"}</td>
                  <th>Land(sqm)</th><td>{house.land_size ? `${house.land_size} ` : "—"}</td>
                 </tr>
                <tr>
                   <th>Bedrooms</th><td>{house.no_of_rooms || "—"}</td>
                  <th>Bathrooms</th><td>{house.no_of_bathrooms || "—"}</td>
                </tr>
              </tbody>
            </table>

            <div className="pi-actions">
              <a className="pi-call" href={`tel:${house.phone_number}`} aria-label="Call seller">Call Now</a>
              <button className="pi-book" onClick={openBooking}>Request Visit</button>
            </div>

            {/* separate description container for readability */}
            <div className="pi-description">
              <h3>Overview</h3>
              <div className="pi-text">{house.description || "No description provided."}</div>
            </div>

            <div className="pi-location">
              <h3>Location</h3>
              <div className="pi-text">{house.district || "Unknown district"}</div>
            </div>
          </aside>
        </div>

        {/* Lightbox Modal */}
        <PopupModal isOpen={lightboxOpen} onRequestClose={closeLightbox} imageUrl={lightboxUrl} />

        {/* Booking Dialog */}
        <Dialog open={bookingOpen} onClose={closeBooking}>
          <DialogTitle>Request a Visit</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Visit Date"
              type="date"
              fullWidth
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              margin="dense"
              label="Visit Time"
              type="time"
              fullWidth
              value={bookingTime}
              onChange={(e) => setBookingTime(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={closeBooking}>Cancel</Button>
            <Button onClick={submitBooking} variant="contained">Send Request</Button>
          </DialogActions>
        </Dialog>
      </main>

      <Footer />
    </>
  );
}
