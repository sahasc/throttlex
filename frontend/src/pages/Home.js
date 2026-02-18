import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import { useData } from '../contexts/DataContext';
import { Zap, Users, ShoppingBag, TrendingUp } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const { getStats } = useData();
  const stats = getStats();

  const features = [
    {
      icon: Zap,
      title: 'CREATE',
      subtitle: 'RIDES',
      description: 'Plan your route. Set the pace. Lead the pack.',
    },
    {
      icon: Users,
      title: 'FORM',
      subtitle: 'PACKS',
      description: 'Build your crew. Ride together. Grow stronger.',
    },
    {
      icon: ShoppingBag,
      title: 'TRADE',
      subtitle: 'GEAR',
      description: 'Premium performance. Exclusive marketplace.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero
        title="FIND YOUR PACK"
        subtitle="Join the ultimate performance community. Ride together. Trade gear. Build legacy."
        ctaPrimary="JOIN A RIDE"
        ctaSecondary="CREATE A RIDE"
        backgroundImage="https://images.unsplash.com/photo-1748739550781-44dbf5fe0cdd?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzZ8MHwxfHNlYXJjaHw0fHxjaW5lbWF0aWMlMjBzcG9ydHMlMjBjYXIlMjBuaWdodCUyMGNpdHklMjBzdHJlZXQlMjBkYXJrJTIwbW9vZHl8ZW58MHx8fHwxNzcxMzkxNzc2fDA&ixlib=rb-4.1.0&q=85"
        onPrimaryClick={() => navigate('/rides')}
        onSecondaryClick={() => navigate('/rides')}
      />

      {/* How It Works Section */}
      <section className="px-6 md:px-12 lg:px-24 py-24 bg-throttle-bg-main">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-5xl md:text-7xl font-black uppercase tracking-tighter mb-16 text-center">
            HOW IT <span className="text-throttle-red">WORKS</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="glass-panel p-8 group hover:border-throttle-red transition-all duration-300"
                >
                  <Icon size={48} className="text-throttle-red mb-6" />
                  <h3 className="font-heading text-3xl font-bold uppercase tracking-tight mb-2">
                    {feature.title}
                  </h3>
                  <h4 className="font-heading text-5xl font-black uppercase tracking-tighter text-throttle-red mb-4">
                    {feature.subtitle}
                  </h4>
                  <p className="text-throttle-text-secondary leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="px-6 md:px-12 lg:px-24 py-24 bg-throttle-bg-secondary">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          <div className="text-center">
            <div className="font-heading text-6xl md:text-8xl font-black text-throttle-red mb-2">
              {stats.totalRides}
            </div>
            <div className="text-throttle-text-secondary uppercase tracking-wider text-sm">
              TOTAL RIDES
            </div>
          </div>
          <div className="text-center">
            <div className="font-heading text-6xl md:text-8xl font-black text-throttle-neon-green mb-2">
              {stats.evRides}
            </div>
            <div className="text-throttle-text-secondary uppercase tracking-wider text-sm">
              EV RIDES
            </div>
          </div>
          <div className="text-center">
            <div className="font-heading text-6xl md:text-8xl font-black text-white mb-2">
              {stats.co2Saved}
            </div>
            <div className="text-throttle-text-secondary uppercase tracking-wider text-sm">
              KG CO2 SAVED
            </div>
          </div>
          <div className="text-center">
            <div className="font-heading text-6xl md:text-8xl font-black text-white mb-2">
              {stats.activePacks}
            </div>
            <div className="text-throttle-text-secondary uppercase tracking-wider text-sm">
              ACTIVE PACKS
            </div>
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="px-6 md:px-12 lg:px-24 py-32 bg-throttle-bg-main text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-6xl md:text-8xl font-black uppercase tracking-tighter mb-8">
            READY TO <span className="text-throttle-red">RIDE?</span>
          </h2>
          <button
            onClick={() => navigate('/rides')}
            data-testid="home-join-button"
            className="skew-button bg-throttle-red hover:bg-throttle-red-hover text-white px-12 py-5 font-heading font-bold text-xl uppercase tracking-widest neon-glow"
          >
            <span>JOIN NOW</span>
          </button>
        </motion.div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;