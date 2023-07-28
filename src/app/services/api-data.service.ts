import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiDataService {
  private apiUrl = "https://64c1177efa35860bae9ff253.mockapi.io/data";

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get<any[]>(this.apiUrl); 
  }
  getDataById(id: number): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + `data/${id}`);
}
}
