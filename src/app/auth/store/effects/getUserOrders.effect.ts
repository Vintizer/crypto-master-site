import { OrdersStat } from '../../../shared/types/ordersStat';
import {
  getUserOrdersAction,
  getUserOrdersSuccessAction,
  getUserOrdersFailureAction,
} from '../actions/getUserOrders.action';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable()
export class GetUserOrdersEffect {
  getUserOrders$ = createEffect((): any =>
    this.actions$.pipe(
      ofType(getUserOrdersAction),
      switchMap(({ userId }) => {
        return this.authService.getUserOrders(userId).pipe(
          map((ordersStat: OrdersStat) => {
            return getUserOrdersSuccessAction({ ordersStat });
          }),

          catchError((error) => {
            return of(getUserOrdersFailureAction(error));
          })
        );
      })
    )
  );

  constructor(private actions$: Actions, private authService: AuthService) {}
}
