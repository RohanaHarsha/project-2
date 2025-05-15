import React, { useState } from 'react';
import Navbar from '../../components/commen/sidebar';
import HomeVid from "../../img/HomeVid.mp4";
import '../../pages/home.css';
import LatestProjects from '../../components/LatestProjects';
import Recent from "../../pages/Home/Recent";
import Awards from "../../pages/Home/Awards";
import Description from "../Home/company_description";
import AddBannerForm from '../bannerAdd';
import AddHouse from '../AddHouse';

export default function Home() {
    const [showBannerForm, setShowBannerForm] = useState(false);
    const toggleBannerForm = () => setShowBannerForm(prev => !prev);
    
    const [showHouseForm, setShowHouseForm] = useState(false);
    const toggleHouseForm = () => setShowHouseForm(prev => !prev);

    return (
        <div className="home-layout">
            <Navbar />

            <div className="main-content">
                <div className="imageContainer">
                    <div className="text-container-home">
                        <h1 className='text-on-image'>
                            Explore<br />Your Dream Home<br />With Us
                        </h1>
                    </div>
                    <video
                        className="homePageImage"
                        src={HomeVid}
                        autoPlay
                        loop
                        muted
                        playsInline
                    />
                </div>

                <div className='web_body'>
                    <div className="latestProjectsContainer">
                        <h2>Latest Projects</h2>
                        <LatestProjects />

                
                        {showHouseForm && 
                            <AddHouse 
                                userId={"admin_id"} 
                                user_email={"admin_email@example.com"} 
                            />
                        }

                    </div>
                </div>
            </div>
        </div>
    );
}
