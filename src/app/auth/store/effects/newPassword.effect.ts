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
import {
  newPasswordAction,
  newPasswordSuccessAction,
  newPasswordFailureAction,
} from './../actions/newPassword.action';
import { NewPasswordInterface } from './../../types/newPassword.interface';
import {
  loginAction,
  loginFailureAction,
  loginSuccessAction,
} from './../actions/login.action';

@Injectable()
export class NewPasswordEffect {
  newPassword$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(newPasswordAction),
      switchMap(({ request }) => {
        return this.authService.newPassword(request).pipe(
          map((isPasswordReset: boolean) => {
            if (isPasswordReset) {
              newPasswordSuccessAction();
            } else {
              newPasswordFailureAction({
                errors: { error: ['unknown error'] },
              });
            }
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              newPasswordFailureAction({
                errors: errorResponse.error.errors,
              })
            );
          })
        );
      })
    )
  );

  constructor(private actions$: Actions, private authService: AuthService) {}
}
