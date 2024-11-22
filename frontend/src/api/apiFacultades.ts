import axios from 'axios';
export const baseURL='http://localhost:8000/facultades';

export interface Facultad{
    codigo:number,
    nombre:string,
    siglas:string,
}

const facultadesApi = axios.create({
    baseURL: `${baseURL}` 
});

export const getAllFacultades = (page:number) => {
    return facultadesApi.get( `/?page=${page}`);
}