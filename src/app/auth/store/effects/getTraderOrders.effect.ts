import { OrdersStat } from './../../../shared/types/ordersStat';
import {
  getTraderOrdersAction,
  getTraderOrdersSuccessAction,
  getTraderOrdersFailureAction,
} from './../actions/getTraderOrders.action';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable()
export class GetTraderOrdersEffect {
  getTraderOrders$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(getTraderOrdersAction),
      switchMap(({ traderId }) => {
        return this.authService.getTraderOrders(traderId).pipe(
          map((ordersStat: OrdersStat) => {
            return getTraderOrdersSuccessAction({ ordersStat });
          }),

          catchError((error) => {
            return of(getTraderOrdersFailureAction(error));
          })
        );
      })
    )
  );

  constructor(private actions$: Actions, private authService: AuthService) {}
}
