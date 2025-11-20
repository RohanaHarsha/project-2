import React from "react";
import axios from "axios";
import "../HouseCards/HouseCards.css";
import { useNavigate } from "react-router-dom";

const RecentCard = () => {
  const [houses, setHouses] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    fetchHouses();
  }, []);

  const fetchHouses = () => {
    axios
      .get("http://127.0.0.1:5000/app/displayRecentCard")
      .then((response) => setHouses(response.data))
      .catch((error) => console.error("Error fetching recent houses", error));
  };

  const handleViewMore = (id) => navigate(`/propertyinfo/${id}`);

  const placeholderSvg =
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500"><rect width="100%" height="100%" fill="%23f3f4f6"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23999" font-size="20">No Image</text></svg>';

  return (
    <div className="house-display-content" style={{ paddingTop: 8, paddingBottom: 8 }}>
      {houses && houses.length > 0 ? (
        houses.map((house) => {
          const { id, district, houseType, images = [], keyWord } = house;
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
                <span className="badge">{houseType || "Property"}</span>
              </div>

              <div className="card-body">
                <h3 className="card-location">
                  <i className="fa fa-location-dot" aria-hidden="true"></i>&nbsp;{district || "—"}
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
        <p className="no-results">No recent houses available.</p>
      )}
    </div>
  );
};

export default RecentCard;