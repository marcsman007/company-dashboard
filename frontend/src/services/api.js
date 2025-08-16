import axios from 'axios';

// Use environment variable for backend URL
const BASE_URL = process.env.REACT_APP_BASE_URL;

// Get all users
export const getUsers = async () => {
  const res = await axios.get(`${BASE_URL}/users`);
  return res.data;
};

// Create a new user
export const createUser = async (userData) => {
  const res = await axios.post(`${BASE_URL}/users`, userData);
  return res.data;
};

// Update user
export const updateUser = async (id, updatedData) => {
  const res = await axios.put(`${BASE_URL}/users/${id}`, updatedData);
  return res.data;
};

// Delete user
export const deleteUser = async (id) => {
  const res = await axios.delete(`${BASE_URL}/users/${id}`);
  return res.data;
};
