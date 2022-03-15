import { createAction, props } from '@ngrx/store';

import { ActionTypes } from 'src/app/auth/store/actionTypes';
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';

export const subscribeTraderAction = createAction(
  ActionTypes.SUBSCRIBE_TRADER,
  props<{ userId: string; traderId: string; walletSize: string; apiName: string }>()
);

export const subscribeTraderSuccessAction = createAction(
  ActionTypes.SUBSCRIBE_TRADER_SUCCESS,
  props<{ currentUser: CurrentUserInterface }>()
);

export const subscribeTraderFailureAction = createAction(
  ActionTypes.SUBSCRIBE_TRADER_FAILURE,
  props<{ errors: BackendErrorsInterface }>()
);
