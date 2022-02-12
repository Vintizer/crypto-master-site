import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { environment } from 'src/environments/environment';
import { AuthResponseInterface } from 'src/app/auth/types/authResponse.interface';
import { LoginRequestInterface } from 'src/app/auth/types/loginRequest.interface';
import { ForgetPasswordInterface } from '../types/forgetPassword.interface';
import { ForgetPasswordResponseInterface } from '../types/forgetPasswordResponse.interface';
import { NewPasswordInterface } from './../types/newPassword.interface';
import { NewPasswordResponseInterface } from './../types/newPasswordResponse.interface';
import { SignupRequestInterface } from './../types/signupRequest.interface';
import { CurrentUserTokenResponseInterface } from '../../shared/types/currentUserTokenResponse.interface';
import { CurrentUserResponseInterface } from './../types/currentUserResponse.interface';
import { CurrentUserByIdResponseInterface } from './../types/currentUserByIdResponse.interface';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  getResponse(response: AuthResponseInterface): CurrentUserInterface {
    return {
      accessToken: response.accessToken,
      // refreshToken: response.refreshToken,
      email: response.user.email,
      id: response.user.id,
      isActivated: response.user.isActivated,
      exchanges: response.user.exchanges,
      subscribedOn: response.user.subscribedOn,
    };
  }

  signup(data: SignupRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/auth/registration';
    return this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(map(this.getResponse));
  }

  login(data: LoginRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/auth/login';
    return this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(map(this.getResponse));
  }

  newPassword(data: NewPasswordInterface): Observable<boolean> {
    const url = environment.apiUrl + '/auth/login';
    return this.http
      .post<NewPasswordResponseInterface>(url, data)
      .pipe(map((response) => (response.passwordReset ? true : false)));
  }

  modifyUser(
    res: CurrentUserByIdResponseInterface,
    token: string
  ): CurrentUserInterface {
    return {
      email: res.email,
      id: res.id,
      isActivated: res.isActivated,
      exchanges: res.exchanges,
      subscribedOn: res.subscribedOn,
      accessToken: token,
    };
  }

  getCurrentUserById(
    id: string | null,
    token: string
  ): Observable<CurrentUserInterface> {
    const url = `${environment.apiUrl}/users/${id}`;
    return this.http.get<CurrentUserByIdResponseInterface>(url).pipe(
      tap((a) => {
        console.log('3');
        console.log(a);
      }),
      map((res) => this.modifyUser(res, token))
    );
  }

  getCurrentUserByToken(token: string): Observable<CurrentUserInterface> {
    const url = `${environment.apiUrl}/auth/user`;
    console.log('url: ', url);
    return (
      this.http
        .post<CurrentUserTokenResponseInterface | null>(url, { token })
        // TODO если прилетел нулл
        // TODO делать на бекенде это
        .pipe(
          map(
            (currentUserTokenResponse) => currentUserTokenResponse?.id || null
          ),
          switchMap((id) => this.getCurrentUserById(id, token))
        )
    );
  }

  forgetPassword(data: ForgetPasswordInterface): Observable<boolean> {
    const url = environment.apiUrl + '/auth/reset';
    return this.http
      .post<ForgetPasswordResponseInterface>(url, data)
      .pipe(
        map((response: ForgetPasswordResponseInterface) =>
          response.emailSend ? true : false
        )
      );
  }
}
