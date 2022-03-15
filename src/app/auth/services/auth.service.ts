import { OrdersStat } from './../../shared/types/ordersStat';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, take } from 'rxjs';
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
import { ExchangeApi } from './../types/newApiKey.interface';
import { Trader } from './../../shared/types/trader.interface';
import { SignalInterface } from './../types/signal.interface';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  getResponse(response: AuthResponseInterface): CurrentUserInterface {
    return {
      accessToken: response.accessToken,
      traderFee: response.user.traderFee,
      // refreshToken: response.refreshToken,
      email: response.user.email,
      id: response.user.id,
      isActivated: response.user.isActivated,
      isTrader: response.user.isTrader,
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
    token: string,
    id: string | null
  ): CurrentUserInterface {
    return {
      email: res.email,
      id: id || '',
      isActivated: res.isActivated,
      isTrader: res.isTrader,
      traderFee: res.traderFee,
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
    return this.http
      .get<CurrentUserByIdResponseInterface>(url)
      .pipe(map((res) => this.modifyUser(res, token, id)));
  }

  getCurrentUserByToken(token: string): Observable<CurrentUserInterface> {
    const url = `${environment.apiUrl}/auth/user`;
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

  updateApiKeys(
    newKeys: ExchangeApi,
    token: string | null
  ): Observable<CurrentUserInterface> {
    return this.getCurrentUserByToken(token || '').pipe(
      switchMap(({ id }) => {
        const url = `${environment.apiUrl}/users/${id}`;
        return this.http.patch<CurrentUserInterface>(url, {
          exchanges: newKeys,
        });
      })
    );
  }
  makeUserAsTrader(userId: string): Observable<CurrentUserInterface> {
    const url = `${environment.apiUrl}/users/${userId}`;
    return this.http.patch<CurrentUserInterface>(url, {
      isTrader: true,
    });
  }
  subscribeTrader(
    userId: string,
    traderId: string,
    walletSize: string,
    apiName: string
  ): Observable<CurrentUserInterface> {
    const url = `${environment.apiUrl}/users/${userId}`;
    return this.http.patch<CurrentUserInterface>(url, {
      subscribedOn: { traderId, walletSize, apiName },
    });
  }
  unSubscribeTrader(
    userId: string,
    traderId: string
  ): Observable<CurrentUserInterface> {
    const url = `${environment.apiUrl}/users/unsubscribe/${userId}`;
    return this.http.post<CurrentUserInterface>(url, { traderId });
  }
  removeApiKey(name: string, userId: string): Observable<CurrentUserInterface> {
    const url = `${environment.apiUrl}/users/removeApiKey/${userId}`;
    return this.http.post<CurrentUserInterface>(url, { name });
  }
  updateFee(userId: string, fee: number): Observable<CurrentUserInterface> {
    const url = `${environment.apiUrl}/users/${userId}`;
    return this.http.patch<CurrentUserInterface>(url, {
      traderFee: fee,
    });
  }
  getTradersList(userId: string): Observable<Trader[]> {
    const url = `${environment.apiUrl}/users/traders/${userId}`;
    return this.http.get<Trader[]>(url);
  }
  getUserOrders(userId: string): Observable<OrdersStat> {
    const url = `${environment.apiUrl}/order/user/${userId}`;
    return this.http.get<OrdersStat>(url);
  }
  getTraderOrders(traderId: string): Observable<OrdersStat> {
    const url = `${environment.apiUrl}/order/trader/${traderId}`;
    return this.http.get<OrdersStat>(url);
  }

  newSignal(signal: SignalInterface): any {
    const url = `${environment.apiUrl}/signals`;
    return this.http.post<SignalInterface>(url, signal);
  }
}
