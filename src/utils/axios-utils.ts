import axios from "axios";

const api = import.meta.env.VITE_BACKEND_API;

export const client = axios.create({
  baseURL: `${api}`,
});

export const request = ({ ...options }) => {
  client.defaults.withCredentials = true;
  return client(options);
};
