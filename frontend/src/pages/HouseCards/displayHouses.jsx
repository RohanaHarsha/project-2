import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "./HouseCards.css";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/commen/navbar";
import LatestProjects from "../../components/LatestProjects";
import Footer from "../../components/Footer/footer";

const HouseDisplay = () => {
  const { houseType } = useParams(); // Get houseType from URL params
  const [filteredHouses, setFilteredHouses] = useState([]); // State to store filtered houses
  const navigate = useNavigate();
  // const userRole = localStorage.getItem('userRole');

  // Function to fetch houses from backend
  const fetchHouses = useCallback(() => {
    axios
      .get(`http://127.0.0.1:5000/house/displayHouses/${houseType}`)
      .then((response) => {
        setFilteredHouses(response.data); // Set all houses initially
      })
      .catch((error) => {
        console.error("There was an error fetching the houses!", error);
      });
  }, [houseType]);

  useEffect(() => {
    fetchHouses();
  }, [fetchHouses]);

  // Function to handle updating filtered houses based on filter results
  const updateFilteredHouses = (data) => {
    if (!data || data.length === 0) {
      alert("No houses found matching the criteria.");
      setFilteredHouses([]);
      return;
    }
    setFilteredHouses(data);
  };
  const handleViewMore = (id) => {
    navigate(`/propertyinfo/${id}`);
  };

  const placeholderSvg =
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500"><rect width="100%" height="100%" fill="%23f3f4f6"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23999" font-size="20">No Image</text></svg>';

  return (
    <div>
      <div>
        <Navbar /> {/* Render Navbar component */}
        <LatestProjects /> {/* Render LatestProjects component */}
      </div>

      <div className="house-display-container">
        <main className="house-display-content grid3 mtop">
          {filteredHouses.length > 0 ? (
            filteredHouses.map((house) => {
              const {
                id,
                district,
                houseType: hType,
                images = [],
                keyWord,
              } = house;
              const imgSrc =
                images && images.length > 0 && images[0].image1
                  ? `http://127.0.0.1:5000/static/uploads/${images[0].image1}`
                  : placeholderSvg;

              return (
                <article className="card" key={id}>
                  <div className="card-media">
                    <img
                      src={imgSrc}
                      alt={district || "Property image"}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = placeholderSvg;
                      }}
                    />
                    <span className="badge">{hType || "Property"}</span>
                  </div>

                  <div className="card-body">
                    <h3 className="card-location">
                      <i className="fa fa-location-dot" aria-hidden="true"></i>{" "}
                      {district || "—"}
                    </h3>
                    {keyWord && <p className="card-keyword">{keyWord}</p>}
                    <div className="card-actions">
                      <button
                        className="btn btn-primary"
                        onClick={() => handleViewMore(id)}
                        aria-label={`View more about property ${id}`}
                      >
                        View More
                      </button>
                    </div>
                  </div>
                </article>
              );
            })
          ) : (
            <p className="no-results">No houses available.</p>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default HouseDisplay;
