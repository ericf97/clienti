import { Injectable } from '@angular/core';
import { Caso } from '../interfaces/caso.interface';

@Injectable({
  providedIn: 'root'
})
export class CasesService {

  casos:Caso[]=[
    {
      id:1,
      titulo:'Titulo caso 1',
      descripcion:'Descripcion de caso 1 '
    },
    {
      id:2,
      titulo:'Titulo caso 2',
      descripcion:'Descripcion de caso 2 '
    },
    {
      id:3,
      titulo:'Titulo caso 3',
      descripcion:'Descripcion de caso 3 '
    },
    {
      id:4,
      titulo:'Titulo caso 4',
      descripcion:'Descripcion de caso 4 '
    },
    {
      id:5,
      titulo:'Titulo caso 5',
      descripcion:'Descripcion de caso 5 '
    },
  ]

  constructor() { }

  getCasos(){
    return this.casos;
  }
}
