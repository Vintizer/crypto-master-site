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
import { NewPasswordInterface } from './../../types/newPassword.interface';
import { SignalInterface } from './../../types/signal.interface';
import {
  newSignalAction,
  newSignalFailureAction,
  newSignalSuccessAction,
} from './../actions/newSignal.action';

@Injectable()
export class NewSignalEffect {
  newSignal$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(newSignalAction),
      switchMap(({ signal }) => {
        return this.authService.newSignal(signal).pipe(
          map((signal: SignalInterface) => {
            return newSignalSuccessAction({ response: signal });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              newSignalFailureAction({
                errors: errorResponse.error.message,
              })
            );
          })
        );
      })
    )
  );

  constructor(private actions$: Actions, private authService: AuthService) {}
}
