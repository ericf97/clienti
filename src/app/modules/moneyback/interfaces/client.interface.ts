import { Case } from "./case.interface";

export interface Cliente{
    id:number,
    nombre:string,
    apellido:string,
    caso:Case
}