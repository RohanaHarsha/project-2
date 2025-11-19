import React, { useState } from 'react';
import Sidebar from '../../components/commen/sidebar';
import HomeVid from "../../img/HomeVid.mp4";
import './adminhome.css';
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
        <div className="page-with-sidebar">
         
            <Sidebar />

            <div className="page-content">
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

                {/* Website Body */}
                <div className='web_body'>
                    <div className="latestProjectsContainer">
                        <h2>Latest Projects</h2>
                        <LatestProjects />

                        {/* Conditional Forms */}
                        {showBannerForm && <AddBannerForm />}
                        {showHouseForm && <AddHouse />}
                    </div>

                    {/* Other Sections */}
                    <Recent />
                    <Awards />
                    <Description />
                </div>
            </div>
        </div>
    );
}
