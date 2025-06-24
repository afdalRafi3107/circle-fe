import axios from "axios";

function getTokenFormCookie(): string | null {
  const match = document.cookie.match(/(?:^|;\s*)token=([^;]*)/);
  return match ? match[1] : null;
}
const apiUrl = import.meta.env.VITE_BASEURL;
const api = axios.create({
  baseURL: `${apiUrl}/api/v1`,
});

api.interceptors.request.use((config) => {
  const token = getTokenFormCookie();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

// export function login(data: any) {
//   return api.post("/login", data);
// }
