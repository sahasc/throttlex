import React, { createContext, useContext, useState, useEffect } from 'react';
import { saveUser, getUser, clearUser, getUsers, addUser as addUserToStorage } from '../utils/localStorage';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = getUser();
    if (currentUser) {
      setUser(currentUser);
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const users = getUsers();
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      saveUser(userWithoutPassword);
      return { success: true };
    }
    
    return { success: false, error: 'Invalid email or password' };
  };

  const signup = (email, password, name) => {
    const users = getUsers();
    const existingUser = users.find(u => u.email === email);
    
    if (existingUser) {
      return { success: false, error: 'Email already registered' };
    }
    
    const newUser = {
      id: Date.now().toString(),
      email,
      password,
      name,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      joinedDate: new Date().toISOString(),
      ridesJoined: [],
      ridesCreated: [],
      packsJoined: [],
      marketplaceListings: [],
    };
    
    addUserToStorage(newUser);
    
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    saveUser(userWithoutPassword);
    
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    clearUser();
  };

  const updateUserProfile = (updates) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      saveUser(updatedUser);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};