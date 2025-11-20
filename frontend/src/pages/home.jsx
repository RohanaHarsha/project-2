import React from "react";
import Navbar from "../components/commen/navbar";
import HomeVid from "../img/HomeVid.mp4";
import "../pages/home.css";
import LatestProjects from "../components/LatestProjects";
import Recent from "../pages/Home/Recent";
import Awards from "../pages/Home/Awards";
import Description from "./Home/company_description";
import Footer from "../components/Footer/footer";

export default function Home() {
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
          style={{
            borderRadius: "30px",
            padding: "10px",
            border: "1px solid #ccc",
          }}
        >
          <input
            type="text"
            placeholder="Search..."
            style={{
              borderRadius: "30px",
              padding: "8px",
              width: "100%",
              border: "1px solid #ccc",
              opasity: "10px",
            }}
          />
          <button type="submit">
            Search
          </button>
        </form>
      </div>

      <div className="web_body">
        <div className="latestProjectsContainer">
          <h2>Latest Projects</h2>
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
