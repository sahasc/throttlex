import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      const result = login(email, password);
      if (result.success) {
        navigate('/');
      } else {
        setError(result.error);
      }
    } else {
      if (!name) {
        setError('Please enter your name');
        return;
      }
      const result = signup(email, password, name);
      if (result.success) {
        navigate('/');
      } else {
        setError(result.error);
      }
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1748739550781-44dbf5fe0cdd?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzZ8MHwxfHNlYXJjaHw0fHxjaW5lbWF0aWMlMjBzcG9ydHMlMjBjYXIlMjBuaWdodCUyMGNpdHklMjBzdHJlZXQlMjBkYXJrJTIwbW9vZHl8ZW58MHx8fHwxNzcxMzkxNzc2fDA&ixlib=rb-4.1.0&q=85')",
        }}
      />
      <div className="hero-overlay absolute inset-0" />

      {/* Content */}
      <div className="relative min-h-screen flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-8 md:p-12 max-w-md w-full"
        >
          {/* Logo */}
          <div className="flex items-center justify-center mb-8">
            <Zap size={40} className="text-throttle-red" />
            <h1 className="font-heading text-4xl font-black uppercase tracking-tighter ml-2">
              THROTTLE<span className="text-throttle-red">X</span>
            </h1>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-sm font-bold uppercase tracking-wider text-throttle-text-secondary mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  data-testid="auth-name-input"
                  className="input-throttle w-full px-4 py-3"
                  placeholder="Enter your name"
                  required={!isLogin}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-bold uppercase tracking-wider text-throttle-text-secondary mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                data-testid="auth-email-input"
                className="input-throttle w-full px-4 py-3"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold uppercase tracking-wider text-throttle-text-secondary mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                data-testid="auth-password-input"
                className="input-throttle w-full px-4 py-3"
                placeholder="Enter your password"
                required
              />
            </div>

            {error && (
              <div className="bg-throttle-red/20 border border-throttle-red text-throttle-red px-4 py-3 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              data-testid="auth-submit-button"
              className="w-full bg-throttle-red hover:bg-throttle-red-hover text-white px-6 py-4 font-heading font-bold text-lg uppercase tracking-widest transition-colors"
            >
              {isLogin ? 'LOGIN' : 'SIGN UP'}
            </button>
          </form>

          {/* Toggle */}
          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
              data-testid="auth-toggle-button"
              className="text-throttle-text-secondary hover:text-white transition-colors text-sm uppercase tracking-wider"
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Login'}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;