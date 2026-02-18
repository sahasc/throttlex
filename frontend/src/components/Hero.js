import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Hero = ({ title, subtitle, ctaPrimary, ctaSecondary, backgroundImage, onPrimaryClick, onSecondaryClick }) => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
        }}
      />
      
      {/* Overlay */}
      <div className="hero-overlay absolute inset-0" />

      {/* Content */}
      <div className="relative h-full flex items-end justify-start p-6 md:p-12 lg:p-24">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl font-black uppercase leading-none tracking-tighter mb-6">
            {title.split(' ').map((word, index) => (
              <React.Fragment key={index}>
                <span className={index % 3 === 1 ? 'text-throttle-red text-glow' : 'text-white'}>
                  {word}
                </span>
                {index < title.split(' ').length - 1 && ' '}
              </React.Fragment>
            ))}
          </h1>
          
          {subtitle && (
            <p className="text-throttle-text-secondary text-lg md:text-xl mb-8 max-w-2xl font-body">
              {subtitle}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            {ctaPrimary && (
              <button
                onClick={onPrimaryClick}
                data-testid="hero-cta-primary"
                className="skew-button bg-throttle-red hover:bg-throttle-red-hover text-white px-8 py-4 font-heading font-bold text-lg uppercase tracking-widest neon-glow"
              >
                <span className="flex items-center gap-2">
                  {ctaPrimary}
                  <ArrowRight size={20} />
                </span>
              </button>
            )}
            
            {ctaSecondary && (
              <button
                onClick={onSecondaryClick}
                data-testid="hero-cta-secondary"
                className="skew-button bg-transparent border border-white/20 hover:border-throttle-red hover:text-throttle-red text-white px-8 py-4 font-heading font-bold text-lg uppercase tracking-widest transition-all"
              >
                <span>{ctaSecondary}</span>
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;