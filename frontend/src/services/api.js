import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

export const getBackendMessage = async () => {
  const res = await axios.get(`${BASE_URL}/`);
  return res.data;
};

// Fetch all users
export const getUsers = async () => {
  const res = await axios.get(`${BASE_URL}/users`);
  return res.data;
};

// Add new user
export const createUser = async (userData) => {
  const res = await axios.post(`${BASE_URL}/users`, userData);
  return res.data;
};

// Delete user
export const deleteUser = async (id) => {
  const res = await axios.delete(`${BASE_URL}/users/${id}`);
  return res.data;
};

// Update user
export const updateUser = async (id, updatedData) => {
  const res = await axios.put(`${BASE_URL}/users/${id}`, updatedData);
  return res.data;
};
