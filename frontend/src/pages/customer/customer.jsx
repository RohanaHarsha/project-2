import React from 'react';
import Navbar from '../customer/nav';
import HomePageImage1 from '../../img/HomePageImage1.jpg';
import '../../pages/home.css';
import Footer from '../../components/Footer/footer';
import LatestProjects from '../../components/LatestProjects';
import Recent from "../../pages/Home/Recent"
import Awards from "../../pages/Home/Awards"
import Description from "./../Home/company_description"


export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="imageContainer">
      <div className="text-container-home">
        <div className='capitalize-text'>
          <h1 className='text-on-image'>Explore<br />Your Dream House<br />With Us</h1>
        </div>
      </div>
        <img className="homePageImage" src={HomePageImage1} alt="" />
        <form className="filterForm" style={{ borderRadius: '30px', padding: '10px', border: '1px solid #ccc' }}>
          
          <input type="text" placeholder="Search..." style={{ borderRadius: '30px', padding: '8px', width:'100%', border: '1px solid #ccc' }} />
          <button type="submit" style={{ borderRadius: '30px', padding: '5px' }}>Search</button>
        
        </form>
      </div>

      <div className='web_body'>
        <div className="latestProjectsContainer">
          <h2>Latest Projects</h2>
         <LatestProjects />
          <div className="latestProjectsContainer">
          
          <Recent /><br/>
          <Awards/>
          <Description/>
          
        </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
