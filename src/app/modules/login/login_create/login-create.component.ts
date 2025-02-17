import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-register',
  templateUrl: './login-create.component.html',
  styleUrls: ['./login-create.component.scss'],
})
export class LoginCreateComponent {
  registerForm: FormGroup;

  hide = true;

  constructor(
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly service: LoginService, // Usando serviço de cadastro
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      password: new FormControl('', [Validators.required]),
      salary: new FormControl('', [Validators.required, Validators.min(0)]),
    });
  }

  register() {
    if (this.registerForm.valid) {
      console.log('Form values:', this.registerForm.value); // Verifique os valores no console
  
      this.service.createUser(
        this.registerForm.get('name')?.value,
        this.registerForm.get('email')?.value,
        this.registerForm.get('password')?.value,
        this.registerForm.get('salary')?.value
      ).subscribe(
        (res) => {
          console.log('Usuário cadastrado:', res);
          this.router.navigateByUrl('/login');
        },
        (error) => {
          console.error('Erro ao cadastrar usuário:', error);
        }
      );
    }
  }
}
