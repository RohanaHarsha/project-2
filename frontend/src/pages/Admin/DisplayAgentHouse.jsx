import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import Navbar from "../../components/AdminNavbar";

const DisplayHouse = () => {
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    fetchHouses();
  }, []);

  const fetchHouses = () => {
    axios
      .get("http://127.0.0.1:5000/auth/displayAllAgentHouse")
      .then((response) => {
        setHouses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching houses:", error);
      });
  };

  const handleAddLuxuryHouse = async (house) => {
    const houseDetails = `
      House Type: ${house.houseType}
      District: ${house.district}
      Address: ${house.address}
      Rooms: ${house.no_of_rooms}
      Bathrooms: ${house.no_of_bathrooms}
      Land Size: ${house.land_size}
      Distance: ${house.distance}
      Storey: ${house.storey}
      Description: ${house.description}
      lng: ${house.lng}
      lat: ${house.lat}
      price: ${house.price}
    `;

    const confirmed = window.confirm(
      `Confirm submission of the following house: \n${houseDetails}`
    );

    if (!confirmed) return;

    try {
      const formData = new FormData();

      Object.entries({
        houseType: house.houseType,
        district: house.district,
        address: house.address,
        no_of_rooms: house.no_of_rooms,
        no_of_bathrooms: house.no_of_bathrooms,
        land_size: house.land_size,
        distance: house.distance,
        storey: house.storey,
        keyWord: house.keyWord,
        description: house.description,
        lng: house.lng,
        lat: house.lat,
        price: house.price,
      }).forEach(([key, value]) => formData.append(key, value));

      // Attach images
      if (house.images?.length) {
        for (let i = 0; i < house.images.length; i++) {
          const fileName = house.images[i].image1;
          if (!fileName) continue;

          const fileUrl = `http://127.0.0.1:5000/static/uploads/${fileName}`;
          const response = await fetch(fileUrl);
          const blob = await response.blob();

          formData.append(`image${i + 1}`, new File([blob], fileName));
        }
      }

      const uploadResponse = await axios.post(
        "http://127.0.0.1:5000/house/addLuxuryHouse",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("House uploaded successfully:", uploadResponse.data);

      const emailData = {
        name: house.keyWord,
        email: house.agentEmail,
        subject: "New House Added",
        message: `A new house has been added:\n\n${houseDetails}`,
      };

      await axios.post("http://127.0.0.1:5000/send_email", emailData);

      alert("House submitted & email sent!");
    } catch (err) {
      console.error("Error uploading house:", err);
      alert("Failed to upload house");
    }
  };

  return (
    <div>
      <Navbar />
      <h2>Displaying Houses</h2>
      <h4 className="ms-3">Listed Properties</h4>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>District</th>
            <th>Address</th>
            <th>Rooms</th>
            <th>Land Size</th>
            <th>Image</th>
            <th>Type</th>
            <th>Agent ID</th>
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
                {house.images?.[0]?.image1 ? (
                  <img
                    src={`http://127.0.0.1:5000/static/uploads/${house.images[0].image1}`}
                    alt="House"
                    style={{ width: "100px", borderRadius: "5px" }}
                  />
                ) : (
                  "No Image"
                )}
              </td>

              <td>{house.houseType}</td>
              <td>{house.agentId}</td>

              <td>
                <button
                  className="btn btn-success"
                  onClick={() => handleAddLuxuryHouse(house)}
                >
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
