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
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  comprobante: z.union([
    z
      .instanceof(FileList)
      .refine((fileList) => fileList.length > 0, {
        message: "Debes seleccionar un comprobante de pago.",
      })
      .refine(
        (fileList) =>
          fileList.length === 0 || fileList[0]?.type.startsWith("image/"),
        { message: "El archivo debe ser una imagen." }
      ),
    z.string(),
  ]),
});

type FormValues = z.infer<typeof formSchema>;

export const PaymentConfirmation = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const fileRef = form.register("comprobante");

  const [emailSent,setEmailSent]=useState(false);

  function onSubmit(data: FormValues) {
    const file = data.comprobante[0];
    console.log(data);
    setEmailSent(true);
  }

  return (
    <>
      <Helmet>
        <title>Confirmar pago</title>
      </Helmet>

      <div className=" flex flex-col pt-5 pb-12">
        <h1 className="font-semibold text-4xl">Confirmar pago</h1>
        <Form {...form}>
          <form
            className="flex flex-col gap-10 pt-12 "
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className={`text-center ${!emailSent?"hidden":""}`}>
              <p className="font-bold">¡Gracias por tu pago!</p>
              <p>
                Tu suscripción al plan de marca está en proceso de activación.
              </p>
            </div>
            <h2 className=" font-bold">Envía el comprobante de pago</h2>
            <p>
              Por favor, envíanos el comprobante de pago para proceder a la
              actualización de tu plan.
            </p>
            <div className="flex flex-col">
              <FormField
                name="comprobante"
                control={form.control}
                render={() => (
                  <FormItem>
                    <FormLabel className="text-base">
                      Comprobante de pago yape
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Introduce tu contraseña"
                        type="file"
                        disabled={emailSent}
                        {...fileRef}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="text-secondaryLight font-semibold">
              <p>Tu nuevo plan de Marca se habilitará en aproximadamente 24 horas.</p>
              <p>Te notificaremos por correo una vez que esté activo.</p>
            </div>
            <p>
              Si tienes alguna pregunta, no dudes en contactarnos mediante
              nuestro canal de soporte.
            </p>
            <Button
              type="submit"
              className="mt-2 self-end w-1/3 bg-secondaryLight hover:bg-secondaryLightHovered rounded-xl"
              disabled={emailSent}
            >
              Enviar comprobante
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};
