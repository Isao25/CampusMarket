import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useNavigate } from "react-router";


const formSchema = z.object({
    email: z
        .string({ message: "Email inválido" })
        .email({ message: "Email inválido" })
        .max(50, { message: "Email debe tener como máximo 50 carácteres" }),
});
type FormFields = z.infer<typeof formSchema>;

const formSchema2 = z.object({
    code: z
        .string({ message: "Código inválido" })
        .max(8, { message: "Código debe tener como máximo 8 carácteres" }),
});
type FormFields2 = z.infer<typeof formSchema2>;

const formSchema3 = z
    .object({
        email: z
            .string({ message: "Email inválido" })
            .email({ message: "Email inválido" })
            .max(50, { message: "Email debe tener como máximo 50 caracteres" }),
        newPassword: z
            .string({ message: "Contraseña inválida" })
            .min(6, { message: "Contraseña debe tener como mínimo 6 caracteres" }),
        confirmPassword: z.string({ message: "No coincide con la nueva contraseña." })
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Las contraseñas no coinciden",
        path: ["confirmPassword"],
    });
type FormFields3 = z.infer<typeof formSchema3>;

export const RecoverAccountModal = () => {
    const navigate = useNavigate()

    const [open, setIsOpen] = useState(false)
    const [show1, setShow1] = useState(true);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);

    const form = useForm<FormFields>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    });

    async function onSubmit1(values: FormFields) {
        try {
            const { email } = values;

            setShow1(false);
            setShow2(true);
        }
        catch (error) {
            toast.error("Email no válido");
        }

    }

    const form2 = useForm<FormFields2>({
        resolver: zodResolver(formSchema2),
        defaultValues: {
            code: "",
        },
    });

    async function onSubmit2(values: FormFields2) {
        try {
            const { code } = values;

            setShow2(false);
            setShow3(true);
        }
        catch (error) {
            toast.error("Código no válido");
        }

    }

    const form3 = useForm<FormFields3>({
        resolver: zodResolver(formSchema3),
        defaultValues: {
            email: '',
            newPassword: "",
            confirmPassword: ""
        },
    });

    async function onSubmit3(values: FormFields3) {
        try {
            const { email, newPassword } = values;
            console.log(email)
            console.log(newPassword)
            toast.success("Contraseña restablecida exitosamente");
            closePopover();

        } catch (error) {
            toast.error("No se pudo restablecer la contraseña.");
        }
    }

    const closePopover = () => {
        setIsOpen(false);
        restoreModals();
    };

    const restoreModals = () => {
        setShow1(true)
        setShow2(false)
        setShow3(false)
    }

    return (
        <>
         {open && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-10" />
            )}
            <Popover open={open} onOpenChange={(isOpen) => setIsOpen(isOpen)} modal={true}>
                <PopoverTrigger asChild>
                    <p className="cursor-pointer">¿Olvidaste tu contraseña?</p>
                </PopoverTrigger>
                {show1 &&
                    (
                        <PopoverContent className="w-[380px] p-4">
                            <div className="p-1 flex flex-row">
                                <h2 className="text-lg font-semibold">Recuperar cuenta</h2>
                                <button
                                    onClick={closePopover}
                                    className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-black"
                                >
                                    &times;
                                </button>
                            </div>
                            <div className="p-4">
                                <p className="mb-4 text-md">
                                    Por favor, introduce tu dirección de correo electrónico registrada para recibir un enlace de restablecimiento de contraseña.
                                </p>

                                <Form {...form}>
                                    <form
                                        onSubmit={form.handleSubmit(onSubmit1)}
                                    >
                                        <FormField
                                            name="email"
                                            control={form.control}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-base">Correo electrónico</FormLabel>
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
                                        <Button type='submit' className="w-full mt-4 h-10 bg-secondaryLight">Enviar Correo</Button>
                                    </form>
                                </Form>
                            </div>
                        </PopoverContent>
                    )
                }
                {
                    show2 &&
                    (
                        <PopoverContent className="w-[380px] p-4">
                            <div className="p-1 flex flex-row">
                                <h2 className="text-lg font-semibold">Recuperar cuenta</h2>
                                <button
                                    onClick={closePopover}
                                    className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-black"
                                >
                                    &times;
                                </button>
                            </div>
                            <div className="p-4">
                                <p className="mb-4 text-md">
                                    Por favor, introduce el código de verificación que se envió a tu correo.
                                </p>
                                <Form {...form2}>
                                    <form
                                        onSubmit={form2.handleSubmit(onSubmit2)}
                                    >
                                        <FormField
                                            name="code"
                                            control={form2.control}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-base">Código de verificación</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="12345678"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Button type='submit' className="w-full mt-4 h-10 bg-secondaryLight">Verificar código</Button>
                                    </form>
                                </Form>
                            </div>
                        </PopoverContent>
                    )
                }
                {
                    show3 &&
                    (
                        <PopoverContent className="w-[512px] p-4 ">
                            <div className="p-1 flex flex-row">
                                <h2 className="text-lg font-semibold">Recuperar cuenta</h2>
                                <button
                                    onClick={closePopover}
                                    className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-black"
                                >
                                    &times;
                                </button>
                            </div>
                            <div className="p-4">
                                <p className="mb-4 text-md">
                                    Por favor, introduce tu dirección de correo electrónico e ingresa tu nueva contraseña.
                                </p>
                                <Form {...form3}>
                                    <form
                                        onSubmit={form3.handleSubmit(onSubmit3)}
                                        className="flex flex-col gap-4"
                                    >
                                        <FormField
                                            name="email"
                                            control={form3.control}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-base">Correo electrónico</FormLabel>
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
                                            name="newPassword"
                                            control={form3.control}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-base">Nueva Contraseña</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="password"
                                                            placeholder="Coloca tu nueva contraseña"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            name="confirmPassword"
                                            control={form3.control}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-base">Confirmar Contraseña</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="password"
                                                            placeholder="Confirma la nueva contraseña"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Button type='submit' className="w-full h-10 bg-secondaryLight">Restablecer contraseña</Button>
                                    </form>
                                </Form>
                                <p className="text-sm mt-4 text-slate-500">¿Necesitas más ayuda?</p>
                                <Button className="w-full mt-4 h-10 border-2 border-secondaryLight text-secondaryLight bg-white hover:bg-secondaryLight hover:text-white"
                                    onClick={() => navigate('/contact')}
                                >Contactar soporte</Button>
                            </div>
                        </PopoverContent>
                    )
                }
            </Popover>
        </>

    );
}