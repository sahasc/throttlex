// localStorage utility functions for ThrottleX

const STORAGE_KEYS = {
  USER: 'throttlex_user',
  RIDES: 'throttlex_rides',
  PACKS: 'throttlex_packs',
  MARKETPLACE: 'throttlex_marketplace',
  USERS: 'throttlex_users',
  MESSAGES: 'throttlex_messages',
  RATINGS: 'throttlex_ratings',
};

// Initialize default data
export const initializeStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify([]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.RIDES)) {
    localStorage.setItem(STORAGE_KEYS.RIDES, JSON.stringify([]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.PACKS)) {
    localStorage.setItem(STORAGE_KEYS.PACKS, JSON.stringify([]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.MARKETPLACE)) {
    localStorage.setItem(STORAGE_KEYS.MARKETPLACE, JSON.stringify([]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.MESSAGES)) {
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify([]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.RATINGS)) {
    localStorage.setItem(STORAGE_KEYS.RATINGS, JSON.stringify([]));
  }
};

// User functions
export const saveUser = (user) => {
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
};

export const getUser = () => {
  const user = localStorage.getItem(STORAGE_KEYS.USER);
  return user ? JSON.parse(user) : null;
};

export const clearUser = () => {
  localStorage.removeItem(STORAGE_KEYS.USER);
};

// Users collection
export const getUsers = () => {
  const users = localStorage.getItem(STORAGE_KEYS.USERS);
  return users ? JSON.parse(users) : [];
};

export const addUser = (user) => {
  const users = getUsers();
  users.push(user);
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
};

export const updateUser = (userId, updates) => {
  const users = getUsers();
  const index = users.findIndex(u => u.id === userId);
  if (index !== -1) {
    users[index] = { ...users[index], ...updates };
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    
    // Update current user if it's the same
    const currentUser = getUser();
    if (currentUser && currentUser.id === userId) {
      saveUser(users[index]);
    }
  }
};

// Rides functions
export const getRides = () => {
  const rides = localStorage.getItem(STORAGE_KEYS.RIDES);
  return rides ? JSON.parse(rides) : [];
};

export const addRide = (ride) => {
  const rides = getRides();
  rides.push(ride);
  localStorage.setItem(STORAGE_KEYS.RIDES, JSON.stringify(rides));
  return ride;
};

export const updateRide = (rideId, updates) => {
  const rides = getRides();
  const index = rides.findIndex(r => r.id === rideId);
  if (index !== -1) {
    rides[index] = { ...rides[index], ...updates };
    localStorage.setItem(STORAGE_KEYS.RIDES, JSON.stringify(rides));
  }
};

export const deleteRide = (rideId) => {
  const rides = getRides();
  const filtered = rides.filter(r => r.id !== rideId);
  localStorage.setItem(STORAGE_KEYS.RIDES, JSON.stringify(filtered));
};

// Packs functions
export const getPacks = () => {
  const packs = localStorage.getItem(STORAGE_KEYS.PACKS);
  return packs ? JSON.parse(packs) : [];
};

export const addPack = (pack) => {
  const packs = getPacks();
  packs.push(pack);
  localStorage.setItem(STORAGE_KEYS.PACKS, JSON.stringify(packs));
  return pack;
};

export const updatePack = (packId, updates) => {
  const packs = getPacks();
  const index = packs.findIndex(p => p.id === packId);
  if (index !== -1) {
    packs[index] = { ...packs[index], ...updates };
    localStorage.setItem(STORAGE_KEYS.PACKS, JSON.stringify(packs));
  }
};

// Marketplace functions
export const getMarketplaceItems = () => {
  const items = localStorage.getItem(STORAGE_KEYS.MARKETPLACE);
  return items ? JSON.parse(items) : [];
};

export const addMarketplaceItem = (item) => {
  const items = getMarketplaceItems();
  items.push(item);
  localStorage.setItem(STORAGE_KEYS.MARKETPLACE, JSON.stringify(items));
  return item;
};

export const updateMarketplaceItem = (itemId, updates) => {
  const items = getMarketplaceItems();
  const index = items.findIndex(i => i.id === itemId);
  if (index !== -1) {
    items[index] = { ...items[index], ...updates };
    localStorage.setItem(STORAGE_KEYS.MARKETPLACE, JSON.stringify(items));
  }
};

// Messages functions
export const getMessages = (packId) => {
  const allMessages = localStorage.getItem(STORAGE_KEYS.MESSAGES);
  const messages = allMessages ? JSON.parse(allMessages) : [];
  return messages.filter(m => m.packId === packId);
};

export const addMessage = (message) => {
  const allMessages = localStorage.getItem(STORAGE_KEYS.MESSAGES);
  const messages = allMessages ? JSON.parse(allMessages) : [];
  messages.push(message);
  localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
};

// Ratings functions
export const getRatings = (targetId) => {
  const allRatings = localStorage.getItem(STORAGE_KEYS.RATINGS);
  const ratings = allRatings ? JSON.parse(allRatings) : [];
  return ratings.filter(r => r.targetId === targetId);
};

export const addRating = (rating) => {
  const allRatings = localStorage.getItem(STORAGE_KEYS.RATINGS);
  const ratings = allRatings ? JSON.parse(allRatings) : [];
  ratings.push(rating);
  localStorage.setItem(STORAGE_KEYS.RATINGS, JSON.stringify(ratings));
};

export const getAverageRating = (targetId) => {
  const ratings = getRatings(targetId);
  if (ratings.length === 0) return 0;
  const sum = ratings.reduce((acc, r) => acc + r.rating, 0);
  return (sum / ratings.length).toFixed(1);
};