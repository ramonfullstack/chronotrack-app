import { HttpClient } from '@angular/common/http';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface token {
  token: string
}

export interface user {
  id: number,
  name: string,
  email: string
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  auth(
    email: string,
    password: string
  ): Observable<{ token: token; user: user }> {
    const body = {
      email: email,
      password: password,
    };

    return this.http.post<{ token: token; user: user }>(
      `${environment.apiUrl}/auth/login`,
      body
    );
  }

  refreshToken(){
    return this.http.post<{ accessToken: string; expire: Date }>(
      `${environment.apiUrl}/auth/refresh-token`, null
    )
  }

}
