import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { FilesInterface } from '../interfaces/files.interface';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      // 'Accept': '*/*'
    }),
  };

  apiUrl = environment.apiBase;

  constructor(private http: HttpClient) {}

  getFiles(caseId: number) {
    return this.http.get<FilesInterface[]>(`${this.apiUrl}/file/${caseId}`, this.httpOptions);
  }

  postFiles( file: FilesInterface) {
    return this.http.post<FilesInterface>(`${this.apiUrl}/file` ,file ,this.httpOptions);
  }

  deleteFile(file: FilesInterface) {
    return this.http.delete(`${this.apiUrl}/file/${file.caseId}/${file.fileName}`, this.httpOptions);
  }
}
