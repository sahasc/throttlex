import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import RideCard from '../components/RideCard';
import { APIProvider } from '@vis.gl/react-google-maps';
import PlaceAutocomplete from '../components/PlaceAutocomplete';

const Rides = () => {
  const { rides, addRide } = useData();
  const { user } = useAuth();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    maxRiders: 4,
    isEV: false,
    location: '',
    location_data: null,
  });

  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  const handleCreateRide = (e) => {
    e.preventDefault();
    
    const newRide = {
      id: Date.now().toString(),
      ...formData,
      createdBy: user.name,
      createdById: user.id,
      currentRiders: 1,
      riders: [user.id],
      image: formData.isEV
        ? 'https://images.unsplash.com/photo-1760555961058-fd625e6a0b6d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwyfHxtb3RvcmN5Y2xlJTIwcmlkZXIlMjBuaWdodCUyMGNpdHklMjBuZW9uJTIwbGlnaHRzJTIwY2luZW1hdGljfGVufDB8fHx8MTc3MTM5MTc3N3ww&ixlib=rb-4.1.0&q=85'
        : 'https://images.unsplash.com/photo-1669283149120-d539f814aa03?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwxfHxtb3RvcmN5Y2xlJTIwcmlkZXIlMjBuaWdodCUyMGNpdHklMjBuZW9uJTIwbGlnaHRzJTIwY2luZW1hdGljfGVufDB8fHx8MTc3MTM5MTc3N3ww&ixlib=rb-4.1.0&q=85',
      comments: [],
      createdAt: new Date().toISOString(),
    };

    addRide(newRide);
    setShowCreateModal(false);
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      maxRiders: 4,
      isEV: false,
      location: '',
      location_data: null,
    });
  };

  const handleLocationSelect = (place) => {
    setFormData({
      ...formData,
      location: place.formatted_address || place.address,
      location_data: place,
    });
  };

  const filteredRides = rides.filter(ride =>
    ride.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ride.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <APIProvider apiKey={apiKey}>
      <div className="min-h-screen pb-20 md:pb-0 md:pr-20">
        {/* Header */}
        <div className="bg-throttle-bg-secondary px-6 md:px-12 lg:px-24 py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="font-heading text-5xl md:text-7xl font-black uppercase tracking-tighter mb-2">
                <span className="text-throttle-red">ACTIVE</span> RIDES
              </h1>
              <p className="text-throttle-text-secondary">Find your next adventure</p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              data-testid="create-ride-button"
              className="skew-button bg-throttle-red hover:bg-throttle-red-hover text-white px-6 py-3 font-heading font-bold uppercase tracking-widest neon-glow"
            >
              <span className="flex items-center gap-2">
                <Plus size={20} />
                CREATE RIDE
              </span>
            </button>
          </div>

          {/* Search */}
          <div className="mt-8 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-throttle-text-muted" size={20} />
            <input
              type="text"
              placeholder="Search rides by title or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              data-testid="search-rides-input"
              className="input-throttle w-full pl-12 pr-4 py-4 text-lg"
            />
          </div>
        </div>

        {/* Rides Grid */}
        <div className="px-6 md:px-12 lg:px-24 py-12">
          {filteredRides.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-throttle-text-secondary text-lg">No rides found. Create the first one!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRides.map((ride, index) => (
                <RideCard key={ride.id} ride={ride} index={index} />
              ))}
            </div>
          )}
        </div>

        {/* Create Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-panel p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <h2 className="font-heading text-3xl font-black uppercase tracking-tighter mb-6">
                CREATE <span className="text-throttle-red">RIDE</span>
              </h2>

              <form onSubmit={handleCreateRide} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider text-throttle-text-secondary mb-2">
                    Ride Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    data-testid="ride-title-input"
                    className="input-throttle w-full px-4 py-3"
                    placeholder="e.g., Sunset Canyon Run"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider text-throttle-text-secondary mb-2">
                    Location
                  </label>
                  <PlaceAutocomplete
                    onPlaceSelect={handleLocationSelect}
                    placeholder="Search for a location"
                    value={formData.location}
                  />
                  {formData.location && (
                    <p className="text-throttle-text-muted text-xs mt-2">{formData.location}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold uppercase tracking-wider text-throttle-text-secondary mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      data-testid="ride-date-input"
                      className="input-throttle w-full px-4 py-3"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold uppercase tracking-wider text-throttle-text-secondary mb-2">
                      Time
                    </label>
                    <input
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      data-testid="ride-time-input"
                      className="input-throttle w-full px-4 py-3"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider text-throttle-text-secondary mb-2">
                    Max Riders
                  </label>
                  <input
                    type="number"
                    min="2"
                    max="20"
                    value={formData.maxRiders}
                    onChange={(e) => setFormData({ ...formData, maxRiders: parseInt(e.target.value) })}
                    data-testid="ride-max-riders-input"
                    className="input-throttle w-full px-4 py-3"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider text-throttle-text-secondary mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    data-testid="ride-description-input"
                    className="input-throttle w-full px-4 py-3 min-h-[100px]"
                    placeholder="Describe your ride..."
                    required
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isEV"
                    checked={formData.isEV}
                    onChange={(e) => setFormData({ ...formData, isEV: e.target.checked })}
                    data-testid="ride-is-ev-checkbox"
                    className="w-5 h-5"
                  />
                  <label htmlFor="isEV" className="text-sm font-bold uppercase tracking-wider text-throttle-neon-green cursor-pointer">
                    ⚡ EV RIDE (Electric Vehicle)
                  </label>
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    data-testid="submit-create-ride"
                    className="flex-1 bg-throttle-red hover:bg-throttle-red-hover text-white px-6 py-3 font-heading font-bold uppercase tracking-widest transition-colors"
                  >
                    CREATE
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    data-testid="cancel-create-ride"
                    className="flex-1 bg-transparent border border-white/20 hover:border-throttle-red text-white px-6 py-3 font-heading font-bold uppercase tracking-widest transition-colors"
                  >
                    CANCEL
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </APIProvider>
  );
};

export default Rides;