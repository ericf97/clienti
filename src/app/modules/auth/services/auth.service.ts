import { Injectable } from '@angular/core';
import { Auth } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuarioActivo: Auth | undefined = {
    id: 1,
    nombre: 'Enzo',
    apellido: 'Avalos',
    user: 'enzo@mail.com',
    password: 'enzoenzo'
  }

  connection: boolean = false;

  get usuario() {
    return { ...this.usuarioActivo }
  }

  constructor() { }
}
