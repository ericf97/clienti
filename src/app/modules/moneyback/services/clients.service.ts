import { Injectable } from '@angular/core';
import { Cliente } from '../interfaces/client.interface';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  clientes: Cliente[] = [
    {
      id: 1,
      nombre: 'Enzo',
      apellido: 'Avalos',
      caso: {
        id: 1,
        titulo: 'titulo',
        descripcion: 'descripcion',
      },
    },
    {
      id: 2,
      nombre: 'Eric',
      apellido: 'Fernandez',
      caso: {
        id: 2,
        titulo: 'titulo',
        descripcion: 'descripcion',
      },
    },
    {
      id: 3,
      nombre: 'Juan',
      apellido: 'Fernandez',
      caso: {
        id: 6,
        titulo: 'titulo',
        descripcion: 'descripcion',
      },
    },
    {
      id: 4,
      nombre: 'Manuel',
      apellido: 'Vargas',
      caso: {
        id: 23,
        titulo: 'titulo',
        descripcion: 'descripcion',
      },
    },
    {
      id: 5,
      nombre: 'Carla',
      apellido: 'Sandez',
      caso: {
        id: 1,
        titulo: 'titulo',
        descripcion: 'descripcion',
      },
    },
  ];

  constructor() {}

  getClientes() {
    return this.clientes;
  }
}
