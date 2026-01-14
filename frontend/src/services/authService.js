import axios from "axios";

const API_BASE_URL = "https://marketplace-y6en.onrender.com/api";

export const registerUser = async (formData) => {
  const response = await axios.post(`${API_BASE_URL}/auth/register`, formData);
  return response.data;
};

export const loginUser = async (data) => {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, data);
  return response.data;
};
