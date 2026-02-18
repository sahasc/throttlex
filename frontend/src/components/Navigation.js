import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Home, Zap, Users, ShoppingBag, Leaf, User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';

const Navigation = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const navItems = [
    { path: '/', icon: Home, label: 'HOME' },
    { path: '/rides', icon: Zap, label: 'RIDES' },
    { path: '/packs', icon: Users, label: 'PACKS' },
    { path: '/marketplace', icon: ShoppingBag, label: 'GEAR' },
    { path: '/sustainability', icon: Leaf, label: 'IMPACT' },
  ];

  if (!user) return null;

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-0 left-0 right-0 z-50 md:left-auto md:top-0 md:bottom-0 md:right-0 md:w-20"
    >
      <div className="glass-panel border-t md:border-t-0 md:border-l border-throttle-border h-16 md:h-screen flex md:flex-col items-center justify-around md:justify-center md:gap-8 px-4 md:px-0">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              data-testid={`nav-${item.label.toLowerCase()}`}
              className="group relative flex flex-col items-center justify-center"
            >
              <div
                className={`p-3 rounded-none transition-all duration-300 ${
                  isActive
                    ? 'bg-throttle-red text-white'
                    : 'text-throttle-text-secondary hover:text-white hover:bg-throttle-bg-secondary'
                }`}
              >
                <Icon size={20} />
              </div>
              <span className="hidden md:block text-[8px] mt-1 font-mono uppercase tracking-wider text-throttle-text-muted group-hover:text-white transition-colors">
                {item.label}
              </span>
            </Link>
          );
        })}

        <div className="hidden md:block w-full h-px bg-throttle-border my-4" />

        <Link
          to="/profile"
          data-testid="nav-profile"
          className="group relative flex flex-col items-center justify-center"
        >
          <div
            className={`p-3 rounded-none transition-all duration-300 ${
              location.pathname === '/profile'
                ? 'bg-throttle-red text-white'
                : 'text-throttle-text-secondary hover:text-white hover:bg-throttle-bg-secondary'
            }`}
          >
            <User size={20} />
          </div>
        </Link>

        <button
          onClick={handleLogout}
          data-testid="nav-logout"
          className="group relative flex flex-col items-center justify-center"
        >
          <div className="p-3 rounded-none text-throttle-text-secondary hover:text-throttle-red hover:bg-throttle-bg-secondary transition-all duration-300">
            <LogOut size={20} />
          </div>
        </button>
      </div>
    </motion.nav>
  );
};

export default Navigation;