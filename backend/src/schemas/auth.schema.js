import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string({
      required_error: "El nombre de usuario es obligatorio",
    })
    .min(3, {
      message: "El nombre de usuario debe tener al menos 3 caracteres",
    }),

  email: z
    .string({
      required_error: "El correo electrónico es obligatorio",
    })
    .email({
      message: "El formato del correo electrónico no es válido",
    })
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
      message: "El correo electrónico contiene caracteres no válidos",
    }),

  password: z
    .string({ required_error: "La contraseña es obligatoria" })
    .min(8, {
      message: "La contraseña debe tener al menos 8 caracteres",
    })
    .regex(/[a-z]/, {
      message: "La contraseña debe contener al menos una letra minúscula",
    })
    .regex(/[A-Z]/, {
      message: "La contraseña debe contener al menos una letra mayúscula",
    })
    .regex(/[0-9]/, {})
    .regex(/[\W_]/, {
      message: "La contraseña debe contener al menos un carácter especial",
    }),
});

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "El correo electrónico es obligatorio",
    })
    .email({
      message: "El formato del correo electrónico no es válido",
    }),

  password: z
    .string({ required_error: "La contraseña es obligatoria" })
    .min(8, {
      message: "La contraseña debe tener al menos 8 caracteres",
    }),
});
