import { getUsuarios } from "../api/apiUsuarios";

export const LoadUsuarios = async (userId: number) => {
    const response = await getUsuarios(userId);
    return response.data;
};