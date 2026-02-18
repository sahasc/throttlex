import React, { useState, useRef, useEffect } from 'react';
import { useMapsLibrary } from '@vis.gl/react-google-maps';
import { MapPin } from 'lucide-react';

const PlaceAutocomplete = ({ onPlaceSelect, placeholder = 'Search location', value = '' }) => {
  const [placeAutocomplete, setPlaceAutocomplete] = useState(null);
  const inputRef = useRef(null);
  const places = useMapsLibrary('places');

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      fields: ['geometry', 'name', 'formatted_address', 'place_id'],
    };

    const autocomplete = new places.Autocomplete(inputRef.current, options);
    setPlaceAutocomplete(autocomplete);
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener('place_changed', () => {
      const place = placeAutocomplete.getPlace();

      if (!place.geometry || !place.geometry.location) {
        return;
      }

      const selectedPlace = {
        latitude: place.geometry.location.lat(),
        longitude: place.geometry.location.lng(),
        address: place.name || '',
        formatted_address: place.formatted_address || '',
        place_id: place.place_id,
      };

      onPlaceSelect(selectedPlace);
    });
  }, [placeAutocomplete, onPlaceSelect]);

  return (
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-throttle-text-muted">
        <MapPin size={18} />
      </div>
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        defaultValue={value}
        data-testid="location-autocomplete"
        className="input-throttle w-full pl-12 pr-4 py-3 text-white placeholder:text-throttle-text-muted"
      />
    </div>
  );
};

export default PlaceAutocomplete;