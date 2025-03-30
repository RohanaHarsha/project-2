import React from 'react';
import './App.css';
import Home from './pages/home';
import AddHotels from './pages/AddHotels';
import BannerAdd from './pages/bannerAdd';
import AddHouse from './pages/AddHouse';
import About from './pages/About/About';
import Login from './pages/login/signup';
import Hotels from './pages/hotels'
import AdminHome from './pages/Admin/AdminHome';
import Lands from './pages/Lands'
import HouseDisplay from './pages/HouseCards/displayHouses';
import AddAgent from './pages/Admin/addAgent';
import AgentHome from './pages/AgentPage/AgentHome';
import Signup from './pages/login/signup';
import DisplayAgentHouse from './pages/Admin/DisplayAgentHouse';
import Propertyinfo from './pages/HouseCards/propertyinfo';
import Customer from './pages/customer/customer';
import MyBookings from "./pages/MyBookings/MyBookings";
import AllBookings from "./pages/AllBookings/AllBookings";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Googlemap from './pages/HouseCards/googlemap';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/displayHouses/:houseType" element={<HouseDisplay />} /> {/* Dynamic path */}
          <Route path="/bannerAdd" element={<BannerAdd />} />
          <Route path="/addHouse" element={<AddHouse />} />
          <Route path="/login" element={<Login />} />
          <Route path="/AdminHome" element={<AdminHome />} />
          <Route path="/Hotel" element={<Hotels />} />
          <Route path="/Lands" element={<Lands />} />
          <Route path="/about" element={<About />} />
          <Route path="/logout" element={<Home />} />
          <Route path="/addHotel" element={<AddHotels />} />
          <Route path="/addAgent" element={<AddAgent />} />
          <Route path="/AgentHome" element={<AgentHome />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/displayAgentHouse" element={<DisplayAgentHouse />} />
          <Route path="/propertyinfo/:id" element = {<Propertyinfo/>}/>
          <Route path="/CustomerHome" element={<Customer />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/bookings" element={<AllBookings />} />
          <Route path="/googlemap" element={<Googlemap />} />  
       </Routes>
      </Router>
    </div>
  );
}

export default App;
