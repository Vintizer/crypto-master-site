import { of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { PersistanceService } from '../../../shared/services/persistance.service';
import { logoutAction, logoutSuccessAction } from '../actions/logout.action';

@Injectable()
export class LogoutEffect {
  logout$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(logoutAction),
      switchMap(() => {
        this.persistanceService.remove('accessToken');
        return of(logoutSuccessAction());
      })
    )
  );
  constructor(
    private actions$: Actions,
    private persistanceService: PersistanceService
  ) {}
}
