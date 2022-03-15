import { OrdersStat } from '../../../shared/types/ordersStat';
import { createAction, props } from '@ngrx/store';

import { ActionTypes } from 'src/app/auth/store/actionTypes';
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface';

export const getUserOrdersAction = createAction(
  ActionTypes.GET_USER_ORDERS,
  props<{ userId: string }>()
);

export const getUserOrdersSuccessAction = createAction(
  ActionTypes.GET_USER_ORDERS_SUCCESS,
  props<{ ordersStat: OrdersStat }>()
);

export const getUserOrdersFailureAction = createAction(
  ActionTypes.GET_USER_ORDERS_FAILURE,
  props<{ errors: BackendErrorsInterface }>()
);
