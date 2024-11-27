import axios from 'axios';
import { baseURL } from './api';


interface Image {
    id_articulo: number,
    url: string,
}

const imagesApi = axios.create({
    baseURL: `${baseURL}/imagenes`
});

// Interceptor para agregar el token de acceso a las solicitudes
imagesApi.interceptors.request.use((config) => {
    const tokens = JSON.parse(localStorage.getItem("tokens") || "{}");
    const accessToken = tokens?.access || null;
    
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    } else {
      console.log("No access token found");
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
});

export const getAllImages = () => {
    return imagesApi.get('/');
}

export const getImage = (id: number) => {
    return imagesApi.get(`/?id_articulo=${id}`);
}

export const createImage = (image: Image) => {
    return imagesApi.post('/', image);
}

export const updateImage = (id: number, image: Image) => {
    return imagesApi.put(`/${id}/`, image);
}

export const deleteImage = (id: number) => {
    return imagesApi.delete(`/${id}/`);
}