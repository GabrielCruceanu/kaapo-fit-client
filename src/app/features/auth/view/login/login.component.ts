import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthContainerComponent } from '#/app/features/auth/partials/auth-container/auth-container.component';
import { AuthFormComponent } from '#/app/features/auth/components/auth-form/auth-form.component';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from '#/app/shared/components/form/input/input.component';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { setErrorMessage } from '#/app/store/shared/shared.actions';
import {
  getErrorMessage,
  getLoading,
} from '#/app/store/shared/shared.selector';
import { loginStart } from '#/app/features/auth/store/auth.actions';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    AuthContainerComponent,
    AuthFormComponent,
    FormsModule,
    ReactiveFormsModule,
    InputComponent,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginFormGroup: FormGroup;
  errorMessage$: Observable<any>;
  destroyRef = inject(DestroyRef);

  constructor(
    private router: Router,
    private store: Store,
  ) {
    this.loginFormGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
    this.store.dispatch(setErrorMessage({ message: '' }));
    this.errorMessage$ = this.store.select(getErrorMessage);
  }

  get email() {
    return this.loginFormGroup.get('email');
  }

  get password() {
    return this.loginFormGroup.get('password');
  }

  ngOnInit() {
    this.onLoading();
  }

  public onSubmit() {
    console.log('this.formGroup', this.loginFormGroup);
    if (this.loginFormGroup.valid) {
      // this.store.dispatch(setLoadingSpinner({ status: true }));

      console.log('login');
      const { email, password } = this.loginFormGroup.value;
      console.log('email', email);
      console.log('password', password);
      this.store.dispatch(loginStart({ email, password }));
    }
  }

  public onLoading() {
    this.store
      .select(getLoading)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((isLoading: boolean) => {
        if (isLoading) {
          this.loginFormGroup.disable();
        } else {
          this.loginFormGroup.enable();
        }
      });
  }

  public goToRegister() {
    this.router.navigate(['/authentication/register']);
  }

  public goToForgotPassword() {
    this.router.navigate(['/authentication/forgot-password']);
  }
}
