export enum ActionTypes {
  SIGNUP = '[Auth] Signup',
  SIGNUP_SUCCESS = '[Auth] Signup success',
  SIGNUP_FAILURE = '[Auth] Signup failure',

  LOGOUT = '[Auth] Logout',
  LOGOUT_SUCCESS_ACTION = '[Auth] Logout success',

  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login success',
  LOGIN_FAILURE = '[Auth] Login failure',

  FORGET_PASSWORD = '[Auth] Forget password',
  FORGET_PASSWORD_SUCCESS = '[Auth] Forget password success',
  FORGET_PASSWORD_FAILURE = '[Auth] Forget password failure',

  GET_CURRENT_USER = '[Auth] Get current user',
  GET_CURRENT_USER_SUCCESS = '[Auth] Get current user success',
  GET_CURRENT_USER_FAILURE = '[Auth] Get current user failure',

  NEW_PASSWORD = '[Auth] New password',
  NEW_PASSWORD_SUCCESS = '[Auth] New password success',
  NEW_PASSWORD_FAILURE = '[Auth] New password failure',

  NEW_API_KEY = '[Update] New api key',
  NEW_API_KEY_SUCCESS = '[Update] New api key success',
  NEW_API_KEY_FAILURE = '[Update] New api key failure',

  MAKE_TRADER = '[Update] Make trader',
  MAKE_TRADER_SUCCESS = '[Update] Make trader success',
  MAKE_TRADER_FAILURE = '[Update] Make trader failure',

  GET_TRADERS = '[Request] Get traders',
  GET_TRADERS_SUCCESS = '[Request] Get traders success',
  GET_TRADERS_FAILURE = '[Request] Get traders failure',

  SUBSCRIBE_TRADER = '[Request] Subscribe trader',
  SUBSCRIBE_TRADER_SUCCESS = '[Request] Subscribe trader success',
  SUBSCRIBE_TRADER_FAILURE = '[Request] Subscribe trader failure',

  UNSUBSCRIBE_TRADER = '[Request] Unsubscribe trader',
  UNSUBSCRIBE_TRADER_SUCCESS = '[Request] Unsubscribe trader success',
  UNSUBSCRIBE_TRADER_FAILURE = '[Request] Unsubscribe trader failure',

  UPDATE_FEE = '[Request] Update fee',
  UPDATE_FEE_SUCCESS = '[Request] Update fee success',
  UPDATE_FEE_FAILURE = '[Request] Update fee failure',
}
