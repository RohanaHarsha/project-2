import React from 'react';
import { GoogleMap, LoadScript, Marker} from '@react-google-maps/api';

const MapContainer = ({ lat, lng }) => {
  const mapStyles = {        
    height: "80vh",
    width: "100%"};

  const defaultCenter = {
    lat: lat || 6.982641, 
    lng: lng || 81.076837
  };

  return (
    <LoadScript googleMapsApiKey="AlzaSy9YOmD0iKbark1OrqaObyxVuwglDvUvzp"> AlzaSy9YOmD0iKbark1OrqaObyxVuwglDvUvzpB
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={16}
        center={defaultCenter}
      >
        <Marker position={defaultCenter}/>
      </GoogleMap>
    </LoadScript>
  )
}

export default MapContainer;