import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Caso } from '../interfaces/caso.interface';

@Injectable({
  providedIn: 'root'
})
export class CasesService {

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      // 'Accept': '*/*'  
    }),
  };

  apiUrl = environment.apiBase;

  constructor( private http: HttpClient ) { }

  getCasos() {
    return this.http.get<Caso[]>(`${this.apiUrl}/cases`, this.httpOptions);
  }
  postCasos( caso: Caso ) {
    return this.http.post<Caso>(`${this.apiUrl}/cases`, this.httpOptions)
  }
}
