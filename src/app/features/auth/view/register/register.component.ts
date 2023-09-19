import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthContainerComponent } from '#/app/features/auth/partials/auth-container/auth-container.component';
import { AuthFormComponent } from '#/app/features/auth/components/auth-form/auth-form.component';
import { AuthType } from '#/app/features/auth/interfaces/auth.interface';
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
import { AuthFormService } from '#/app/features/auth/components/auth-form/auth-form.service';
import { Store } from '@ngrx/store';
import {
  setErrorMessage,
  setLoadingSpinner,
} from '#/app/store/shared/shared.actions';
import {
  getErrorMessage,
  getLoading,
} from '#/app/store/shared/shared.selector';
import { loginStart } from '#/app/features/auth/store/auth.actions';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { InputType } from '#/app/shared/components/form/input/input.interface';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    AuthContainerComponent,
    AuthFormComponent,
    FormsModule,
    InputComponent,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  @Input() authType: AuthType = AuthType.LOGIN;
  public formGroup: FormGroup;
  errorMessage$: Observable<any>;
  protected readonly InputType = InputType;
  protected readonly AuthType = AuthType;
  destroyRef = inject(DestroyRef);

  constructor(
    private router: Router,
    private authFormService: AuthFormService,
    private store: Store,
  ) {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
    this.store.dispatch(setErrorMessage({ message: '' }));
    this.errorMessage$ = this.store.select(getErrorMessage);
  }

  get email() {
    return this.formGroup.get('email');
  }

  get password() {
    return this.formGroup.get('password');
  }
  get confirmPassword() {
    return this.formGroup.get('confirmPassword');
  }
  ngOnInit() {
    this.onLoading();
  }
  public onSubmit() {
    console.log('this.formGroup', this.formGroup);
    if (this.formGroup.valid) {
      this.store.dispatch(setLoadingSpinner({ status: true }));
      const { email, password, currentPassword } = this.formGroup.value;

      console.log('register', email, password, currentPassword);
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
