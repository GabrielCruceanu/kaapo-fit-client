import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponentsModule } from '#/app/components/form-components/form-components.module';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '#/app/modules/auth/services/auth.service';
import { Router } from '@angular/router';
import { LoginInterface } from '#/app/ts/interface';
import { ApiRoutes } from '#/app/ts/enum';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormComponentsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  errorMessage: string = '';
  typeOfLogin: ApiRoutes = ApiRoutes.Login;
  protected readonly ApiRoutes = ApiRoutes;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  submit(): void {
    this.errorMessage = '';
    this.form.markAsTouched();

    if (this.form.invalid) {
      console.log('invalid login');
      this.form.markAllAsTouched();
      return;
    }
    console.log('submit', this.form.value);
    const { email, password } = this.form.value;
    if (email && password) {
      const payload: LoginInterface = {
        email: email,
        password: password,
      };
      this.authService.login(payload, this.typeOfLogin).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.log('error', err);
          this.errorMessage = err.message;
        },
      });
    }
  }

  loginAsAdmin() {
    this.typeOfLogin = ApiRoutes.AdminLogin;
  }

  loginAsClient() {
    this.typeOfLogin = ApiRoutes.Login;
  }
}
