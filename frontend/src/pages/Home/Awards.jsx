import React from 'react';
import Heading from '../../components/commen/Heading';
import './Awards.css';

export default function Awards() {
  const backgroundStyle = {
    backgroundColor: '#122947', // Set background color to blue
    padding: '20px', // Example padding for spacing
  };

  return (
    <div>
      <section className='awards padding'>
        <div className='container'>
          <Heading title='Over 10,000+ Happy Users Being With Us Still They Love Our Services' subtitle='Our Awards' />

          {/* Apply inline style to set background color */}
          <div className='content grid4 mtop' >
            <div className='box'style={backgroundStyle}>
              <div className='icon'>
                <i className='fas fa-trophy'></i>
              </div>
              <h1>32 M</h1>
              <p>Blue Burmin Award</p>
            </div>

            <div className='box'style={backgroundStyle}>
              <div className='icon'>
                <i className='fas fa-briefcase'></i>
              </div>
              <h1>43 M</h1>
              <p>Mimo X11 Award</p>
            </div>

            <div className='box'style={backgroundStyle}>
              <div className='icon'>
                <i className='fas fa-lightbulb'></i>
              </div>
              <h1>51 M</h1>
              <p>Australian UGC Award</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
