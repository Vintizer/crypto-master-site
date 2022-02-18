import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { AuthService } from 'src/app/auth/services/auth.service';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { PersistanceService } from 'src/app/shared/services/persistance.service';
import { Trader } from './../../../shared/types/trader.interface';
import {
  getTradersAction,
  getTradersFailureAction,
  getTradersSuccessAction,
} from './../actions/getTraders.action';

@Injectable()
export class GetTradersListEffect {
  getTradersList$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(getTradersAction),
      switchMap(({ userId }) => {
        return this.authService.getTradersList(userId).pipe(
          map((tradersList: Trader[]) => {
            console.log('tradersList: ', tradersList);
            return getTradersSuccessAction({ traders: tradersList });
          }),

          catchError((error) => {
            return of(getTradersFailureAction(error));
          })
        );
      })
    )
  );

  constructor(private actions$: Actions, private authService: AuthService) {}
}
