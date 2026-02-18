import React from 'react';
import { Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import { motion } from 'framer-motion';

const RideMap = ({ rides = [], center = { lat: 40.7128, lng: -74.0060 }, zoom = 12, height = '500px' }) => {
  const mapId = 'throttlex_map';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full border border-throttle-border overflow-hidden"
      style={{ height }}
    >
      <Map
        style={{ width: '100%', height: '100%' }}
        defaultCenter={center}
        defaultZoom={zoom}
        mapId={mapId}
        disableDefaultUI={false}
        gestureHandling="greedy"
        styles={[
          {
            elementType: 'geometry',
            stylers: [{ color: '#0A0A0A' }],
          },
          {
            elementType: 'labels.text.stroke',
            stylers: [{ color: '#050505' }],
          },
          {
            elementType: 'labels.text.fill',
            stylers: [{ color: '#A3A3A3' }],
          },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{ color: '#262626' }],
          },
          {
            featureType: 'road',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#121212' }],
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{ color: '#1C1C1C' }],
          },
        ]}
      >
        {rides.map((ride) => {
          if (!ride.location_data || !ride.location_data.latitude) return null;
          
          return (
            <AdvancedMarker
              key={ride.id}
              position={{
                lat: ride.location_data.latitude,
                lng: ride.location_data.longitude,
              }}
              title={ride.title}
            >
              <div className="bg-throttle-red text-white p-2 font-bold text-xs uppercase shadow-lg">
                {ride.isEV ? '⚡' : '🏍️'}
              </div>
            </AdvancedMarker>
          );
        })}
      </Map>
    </motion.div>
  );
};

export default RideMap;