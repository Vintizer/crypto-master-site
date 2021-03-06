import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Store, select } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface';
import { isLoggedInSelector } from 'src/app/auth/store/selectors';
import { userExchangesSelector } from './../../store/selectors';
import { ExchangeApi } from './../../../auth/types/newApiKey.interface';
import { currentUserIdSelector } from '../../../auth/store/selectors';
import {
  newApiFailureAction,
  newApiAction,
} from './../../../auth/store/actions/newApiKey.action';
import { validationErrorsSelector } from './../../../auth/store/selectors';
import { signupFailureAction } from './../../../auth/store/actions/signup.action';
import { removeApiKeyAction } from './../../../auth/store/actions/removeApiKey.action';
import { Exchange } from './../../../shared/types/exchange.type';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  public form: FormGroup;
  public exchanges$: Observable<ExchangeApi[]>;
  public preparedExchanges: ExchangeApi[];
  public backendErrors$: Observable<BackendErrorsInterface | null>;
  public userId$: Observable<string | null>;
  constructor(private formBuilder: FormBuilder, private store: Store) {}
  ngOnInit(): void {
    this.initializeForm();
    this.initializeValues();
    this.subscribe();
  }

  initializeForm() {
    this.form = this.formBuilder.group({
      exchangeMarket: 'Spot',
      apiName: [''],
      apiKey: [''],
      apiSecret: [''],
      exchange: 'Binance',
    });
  }

  initializeValues(): void {
    this.exchanges$ = this.store.pipe(select(userExchangesSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
    this.userId$ = this.store.pipe(select(currentUserIdSelector));
  }

  subscribe() {
    this.exchanges$.subscribe((val) => {
      this.preparedExchanges = val;
    });
  }

  onSubmit() {
    const request: ExchangeApi = this.form.value;
    // TODO unsubscribe all
    this.store.dispatch(newApiAction({ newApi: request }));
  }
  removeKey(name: string): void {
    this.userId$.pipe(take(1)).subscribe((id) => {
      if (id != null) {
        this.store.dispatch(removeApiKeyAction({ name, userId: id }));
      }
    });
  }
}
