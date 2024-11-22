import { getArticulosByUsuario } from "../api/apiArticulos";


export const LoadArticulosByUser = async (id_usuario: number) => {
    const response = await getArticulosByUsuario(id_usuario);
    return response.data.results; // Devuelver todos los artículos del usuario
};