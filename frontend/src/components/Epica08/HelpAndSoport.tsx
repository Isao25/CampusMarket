
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ChevronRight, AlertTriangle, Info } from 'lucide-react'
import { useNavigate } from "react-router"

const formSchema = z.object({
    problemType: z.string({
        required_error: "Por favor seleccione un tipo de problema",
    }),
    email: z.string().email({ message: "Email inválido" }),
    description: z.string().min(10, { message: "La descripción debe tener al menos 10 caracteres" }),
    screenshot: z.string().optional(),
})

type FormFields = z.infer<typeof formSchema>

export const HelpAndSupport = () => {

    const navigate = useNavigate()
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [activeDialog, setActiveDialog] = useState<'main' | 'report'>('main')

    const form = useForm<FormFields>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            problemType: "",
            email: "",
            description: "",
            screenshot: "",
        },
    })

    async function onSubmit(values: FormFields) {
        console.log(values)
        // Here you would typically send the form data to your backend
        setIsDialogOpen(false)
        setActiveDialog('main')
    }

    if(!isDialogOpen && activeDialog === 'report'){
        setActiveDialog('main')
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Ayuda y soporte técnico</Button>
            </DialogTrigger>
            <DialogContent className={activeDialog === "report" ? "sm:max-w-[425px]":"sm:max-w-[325px]"}>
                {activeDialog === 'main' && (
                    <>
                        <DialogHeader>
                            <DialogTitle className="text-xl">Ayuda y soporte técnico</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-1 ">
                            <Button
                                variant="outline"
                                className="w-full justify-between border-0 shadow-none h-20"
                                onClick={() => navigate('/contact')}
                            >
                                <div className="flex items-center text-lg">
                                    <Info className="mr-2 h-8 w-8 " />
                                    Contactar soporte
                                </div>
                                <ChevronRight className="h-8 w-8" />
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full justify-between border-0 shadow-none h-20"
                                onClick={() => setActiveDialog('report')}
                            >
                                <div className="flex items-center text-lg">
                                    <AlertTriangle className="mr-2 h-8 w-8" />
                                    Reportar problema
                                </div>
                                <ChevronRight className="h-8 w-8 " />
                            </Button>
                        </div>
                    </>
                )}


                {activeDialog === 'report' && (
                    <>
                        <DialogHeader>
                            <DialogTitle>Reportar problema</DialogTitle>
                            <DialogDescription>
                                Ayúdanos a mejorar informando cualquier problema que encuentres.
                            </DialogDescription>
                        </DialogHeader>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="problemType"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Seleccionar tipo de problema</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Seleccione un tipo de problema" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="performance">Problema de Rendimiento</SelectItem>
                                                    <SelectItem value="ui">Problema de UI/UX</SelectItem>
                                                    <SelectItem value="error">Error</SelectItem>
                                                    <SelectItem value="other">Otro</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Correo electrónico</FormLabel>
                                            <FormControl>
                                                <Input placeholder="tu@ejemplo.com" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Descripción</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Coloca la descripción de tu problema o pregunta"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="screenshot"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Adjuntar capturas de pantalla (opcional)</FormLabel>
                                            <FormControl>
                                                <Input type="file" accept="image/*" onChange={(e) => field.onChange(e.target.files?.[0])} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full bg-secondaryLight">Reportar problema</Button>
                            </form>
                        </Form>
                        <p className="text-sm text-gray-500 mt-4">
                            Tu información permanecerá confidencial y se utilizará solo para fines de resolución de problemas.
                        </p>
                    </>
                )}
            </DialogContent>
        </Dialog>
    )
}