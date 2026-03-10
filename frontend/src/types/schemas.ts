import { z } from "zod";

export const step1Schema = z.object({
  email: z.string().email({ message: "Неверный формат email" }),
  terms: z.boolean().refine((val) => val === true, {
    message: "Вы должны согласиться с политикой конфиденциальности",
  }),
});

export type Step1Data = z.infer<typeof step1Schema>;

export const step2Schema = z.object({
  name: z.string().min(1, { message: "Имя обязательно" }),
  password: z.string().min(6, { message: "Пароль должен быть не менее 6 символов" }),
});

export type Step2Data = z.infer<typeof step2Schema>;