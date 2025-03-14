import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(private http: HttpClient) {}

  getUserRole() {
    return this.http.get(`${environment.apiUrl}/wiseaccount/user/roles`);
  }
}
