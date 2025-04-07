import React from 'react';
import description_image from '../../img/description.jpeg';
import './CompanyDescription.css'; // Import your CSS file for styling

const CompanyDescription = () => {
  return (
    <div className="company-description">
      <div className="description-text">
        <h1>We Are Experts In Historic Home Renovations</h1>
        <p>
          Looking to renovate your home to reflect your style and personality? Look no further than our team of experts who specialize in quality home renovations to transform your space into a dream home you'll love. From design to execution.
        </p>
      </div>
      <div className="company-grid">
        <div className="grid-item">
          <img src={description_image} alt="Renovation 1" />
        </div>
        <div className="grid-item">
          <img src={description_image} alt="Renovation 2" />
        </div>
        <div className="grid-item">
          <img src={description_image} alt="Renovation 3" />
        </div>
      </div>
    </div>
  );
};

export default CompanyDescription;
