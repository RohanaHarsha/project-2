import React from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation
import Navbar from '../../components/AgentNavbar';
import AddHouse from '../../components/agentComponents/addHouse';
import DisplayHouse from '../../components/agentComponents/displayHouse';
import Footer from '../../components/Footer/footer';

export default function AgentHome() {
  const location = useLocation(); // Use useLocation to access the location object
  const userId = location.state?.userId; // Use optional chaining to safely access userId
  const user_email = location.state?.user_email;

  // Log the user ID to the console
  console.log('User logged in with user_id:', userId);
  console.log('User logged in with Email:', user_email);

  return (
    <div>
      <Navbar />
      <div>
        <h2>Submit Data</h2>
        <div>
          {/* Remove the comma between props */}
          <AddHouse userId={userId} user_email={user_email} />
          <DisplayHouse userId={userId} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
