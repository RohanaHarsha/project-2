import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/common/navbar";
import HomeVid from "../img/HomeVid.mp4";
import "../pages/home.css";
import LatestProjects from "../components/LatestProjects";
import Recent from "../pages/Home/Recent";
import Awards from "../pages/Home/Awards";
import Description from "./Home/company_description";
import Footer from "../components/Footer/footer";

export default function Home() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const q = (query || "").trim();
    if (!q) {
      navigate("/displayHouses/All");
      return;
    }
    // navigate to the new search path (displayHouses component should read query param or you can implement displayHouses/search route)
    navigate(`/displayHouses/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <div>
      <Navbar />
      <div className="imageContainer">
        <div className="text-container-home">
          <div className="capitalize-text">
            <h1 className="text-on-image">
              Explore
              <br />
              Your Dream Home
              <br />
              With Us
            </h1>
          </div>
        </div>
        <video
          className="homePageImage"
          src={HomeVid}
          autoPlay
          loop
          muted
          playsInline
        />

        <form
          className="filterForm"
          onSubmit={handleSearchSubmit}
          style={{
            borderRadius: "30px",
            padding: "10px",
            border: "1px solid #ccc",
          }}
        >
          <input
            className="filterInput"
            type="text"
            placeholder="Search by keyword, district or type..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              borderRadius: "30px",
              padding: "8px",
              width: "100%",
              border: "1px solid #ccc",
              opasity: "10px",
            }}
          />
          <button className="filterButton" type="submit">
            Search
          </button>
        </form>
      </div>

      <div className="web_body">
        <div className="latestProjectsContainer">
          <LatestProjects />
          <div className="latestProjectsContainer">
            <Recent />
            <br />
            <Awards />
            <Description />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
