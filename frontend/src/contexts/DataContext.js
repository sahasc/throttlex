import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  getRides,
  addRide as addRideToStorage,
  updateRide as updateRideInStorage,
  deleteRide as deleteRideFromStorage,
  getPacks,
  addPack as addPackToStorage,
  updatePack as updatePackInStorage,
  getMarketplaceItems,
  addMarketplaceItem as addItemToStorage,
  updateMarketplaceItem as updateItemInStorage,
  getMessages,
  addMessage as addMessageToStorage,
  getRatings,
  addRating as addRatingToStorage,
  getAverageRating,
} from '../utils/localStorage';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [rides, setRides] = useState([]);
  const [packs, setPacks] = useState([]);
  const [marketplaceItems, setMarketplaceItems] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setRides(getRides());
    setPacks(getPacks());
    setMarketplaceItems(getMarketplaceItems());
  };

  // Ride functions
  const addRide = (ride) => {
    const newRide = addRideToStorage(ride);
    setRides([...rides, newRide]);
    return newRide;
  };

  const updateRide = (rideId, updates) => {
    updateRideInStorage(rideId, updates);
    setRides(rides.map(r => r.id === rideId ? { ...r, ...updates } : r));
  };

  const deleteRide = (rideId) => {
    deleteRideFromStorage(rideId);
    setRides(rides.filter(r => r.id !== rideId));
  };

  const getRideById = (rideId) => {
    return rides.find(r => r.id === rideId);
  };

  // Pack functions
  const addPack = (pack) => {
    const newPack = addPackToStorage(pack);
    setPacks([...packs, newPack]);
    return newPack;
  };

  const updatePack = (packId, updates) => {
    updatePackInStorage(packId, updates);
    setPacks(packs.map(p => p.id === packId ? { ...p, ...updates } : p));
  };

  const getPackById = (packId) => {
    return packs.find(p => p.id === packId);
  };

  // Marketplace functions
  const addMarketplaceItem = (item) => {
    const newItem = addItemToStorage(item);
    setMarketplaceItems([...marketplaceItems, newItem]);
    return newItem;
  };

  const updateMarketplaceItem = (itemId, updates) => {
    updateItemInStorage(itemId, updates);
    setMarketplaceItems(marketplaceItems.map(i => i.id === itemId ? { ...i, ...updates } : i));
  };

  const getItemById = (itemId) => {
    return marketplaceItems.find(i => i.id === itemId);
  };

  // Message functions
  const getPackMessages = (packId) => {
    return getMessages(packId);
  };

  const addMessage = (message) => {
    addMessageToStorage(message);
  };

  // Rating functions
  const addRating = (rating) => {
    addRatingToStorage(rating);
  };

  const getTargetRatings = (targetId) => {
    return getRatings(targetId);
  };

  const getTargetAverageRating = (targetId) => {
    return getAverageRating(targetId);
  };

  // Stats for sustainability page
  const getStats = () => {
    const totalRides = rides.length;
    const evRides = rides.filter(r => r.isEV).length;
    const co2Saved = evRides * 2.3; // kg per ride
    const activePacks = packs.length;
    
    return {
      totalRides,
      evRides,
      co2Saved: co2Saved.toFixed(1),
      activePacks,
    };
  };

  return (
    <DataContext.Provider
      value={{
        rides,
        packs,
        marketplaceItems,
        addRide,
        updateRide,
        deleteRide,
        getRideById,
        addPack,
        updatePack,
        getPackById,
        addMarketplaceItem,
        updateMarketplaceItem,
        getItemById,
        getPackMessages,
        addMessage,
        addRating,
        getTargetRatings,
        getTargetAverageRating,
        getStats,
        loadData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};