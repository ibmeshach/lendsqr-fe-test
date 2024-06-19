import axios from "axios";

const api = import.meta.env.VITE_BACKEND_API;
const token = import.meta.env.VITE_ACCESS_TOKEN;

export const client = axios.create({
  baseURL: `${api}`,
});

export const request = ({ ...options }) => {
  client.defaults.headers.common.Authorization = `Bearer ${token}`;
  return client(options);
};
