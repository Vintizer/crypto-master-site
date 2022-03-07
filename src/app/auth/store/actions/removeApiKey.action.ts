import { createAction, props } from '@ngrx/store';

import { ActionTypes } from 'src/app/auth/store/actionTypes';
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';

export const removeApiKeyAction = createAction(
  ActionTypes.REMOVE_API_KEY,
  props<{ name: string; userId: string }>()
);

export const removeApiKeySuccessAction = createAction(
  ActionTypes.REMOVE_API_KEY_SUCCESS,
  props<{ currentUser: CurrentUserInterface }>()
);

export const removeApiKeyFailureAction = createAction(
  ActionTypes.REMOVE_API_KEY_FAILURE,
  props<{ errors: BackendErrorsInterface }>()
);
