import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import Navbar from '../../components/AdminNavbar';

const DisplayHouse = () => {
  const [houses, setHouses] = useState([]);

  const fetchHouses = () => {
    axios.get('http://127.0.0.1:5000/displayAllAgentHouse')
      .then((response) => {
        console.log('Fetched houses:', response.data);
        setHouses(response.data);
      })
      .catch((error) => {
        console.error('Error fetching houses:', error);
      });
  };

  useEffect(() => {
    fetchHouses();
  }, []);

  const handleAddLuxuryHouse = async (house) => {
    // Display the details and ask for confirmation
    const houseDetails = `
      House Type: ${house.houseType}\n
      District: ${house.district}\n
      Address: ${house.address}\n
      Number of Rooms: ${house.no_of_rooms}\n
      Number of Bathrooms: ${house.no_of_bathrooms}\n
      Land Size: ${house.land_size}\n
      Distance: ${house.distance}\n
      Storey: ${house.storey}\n
      Description: ${house.description}\n
      lng: ${house.lng}\n
      lat: ${house.lat}\n
      price: ${house.price}\n
      img: ${house.images}
    `;
    
    const userConfirmed = window.confirm(`Are you sure you want to submit the following house?\n${houseDetails}`);
    
    if (!userConfirmed) return;

    const formData = new FormData();
    formData.append('houseType', house.houseType);
    formData.append('district', house.district);
    formData.append('address', house.address);
    formData.append('no_of_rooms', house.no_of_rooms);
    formData.append('no_of_bathrooms', house.no_of_bathrooms);
    formData.append('land_size', house.land_size);
    formData.append('distance', house.distance);
    formData.append('storey', house.storey);
    formData.append('keyWord', house.keyWord);
    formData.append('description', house.description);
    formData.append('lng', house.lng);
    formData.append('lat', house.lat);
    formData.append('price', house.price);
  
    // Append existing image files to formData
    if (house.images && house.images.length > 0) {
      for (let i = 0; i < house.images.length; i++) {
        const imageFileName = house.images[i].image1; // Assuming you're using only image1
        if (imageFileName) {
          const imageFilePath = `http://127.0.0.1:5000/static/uploads/${imageFileName}`;
          const response = await fetch(imageFilePath);
          const blob = await response.blob(); // Convert image to blob
          const file = new File([blob], imageFileName, { type: 'image/jpeg' }); // Use appropriate mime type
          formData.append(`image${i + 1}`, file); // Append the image file to formData
        } else {
          console.error(`Image ${i + 1} is not valid.`);
        }
      }
    } else {
      console.error('No images available for this house.');
    }
  
    axios.post('http://127.0.0.1:5000/addLuxuryHouse', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        console.log('House added successfully:', response.data);
        // Optionally, refresh or update state

        const emailData = {
          name: house.keyWord, 
          email: house.agentEmail,  
          subject: 'New House Added',
          message: `A new house has been added:\n\n${houseDetails}`
        };
        console.log('Email Data:', house);
        axios.post('http://127.0.0.1:5000/send_email', emailData)
          .then((emailResponse) => {
            console.log('Email sent successfully:', emailResponse.data);
            
          })
          .catch((emailError) => {
            console.error('Error sending email:', emailError);
          });
      })
      .catch((error) => {
        console.error('Error adding house:', error);
      });
  };

  return (
    <div>
      <Navbar />
      <h2>Displaying Houses</h2>
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
            <th>Agent Id</th>
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
              <td>{house.agentId}</td>
              <td>
                <button className="btn btn-success" onClick={() => handleAddLuxuryHouse(house)}>
                  Upload
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DisplayHouse;
