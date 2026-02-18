import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, DollarSign, User } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';

const ItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getItemById, updateMarketplaceItem } = useData();
  const { user } = useAuth();
  const [item, setItem] = useState(null);
  const [bidAmount, setBidAmount] = useState('');

  useEffect(() => {
    const itemData = getItemById(id);
    setItem(itemData);
  }, [id, getItemById]);

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-throttle-text-secondary">Item not found</p>
      </div>
    );
  }

  const isSeller = item.sellerId === user.id;

  const handlePlaceBid = (e) => {
    e.preventDefault();
    const newBidAmount = parseFloat(bidAmount);
    
    if (newBidAmount > item.currentBid) {
      const newBid = {
        id: Date.now().toString(),
        userId: user.id,
        userName: user.name,
        amount: newBidAmount,
        timestamp: new Date().toISOString(),
      };
      
      updateMarketplaceItem(item.id, {
        currentBid: newBidAmount,
        bids: [...(item.bids || []), newBid],
      });
      
      setItem({
        ...item,
        currentBid: newBidAmount,
        bids: [...(item.bids || []), newBid],
      });
      
      setBidAmount('');
    }
  };

  return (
    <div className="min-h-screen pb-20 md:pb-0 md:pr-20">
      {/* Back Button */}
      <div className="px-6 md:px-12 lg:px-24 py-6">
        <button
          onClick={() => navigate('/marketplace')}
          data-testid="back-to-marketplace"
          className="glass-panel p-3 text-white hover:text-throttle-red transition-colors inline-flex items-center gap-2"
        >
          <ArrowLeft size={20} />
          <span className="font-mono text-sm uppercase">BACK</span>
        </button>
      </div>

      {/* Content */}
      <div className="px-6 md:px-12 lg:px-24 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="aspect-[3/4] bg-throttle-bg-card border border-throttle-border overflow-hidden"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            {item.isBidding && (
              <div className="bg-throttle-red text-white px-4 py-2 inline-block font-bold uppercase text-sm">
                LIVE BIDDING
              </div>
            )}

            <div>
              <h1 className="font-heading text-5xl md:text-6xl font-black uppercase tracking-tighter mb-4">
                {item.name}
              </h1>
              
              {item.isBidding ? (
                <div>
                  <p className="text-throttle-text-muted text-sm uppercase mb-2">CURRENT BID</p>
                  <p className="text-throttle-red text-5xl font-bold">${item.currentBid}</p>
                  <p className="text-throttle-text-muted text-xs mt-2">
                    Starting bid: ${item.startingBid}
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-throttle-text-muted text-sm uppercase mb-2">PRICE</p>
                  <p className="text-white text-5xl font-bold">${item.price}</p>
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-throttle-border">
              <p className="text-sm text-throttle-text-muted uppercase mb-2">DESCRIPTION</p>
              <p className="text-throttle-text-secondary leading-relaxed">{item.description}</p>
            </div>

            <div className="pt-6 border-t border-throttle-border">
              <p className="text-sm text-throttle-text-muted uppercase mb-2">SELLER</p>
              <div className="flex items-center gap-3">
                <User size={16} className="text-throttle-red" />
                <div>
                  <p className="text-white font-bold">{item.sellerName}</p>
                  {item.sellerRating && (
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-throttle-neon-green text-sm font-bold">{item.sellerRating.toFixed(1)}</span>
                      <span className="text-throttle-text-muted text-xs">/ 5.0</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            {!isSeller && (
              <div className="pt-6 border-t border-throttle-border">
                {item.isBidding ? (
                  <form onSubmit={handlePlaceBid} className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold uppercase tracking-wider text-throttle-text-secondary mb-2">
                        YOUR BID ($)
                      </label>
                      <input
                        type="number"
                        min={item.currentBid + 1}
                        step="0.01"
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                        data-testid="bid-amount-input"
                        className="input-throttle w-full px-4 py-3"
                        placeholder={`Minimum: $${item.currentBid + 1}`}
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      data-testid="place-bid-button"
                      className="w-full bg-throttle-red hover:bg-throttle-red-hover text-white px-6 py-4 font-heading font-bold text-lg uppercase tracking-widest transition-colors neon-glow"
                    >
                      PLACE BID
                    </button>
                  </form>
                ) : (
                  <button
                    data-testid="buy-now-button"
                    className="w-full bg-throttle-red hover:bg-throttle-red-hover text-white px-6 py-4 font-heading font-bold text-lg uppercase tracking-widest transition-colors neon-glow"
                  >
                    BUY NOW
                  </button>
                )}
              </div>
            )}

            {/* Bid History */}
            {item.isBidding && item.bids && item.bids.length > 0 && (
              <div className="pt-6 border-t border-throttle-border">
                <h3 className="font-heading text-xl font-bold uppercase tracking-tight mb-4">BID HISTORY</h3>
                <div className="space-y-3 max-h-[200px] overflow-y-auto">
                  {[...item.bids].reverse().map((bid) => (
                    <div key={bid.id} className="flex justify-between items-center bg-throttle-bg-secondary p-3">
                      <div>
                        <p className="text-white font-bold">{bid.userName}</p>
                        <p className="text-throttle-text-muted text-xs">
                          {new Date(bid.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <p className="text-throttle-red text-xl font-bold">${bid.amount}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;