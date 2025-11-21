import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "./HouseCards.css";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Navbar from "../../components/common/navbar";
import LatestProjects from "../../components/LatestProjects";
import Footer from "../../components/Footer/footer";

const HouseDisplay = () => {
  const { houseType } = useParams(); // Get houseType from URL params
  const location = useLocation();
  const [filteredHouses, setFilteredHouses] = useState([]); // State to store filtered houses
  const [query, setQuery] = useState(""); // search query
  const [searching, setSearching] = useState(false);
  const navigate = useNavigate();

  // Function to fetch houses from backend
  const fetchHouses = useCallback(() => {
    if (!houseType) return;
    axios
      .get(`https://project-2-vdwg.onrender.com/house/displayHouses/${houseType}`)
      .then((response) => {
        setFilteredHouses(response.data); // Set all houses initially
      })
      .catch((error) => {
        console.error("There was an error fetching the houses!", error);
      });
  }, [houseType]);

  useEffect(() => {
    const qParam = new URLSearchParams(location.search).get("q");
    if (qParam) {
      // run server search when q param provided (e.g. from Home)
      (async () => {
        setSearching(true);
        try {
          const res = await axios.get(
            `https://project-2-vdwg.onrender.com/house/displayHouses/search?q=${encodeURIComponent(qParam)}`
          );
          setFilteredHouses(res.data || []);
          setQuery(qParam);
        } catch (err) {
          console.error("Search failed", err);
          setFilteredHouses([]);
        } finally {
          setSearching(false);
        }
      })();
    } else {
      fetchHouses();
    }
  }, [fetchHouses, location.search]);

  // Function to handle updating filtered houses based on filter results
  const updateFilteredHouses = (data) => {
    if (!data || data.length === 0) {
      // show empty result set, don't alert repeatedly
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

  // ----- Search: call backend endpoint and update list -----
  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    setSearching(true);
    try {
      const q = (query || "").trim();
      // if empty query, reload default list for the current houseType
      const url = q
        ? `https://project-2-vdwg.onrender.com/house/displayHouses/search?q=${encodeURIComponent(q)}`
        : `https://project-2-vdwg.onrender.com/house/displayHouses/${houseType}`;
      const res = await axios.get(url);
      updateFilteredHouses(res.data);
      // update URL when user searches from this page
      if (q) navigate(`/displayHouses/search?q=${encodeURIComponent(q)}`, { replace: true });
      else navigate(`/displayHouses/${houseType}`, { replace: true });
    } catch (err) {
      console.error("Search failed", err);
      setFilteredHouses([]);
    } finally {
      setSearching(false);
    }
  };

  const clearSearch = () => {
    setQuery("");
    navigate(`/displayHouses/${houseType}`, { replace: true });
    fetchHouses();
  };

  return (
    <div>
      <div>
        <Navbar /> {/* Render Navbar component */}
        <LatestProjects /> {/* Render LatestProjects component */}
      </div>

      <div className="house-display-container">
        {/* Search bar */}
        <div style={{ maxWidth: 1200, margin: "18px auto 6px", padding: "0 16px", display: "flex", gap: 8, alignItems: "center", justifyContent: "center" }}>
          <form onSubmit={handleSearch} style={{ display: "flex", gap: 8, width: "100%", maxWidth: 780 }}>
            <input
              aria-label="Search properties"
              placeholder="Search by district, type, keyword or address"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{ flex: 1, padding: "10px 12px", borderRadius: 8, border: "1px solid rgba(15,23,42,0.08)", fontSize: 14 }}
            />
            <button type="submit" className="btn btn-primary" style={{ padding: "10px 14px" }} aria-label="Search">
              {searching ? "Searching…" : "Search"}
            </button>
            <button type="button" className="btn" onClick={clearSearch} style={{ padding: "10px 12px", border: "1px solid rgba(15,23,42,0.06)" }}>
              Clear
            </button>
          </form>
        </div>

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
                  ? `https://project-2-vdwg.onrender.com/static/uploads/${images[0].image1}`
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
