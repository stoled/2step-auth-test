import { useEffect, useState } from "react";
import { usersApi, type User } from "../api/users";
import axios from "axios";

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    usersApi
      .getAll()
      .then(setUsers)
      .catch(() => setError("Не удалось загрузить пользователей."))
      .finally(() => setLoading(false));
  }, []);

  const deleteUser = async (id: number) => {
    if (!window.confirm("Удалить пользователя?")) return;
    setDeletingId(id);
    try {
      await usersApi.delete(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      const msg =
        axios.isAxiosError(err) && err.response?.status === 404
          ? "Пользователь не найден."
          : "Не удалось удалить пользователя.";
      setError(msg);
    } finally {
      setDeletingId(null);
    }
  };

  return { users, loading, error, deletingId, deleteUser };
}
