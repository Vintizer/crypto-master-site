import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

import { PersistanceService } from './../../../shared/services/persistance.service';
import { logoutAction } from './../actions/logout.action';

@Injectable()
export class LogoutEffect {
  logout$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(logoutAction),
      tap(() => {
        this.persistanceService.remove('accessToken');
      })
    )
  );

  constructor(
    private actions$: Actions,
    private persistanceService: PersistanceService
  ) {}
}
