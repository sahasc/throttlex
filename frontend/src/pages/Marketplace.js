import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import MarketplaceCard from '../components/MarketplaceCard';
import ImageUpload from '../components/ImageUpload';

const Marketplace = () => {
  const { marketplaceItems, addMarketplaceItem } = useData();
  const { user } = useAuth();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    isBidding: false,
    currentBid: '',
    imageUrl: '',
    uploadedImage: null,
  });

  const handleCreateItem = (e) => {
    e.preventDefault();
    
    const newItem = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      price: formData.isBidding ? null : parseFloat(formData.price),
      isBidding: formData.isBidding,
      currentBid: formData.isBidding ? parseFloat(formData.currentBid) : null,
      startingBid: formData.isBidding ? parseFloat(formData.currentBid) : null,
      bids: [],
      sellerId: user.id,
      sellerName: user.name,
      sellerRating: 5.0, // Default rating for new sellers
      image: formData.uploadedImage || formData.imageUrl || 'https://images.unsplash.com/photo-1649027421785-6827863f0891?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAxODF8MHwxfHNlYXJjaHwzfHxjYXJib24lMjBmaWJlciUyMG1vdG9yY3ljbGUlMjBoZWxtZXQlMjBsdXh1cnklMjBnZWFyfGVufDB8fHx8MTc3MTM5MTc4MXww&ixlib=rb-4.1.0&q=85',
      createdAt: new Date().toISOString(),
    };

    addMarketplaceItem(newItem);
    setShowCreateModal(false);
    setFormData({
      name: '',
      description: '',
      price: '',
      isBidding: false,
      currentBid: '',
      imageUrl: '',
      uploadedImage: null,
    });
  };

  const filteredItems = marketplaceItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen pb-20 md:pb-0 md:pr-20">
      {/* Header */}
      <div className="bg-throttle-bg-secondary px-6 md:px-12 lg:px-24 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="font-heading text-5xl md:text-7xl font-black uppercase tracking-tighter mb-2">
              <span className="text-throttle-red">PERFORMANCE</span> GEAR
            </h1>
            <p className="text-throttle-text-secondary">Trade exclusive performance equipment</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            data-testid="list-item-button"
            className="skew-button bg-throttle-red hover:bg-throttle-red-hover text-white px-6 py-3 font-heading font-bold uppercase tracking-widest neon-glow"
          >
            <span className="flex items-center gap-2">
              <Plus size={20} />
              LIST ITEM
            </span>
          </button>
        </div>

        {/* Search */}
        <div className="mt-8 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-throttle-text-muted" size={20} />
          <input
            type="text"
            placeholder="Search gear..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            data-testid="search-marketplace-input"
            className="input-throttle w-full pl-12 pr-4 py-4 text-lg"
          />
        </div>
      </div>

      {/* Marketplace Grid */}
      <div className="px-6 md:px-12 lg:px-24 py-12">
        {filteredItems.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-throttle-text-secondary text-lg">No items listed yet. Be the first!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredItems.map((item, index) => (
              <MarketplaceCard key={item.id} item={item} index={index} />
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
              LIST <span className="text-throttle-red">ITEM</span>
            </h2>

            <form onSubmit={handleCreateItem} className="space-y-6">
              <div>
                <label className="block text-sm font-bold uppercase tracking-wider text-throttle-text-secondary mb-2">
                  Item Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  data-testid="item-name-input"
                  className="input-throttle w-full px-4 py-3"
                  placeholder="e.g., Carbon Fiber Helmet"
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
                  data-testid="item-description-input"
                  className="input-throttle w-full px-4 py-3 min-h-[100px]"
                  placeholder="Describe your item..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold uppercase tracking-wider text-throttle-text-secondary mb-2">
                  Image
                </label>
                <ImageUpload
                  onImageSelect={(image) => setFormData({ ...formData, uploadedImage: image })}
                  currentImage={formData.uploadedImage}
                  label=""
                />
                <div className="mt-3">
                  <label className="block text-xs text-throttle-text-muted uppercase mb-1">
                    Or enter image URL
                  </label>
                  <input
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    data-testid="item-image-input"
                    className="input-throttle w-full px-4 py-2 text-sm"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isBidding"
                  checked={formData.isBidding}
                  onChange={(e) => setFormData({ ...formData, isBidding: e.target.checked })}
                  data-testid="item-bidding-checkbox"
                  className="w-5 h-5"
                />
                <label htmlFor="isBidding" className="text-sm font-bold uppercase tracking-wider text-white cursor-pointer">
                  ENABLE BIDDING
                </label>
              </div>

              {formData.isBidding ? (
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider text-throttle-text-secondary mb-2">
                    Starting Bid ($)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.currentBid}
                    onChange={(e) => setFormData({ ...formData, currentBid: e.target.value })}
                    data-testid="item-starting-bid-input"
                    className="input-throttle w-full px-4 py-3"
                    placeholder="100"
                    required
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider text-throttle-text-secondary mb-2">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    data-testid="item-price-input"
                    className="input-throttle w-full px-4 py-3"
                    placeholder="299"
                    required
                  />
                </div>
              )}

              <div className="flex gap-4">
                <button
                  type="submit"
                  data-testid="submit-list-item"
                  className="flex-1 bg-throttle-red hover:bg-throttle-red-hover text-white px-6 py-3 font-heading font-bold uppercase tracking-widest transition-colors"
                >
                  LIST ITEM
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  data-testid="cancel-list-item"
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
  );
};

export default Marketplace;