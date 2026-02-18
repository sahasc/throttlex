import React from 'react';
import { motion } from 'framer-motion';
import { User, Calendar, Zap, Users, ShoppingBag } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user } = useAuth();
  const { rides, packs, marketplaceItems } = useData();
  const navigate = useNavigate();

  const userRides = rides.filter(r => r.riders.includes(user.id));
  const createdRides = rides.filter(r => r.createdById === user.id);
  const userPacks = packs.filter(p => p.members.includes(user.id));
  const userListings = marketplaceItems.filter(i => i.sellerId === user.id);

  const stats = [
    {
      icon: Zap,
      value: userRides.length,
      label: 'RIDES JOINED',
      color: 'text-throttle-red',
    },
    {
      icon: Zap,
      value: createdRides.length,
      label: 'RIDES CREATED',
      color: 'text-white',
    },
    {
      icon: Users,
      value: userPacks.length,
      label: 'PACKS JOINED',
      color: 'text-white',
    },
    {
      icon: ShoppingBag,
      value: userListings.length,
      label: 'ITEMS LISTED',
      color: 'text-white',
    },
  ];

  return (
    <div className="min-h-screen pb-20 md:pb-0 md:pr-20">
      {/* Hero Section */}
      <div className="relative h-[40vh] bg-throttle-bg-secondary">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-throttle-bg-main" />
        
        <div className="relative h-full flex items-end justify-start px-6 md:px-12 lg:px-24 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-end gap-6"
          >
            <div className="w-32 h-32 bg-throttle-red flex items-center justify-center">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <User size={64} className="text-white" />
              )}
            </div>
            <div>
              <h1 className="font-heading text-5xl md:text-6xl font-black uppercase tracking-tighter text-white">
                {user.name}
              </h1>
              <p className="text-throttle-text-secondary text-lg mt-2">{user.email}</p>
              <div className="flex items-center gap-2 mt-2 text-throttle-text-muted text-sm">
                <Calendar size={16} />
                <span>Joined {new Date(user.joinedDate).toLocaleDateString()}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <section className="px-6 md:px-12 lg:px-24 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-panel p-6 text-center"
              >
                <Icon size={32} className={`${stat.color} mx-auto mb-3`} />
                <div className={`font-heading text-5xl font-black mb-2 ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-throttle-text-secondary uppercase tracking-wider text-xs">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Activity Sections */}
      <section className="px-6 md:px-12 lg:px-24 pb-12 space-y-12">
        {/* Rides */}
        <div>
          <h2 className="font-heading text-3xl font-bold uppercase tracking-tight mb-6">
            YOUR <span className="text-throttle-red">RIDES</span>
          </h2>
          {userRides.length === 0 ? (
            <p className="text-throttle-text-muted">No rides yet. Join your first ride!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userRides.slice(0, 6).map((ride) => (
                <div
                  key={ride.id}
                  onClick={() => navigate(`/rides/${ride.id}`)}
                  data-testid={`profile-ride-${ride.id}`}
                  className="glass-panel p-4 cursor-pointer hover:border-throttle-red transition-colors"
                >
                  <h3 className="font-heading text-xl font-bold uppercase tracking-tight text-white mb-2">
                    {ride.title}
                  </h3>
                  <p className="text-throttle-text-muted text-sm">
                    {new Date(ride.date).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Packs */}
        <div>
          <h2 className="font-heading text-3xl font-bold uppercase tracking-tight mb-6">
            YOUR <span className="text-throttle-red">PACKS</span>
          </h2>
          {userPacks.length === 0 ? (
            <p className="text-throttle-text-muted">No packs yet. Join or create your first pack!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userPacks.map((pack) => (
                <div
                  key={pack.id}
                  onClick={() => navigate(`/packs/${pack.id}`)}
                  data-testid={`profile-pack-${pack.id}`}
                  className="glass-panel p-4 cursor-pointer hover:border-throttle-red transition-colors"
                >
                  <h3 className="font-heading text-xl font-bold uppercase tracking-tight text-white mb-2">
                    {pack.name}
                  </h3>
                  <p className="text-throttle-text-muted text-sm">
                    {pack.members.length} members
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Marketplace Listings */}
        <div>
          <h2 className="font-heading text-3xl font-bold uppercase tracking-tight mb-6">
            YOUR <span className="text-throttle-red">LISTINGS</span>
          </h2>
          {userListings.length === 0 ? (
            <p className="text-throttle-text-muted">No items listed yet. List your first item!</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {userListings.map((item) => (
                <div
                  key={item.id}
                  onClick={() => navigate(`/marketplace/${item.id}`)}
                  data-testid={`profile-item-${item.id}`}
                  className="glass-panel p-4 cursor-pointer hover:border-throttle-red transition-colors"
                >
                  <h3 className="font-heading text-lg font-bold uppercase tracking-tight text-white mb-2 line-clamp-1">
                    {item.name}
                  </h3>
                  <p className="text-throttle-red text-xl font-bold">
                    ${item.isBidding ? item.currentBid : item.price}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Profile;