import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import { initializeStorage } from './utils/localStorage';
import { seedDemoData } from './utils/seedData';
import './App.css';

// Components
import Navigation from './components/Navigation';

// Pages
import Auth from './pages/Auth';
import Home from './pages/Home';
import Rides from './pages/Rides';
import RideDetail from './pages/RideDetail';
import Packs from './pages/Packs';
import PackDetail from './pages/PackDetail';
import Marketplace from './pages/Marketplace';
import ItemDetail from './pages/ItemDetail';
import Sustainability from './pages/Sustainability';
import Profile from './pages/Profile';
import Leaderboard from './pages/Leaderboard';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-throttle-bg-main">
        <div className="text-throttle-text-secondary">Loading...</div>
      </div>
    );
  }
  
  return user ? children : <Navigate to="/auth" />;
};

// Main App Routes
const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <>
      <Navigation />
      <Routes>
        <Route 
          path="/auth" 
          element={user ? <Navigate to="/" /> : <Auth />} 
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/rides"
          element={
            <ProtectedRoute>
              <Rides />
            </ProtectedRoute>
          }
        />
        <Route
          path="/rides/:id"
          element={
            <ProtectedRoute>
              <RideDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/packs"
          element={
            <ProtectedRoute>
              <Packs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/packs/:id"
          element={
            <ProtectedRoute>
              <PackDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/marketplace"
          element={
            <ProtectedRoute>
              <Marketplace />
            </ProtectedRoute>
          }
        />
        <Route
          path="/marketplace/:id"
          element={
            <ProtectedRoute>
              <ItemDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sustainability"
          element={
            <ProtectedRoute>
              <Sustainability />
            </ProtectedRoute>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <ProtectedRoute>
              <Leaderboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

function App() {
  useEffect(() => {
    initializeStorage();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <DataProvider>
            <AppRoutes />
          </DataProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
