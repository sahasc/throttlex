import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

const MarketplaceCard = ({ item, index }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      onClick={() => navigate(`/marketplace/${item.id}`)}
      data-testid={`marketplace-item-${item.id}`}
      className="marketplace-card bg-throttle-bg-card border border-throttle-border overflow-hidden cursor-pointer aspect-[3/4]"
    >
      {/* Item Image */}
      <div className="relative h-[70%] overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
        {item.isBidding && (
          <div className="absolute top-3 right-3 bg-throttle-red text-white px-2 py-1 text-xs font-bold uppercase">
            LIVE BID
          </div>
        )}
      </div>

      {/* Item Info */}
      <div className="p-4 h-[30%] flex flex-col justify-between">
        <h3 className="font-heading text-lg font-bold uppercase tracking-tight text-white line-clamp-1">
          {item.name}
        </h3>

        <div className="flex items-center justify-between mt-2">
          <div>
            {item.isBidding ? (
              <>
                <p className="text-throttle-text-muted text-xs uppercase">Current Bid</p>
                <p className="text-throttle-red text-xl font-bold">${item.currentBid}</p>
              </>
            ) : (
              <p className="text-white text-xl font-bold">${item.price}</p>
            )}
          </div>
          <button
            data-testid={`view-item-${item.id}`}
            className="text-throttle-text-secondary hover:text-white text-sm uppercase font-mono transition-colors"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            VIEW
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default MarketplaceCard;