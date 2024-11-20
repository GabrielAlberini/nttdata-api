import { z } from "zod"

const productValidator = z.object({
  name: z.string({ message: "El nombre debe ser un string" }).trim().min(2, { message: "El nombre es obligatorio" }),
  description: z.string().trim().optional().default("Sin descripción"),
  price: z.number().min(0),
  stock: z.number().min(0)
})

export { productValidator }