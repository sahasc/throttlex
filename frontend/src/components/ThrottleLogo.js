import React from 'react';
import { Zap } from 'lucide-react';

const ThrottleLogo = ({ size = 'medium', className = '' }) => {
  const sizes = {
    small: {
      icon: 16,
      text: 'text-xl',
      gap: 'gap-1',
    },
    medium: {
      icon: 28,
      text: 'text-3xl',
      gap: 'gap-2',
    },
    large: {
      icon: 40,
      text: 'text-5xl',
      gap: 'gap-3',
    },
    xlarge: {
      icon: 56,
      text: 'text-7xl',
      gap: 'gap-4',
    },
  };

  const config = sizes[size] || sizes.medium;

  return (
    <div className={`flex items-center ${config.gap} ${className}`} data-testid="throttlex-logo">
      {/* Lightning Bolt Icon */}
      <div className="relative">
        <Zap 
          size={config.icon} 
          className="text-throttle-red fill-throttle-red" 
          strokeWidth={2.5}
        />
        {/* Subtle glow effect */}
        <Zap 
          size={config.icon} 
          className="text-throttle-red fill-throttle-red absolute top-0 left-0 blur-sm opacity-50" 
          strokeWidth={2.5}
        />
      </div>

      {/* Logo Text */}
      <h1 className={`font-heading ${config.text} font-black uppercase tracking-tighter leading-none`}>
        <span className="text-white">THROTTLE</span>
        <span className="text-throttle-red">X</span>
      </h1>
    </div>
  );
};

export default ThrottleLogo;
