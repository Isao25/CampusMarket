import { Helmet } from "react-helmet-async";
import personaGestion from "../../assets/persona_gestion.png";
import { Link, useLoaderData } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getFileURL } from "../../utils/helpers";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { createUsuario, getEscuelas } from "@/api/apiUsuarios";
import { EscuelaProfesional, APIResponse } from "@/types";

const formSchema = z.object({
  nombres: z
    .string({ message: "Nombres inválidos" })
    .min(1, { message: "Nombres inválidos" })
    .max(200, { message: "Nombres deben tener como máximo 200 carácteres" }),
  apellido_p: z
    .string({ message: "Apellidos inválidos" })
    .min(1, { message: "Apellidos inválidos" })
    .max(200, { message: "Apellidos deben tener como máximo 200 carácteres" }),
  apellido_m: z
    .string({ message: "Apellidos inválidos" })
    .min(1, { message: "Apellidos inválidos" })
    .max(200, { message: "Apellidos deben tener como máximo 200 carácteres" }),
  codigo: z
    .string({ message: "Código inválido" })
    .regex(/^\d+$/, { message: "El código debe contener solo números." })
    .min(1, { message: "Código inválido" })
    .max(8, { message: "Código debe tener como máximo 8 carácteres" }),
  celular: z
    .string({ message: "Celular inválido" })
    .regex(/^\+?\d+$/, { message: "El celular debe contener solo números." })
    .min(9, { message: "El celular debe tener al menos 9 dígitos" })
    .max(15, { message: "El celular debe tener como máximo 15 dígitos" }),
  codigoqr: z
    .union([
      z.instanceof(FileList).refine(
        (fileList) => {
          if (!fileList || fileList.length === 0) return true;
          const file = fileList[0];
          return file && file.type.startsWith("image/");
        },
        { message: "El archivo debe ser una imagen." }
      ),
      z.string(),
    ])
    .optional()
    .nullable(),
  id_escuela: z.number({ required_error: "Seleccione una escuela" }),
  email: z
    .string({ message: "Email inválido" })
    .email({ message: "Email inválido" })
    .max(254, { message: "Email debe tener como máximo 254 caracteres" })
    .refine((email) => email.endsWith("@unmsm.edu.pe"), {
      message: "El email debe terminar con @unmsm.edu.pe",
    }),
  password: z
    .string({ message: "Contraseña inválida" })
    .min(6, { message: "Contraseña debe tener como mínimo 6 carácteres" }),
  username: z
    .string(),
});

type FormFields = z.infer<typeof formSchema>;


import { AxiosResponse } from "axios";

interface LoaderData {
  escuelasData: EscuelaProfesional[];
}

export async function loader(): Promise<LoaderData> {
  try {
    const response: AxiosResponse<APIResponse> = await getEscuelas();
    const escuelasData = response.data.results;
    return { escuelasData };
  } catch (error) {
    console.error("Se produjo un error:", error);
    return { escuelasData: [] };
  }
}

export const RegisterPage = () => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombres: "",
      apellido_p: "",
      apellido_m: "",
      codigo: "",
      celular: "",
      codigoqr: null,
      id_escuela: 0,
      email: "",
      password: "",
      username: "",
    },
  });
  const { escuelasData } = useLoaderData() as LoaderData;

  const fileRef = form.register("codigoqr");

  async function onSubmit(values: FormFields) {
    const fileInput = form.getValues("codigoqr");
    let updatedValues = { ...values };

    //If qr, obtain url
    if (fileInput && fileInput[0]) {
      const selectedFile = fileInput[0];
      try {
        const url = await getFileURL(selectedFile as File, "codigoqr_images");
        updatedValues = { ...values, codigoqr: url };
      } catch (error) {
        console.log("Error al obtener el URL del archivo:", error);
        return;
      }
    } else {
      updatedValues = { ...values, codigoqr: null };
    }

    //Set username as email
    updatedValues = { ...updatedValues, username: updatedValues.email };

    try {
      await createUsuario(updatedValues);
      toast.success("Su cuenta fue registrada con éxito");
    } catch (error) {
      console.log(error);
      toast.error("Se produjo un error al crear su cuenta");
    }
    console.log("Datos del formulario:", updatedValues);
  }

  return (
    <>
      <Helmet>
        <title>Registrarse</title>
      </Helmet>

      <div className=" h-auto md:py-2  md:px-20 lg:px-28 ">
        <div className=" h-full flex gap-14">
          <div className="bg-slate-600 h-auto w-full flex-1  hidden lg:flex">
            <img src={personaGestion} className="object-cover w-full" />
          </div>

          <div className="flex-1 h-full">
            <div className="bg-secondaryLightOpacity opacity-100 p-6 md:h-full flex flex-col justify-between">
              <div className="bg-white h-full py-2 px-12 flex flex-col">
                <div className="flex flex-col gap-1">
                  <div className="flex justify-center">
                    <img src="/Ezcommerce-logo-light.png" className="h-16" />
                  </div>
                  <p className="text-secondaryLight text-center text-sm font-semibold">
                    Crea tu cuenta
                  </p>
                  <p className="text-secondaryLight text-center text-sm">
                    Llena tus datos en el siguiente formulario
                  </p>
                </div>

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4 mt-6"
                  >
                    <FormField
                      name="nombres"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base">Nombres</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Nombres"
                              type="text"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="apellido_p"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base">
                            Apellido paterno
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Apellido paterno"
                              type="text"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="apellido_m"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base">
                            Apellido materno
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Apellido materno"
                              type="text"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="id_escuela"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base">Escuela</FormLabel>
                          <Select
                            onValueChange={(value) =>
                              field.onChange(Number(value))
                            }
                            defaultValue={field.value?.toString()}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciona una escuela" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {escuelasData.map(
                                (escuela: EscuelaProfesional) => (
                                  <SelectItem
                                    key={escuela.id}
                                    value={escuela.id!}
                                  >
                                    {escuela.nombre}
                                  </SelectItem>
                                )
                              )}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="email"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base">Correo</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="usuario@unmsm.edu.pe"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="password"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base">
                            Contraseña
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Introduce tu contraseña"
                              type="password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="md:flex justify-between gap-1">
                      <FormField
                        name="codigo"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel className="text-base">
                              Código institucional
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Código"
                                type="text"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        name="celular"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel className="text-base">Celular</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Celular"
                                type="text"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      name="codigoqr"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel className="text-base">
                            QR Yape {`(opcional)`}
                          </FormLabel>
                          <FormControl>
                            <Input type="file" {...fileRef} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="bg-secondaryLight hover:bg-secondaryLightHovered w-full"
                    >
                      Crear cuenta
                    </Button>
                  </form>
                </Form>
              </div>

              <div className="bg-terciaryDark flex flex-col text-center py-4">
                <p>
                  ¿Ya tienes cuenta?{" "}
                  <Link to="/login">
                    <span className="text-secondaryLight font-semibold">
                      Inicia sesión
                    </span>
                  </Link>{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};
