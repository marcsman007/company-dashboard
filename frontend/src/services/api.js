import axios from "axios";

// Base URL for API
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000/api";

// Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Get all users
export const getUsers = async () => {
  try {
    const res = await api.get("/users");
    return res.data;
  } catch (err) {
    console.error("Error fetching users:", err);
    throw err;
  }
};

// Add a new user
export const createUser = async (user) => {
  try {
    const res = await api.post("/users", user);
    return res.data;
  } catch (err) {
    console.error("Error creating user:", err);
    throw err;
  }
};

// Update a user
export const updateUser = async (id, user) => {
  try {
    const res = await api.put(`/users/${id}`, user);
    return res.data;
  } catch (err) {
    console.error("Error updating user:", err);
    throw err;
  }
};

// Delete a user
export const deleteUser = async (id) => {
  try {
    const res = await api.delete(`/users/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error deleting user:", err);
    throw err;
  }
};
