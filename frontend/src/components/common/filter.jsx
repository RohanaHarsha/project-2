import React, { useState } from 'react';
import '../common/filter.css';

export default function Filter({ houseType, onFilter }) {
  const [district, setDistrict] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [story, setStory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { district, bedrooms, story };

    try {
      const response = await fetch(`https://daffodilzone-b-end.onrender.com/filter/${houseType}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        onFilter(data); // Call the callback function passed from parent
      } else {
        console.error('Error:', data);
      }
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <div className="filterContainer">
      <form onSubmit={handleSubmit} className="filterForm">
        <select value={district} onChange={(e) => setDistrict(e.target.value)}>
          <option value="">District</option>
          <option value="Kandy">Kandy</option>
          <option value="Colombo">Colombo</option>
          <option value="Matara">Matara</option>
          <option value="badulla">Badulla</option>
          <option value="Kurunagala">Kurunagala</option>
          <option value="Galle">Galle</option>
          <option value="rathanpura">rathanpura</option>
        </select>
  
        <input
          type="number"
          placeholder="Bedrooms"
          min="1"
          value={bedrooms}
          onChange={(e) => setBedrooms(e.target.value)}
        />
  
        <input
          type="number"
          placeholder="Stories"
          min="1"
          value={story}
          onChange={(e) => setStory(e.target.value)}
        />
  
        <button type="submit">Filter</button>
      </form>
    </div>
  );
  
}
