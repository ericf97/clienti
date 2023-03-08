import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Case } from '../interfaces/case.interface';

@Injectable({
  providedIn: 'root',
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

  cases: Case[] = [];
  caseStates: any = [];

  constructor(private http: HttpClient) {}

  getCases() {
    return this.http.get<Case[]>(`${this.apiUrl}/cases`, this.httpOptions).pipe(
      map((resp) => {
        if (!this.cases.length) {
          this.cases = resp;
        }
        return resp;
      })
    );
  }
  postCase(_case: Case) {
    return this.http.post<Case>(
      `${this.apiUrl}/cases`,
      _case,
      this.httpOptions
    );
  }

  editCase(_case: Case) {
    return this.http.patch<Case>(
      `${this.apiUrl}/cases`,
      _case,
      this.httpOptions
    );
  }

  getCaseStates() {
    return this.http
      .get<any>(`${this.apiUrl}/cases/states`, this.httpOptions)
      .subscribe((resp) => {
        this.caseStates = resp;
      });
  }
}
