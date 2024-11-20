import { z } from "zod";

const userValidator = z.object({
  email: z.string({ message: "El email debe ser un string" }).email({ message: "El email no tiene un formato válido" }),
  password: z.string({ message: "La contraseña debe ser un string" }).min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
});

export { userValidator };


