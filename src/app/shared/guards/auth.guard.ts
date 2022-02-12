import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './../../auth/services/auth.service';
import { isLoggedInSelector } from 'src/app/auth/store/selectors';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  public isLoggedIn$: Observable<boolean | null>;

  constructor(private store: Store, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector));
    // TODO подумаьт как логином не моргать, пока идет запрос
    return this.isLoggedIn$.pipe(
      map((isLogged) => isLogged || this.router.parseUrl('/login'))
    );
  }
}
