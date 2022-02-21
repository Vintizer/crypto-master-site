import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { getCurrentUserAction } from './auth/store/actions/getCurrentUser.action';
import { isLoadingSelector } from './auth/store/selectors';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'crypto-master-site';
  public isLoading$: Observable<boolean>;

  constructor(private store: Store, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.initializeValues();
    this.subscribe();

    this.store.dispatch(getCurrentUserAction());
  }

  initializeValues() {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
  }
  subscribe() {
    this.isLoading$.subscribe((val) => {
      if (val) {
        this.spinner.show();
      } else {
        this.spinner.hide();
      }
    });
  }
}
