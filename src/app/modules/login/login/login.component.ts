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
          console.log('Logado: ' + res);
          let refreshToken = res.token;
          this.cookieService.SetTokenOnCookies(refreshToken);
          this.router.navigateByUrl('/admin');
        });
    }
  }
}
