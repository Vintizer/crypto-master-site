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
  newApiAction,
  newApiSuccessAction,
  newApiFailureAction,
} from './../actions/newApiKey.action';

@Injectable()
export class NewApiEffect {
  newApi$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(newApiAction),
      switchMap(({ newApi }) => {
        // TODO remove token and run function with id like makeTrader
        const token = this.persistanceService.get('accessToken');
        return this.authService.updateApiKeys(newApi, token).pipe(
          map((currentUser: CurrentUserInterface) => {
            return newApiSuccessAction({ currentUser });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              newApiFailureAction({
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
