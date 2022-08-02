import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Case } from '../interfaces/case.interface';

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

  getCases() {
    return this.http.get<Case[]>(`${this.apiUrl}/cases`, this.httpOptions);
  }
  postCases( _case: Case ) {
    return this.http.post<Case>(`${this.apiUrl}/cases`, _case , this.httpOptions)
  }
}
