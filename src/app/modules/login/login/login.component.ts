import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { TokenService } from '@core/storages/token.service';
import { CookieStorage } from '@core/storages/CookieStorage.services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  loginForm: FormGroup;

  hide = true;

  constructor(
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly loginService: LoginService,
    private readonly tokenService: TokenService,
    private readonly cookieService : CookieStorage
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      password: new FormControl('', [Validators.required]),
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.loginService
        .auth(
          this.loginForm.get('email')?.value,
          this.loginForm.get('password')?.value
        )
        .subscribe((res) => {
          console.log('Logado: ', res);
          
          let refreshToken = res.token.token;
          
          const userId = res.user.id;
          if (userId) {
            localStorage.setItem('userId', userId.toString());
          } else {
            console.error('userId não encontrado na resposta');
          }
          
          localStorage.setItem('userName', res.user.name);
          localStorage.setItem('userEmail', res.user.email);

          console.log("Salvo o idUser como no localStorage: " + localStorage.getItem("idUser"));
  
          // Salvar o refreshToken no cookie
          this.cookieService.SetTokenOnCookies(refreshToken);
  
          this.router.navigateByUrl('/admin');
        }, (error) => {
          console.error('Erro ao fazer login:', error);
        });
    }
  }

  navigateToLoginCreate() {
    throw new Error('Method not implemented.');
    }
  
}
