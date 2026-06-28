// src/api/userService.js

import axios from "axios";
import { API_URL } from "../utils/constants";

// Get all users
export const fetchUsers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Add new user
export const createUser = async (user) => {
  const response = await axios.post(API_URL, user);
  return response.data;
};

// Update user
export const updateUser = async (id, user) => {
  const response = await axios.put(`${API_URL}/${id}`, user);
  return response.data;
};

// Delete user
export const deleteUser = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};