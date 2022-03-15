import { OrdersStat } from './../../../shared/types/ordersStat';
import { createAction, props } from '@ngrx/store';

import { ActionTypes } from 'src/app/auth/store/actionTypes';
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface';

export const getTraderOrdersAction = createAction(
  ActionTypes.GET_TRADER_ORDERS,
  props<{ traderId: string }>()
);

export const getTraderOrdersSuccessAction = createAction(
  ActionTypes.GET_TRADER_ORDERS_SUCCESS,
  props<{ ordersStat: OrdersStat }>()
);

export const getTraderOrdersFailureAction = createAction(
  ActionTypes.GET_TRADER_ORDERS_FAILURE,
  props<{ errors: BackendErrorsInterface }>()
);
