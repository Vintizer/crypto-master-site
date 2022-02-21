import { createAction, props } from '@ngrx/store';

import { ActionTypes } from 'src/app/auth/store/actionTypes';
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface';
import { SignalInterface } from './../../types/signal.interface';

export const newSignalAction = createAction(
  ActionTypes.NEW_SIGNAL,
  props<{ signal: SignalInterface }>()
);

export const newSignalSuccessAction = createAction(
  ActionTypes.NEW_SIGNAL_SUCCESS,
  props<{ response: SignalInterface }>()
);

export const newSignalFailureAction = createAction(
  ActionTypes.NEW_SIGNAL_FAILURE,
  props<{ errors: BackendErrorsInterface }>()
);
