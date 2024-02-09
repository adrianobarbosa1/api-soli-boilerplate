import { z } from "zod";

const authRegister = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

const authLogin = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const authValidation = {
  authRegister,
  authLogin,
};
