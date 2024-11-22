import axios from 'axios';
export const baseURL='http://localhost:8000/catalogos';


const catalogosApi = axios.create({
    baseURL: `${baseURL}` 
});

export const getCatalogoUser= (id_usuario:number) => {
    return catalogosApi.get(`/?id_usuario=${id_usuario}`);
}