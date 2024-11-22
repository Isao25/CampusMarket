import { z } from "zod";

export const formSchema = z.object({
  id_escuela: z.number(),
  username: z.string(),
  email: z.string().email("Correo electrónico inválido"),
  nombres: z.string().min(1, "Nombres son requeridos"),
  apellido_p: z.string().min(1, "Apellido paterno es requerido"),
  apellido_m: z.string().min(1, "Apellido materno es requerido"),
  celular: z.string().min(9, "Celular debe tener al menos 9 dígitos"),
  codigo: z.string().min(1, "Código de estudiante es requerido"),
  codigoqr: z.string().url("URL inválida").optional().or(z.literal("")),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});

export type UserData = z.infer<typeof formSchema>;
