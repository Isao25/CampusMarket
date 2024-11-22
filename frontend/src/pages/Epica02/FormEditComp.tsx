import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { formSchema, UserData } from "./FormEditSchema";
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
//import { Textarea } from "@/components/ui/textarea";
interface Escuelas {
  id: number;
  id_facultad: number;
  codigo: string;
  nombre: string;
}

export function FormEditComp() {
  const { authState } = useAuth();
  const userId = authState.userId;
  const { toast } = useToast();

  //const [isMarca, setIsMarca] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [escuelas, setEscuelas] = useState<Escuelas[]>([]);
  const [userData, setUserData] = useState<UserData>();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    form.reset(userData);
    setIsEditing(false);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: userData ?? {
      username: "",
      nombres: "",
      apellido_p: "",
      apellido_m: "",
      codigo: "",
      celular: "",
      id_escuela: 0,
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const fetchEscuelas = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/escuelasprofesionales/",
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${authState.accessToken}`,
            },
          }
        );
        const dataEscuelas = await response.json();
        setEscuelas(dataEscuelas);
      } catch (error) {}
    };
    fetchEscuelas();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/usuarios/${userId}/`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${authState.accessToken}`,
          },
        }
      );
      const data = await response.json();

      setUserData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!userData) {
      fetchData();
    }
    form.reset(userData);
  }, [userData]);

  // 2. Define a submit handler.
  async function onSubmit(values: UserData) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    try {
      const response = await fetch(
        `http://localhost:8000/usuarios/${userId}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${authState.accessToken}`,
          },
          body: JSON.stringify(values),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error en actualizar los datos");
      }
      toast({
        title: "Datos actualizados ✅",
      });
    } catch (error) {
      console.error("Error en el envio: ", error);
    }
    setUserData({ ...userData, ...values });
    setIsEditing(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-start gap-6 self-stretch"
      >
        {/*isMarca ? (
          <div className="flex flex-col items-start gap-6 self-stretch">
            <FormField
              control={form.control}
              name="nameMarca"
              render={({ field }) => (
                <FormItem className="self-stretch">
                  <FormLabel>Nombre de la marca</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nombre de la marca"
                      disabled={!isEditing}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="logoMarca"
              render={({ field }) => (
                <FormItem className="self-stretch">
                  <FormLabel>Logo de la Marca</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enlace al logo de la marca"
                      disabled={!isEditing}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="descriptionMarca"
              render={({ field }) => (
                <FormItem className="self-stretch">
                  <FormLabel>Descripcion de la Marca</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descripción de la Marca"
                      className="h-24"
                      disabled={!isEditing}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ) : (
          ""
        )*/}
        <div className="flex flex-col gap-6 self-stretch sm:gap-12 sm:flex-row">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Nombre de usuario</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nombre de usuario"
                    disabled={!isEditing}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nombres"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Nombres</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nombres"
                    disabled={!isEditing}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-6 self-stretch sm:gap-12 sm:flex-row">
          <FormField
            control={form.control}
            name="apellido_p"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Apellido Paterno</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Apellido Paterno"
                    disabled={!isEditing}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="apellido_m"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Aepllido Materno</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Apellido Materno"
                    disabled={!isEditing}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-6 self-stretch sm:gap-12 sm:flex-row">
          <FormField
            control={form.control}
            name="codigo"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Código institucional</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Código institucional"
                    disabled={!isEditing}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="celular"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Celular</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Número de celular"
                    disabled={!isEditing}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="id_escuela"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Escuela Profesional</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(Number(value))}
                defaultValue={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger disabled={!isEditing}>
                    <SelectValue placeholder="Selecciona tu escuela" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {escuelas.map((escuela) => (
                    <SelectItem key={escuela.id} value={escuela.id.toString()}>
                      {escuela.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="codigoqr"
          render={({ field }) => (
            <FormItem className="self-stretch">
              <FormLabel>Código QR</FormLabel>
              <FormControl>
                <Input
                  placeholder="Código"
                  disabled={!isEditing}
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="self-stretch">
              <FormLabel>Correo institucional</FormLabel>
              <FormControl>
                <Input
                  placeholder="Correo institucional"
                  disabled={!isEditing}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="self-stretch">
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="Contraseña"
                    type="password"
                    disabled={true}
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/*<Button type="submit">Submit</Button>*/}
        <div>
          {isEditing ? (
            <div className="flex gap-4">
              <Button
                type="submit"
                className="bg-secondaryLight hover:bg-[rgba(0,54,105,0.9)]"
              >
                Guardar datos
              </Button>
              <Button
                variant="outline"
                onClick={handleCancel}
                className="border-secondaryLight text-secondaryLight"
              >
                Cancelar
              </Button>
            </div>
          ) : (
            <Button
              onClick={handleEdit}
              className="bg-secondaryLight hover:bg-[rgba(0,54,105,0.9)]"
            >
              Editar datos
            </Button>
          )}
          <p className="text-[#555] mt-4 text-sm font-medium">
            Recuerda que solo puedes editar datos que no formen parte de tu
            organización.
          </p>
        </div>
      </form>
    </Form>
  );
}
