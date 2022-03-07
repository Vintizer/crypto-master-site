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
  removeApiKeyAction,
  removeApiKeyFailureAction,
  removeApiKeySuccessAction,
} from './../actions/removeApiKey.action';

@Injectable()
export class RemoveApiKeyEffect {
  removeApiKey$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(removeApiKeyAction),
      switchMap(({ name, userId }) => {
        return this.authService.removeApiKey(name, userId).pipe(
          map((currentUser: CurrentUserInterface) => {
            return removeApiKeySuccessAction({ currentUser });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              removeApiKeyFailureAction({
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
