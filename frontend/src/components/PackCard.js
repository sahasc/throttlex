import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users as UsersIcon, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const PackCard = ({ pack, index }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={() => navigate(`/packs/${pack.id}`)}
      data-testid={`pack-card-${pack.id}`}
      className="ride-card bg-throttle-bg-card border border-throttle-border p-0 cursor-pointer overflow-hidden group"
    >
      {/* Pack Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={pack.image}
          alt={pack.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-throttle-bg-card to-transparent" />
      </div>

      {/* Pack Info */}
      <div className="p-6">
        <h3 className="font-heading text-2xl font-bold uppercase tracking-tight text-white mb-3">
          {pack.name}
        </h3>

        <p className="text-throttle-text-secondary text-sm mb-4 line-clamp-2">
          {pack.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-throttle-text-secondary text-sm">
            <UsersIcon size={16} />
            <span>{pack.members.length} Members</span>
          </div>
          <div className="flex items-center gap-2 text-throttle-text-secondary text-sm">
            <Calendar size={16} />
            <span>{pack.upcomingRides || 0} Upcoming Rides</span>
          </div>
        </div>

        <button
          data-testid={`join-pack-${pack.id}`}
          className="w-full bg-transparent border border-white/20 hover:border-throttle-red hover:text-throttle-red text-white px-4 py-2 text-sm font-bold uppercase tracking-wider transition-all"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          JOIN PACK
        </button>
      </div>
    </motion.div>
  );
};

export default PackCard;