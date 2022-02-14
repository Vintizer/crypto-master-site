import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { select } from '@ngrx/store';
import { userEmailSelector } from '../../store/selectors';
import { logoutAction } from './../../store/actions/logout.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userEmail$: Observable<string | null>;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.initializeValues();
  }
  initializeValues() {
    this.userEmail$ = this.store.pipe(select(userEmailSelector));
  }

  logout() {
    this.store.dispatch(logoutAction());
  }
}
