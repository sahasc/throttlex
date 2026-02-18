import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Zap, Users, ShoppingBag, Award } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { getUsers } from '../utils/localStorage';

const Leaderboard = () => {
  const { rides, packs, marketplaceItems } = useData();
  const [activeTab, setActiveTab] = useState('rides');
  const users = getUsers();

  // Calculate leaderboard data
  const getUserStats = (userId) => {
    const userRides = rides.filter(r => r.createdById === userId);
    const userEVRides = userRides.filter(r => r.isEV);
    const ridesJoined = rides.filter(r => r.riders.includes(userId)).length;
    const packsJoined = packs.filter(p => p.members.includes(userId)).length;
    const itemsListed = marketplaceItems.filter(i => i.sellerId === userId).length;
    
    return {
      ridesCreated: userRides.length,
      evRides: userEVRides.length,
      ridesJoined,
      packsJoined,
      itemsListed,
      co2Saved: userEVRides.length * 2.3,
    };
  };

  const leaderboards = {
    rides: users
      .map(u => ({ ...u, stats: getUserStats(u.id) }))
      .filter(u => u.stats.ridesCreated > 0)
      .sort((a, b) => b.stats.ridesCreated - a.stats.ridesCreated)
      .slice(0, 10),
    
    ev: users
      .map(u => ({ ...u, stats: getUserStats(u.id) }))
      .filter(u => u.stats.evRides > 0)
      .sort((a, b) => b.stats.evRides - a.stats.evRides)
      .slice(0, 10),
    
    community: users
      .map(u => ({ ...u, stats: getUserStats(u.id) }))
      .filter(u => u.stats.ridesJoined > 0 || u.stats.packsJoined > 0)
      .sort((a, b) => (b.stats.ridesJoined + b.stats.packsJoined) - (a.stats.ridesJoined + a.stats.packsJoined))
      .slice(0, 10),
  };

  const tabs = [
    { key: 'rides', label: 'TOP CREATORS', icon: Zap, color: 'text-throttle-red' },
    { key: 'ev', label: 'EV CHAMPIONS', icon: Award, color: 'text-throttle-neon-green' },
    { key: 'community', label: 'MOST ACTIVE', icon: Users, color: 'text-white' },
  ];

  const currentLeaderboard = leaderboards[activeTab];

  return (
    <div className="min-h-screen pb-20 md:pb-0 md:pr-20">
      {/* Hero Section */}
      <div className="relative h-[40vh] bg-throttle-bg-secondary">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-throttle-bg-main" />
        
        <div className="relative h-full flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Trophy size={80} className="text-throttle-red mx-auto mb-6" />
            <h1 className="font-heading text-6xl md:text-8xl font-black uppercase tracking-tighter">
              <span className="text-throttle-red">LEADER</span>BOARD
            </h1>
            <p className="text-throttle-text-secondary text-xl mt-4">Performance legends of ThrottleX</p>
          </motion.div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6 md:px-12 lg:px-24 py-8">
        <div className="flex gap-4 overflow-x-auto pb-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                data-testid={`leaderboard-tab-${tab.key}`}
                className={`glass-panel px-6 py-4 flex items-center gap-3 whitespace-nowrap transition-all ${
                  activeTab === tab.key
                    ? 'border-throttle-red bg-throttle-red/10'
                    : 'border-throttle-border hover:border-white/20'
                }`}
              >
                <Icon size={24} className={activeTab === tab.key ? tab.color : 'text-throttle-text-secondary'} />
                <span className={`font-heading font-bold uppercase tracking-wider ${
                  activeTab === tab.key ? 'text-white' : 'text-throttle-text-secondary'
                }`}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Leaderboard */}
      <div className="px-6 md:px-12 lg:px-24 pb-12">
        {currentLeaderboard.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-throttle-text-secondary text-lg">No data yet. Be the first legend!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {currentLeaderboard.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                data-testid={`leaderboard-user-${user.id}`}
                className={`glass-panel p-6 flex items-center gap-6 ${
                  index === 0 ? 'border-throttle-red bg-throttle-red/5' : ''
                }`}
              >
                {/* Rank */}
                <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center">
                  {index < 3 ? (
                    <Trophy
                      size={40}
                      className={
                        index === 0
                          ? 'text-throttle-red'
                          : index === 1
                          ? 'text-gray-400'
                          : 'text-yellow-700'
                      }
                    />
                  ) : (
                    <span className="font-heading text-4xl font-black text-throttle-text-muted">
                      {index + 1}
                    </span>
                  )}
                </div>

                {/* Avatar */}
                <div className="flex-shrink-0 w-16 h-16 bg-throttle-red flex items-center justify-center overflow-hidden">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-white font-bold text-xl">{user.name[0]}</span>
                  )}
                </div>

                {/* User Info */}
                <div className="flex-1">
                  <h3 className="font-heading text-xl font-bold uppercase tracking-tight text-white">
                    {user.name}
                  </h3>
                  <p className="text-throttle-text-muted text-sm">
                    Joined {new Date(user.joinedDate).toLocaleDateString()}
                  </p>
                </div>

                {/* Stats */}
                <div className="flex gap-8">
                  {activeTab === 'rides' && (
                    <div className="text-center">
                      <div className="font-heading text-3xl font-black text-throttle-red">
                        {user.stats.ridesCreated}
                      </div>
                      <div className="text-throttle-text-muted text-xs uppercase">Rides</div>
                    </div>
                  )}
                  
                  {activeTab === 'ev' && (
                    <>
                      <div className="text-center">
                        <div className="font-heading text-3xl font-black text-throttle-neon-green">
                          {user.stats.evRides}
                        </div>
                        <div className="text-throttle-text-muted text-xs uppercase">EV Rides</div>
                      </div>
                      <div className="text-center">
                        <div className="font-heading text-3xl font-black text-white">
                          {user.stats.co2Saved.toFixed(1)}
                        </div>
                        <div className="text-throttle-text-muted text-xs uppercase">kg CO2</div>
                      </div>
                    </>
                  )}
                  
                  {activeTab === 'community' && (
                    <>
                      <div className="text-center">
                        <div className="font-heading text-3xl font-black text-white">
                          {user.stats.ridesJoined}
                        </div>
                        <div className="text-throttle-text-muted text-xs uppercase">Rides</div>
                      </div>
                      <div className="text-center">
                        <div className="font-heading text-3xl font-black text-white">
                          {user.stats.packsJoined}
                        </div>
                        <div className="text-throttle-text-muted text-xs uppercase">Packs</div>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;