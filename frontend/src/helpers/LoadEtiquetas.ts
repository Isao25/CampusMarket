import { getEtiquetas } from "../api/apiEtiquetas";

export const LoadEtiquetas = async () => {
    const response = await getEtiquetas();
    return response.data.results.map((etiqueta: { id: number; nombre: string }) => ({
      id: etiqueta.id,
      nombre: etiqueta.nombre,
    }));
  }; 