import { getCatalogoUser } from "../api/apiCatalogos";


export const LoadCatalogos = async (id_usuario: number) => {
    const response = await getCatalogoUser(id_usuario);
    return response.data.results; // Devuelve el primer catálogo porque se asume que el usuario solo tiene un catálogo
};