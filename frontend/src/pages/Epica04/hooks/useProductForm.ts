import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { UploadedImage } from "./useImageUpload";
import { createArticulo, Articulo, updateArticulo } from "../../../api/apiArticulos";
import { useAuth } from "@/hooks/useAuth";
import { LoadCatalogos } from "../../../helpers/LoadCatalogos";
import { useEffect, useState } from "react";
import { LoadUsuarios } from "../../../helpers/getUser";


// Esquema de validación de Zod


const formSchema = z.object({
  nombre : z.string().min(1, { message: "Este campo es requerido" }), 
  precio: z.coerce.number().min(0, { message: "El precio debe ser un número no negativo" }),
  stock: z.coerce.number().min(1, { message: "El stock debe ser un número no negativo" }),
  descripcion: z.string().min(10, { message: "Este campo es requerido con un minimo de 10 caracteres" }), 
  etiquetas: z.array(z.number()).refine((value) => value.some((item) => item), {
    message: "Selecciona al menos una etiqueta",
  }),
  id_marca: z.number().optional(),
  is_marca: z.boolean().default(false),
});



interface UseProductFormProps {
  images: UploadedImage[];
  setImages: React.Dispatch<React.SetStateAction<UploadedImage[]>>;
}

export const useProductForm = ({ images, setImages, product }: UseProductFormProps & { product?: Articulo }) => {
  const navigate = useNavigate();
  const { authState } = useAuth();
  const [catalogos, setCatalogos] = useState<Array<{
    id: number;
    id_usuario: number;
    id_marca: number | null;
    capacidad_maxima: number;
    espacio_ocupado: number;
  }>>([]);
  const [isMarca, setIsMarca] = useState(false);

  // Cargar información del usuario para verificar si tiene marca
  useEffect(() => {
    if (authState.userId !== null) {
      LoadUsuarios(authState.userId).then((data) => {
        if (data) {
          setIsMarca(data.tiene_marca);
          console.log("Tiene marca:", data.tiene_marca);
        } else {
          console.error("No se encontró información del usuario.");
        }
      });
    }
  }, [authState.userId]);

  // Cargar los catálogos del usuario
  useEffect(() => {
    if (authState.userId !== null) {
      LoadCatalogos(authState.userId).then((data) => {
        if (data) {
          setCatalogos(data);
        } else {
          console.error("No se encontraron catálogos para este usuario.");
        }
      });
    }
  }, [authState.userId]);

  // Establecer los valores por defecto del formulario (si existe un producto)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: product?.nombre || "",
      descripcion: product?.descripcion || "",
      precio: product?.precio || 0,
      stock: product?.stock || 1,
      etiquetas: product?.etiquetas || [],
      id_marca: product?.id_marca,
      is_marca: product?.id_marca ? true : false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Determinar el catálogo según el estado del switch
      const selectedCatalogo = values.is_marca
        ? catalogos.find((catalogo) => catalogo.id_marca !== null)
        : catalogos.find((catalogo) => catalogo.id_marca === null);

      if (!selectedCatalogo) {
        console.error("No se encontró un catálogo adecuado.");
        return;
      }

      // Construir los datos a enviar
      const data: Articulo = {
        ...values,
        id_catalogo: selectedCatalogo.id,
        id_marca: selectedCatalogo.id_marca ?? undefined,
      };

      console.log("Enviando datos:", data);

      // Si existe un `product`, es una actualización, de lo contrario, es creación
      let response;
      if (product) {
        // Actualizar artículo
        console.log("Actualizando artículo:", product.id);
        if (product.id !== undefined) {
          response = await updateArticulo(product.id, data);
        } else {
          console.error("El ID del producto es indefinido.");
          return;
        }
        console.log("Artículo actualizado exitosamente:", response.data);
      } else {
        // Crear artículo
        response = await createArticulo(data);
        console.log("Artículo creado exitosamente:", response.data);
      }

      // Resetear el formulario y limpiar imágenes
      form.reset();
      setImages([]);
      navigate("/my-published-products");
    } catch (error) {
      console.error("Error al procesar el artículo:", error);
    }
  };

  return { form, onSubmit, isMarca };
};

