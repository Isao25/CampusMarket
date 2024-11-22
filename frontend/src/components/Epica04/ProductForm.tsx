import { useImageUpload } from "../../pages/Epica04/hooks/useImageUpload";
import { useProductForm } from "../../pages/Epica04/hooks/useProductForm";
import { ImageUpload } from "./formulario/ImageUpload";
import { ImagePreviewModal } from "./formulario/ImagePreviewModal";
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { LoadEtiquetas } from "../../helpers/LoadEtiquetas";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Checkbox } from "../ui/checkbox";
import { Switch } from "../ui/switch";
import { Articulo } from "../../api/apiArticulos";

export const ProductForm = ({ product }: {product?:Articulo}) => {
  // Hook para manejar la subida y gestión de imágenes
  const { images, setImages, handleFileUpload, removeImage, handleDragEnd } = useImageUpload(5);
  // Hook para manejar el formulario de producto
  const { form, onSubmit, isMarca } = useProductForm({ images, setImages, product });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [etiquetas, setEtiquetas] = useState<{ id: number; nombre: string }[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    LoadEtiquetas().then((data) => setEtiquetas(data));
  }, []);

  const onCancel = () => {
    form.reset();
    setImages([]);  
    navigate("/my-published-products");
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 space-y-8 font-sans">
      <h1 className="text-2xl font-bold">
        {product ? "Editar producto" : "Agregar producto"}
      </h1>

      {/* Componente para cargar y gestionar imágenes */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Imágenes de tus productos</h2>
        <p className="text-sm text-muted-foreground">
          Fotos - {images.length}/5 - Puedes agregar un máximo de 5 fotos
        </p>
        <ImageUpload
          images={images}
          onPreview={setSelectedImage}
          handleFileUpload={handleFileUpload}
          removeImage={removeImage}
          onDragEnd={handleDragEnd}
        />
      </div>

      {/* Formulario de producto */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="nombre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre del producto</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Escribe el nombre de tu producto"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="precio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Precio del producto</FormLabel>
                <FormControl>
                  <Input placeholder="S/ 0.00" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="descripcion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <Textarea placeholder="Descripción" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="etiquetas"
            render={() => (
              <FormItem className="">
                <div className="mb-4">
                  <FormLabel className="text-base">Etiquetas</FormLabel>
                  <FormDescription>
                    Seleccions las etiquetas que describan tu producto
                  </FormDescription>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {etiquetas.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="etiquetas"
                      render={({ field }) => {
                        return (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)} // Verifica si el ID está en la lista
                                onCheckedChange={(checked) => {
                                  const newValue = checked
                                    ? [...field.value, item.id] // Agrega la etiqueta seleccionada
                                    : field.value.filter(
                                        (value) => value !== item.id
                                      ); // Remueve la etiqueta
                                  field.onChange(newValue);
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              {item.nombre}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="is_marca"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>Publicar producto como marca</FormLabel>
                  <FormDescription>
                    Si cuentas con una marca, puedes activar esta opción para
                    publicar el producto a nombre de la marca.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value} // El estado inicial viene de `defaultValues`
                    onCheckedChange={field.onChange}
                    disabled={!isMarca}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex gap-4">
            <Button
              type="submit"
              className="flex-1 bg-[#00457C] hover:bg-[#00457C]/90"
            >
              Guardar
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={onCancel}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </Form>

      {/* Modal de vista previa de la imagen */}
      <ImagePreviewModal
        imageUrl={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  );
};
