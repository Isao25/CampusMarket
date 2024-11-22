import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form"
import { z } from "zod"


const formSchema = z.object({
    nombres: z.string().min(1, { message: "Este campo es obligatorio" }).max(50, { message: "Máximo 50 caracteres" }),
    apellidos: z.string().min(1, { message: "Este campo es obligatorio" }).max(50, { message: "Máximo 50 caracteres" }),
    correo: z.string().email({ message: "Correo electrónico inválido" }).max(50),
    asunto: z.string().min(1, { message: "Este campo es obligatorio" }),
    mensaje: z.string().min(1, { message: "Este campo es obligatorio" }),
    prioridad: z.string().min(1, {message: "Selecciona una prioridad"}),
});

type FormFields = z.infer<typeof formSchema>;


export const ContactPage = () => {

    const form = useForm<FormFields>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nombres: "",
            apellidos: "",
            correo: "",
            asunto: "",
            mensaje: "",
            prioridad: "",
        },
    });

    const onSubmit = (values: FormFields) => {
        console.log("Formulario enviado con éxito:", values);
    };

  return (
    <>
        <Helmet>
            <title>Contactar soporte</title>
        </Helmet>
        <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Contactar soporte</h1>
        <p className="mb-8 text-gray-600">
            Si tienes algún problema o tienes alguna consulta, por favor contacta a nuestro equipo de soporte.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-2">
                    <Label htmlFor="nombres">Nombres</Label>
                    <Input id="nombres" placeholder="Coloca tus nombres" {...form.register("nombres")} />
                    <p className="text-red-600">{form.formState.errors.nombres?.message}</p>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="apellidos">Apellidos</Label>
                    <Input id="apellidos" placeholder="Coloca tus apellidos" {...form.register("apellidos")} />
                    <p className="text-red-600">{form.formState.errors.apellidos?.message}</p>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="correo">Correo electrónico</Label>
                    <Input id="correo" type="email" placeholder="Coloca tu correo electrónico" {...form.register("correo")} />
                    <p className="text-red-600">{form.formState.errors.correo?.message}</p>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="asunto">Asunto</Label>
                    <Input id="asunto" placeholder="Coloca el asunto de tu consulta" {...form.register("asunto")} />
                    <p className="text-red-600">{form.formState.errors.asunto?.message}</p>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="mensaje">Mensaje</Label>
                    <Textarea id="mensaje" placeholder="Coloca la descripción de tu problema o pregunta" rows={4} {...form.register("mensaje")} />
                    <p className="text-red-600">{form.formState.errors.mensaje?.message}</p>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="adjuntar">Adjuntar imágenes (opcional)</Label>
                    <Input id="adjuntar" type="file" />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="prioridad">Prioridad</Label>
                    <Select onValueChange={(value) => form.setValue("prioridad", value)}>
                        <SelectTrigger id="prioridad">
                            <SelectValue placeholder="Selecciona la prioridad" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="baja">Baja</SelectItem>
                            <SelectItem value="media">Media</SelectItem>
                            <SelectItem value="alta">Alta</SelectItem>
                        </SelectContent>
                    </Select>
                    <p className="text-red-600">{form.formState.errors.prioridad?.message}</p>
                </div>

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">Enviar mensaje</Button>
                <p className="mt-8 text-sm text-gray-500 block md:hidden">
                    Nuestro equipo de soporte responderá en un plazo de 24 a 48 horas.
                </p>
            </form>
            <Card className="border-0 shadow-none md:ml-4">
            <CardHeader>
                <CardTitle className="text-lg">Preguntas frecuentes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 ">
                <div>
                <h3 className="font-semibold mb-2 text-lg">¿Cómo puedo cancelar mi suscripción?</h3>
                <p className="text-md text-gray-600">
                    Para cancelar tu suscripción, ve a la sección de "Mi Cuenta", selecciona "Suscripción" y elige la opción de
                    cancelar. Asegúrate de seguir las instrucciones para completar el proceso.
                </p>
                </div>
                <div>
                <h3 className="font-semibold mb-2 text-lg">¿Puedo cambiar mi plan actual?</h3>
                <p className="text-md text-gray-600">
                    Sí, puedes cambiar tu plan en cualquier momento. Ve a la sección de "Mi Cuenta", elige "Actualizar plan" y
                    selecciona el nuevo plan que deseas. Recuerda que es posible que debas cancelar tu plan actual primero.
                </p>
                </div>
            </CardContent>
            </Card>
        </div>
        <p className="mt-8 text-sm text-gray-500 hidden md:block">
            Nuestro equipo de soporte responderá en un plazo de 24 a 48 horas.
        </p>
        </div>
    </>
  )
}