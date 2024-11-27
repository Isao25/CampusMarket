import {Usuario } from '@/types';
import axios from 'axios';
import { AxiosService, baseURL } from './api';

//Usuarios
export const usuariosApi = axios.create({
  baseURL: `${baseURL}/usuarios/` 
});

// Interceptor para agregar el token de acceso a las solicitudes
usuariosApi.interceptors.request.use((config) => {
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

export const createUsuario = (usuario:Usuario) => {
  return usuariosApi.post('/', usuario);
};

export const getUsuarios = (userId:number) => {
  return usuariosApi.get(`/${userId}`);
}

//Escuelas
class EscuelasService extends AxiosService{
  getEscuelas = () => {
    return this.instance.get('/');
  }
}
export const escuelasService=new EscuelasService(`${baseURL}/escuelasprofesionales/`);


