import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap'; // Assuming you are using react-bootstrap for styling

const DisplayHouse = ({ userId }) => {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const userIdString = String(userId);

  useEffect(() => {
    const fetchHouses = async () => {
      if (userIdString) {
        try {
          // Fetching all houses for the given userId
          const response = await axios.get(`/displayAgentHouses/${userIdString}`);
          
          // Log the response data to the console
          console.log('Response data:', response.data);

          setHouses(response.data);
        } catch (error) {
          console.error('Error fetching houses:', error);
          setError('Failed to fetch houses. Please try again later.');
        } finally {
          setLoading(false); // Set loading to false regardless of success or error
        }
      } else {
        setLoading(false); // If no userId, just stop loading
      }
    };

    fetchHouses();
  }, [userIdString]); // Runs when userIdString changes

  // Function to delete a house
  const deleteImage = async (houseId) => {
    if (window.confirm("Are you sure you want to delete this house?")) {
      try {
        const response = await axios.delete(`/deleteAgentHouse/${houseId}`);
        console.log('Delete response:', response.data);

        // Update state to remove the deleted house
        setHouses(houses.filter(house => house.id !== houseId));
      } catch (error) {
        console.error('Error deleting house:', error);
        setError('Failed to delete the house. Please try again later.');
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Loading message
  }

  if (error) {
    return <div>{error}</div>; // Error message
  }

  return (
    <div>
      <h2>Displaying Houses for User: {userIdString}</h2>
      <h4 style={{ marginLeft: 15 }}>Listed Properties</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>District</th>
            <th>Address</th>
            <th>Number of Rooms</th>
            <th>Land Size</th>
            <th>Image</th>
            <th>Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {houses.map((house, index) => (
            <tr key={house.id}>
              <td>{index + 1}</td>
              <td>{house.id}</td>
              <td>{house.district}</td>
              <td>{house.address}</td>
              <td>{house.no_of_rooms}</td>
              <td>{house.land_size}</td>
              <td>
                {house.images && house.images.length > 0 && house.images[0].image1 ? (
                  <img
                    src={`http://127.0.0.1:5000/static/uploads/${house.images[0].image1}`}
                    alt={`House ${index + 1}`}
                    style={{ width: '100px' }}
                  />
                ) : (
                  <span>No Image</span>
                )}
              </td>
              <td>{house.houseType}</td>
              <td>
                <button className="btn btn-danger" onClick={() => deleteImage(house.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DisplayHouse;
