import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '#/app/store/app.state';
import { getLoading } from '#/app/store/shared/shared.selector';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  showLoading$?: Observable<boolean>;
  isAuthenticated$?: Observable<boolean>;
  errorMessage$?: Observable<string>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.showLoading$ = this.store.select(getLoading);
    // this.isAuthenticated$ = this.store.select(isAuthenticated);
    // this.errorMessage$ = this.store.select(getErrorMessage);
  }
}
