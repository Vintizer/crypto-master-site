import { Action, createReducer, on } from '@ngrx/store';
import {
  getCurrentUserAction,
  getCurrentUserFailureAction,
  getCurrentUserSuccessAction,
} from 'src/app/auth/store/actions/getCurrentUser.action';
import {
  getTradersAction,
  getTradersFailureAction,
  getTradersSuccessAction,
} from 'src/app/auth/store/actions/getTraders.action';
import {
  loginAction,
  loginFailureAction,
  loginSuccessAction,
} from 'src/app/auth/store/actions/login.action';
import { AuthStateInterface } from 'src/app/auth/types/authState.interface';
import {
  forgetPasswordAction,
  forgetPasswordFailureAction,
  forgetPasswordSuccessAction,
} from './actions/forgetPassword.action';
import {
  getTraderOrdersAction,
  getTraderOrdersFailureAction,
  getTraderOrdersSuccessAction,
} from './actions/getTraderOrders.action';
import {
  getUserOrdersAction,
  getUserOrdersFailureAction,
  getUserOrdersSuccessAction,
} from './actions/getUserOrders.action';
import { logoutAction } from './actions/logout.action';
import {
  makeTraderAction,
  makeTraderFailureAction,
  makeTraderSuccessAction,
} from './actions/makeTrader.action';
import {
  newApiAction,
  newApiFailureAction,
  newApiSuccessAction,
} from './actions/newApiKey.action';
import {
  newPasswordAction,
  newPasswordFailureAction,
  newPasswordSuccessAction,
} from './actions/newPassword.action';
import {
  newSignalAction,
  newSignalFailureAction,
  newSignalSuccessAction,
} from './actions/newSignal.action';
import {
  removeApiKeyAction,
  removeApiKeyFailureAction,
  removeApiKeySuccessAction,
} from './actions/removeApiKey.action';
import {
  signupAction,
  signupFailureAction,
  signupSuccessAction,
} from './actions/signup.action';
import {
  subscribeTraderAction,
  subscribeTraderFailureAction,
  subscribeTraderSuccessAction,
} from './actions/subscribeTrader.action';
import {
  unSubscribeTraderAction,
  unSubscribeTraderFailureAction,
  unSubscribeTraderSuccessAction,
} from './actions/unSubscribeTrader.action';
import {
  updateFeeAction,
  updateFeeFailureAction,
  updateFeeSuccessAction,
} from './actions/updateFee.action';

const initialState: AuthStateInterface = {
  isSubmitting: false,
  isLoading: false,
  currentUser: null,
  validationErrors: null,
  isLoggedIn: null,
  tradersList: [],
  traderOrders: { filledOrders: [], openOrders: [] },
  userOrders: { filledOrders: [], openOrders: [] },
};

const authReducer = createReducer(
  initialState,
  on(
    signupAction,
    (state): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })
  ),
  on(
    signupSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      isLoggedIn: true,
      currentUser: action.currentUser,
    })
  ),
  on(
    signupFailureAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })
  ),
  on(
    forgetPasswordAction,
    (state): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })
  ),
  on(
    forgetPasswordSuccessAction,
    (state): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
    })
  ),
  on(
    forgetPasswordFailureAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })
  ),
  on(
    loginAction,
    (state): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })
  ),
  on(
    loginSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      isLoggedIn: true,
      currentUser: action.currentUser,
    })
  ),
  on(loginFailureAction, (state, action): AuthStateInterface => {
    return {
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    };
  }),
  on(
    newPasswordAction,
    (state): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })
  ),
  on(
    newPasswordSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
    })
  ),
  on(
    newPasswordFailureAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })
  ),
  on(
    getCurrentUserAction,
    (state): AuthStateInterface => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    getCurrentUserSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isLoading: false,
      isLoggedIn: true,
      currentUser: action.currentUser,
    })
  ),
  on(
    getCurrentUserFailureAction,
    (state): AuthStateInterface => ({
      ...state,
      isLoading: false,
      isLoggedIn: false,
      currentUser: null,
    })
  ),
  on(
    newApiAction,
    (state): AuthStateInterface => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    newApiSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isLoading: false,
      currentUser: action.currentUser,
    })
  ),
  on(
    newApiFailureAction,
    (state): AuthStateInterface => ({
      ...state,
      isLoading: false,
    })
  ),
  on(
    makeTraderAction,
    (state): AuthStateInterface => ({ ...state, isLoading: true })
  ),
  on(
    makeTraderSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isLoading: false,
      currentUser: action.currentUser,
    })
  ),
  on(
    makeTraderFailureAction,
    (state): AuthStateInterface => ({
      ...state,
      isLoading: false,
    })
  ),
  on(
    logoutAction,
    (state): AuthStateInterface => ({
      ...state,
      isLoggedIn: false,
      currentUser: null,
    })
  ),
  on(
    getTradersAction,
    (state): AuthStateInterface => ({ ...state, isLoading: true })
  ),
  on(
    getTradersSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isLoading: false,
      tradersList: action.traders,
    })
  ),
  on(
    getTradersFailureAction,
    (state): AuthStateInterface => ({
      ...state,
      isLoading: false,
    })
  ),
  on(
    subscribeTraderAction,
    (state): AuthStateInterface => ({ ...state, isLoading: true })
  ),
  on(
    subscribeTraderSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isLoading: false,
      currentUser: action.currentUser,
    })
  ),
  on(
    subscribeTraderFailureAction,
    (state): AuthStateInterface => ({
      ...state,
      isLoading: false,
    })
  ),
  on(
    unSubscribeTraderAction,
    (state): AuthStateInterface => ({ ...state, isLoading: true })
  ),
  on(
    unSubscribeTraderSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isLoading: false,
      currentUser: action.currentUser,
    })
  ),
  on(
    unSubscribeTraderFailureAction,
    (state): AuthStateInterface => ({
      ...state,
      isLoading: false,
    })
  ),
  on(
    updateFeeAction,
    (state): AuthStateInterface => ({ ...state, isLoading: true })
  ),
  on(
    updateFeeSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isLoading: false,
      currentUser: action.currentUser,
    })
  ),
  on(
    updateFeeFailureAction,
    (state): AuthStateInterface => ({
      ...state,
      isLoading: false,
    })
  ),
  on(
    newSignalAction,
    (state): AuthStateInterface => ({ ...state, isLoading: true })
  ),
  on(
    newSignalSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isLoading: false,
    })
  ),
  on(
    newSignalFailureAction,
    (state): AuthStateInterface => ({
      ...state,
      isLoading: false,
    })
  ),
  on(
    removeApiKeyAction,
    (state): AuthStateInterface => ({ ...state, isLoading: true })
  ),
  on(
    removeApiKeySuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isLoading: false,
      currentUser: action.currentUser,
    })
  ),
  on(
    removeApiKeyFailureAction,
    (state): AuthStateInterface => ({
      ...state,
      isLoading: false,
    })
  ),
  on(
    getTraderOrdersAction,
    (state): AuthStateInterface => ({ ...state, isLoading: true })
  ),
  on(
    getTraderOrdersSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isLoading: false,
      traderOrders: action.ordersStat,
    })
  ),
  on(
    getTraderOrdersFailureAction,
    (state): AuthStateInterface => ({
      ...state,
      isLoading: false,
    })
  ),
  on(
    getUserOrdersAction,
    (state): AuthStateInterface => ({ ...state, isLoading: true })
  ),
  on(
    getUserOrdersSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isLoading: false,
      userOrders: action.ordersStat,
    })
  ),
  on(
    getUserOrdersFailureAction,
    (state): AuthStateInterface => ({
      ...state,
      isLoading: false,
    })
  )
);
export function reducers(state: AuthStateInterface, action: Action) {
  return authReducer(state, action);
}
