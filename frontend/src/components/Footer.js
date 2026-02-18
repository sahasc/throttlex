import React from 'react';
import ThrottleLogo from './ThrottleLogo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-throttle-bg-main border-t border-throttle-border py-8 px-6 md:px-12 lg:px-24 pb-24 md:pb-8 md:pr-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo */}
          <div>
            <ThrottleLogo size="small" />
          </div>

          {/* Links */}
          <div className="flex gap-8 text-throttle-text-muted text-sm">
            <a 
              href="#" 
              className="hover:text-throttle-red transition-colors uppercase tracking-wider"
            >
              About
            </a>
            <a 
              href="#" 
              className="hover:text-throttle-red transition-colors uppercase tracking-wider"
            >
              Community
            </a>
            <a 
              href="#" 
              className="hover:text-throttle-red transition-colors uppercase tracking-wider"
            >
              Support
            </a>
          </div>

          {/* Copyright */}
          <div className="text-throttle-text-muted text-sm text-center md:text-right">
            <p className="font-mono">© {currentYear} ThrottleX</p>
            <p className="text-xs mt-1">Performance Community Platform</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
