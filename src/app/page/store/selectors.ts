import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthStateInterface } from 'src/app/auth/types/authState.interface';

export const authFeatureSelector =
  createFeatureSelector<AuthStateInterface>('auth');

export const userEmailSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.currentUser?.email || null
);
