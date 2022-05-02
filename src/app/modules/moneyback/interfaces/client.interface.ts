import { Caso } from "./caso.interface";

export interface Cliente{
    id:number,
    nombre:string,
    apellido:string,
    caso:Caso
}