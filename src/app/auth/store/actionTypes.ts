export enum ActionTypes {
  SIGNUP = '[Auth] Signup',
  SIGNUP_SUCCESS = '[Auth] Signup success',
  SIGNUP_FAILURE = '[Auth] Signup failure',

  LOGOUT = '[Auth] Logout',

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
}
