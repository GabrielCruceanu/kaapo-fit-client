import { Component, DestroyRef, inject, Input } from '@angular/core';
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
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { InputType } from '#/app/shared/components/form/input/input.interface';

@Component({
  selector: 'app-forgot-password',
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
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  @Input() authType: AuthType = AuthType.LOGIN;
  public formGroup: FormGroup;
  errorMessage$: Observable<any>;
  destroyRef = inject(DestroyRef);
  protected readonly InputType = InputType;
  protected readonly AuthType = AuthType;

  constructor(
    private router: Router,
    private authFormService: AuthFormService,
    private store: Store,
  ) {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
    this.store.dispatch(setErrorMessage({ message: '' }));
    this.errorMessage$ = this.store.select(getErrorMessage);
  }

  get email() {
    return this.formGroup.get('email');
  }

  ngOnInit() {
    this.onLoading();
  }

  public onSubmit() {
    console.log('this.formGroup', this.formGroup);
    if (this.formGroup.valid) {
      this.store.dispatch(setLoadingSpinner({ status: true }));
      const { email } = this.formGroup.value;

      console.log('forgot password', email);
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
}
