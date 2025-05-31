import axios from "axios";

import { auth } from "../../../firebase/index";
import { getUserDetails } from "../../../firebase/storage";

const api = axios.create({
  baseURL: process.env.PLASMO_PUBLIC_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

api.interceptors.request.use(async (config) => {
  const firebaseIdToken = await auth.currentUser?.getIdToken();
  if (firebaseIdToken) {
    config.headers.Authorization = `Bearer ${firebaseIdToken}`;
  } else {
    console.log("No id token found. Logout the user");
  }
  return config;
});

// Add response interceptor for error handling
api.interceptors.response.use(
  async (response) => {
    console.log("API Response:", response.data);
    const userDetails = await getUserDetails();
    console.log("User details", userDetails);
    return response.data;
  },
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    throw error;
  }
);

export default api;
