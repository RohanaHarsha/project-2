import React, { useState } from 'react';
import '../commen/filter.css';

export default function Filter({ houseType, onFilter }) {
  const [district, setDistrict] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [story, setStory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { district, bedrooms, story };

    try {
      const response = await fetch(`http://localhost:5000/filter/${houseType}`, {
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
    <div className='filterContainer'>
      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <label>
            District:
            <select value={district} onChange={(e) => setDistrict(e.target.value)}>
              <option value="">All</option>
              <option value="Kandy">Kandy</option>
              <option value="Colombo">Colombo</option>
              <option value="Matara">Matara</option>
              <option value="badulla">Badulla</option>
              <option value="Kurunagala">Kurunagala</option>
              <option value="Galle">Galle</option>
              <option value="rathanpura">rathanpura</option>
            </select>
          </label>
        </div>
        <div className="formGroup">
          <label>
            No. of Bedrooms:
            <input
              type="number"
              min="1"
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
            />
          </label>
        </div>
        <div className="formGroup">
          <label>
            No. of Story:
            <input
              type="number"
              min="1"
              value={story}
              onChange={(e) => setStory(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Filter</button>
      </form>
    </div>
  );
}
