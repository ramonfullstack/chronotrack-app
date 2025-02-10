import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(
    private router: Router,
  ) { }

  SetTokenOnLocalStorage(token: any) {
    localStorage.setItem('token', token);
  }
  
  GetPublicToken() {
    return localStorage.getItem('token');
  }
  
  RemovePublicToken() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

  decodeToken(token: string): any {
    try {
      return jwtDecode(token); 
    } catch (error) {
      console.error("Erro ao decodificar o token", error);
      return null;
    }
  }

  getRolesFromToken(token: string): any {
    const decodedToken = this.decodeToken(token);
    return decodedToken.role;
  }

}
