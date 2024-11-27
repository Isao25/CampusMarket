import { Marca} from "@/types";
import {baseURL, AxiosProtectedService, AxiosService } from "./api";

//Marcas
class MarcasService extends AxiosProtectedService{
  getMarcaByUsuario = (idUsuario: number | null) => {
    return this.instance.get(`/?id_usuario=${idUsuario}`);
  };
  createMarca = (marca:Marca) => {
    return this.instance.post("/",marca);
  };
}
export const marcasService=new MarcasService(`${baseURL}/marcas/`);

//Membresias
class MembresiasService extends AxiosService{
  getMembresiaByMarca = (idMarca: number) => {
    return this.instance.get(`/?id_marca=${idMarca}`);
  };
}
export const membresiasService=new MembresiasService(`${baseURL}/membresias/`);

//Planes
class PlanesService extends AxiosService{
  getPlan = async (planId: number) => {
    return await this.instance.get(`${planId}`);
  };
  getPlanes = () => {
    return this.instance.get("/");
  };
}
export const planesService=new PlanesService(`${baseURL}/planes/`);


