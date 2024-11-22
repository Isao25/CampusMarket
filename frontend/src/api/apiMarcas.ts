import { Marca, Tokens } from "@/types";
import {baseURL } from "./api";
import axios from "axios";

//Marcas
const marcasApi = axios.create({
  baseURL: `${baseURL}/marcas/`,
});

export const getMarcaByUsuario = (idUsuario: number | null) => {
  return marcasApi.get(`/?id_usuario=${idUsuario}`);
};
export const createMarca = (marca:Marca) => {
  return marcasApi.post("/",marca);
};

marcasApi.interceptors.request.use((config) => {
  const tokens: Tokens | null = JSON.parse(localStorage.getItem("tokens") || "null");
  if (tokens?.access) {
      config.headers.Authorization = `Bearer ${tokens.access}`;
  }
  return config;
});

//Membresias
const membresiasApi = axios.create({
  baseURL: `${baseURL}/membresias/`,
});

export const getMembresiaByMarca = (idMarca: number) => {
  return membresiasApi.get(`/?id_marca=${idMarca}`);
};

//Planes
const planesApi = axios.create({
  baseURL: `${baseURL}/planes/`,
});

export const getPlan = async (planId: number) => {
  return await planesApi.get(`${planId}`);
};
export const getPlanes = () => {
  return planesApi.get("/");
};
