import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';

import { AuthService } from 'src/app/auth/services/auth.service';
import { AuthResponseInterface } from 'src/app/auth/types/authResponse.interface';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { PersistanceService } from './../../../shared/services/persistance.service';
import { Router } from '@angular/router';
import {
  unSubscribeTraderAction,
  unSubscribeTraderFailureAction,
  unSubscribeTraderSuccessAction,
} from './../actions/unSubscribeTrader.action';

@Injectable()
export class UnSubscribeTraderEffect {
  unSubscribeTrader$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(unSubscribeTraderAction),
      switchMap(({ traderId, userId }) => {
        return this.authService.unSubscribeTrader(userId, traderId).pipe(
          map((currentUser: CurrentUserInterface) => {
            return unSubscribeTraderSuccessAction({ currentUser });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              unSubscribeTraderFailureAction({
                errors: errorResponse.error.message,
              })
            );
          })
        );
      })
    )
  );
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private persistanceService: PersistanceService
  ) {}
}
