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
  makeTraderAction,
  makeTraderFailureAction,
  makeTraderSuccessAction,
} from './../actions/makeTrader.action';

@Injectable()
export class MakeTraderEffect {
  makeTrader$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(makeTraderAction),
      switchMap(({ userId }) => {
        return this.authService.makeUserAsTrader(userId).pipe(
          map((currentUser: CurrentUserInterface) => {
            return makeTraderSuccessAction({ currentUser });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              makeTraderFailureAction({
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
