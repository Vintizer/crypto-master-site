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
  subscribeTraderAction,
  subscribeTraderFailureAction,
  subscribeTraderSuccessAction,
} from './../actions/subscribeTrader.action';

@Injectable()
export class SubscribeTraderEffect {
  subscribeTrader$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(subscribeTraderAction),
      switchMap(({ userId, traderId, walletSize }) => {
        return this.authService
          .subscribeTrader(userId, traderId, walletSize)
          .pipe(
            map((currentUser: CurrentUserInterface) => {
              return subscribeTraderSuccessAction({ currentUser });
            }),
            catchError((errorResponse: HttpErrorResponse) => {
              return of(
                subscribeTraderFailureAction({
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
