import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
});

export interface User {
  id: number;
  email: string;
  name: string;
  createdAt: string;
}

export const usersApi = {
  checkEmail: (email: string) =>
    api
      .post<{ available: boolean }>("/users/check-email", { email })
      .then((r) => r.data),

  register: (payload: { email: string; name: string; password: string }) =>
    api.post<User>("/users/register", payload).then((r) => r.data),

  getAll: () => api.get<User[]>("/users").then((r) => r.data),

  delete: (id: number) =>
    api.delete<{ message: string }>(`/users/${id}`).then((r) => r.data),
};
