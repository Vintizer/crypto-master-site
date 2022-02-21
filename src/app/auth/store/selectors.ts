import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthStateInterface } from 'src/app/auth/types/authState.interface';
import { SubscribedOn } from './../../shared/types/currentUser.interface';

export const authFeatureSelector =
  createFeatureSelector<AuthStateInterface>('auth');

export const isSubmittingSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.isSubmitting
);

export const isLoadingSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.isLoading
);

export const validationErrorsSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.validationErrors
);

export const isLoggedInSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.isLoggedIn
);

export const isTraderSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.currentUser?.isTrader ?? null
);

export const isAnonymousSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.isLoggedIn === false
);

export const currentUserSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.currentUser
);

export const tradersListSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.tradersList
);

export const currentUserIdSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.currentUser?.id || null
);

export const subscribedSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.currentUser?.subscribedOn || []
);

export const traderFeeSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.currentUser?.traderFee || 0
);

export const apiKeysSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.currentUser?.exchanges || []
);
