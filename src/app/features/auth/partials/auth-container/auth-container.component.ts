import { Component } from '@angular/core';
import { LayoutModule } from '#/app/shared/partials/layout/layout.module';
import { AsyncPipe, NgIf } from '@angular/common';
import { LoadingSpinnerComponent } from '#/app/shared/components/loading-spinner/loading-spinner.component';
import { getLoading } from '#/app/store/shared/shared.selector';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth-container',
  templateUrl: './auth-container.component.html',
  styleUrls: ['./auth-container.component.scss'],
  standalone: true,
  imports: [LayoutModule, AsyncPipe, LoadingSpinnerComponent, NgIf],
})
export class AuthContainerComponent {
  public showLoading$: Observable<boolean>;

  constructor(private store: Store) {
    this.showLoading$ = this.store.select(getLoading);
  }
}
