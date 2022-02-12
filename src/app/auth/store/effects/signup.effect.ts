import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';

import { AuthService } from 'src/app/auth/services/auth.service';
import {
  forgetPasswordAction,
  forgetPasswordSuccessAction,
} from '../actions/forgetPassword.action';
import { AuthResponseInterface } from 'src/app/auth/types/authResponse.interface';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { signupAction } from './../actions/signup.action';
import {
  loginAction,
  loginFailureAction,
  loginSuccessAction,
} from './../actions/login.action';

@Injectable()
export class SignupEffect {
  signup$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(signupAction),
      switchMap(({ request }) => {
        return this.authService.signup(request).pipe(
          map((currentUser: CurrentUserInterface) =>
            loginSuccessAction({ currentUser })
          ),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              loginFailureAction({
                errors: errorResponse?.error?.errors,
              })
            );
          })
        );
      })
    )
  );

  constructor(private actions$: Actions, private authService: AuthService) {}
}
