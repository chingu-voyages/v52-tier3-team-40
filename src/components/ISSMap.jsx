// import React from "react";

// const Component2 = () => (
//   <div className="w-full max-w-7xl h-[60vh] px-4 py-6 bg-gray-800 rounded-3xl shadow-lg">
//     <h2 className="text-lg font-semibold">Component 2</h2>
//     <p>This is the second component of the homepage.</p>
//   </div>
// );

// export default Component2;

import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet's CSS

const ISSMap = () => {
  const mapRef = useRef(null); // Reference to store the Leaflet map instance
  const issMarkerRef = useRef(null); // Reference for the ISS marker
  const issCircleRef = useRef(null); // Reference for the ISS circle
  const [position, setPosition] = useState({ lat: 0, lon: 0 }); // Store ISS position

  // Initialize the map and layers
  useEffect(() => {
    // Create the map instance and set initial view
    mapRef.current = L.map('map').setView([0, 0], 2);

    // Add tile layer to the map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 4,
      minZoom: 1,
    }).addTo(mapRef.current);

    // Define the ISS icon
    const ISSIcon = L.icon({
      iconUrl: '/src/assets/images/ISS/ISSIcon.png',
      iconSize: [50, 30],
      iconAnchor: [25, 15],
      popupAnchor: [50, 25],
      shadowUrl: '/src/assets/images/ISS/ISSIcon_shadow.png',
      shadowSize: [60, 40],
      shadowAnchor: [30, 15],
    });

    // Add ISS marker to the map
    issMarkerRef.current = L.marker([0, 0], { icon: ISSIcon }).addTo(
      mapRef.current
    );

    // Add ISS circle to the map
    issCircleRef.current = L.circle([0, 0], {
      radius: 2200e3,
      color: '#c22',
      opacity: 0.3,
      weight: 1,
      fillColor: '#c22',
      fillOpacity: 0.1,
    }).addTo(mapRef.current);

    // Cleanup the map on component unmount
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  // Fetch ISS position and update map layers
  useEffect(() => {
    const fetchISSPosition = () => {
      fetch('http://api.open-notify.org/iss-now.json')
        .then((response) => response.json())
        .then((data) => {
          const lat = parseFloat(data.iss_position.latitude);
          const lon = parseFloat(data.iss_position.longitude);
          setPosition({ lat, lon }); // Update state with the new position
        })
        .catch((error) => console.error('Error fetching ISS data:', error));
    };

    const intervalId = setInterval(fetchISSPosition, 5000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (mapRef.current && issMarkerRef.current && issCircleRef.current) {
      const { lat, lon } = position;
      issMarkerRef.current.setLatLng([lat, lon]);
      issCircleRef.current.setLatLng([lat, lon]);
      mapRef.current.panTo([lat, lon], { animate: true });
    }
  }, [position]);

  return (
    <div className="w-full max-w-7xl px-8 py-6 bg-gray-900 rounded-3xl shadow-lg ">
      <div className="self-center text-center pb-3">
        <h2 className="text-3xl font-bold">Live ISS Tracker</h2>
        <hr className="border-b-teal-400 border-b-2 border-t-0 w-32 mx-auto my-4"></hr>
        <p className="text-gray-400 pb-4">
          Current Position:{' '}
          <span className="font-mono">Lat: {position.lat}</span>,{' '}
          <span className="font-mono">Lon: {position.lon}</span>
        </p>
      </div>
      <div id="map" className="w-full h-[500px] rounded-lg shadow-md" />
    </div>
  );
};

export default ISSMap;
