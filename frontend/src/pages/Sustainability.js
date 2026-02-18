import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Users, Leaf, TrendingUp } from 'lucide-react';
import { useData } from '../contexts/DataContext';

const Sustainability = () => {
  const { getStats } = useData();
  const stats = getStats();

  const impactMetrics = [
    {
      icon: Zap,
      value: stats.totalRides,
      label: 'TOTAL RIDES',
      color: 'text-white',
    },
    {
      icon: Zap,
      value: stats.evRides,
      label: 'EV RIDES',
      color: 'text-throttle-neon-green',
    },
    {
      icon: Leaf,
      value: `${stats.co2Saved}kg`,
      label: 'CO2 SAVED',
      color: 'text-white',
    },
    {
      icon: Users,
      value: stats.activePacks,
      label: 'ACTIVE PACKS',
      color: 'text-white',
    },
  ];

  const evPercentage = stats.totalRides > 0 ? ((stats.evRides / stats.totalRides) * 100).toFixed(1) : 0;

  return (
    <div className="min-h-screen pb-20 md:pb-0 md:pr-20">
      {/* Hero Section */}
      <div className="relative h-[60vh] flex items-end justify-start">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1770608014330-7de6ce86c69d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzZ8MHwxfHNlYXJjaHwyfHxjaW5lbWF0aWMlMjBzcG9ydHMlMjBjYXIlMjBuaWdodCUyMGNpdHklMjBzdHJlZXQlMjBkYXJrJTIwbW9vZHl8ZW58MHx8fHwxNzcxMzkxNzc2fDA&ixlib=rb-4.1.0&q=85')",
          }}
        />
        <div className="hero-overlay absolute inset-0" />

        <div className="relative px-6 md:px-12 lg:px-24 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter mb-4">
              SUSTAINABILITY
              <br />
              <span className="text-throttle-neon-green">IMPACT</span>
            </h1>
            <p className="text-throttle-text-secondary text-xl max-w-2xl">
              Every EV ride makes a difference. Track our collective impact on the environment.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Stats Grid */}
      <section className="px-6 md:px-12 lg:px-24 py-24 bg-throttle-bg-main">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {impactMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-panel p-8 text-center"
              >
                <Icon size={48} className={`${metric.color} mx-auto mb-6`} />
                <div className={`font-heading text-7xl md:text-8xl font-black mb-2 ${metric.color}`}>
                  {metric.value}
                </div>
                <div className="text-throttle-text-secondary uppercase tracking-wider text-sm">
                  {metric.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* EV Adoption */}
      <section className="px-6 md:px-12 lg:px-24 py-24 bg-throttle-bg-secondary">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8 text-center">
            EV <span className="text-throttle-neon-green">ADOPTION</span>
          </h2>

          <div className="max-w-4xl mx-auto">
            <div className="glass-panel p-12">
              <div className="flex justify-between items-end mb-4">
                <div>
                  <p className="text-throttle-text-muted uppercase text-sm mb-2">EV RIDE PERCENTAGE</p>
                  <p className="font-heading text-6xl font-black text-throttle-neon-green">{evPercentage}%</p>
                </div>
                <Zap size={64} className="text-throttle-neon-green" />
              </div>
              
              {/* Progress Bar */}
              <div className="w-full h-4 bg-throttle-bg-main relative overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${evPercentage}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-throttle-neon-green"
                />
              </div>

              <p className="text-throttle-text-secondary text-center mt-8 leading-relaxed">
                {stats.evRides} out of {stats.totalRides} rides are powered by electric vehicles.
                Together, we've saved {stats.co2Saved}kg of CO2 emissions.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Mission Statement */}
      <section className="px-6 md:px-12 lg:px-24 py-32 bg-throttle-bg-main text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <Leaf size={64} className="text-throttle-neon-green mx-auto mb-8" />
          <h2 className="font-heading text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">
            PERFORMANCE MEETS
            <br />
            <span className="text-throttle-neon-green">RESPONSIBILITY</span>
          </h2>
          <p className="text-throttle-text-secondary text-lg leading-relaxed">
            At ThrottleX, we believe in pushing limits without compromising our planet.
            Every EV ride you take contributes to a cleaner, faster future.
            Join the movement. Ride electric. Make an impact.
          </p>
        </motion.div>
      </section>
    </div>
  );
};

export default Sustainability;