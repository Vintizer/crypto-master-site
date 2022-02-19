import { createAction, props } from '@ngrx/store';

import { ActionTypes } from 'src/app/auth/store/actionTypes';
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';

export const updateFeeAction = createAction(
  ActionTypes.UPDATE_FEE,
  props<{ fee: number; userId: string }>()
);

export const updateFeeSuccessAction = createAction(
  ActionTypes.UPDATE_FEE_SUCCESS,
  props<{ currentUser: CurrentUserInterface }>()
);

export const updateFeeFailureAction = createAction(
  ActionTypes.UPDATE_FEE_FAILURE,
  props<{ errors: BackendErrorsInterface }>()
);
