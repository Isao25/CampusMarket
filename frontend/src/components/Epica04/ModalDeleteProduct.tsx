import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteArticulo } from "../../api/apiArticulos";

interface ModalDeleteProductProps {
  productId: number;
  onDeleteSuccess: () => void; // Callback para actualizar la lista tras eliminar
}

export const ModalDeleteProduct: React.FC<ModalDeleteProductProps> = ({
  productId,
  onDeleteSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    setLoading(true);
    setError(null);

    try {
      await deleteArticulo(productId); // Realizar la eliminación en el backend
      console.log(`Producto con ID ${productId} eliminado exitosamente.`);
      setLoading(false);
      onDeleteSuccess(); // Notificar al padre que el producto fue eliminado
    } catch (err: any) {
      setLoading(false);
      console.error("Error al eliminar el producto:", err);
      setError("Hubo un problema al intentar eliminar el producto.");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="delete" disabled={loading}>
          {loading ? "Eliminando..." : "Eliminar"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-[400px]">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-3">
            <AlertTriangle className="h-6 w-6 text-destructive" />
            <span className="text-2xl text-terciaryLight">Eliminar producto</span>
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center pt-2">
            ¿Está seguro de que desea eliminar este producto? Esta acción no se
            puede deshacer.
          </AlertDialogDescription>
        </AlertDialogHeader>
        {error && <p className="text-destructive text-center">{error}</p>}
        <AlertDialogFooter className="sm:justify-center gap-3">
          <AlertDialogCancel className="sm:w-24">Cancelar</AlertDialogCancel>
          <AlertDialogAction
            className="sm:w-24 bg-secondaryLight hover:bg-blue-900"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Eliminando..." : "Aceptar"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
