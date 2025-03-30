import React, { useState } from 'react';
import Navbar from '../../components/commen/navbar';
import HomePageImage1 from '../../img/HomePageImage1.jpg';
import '../../pages/home.css';
import LatestProjects from '../../components/LatestProjects';
import Recent from "../../pages/Home/Recent";
import Awards from "../../pages/Home/Awards";
import Description from "../Home/company_description";

export default function Home() {
    const [userId] = useState(null);  // Consider fetching or setting user ID dynamically

    return (
        <div>
            <Navbar />
            <div className="imageContainer">
            <div className="text-container-home">
                <div className='capitalize-text'>
                    <h1 className='text-on-image'>Explore<br />Your Dream House<br />With Us</h1>
                </div>
            </div>
                <img className="homePageImage" src={HomePageImage1} alt="Home Page" />
            </div>
            <div className='web_body'>
                <div className="latestProjectsContainer">
                    <h2>Latest Projects</h2>
                    <LatestProjects />
                    <div>
                        <Recent /><br />
                        <Awards />
                        <Description />
                    </div>
                    {userId && (
                        <div>
                            <h3>Logged in as User ID: {userId}</h3>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
