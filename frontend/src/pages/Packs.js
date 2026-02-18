import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import PackCard from '../components/PackCard';

const Packs = () => {
  const { packs, addPack } = useData();
  const { user } = useAuth();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const handleCreatePack = (e) => {
    e.preventDefault();
    
    const newPack = {
      id: Date.now().toString(),
      ...formData,
      createdBy: user.name,
      createdById: user.id,
      members: [user.id],
      image: 'https://images.unsplash.com/photo-1760555961058-fd625e6a0b6d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwyfHxtb3RvcmN5Y2xlJTIwcmlkZXIlMjBuaWdodCUyMGNpdHklMjBuZW9uJTIwbGlnaHRzJTIwY2luZW1hdGljfGVufDB8fHx8MTc3MTM5MTc3N3ww&ixlib=rb-4.1.0&q=85',
      upcomingRides: 0,
      createdAt: new Date().toISOString(),
    };

    addPack(newPack);
    setShowCreateModal(false);
    setFormData({
      name: '',
      description: '',
    });
  };

  const filteredPacks = packs.filter(pack =>
    pack.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pack.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen pb-20 md:pb-0 md:pr-20">
      {/* Header */}
      <div className="bg-throttle-bg-secondary px-6 md:px-12 lg:px-24 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="font-heading text-5xl md:text-7xl font-black uppercase tracking-tighter mb-2">
              <span className="text-throttle-red">ACTIVE</span> PACKS
            </h1>
            <p className="text-throttle-text-secondary">Find your crew</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            data-testid="create-pack-button"
            className="skew-button bg-throttle-red hover:bg-throttle-red-hover text-white px-6 py-3 font-heading font-bold uppercase tracking-widest neon-glow"
          >
            <span className="flex items-center gap-2">
              <Plus size={20} />
              CREATE PACK
            </span>
          </button>
        </div>

        {/* Search */}
        <div className="mt-8 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-throttle-text-muted" size={20} />
          <input
            type="text"
            placeholder="Search packs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            data-testid="search-packs-input"
            className="input-throttle w-full pl-12 pr-4 py-4 text-lg"
          />
        </div>
      </div>

      {/* Packs Grid */}
      <div className="px-6 md:px-12 lg:px-24 py-12">
        {filteredPacks.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-throttle-text-secondary text-lg">No packs found. Create the first one!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPacks.map((pack, index) => (
              <PackCard key={pack.id} pack={pack} index={index} />
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
            className="glass-panel p-8 max-w-2xl w-full"
          >
            <h2 className="font-heading text-3xl font-black uppercase tracking-tighter mb-6">
              CREATE <span className="text-throttle-red">PACK</span>
            </h2>

            <form onSubmit={handleCreatePack} className="space-y-6">
              <div>
                <label className="block text-sm font-bold uppercase tracking-wider text-throttle-text-secondary mb-2">
                  Pack Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  data-testid="pack-name-input"
                  className="input-throttle w-full px-4 py-3"
                  placeholder="e.g., Night Riders"
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
                  data-testid="pack-description-input"
                  className="input-throttle w-full px-4 py-3 min-h-[150px]"
                  placeholder="Describe your pack..."
                  required
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  data-testid="submit-create-pack"
                  className="flex-1 bg-throttle-red hover:bg-throttle-red-hover text-white px-6 py-3 font-heading font-bold uppercase tracking-widest transition-colors"
                >
                  CREATE
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  data-testid="cancel-create-pack"
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

export default Packs;