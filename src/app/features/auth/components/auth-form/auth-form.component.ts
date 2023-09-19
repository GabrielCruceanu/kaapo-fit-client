import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from '#/app/shared/components/form/input/input.component';
import { InputType } from '#/app/shared/components/form/input/input.interface';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthType } from '#/app/features/auth/interfaces/auth.interface';
import { CheckboxComponent } from '#/app/shared/components/form/checkbox/checkbox.component';
import { Router, RouterLink } from '@angular/router';
import { AuthFormService } from '#/app/features/auth/components/auth-form/auth-form.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  setErrorMessage,
  setLoadingSpinner,
} from '#/app/store/shared/shared.actions';
import {
  getErrorMessage,
  getLoading,
} from '#/app/store/shared/shared.selector';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { loginStart } from '#/app/features/auth/store/auth.actions';

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [
    CommonModule,
    InputComponent,
    FormsModule,
    ReactiveFormsModule,
    CheckboxComponent,
    RouterLink,
  ],
  providers: [AuthFormService],
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent implements OnInit {
  @Input() authType: AuthType = AuthType.LOGIN;
  public formGroup!: FormGroup;
  errorMessage$: Observable<any>;
  destroyRef = inject(DestroyRef);
  protected readonly InputType = InputType;
  protected readonly AuthType = AuthType;

  constructor(
    private router: Router,
    private authFormService: AuthFormService,
    private store: Store,
  ) {
    this.createForm();
    this.store.dispatch(setErrorMessage({ message: '' }));
    this.errorMessage$ = this.store.select(getErrorMessage);
  }

  get email() {
    return this.formGroup.get('email');
  }

  get password() {
    return this.formGroup.get('password');
  }

  get currentPassword() {
    return this.formGroup.get('currentPassword');
  }

  ngOnInit() {
    this.onLoading();
  }

  public createForm() {
    // switch (this.authType) {
    //   case AuthType.REGISTER:
    //     return (this.formGroup = this.authFormService.createRegisterForm());
    //   case AuthType.FORGOT_PASSWORD:
    //     return (this.formGroup =
    //       this.authFormService.createForgotPasswordForm());
    //   default:
    //     return (this.formGroup = this.authFormService.createLoginForm());
    // }
  }

  public onSubmit() {
    console.log('this.formGroup', this.formGroup);
    if (this.formGroup.valid) {
      this.store.dispatch(setLoadingSpinner({ status: true }));

      if (this.authType === AuthType.LOGIN) {
        console.log('login');
        const { email, password } = this.formGroup.value;
        this.store.dispatch(loginStart({ email, password }));
      }
      if (this.authType === AuthType.REGISTER) {
        console.log('register');
      }
      if (this.authType === AuthType.FORGOT_PASSWORD) {
        console.log('forgot password');
      }
    }
  }

  public onLoading() {
    this.store
      .select(getLoading)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((isLoading: boolean) => {
        if (isLoading) {
          this.formGroup.disable();
        } else {
          this.formGroup.enable();
        }
      });
  }

  public goToLogin() {
    this.router.navigate(['/authentication']);
  }

  public goToRegister() {
    this.router.navigate(['/authentication/register']);
  }

  public goToForgotPassword() {
    this.router.navigate(['/authentication/forgot-password']);
  }
}
