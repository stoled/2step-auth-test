import { z } from "zod";

export const step1Schema = z.object({
  email: z
    .string()
    .min(1, "E-mail обязателен для заполнения")
    .check(z.email({ error: "Введите корректный e-mail адрес" })),
});

export const step2Schema = z.object({
  name: z
    .string()
    .min(1, "Имя обязательно для заполнения")
    .min(2, "Имя должно содержать минимум 2 символа"),
  password: z
    .string()
    .min(1, "Пароль обязателен для заполнения")
    .min(6, "Пароль должен содержать минимум 6 символов")
    .regex(
      /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/,
      "Пароль должен содержать только латинские символы и цифры",
    ),
});

export type Step1Data = z.infer<typeof step1Schema>;
export type Step2Data = z.infer<typeof step2Schema>;
