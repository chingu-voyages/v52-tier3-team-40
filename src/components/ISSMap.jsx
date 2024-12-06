import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
const ISSMap = () => {
  const mapRef = useRef(null);
  const issMarkerRef = useRef(null);
  const issCircleRef = useRef(null);
  const [position, setPosition] = useState({ lat: 0, lon: 0 });
  useEffect(() => {
    mapRef.current = L.map('map').setView([0, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 4,
      minZoom: 1,
    }).addTo(mapRef.current);

    const ISSIcon = L.icon({
      iconUrl: '/src/assets/images/ISS/ISSIcon.png',
      iconSize: [60, 40],
      iconAnchor: [30, 20],
      popupAnchor: [50, 25],
      shadowUrl: '/src/assets/images/ISS/ISSIcon_shadow.png',
      shadowSize: [60, 40],
      shadowAnchor: [30, 15],
    });

    issMarkerRef.current = L.marker([0, 0], { icon: ISSIcon }).addTo(
      mapRef.current
    );

    issCircleRef.current = L.circle([0, 0], {
      radius: 2200e3,
      color: '#c22',
      opacity: 0.3,
      weight: 1,
      fillColor: '#c22',
      fillOpacity: 0.1,
    }).addTo(mapRef.current);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  useEffect(() => {
    const fetchISSPosition = () => {
      fetch('http://api.open-notify.org/iss-now')
        .then((response) => response.json())
        .then((data) => {
          const lat = parseFloat(data.iss_position.latitude);
          const lon = parseFloat(data.iss_position.longitude);
          setPosition({ lat, lon });
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
    <div className="flex flex-col w-full max-w-7xl py-6 px-8">
      <div className="self-center text-center">
        <h2 className="text-3xl font-bold">Live ISS Tracker</h2>
        <hr className="border-b-teal-400 border-b-2 border-t-0 w-32 mx-auto my-4"></hr>
        <p className="text-gray-400 ">
          Current Position: <span>Lat: {position.lat}</span>,{' '}
          <span>Lon: {position.lon}</span>
        </p>
        <div className="container mx-auto md:px-24 xl:px-64">
          <p className="py-10">
            The International Space Station is moving at close to 28,000 km/h so
            its location changes really fast! Where is it right now?
          </p>
        </div>
      </div>
      <div id="map" className="w-full h-[500px] rounded-lg" />
      <div className="mx-auto pt-20 max-w-min">
        <button className="border-slate-600 border-2 px-5 py-2 w-max">
          Scroll next
        </button>
      </div>
    </div>
  );
};

export default ISSMap;
