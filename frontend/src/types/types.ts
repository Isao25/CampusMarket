export type Usuario={
  id?:number,
  id_escuela:number,
  username:string,
  email:string,
  nombres:string,
  apellido_p:string,
  apellido_m:string,
  celular:string,
  codigo:string,
  fecha_nacimiento?:string,
  codigo_qr?:string|FileList|null,
}

export type EscuelaProfesional={
  id?:string,
  id_facultad:string,
  codigo:string,
  nombre:string,
}

export type Marca={
  id?:number,
  id_usuario:number,
  nombre:string,
  descripcion:string,
  logo:string|FileList
}
export type Plan={
  id?:number,
  nombre:string,
  descripcion:string,
  espacio_extra:number,
  duracion:number,
  precio:number,
  beneficios?:string[],
}
export type Membresia={
  id?:number,
  id_marca:number,
  id_plan:number,
  fecha_inicio:string,
  fecha_final:string,
}

export type DecodedToken ={
  user_id: number;
}
export type Tokens ={
  access: string;
  refresh: string;
}
export type AuthState ={
  accessToken: string | null;
  userId: number | null;
}
export type APIResponse ={
  results: EscuelaProfesional[];               
}
