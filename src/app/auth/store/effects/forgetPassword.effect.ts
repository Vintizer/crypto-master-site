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
import { forgetPasswordFailureAction } from './../actions/forgetPassword.action';

@Injectable()
export class ForgetPasswordEffect {
  forgetPassword$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(forgetPasswordAction),
      switchMap(({ request }) => {
        return this.authService.forgetPassword(request).pipe(
          map(() => forgetPasswordSuccessAction()),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              forgetPasswordFailureAction({
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
