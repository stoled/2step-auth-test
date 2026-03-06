import { useState } from "react";
import { usersApi } from "../api/users";
import axios from "axios";

export function useRegistration() {
  const [serverError, setServerError] = useState<string | null>(null);

  const checkEmail = async (email: string): Promise<boolean> => {
    setServerError(null);
    try {
      const result = await usersApi.checkEmail(email);
      if (!result.available) {
        setServerError("Этот e-mail уже зарегистрирован");
        return false;
      }
      return true;
    } catch {
      setServerError("Не удалось проверить e-mail. Попробуйте позже.");
      return false;
    }
  };

  const register = async (payload: {
    email: string;
    name: string;
    password: string;
  }): Promise<boolean> => {
    setServerError(null);
    try {
      await usersApi.register(payload);
      return true;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 409) {
        setServerError("Этот e-mail уже используется.");
      } else {
        setServerError("Ошибка регистрации. Попробуйте позже.");
      }
      return false;
    }
  };

  return { checkEmail, register, serverError };
}
