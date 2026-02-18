import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Users as UsersIcon, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const RideCard = ({ ride, index }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={() => navigate(`/rides/${ride.id}`)}
      data-testid={`ride-card-${ride.id}`}
      className="ride-card bg-throttle-bg-card border border-throttle-border p-0 cursor-pointer overflow-hidden group"
    >
      {/* Ride Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={ride.image}
          alt={ride.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-throttle-bg-card to-transparent" />
        
        {ride.isEV && (
          <div className="absolute top-4 right-4 bg-throttle-neon-green text-black px-3 py-1 text-xs font-bold uppercase flex items-center gap-1">
            <Zap size={12} />
            EV RIDE
          </div>
        )}
      </div>

      {/* Ride Info */}
      <div className="p-6">
        <h3 className="font-heading text-2xl font-bold uppercase tracking-tight text-white mb-3">
          {ride.title}
        </h3>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-throttle-text-secondary text-sm">
            <MapPin size={16} />
            <span>{ride.location}</span>
          </div>
          <div className="flex items-center gap-2 text-throttle-text-secondary text-sm">
            <Calendar size={16} />
            <span>{new Date(ride.date).toLocaleDateString()} at {ride.time}</span>
          </div>
          <div className="flex items-center gap-2 text-throttle-text-secondary text-sm">
            <UsersIcon size={16} />
            <span>{ride.currentRiders}/{ride.maxRiders} Riders</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-throttle-text-muted text-xs font-mono uppercase">
            BY {ride.createdBy}
          </span>
          <button
            data-testid={`join-ride-${ride.id}`}
            className="bg-throttle-red hover:bg-throttle-red-hover text-white px-4 py-2 text-sm font-bold uppercase tracking-wider transition-colors"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            JOIN
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default RideCard;