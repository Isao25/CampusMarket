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
import { useTrademark } from "@/hooks/useTrademark";

import { zodResolver } from "@hookform/resolvers/zod";

import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";

const formSchema = z.object({
  id_usuario: z.number(),
  nombre: z
    .string({ message: "Nombre inválido" })
    .min(1,{message:"Nombre inválido"}),
  logo: z.union([
    z.instanceof(FileList).refine(
      (fileList) => {
        if (!fileList || fileList.length === 0) return false; 
        const file = fileList[0];
        return file && file.type.startsWith("image/"); 
      },
      { message: "El archivo debe ser una imagen válida." }
    ),
    z.string()
  ]),
  descripcion: z
    .string({ message: "Descripción inválida" }) 
    .min(1,{message:"Descripción inválida"}),
});

type FormFields = z.infer<typeof formSchema>;

export const RegisterTrademark = () => {
  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: "",
      logo: undefined,
      descripcion: "",
    },
  });

  const fileRef = form.register("logo");
  const { setMarca } = useTrademark();
  const navigate = useNavigate();

  function onSubmit(values: FormFields) {
    console.log(values);
  }

  return (
    <>
      <Helmet>
        <title>Registrar marca</title>
      </Helmet>

      <div className=" flex flex-col pt-5 pb-12">
        <h1 className="font-semibold text-4xl">Registrar marca</h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="pt-5 flex flex-col gap-4"
          >
            <FormField
              name="nombre"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">
                    Nombre de la marca
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Escribe el nombre de tu marca"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="descripcion"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">
                    Descripcion de lo que ofreces
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Coloca la descripción de los productos y/o servicios que brindas."
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="logo"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-base">
                    Logo 
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
              className="bg-secondaryLight hover:bg-secondaryLightHovered self-end w-1/3"
            >
              Registrar
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};
