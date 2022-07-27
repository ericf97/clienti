import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      // 'Accept': '*/*'  
    }),
  };

  apUrl = environment.apiBase;

  constructor( private http: HttpClient ) { }

  // getFiles() {
  //   return this.http.get
  // }
}
