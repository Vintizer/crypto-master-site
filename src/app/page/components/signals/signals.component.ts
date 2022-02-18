import { Observable, take } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import {
  isTraderSelector,
  currentUserIdSelector,
  tradersListSelector,
} from '../../../auth/store/selectors';
import { makeTraderAction } from './../../../auth/store/actions/makeTrader.action';
import { getTradersAction } from './../../../auth/store/actions/getTraders.action';
import { CurrentUserInterface } from './../../../shared/types/currentUser.interface';
import { Trader } from './../../../shared/types/trader.interface';
import { subscribeTraderAction } from './../../../auth/store/actions/subscribeTrader.action';

@Component({
  selector: 'app-signals',
  templateUrl: './signals.component.html',
  styleUrls: ['./signals.component.scss'],
})
export class SignalsComponent implements OnInit {
  public isTrader$: Observable<boolean | null>;
  public tradersList$: Observable<Trader[]>;
  public userId$: Observable<string | null>;
  public panelOpenState: boolean;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.initializeForm();
    this.initializeValues();
    this.fetchData();
  }

  initializeForm() {
    // this.form = this.formBuilder.group({
    //   exchangeMarket: 'spot',
    //   apiName: [''],
    //   apiKey: [''],
    //   apiSecret: [''],
    //   exchange: 'Binance',
    // });
  }

  fetchData() {
    this.userId$.pipe(take(1)).subscribe((id) => {
      console.log('id: ', id);
      if (id != null) {
        this.store.dispatch(getTradersAction({ userId: id }));
      }
    });
  }

  initializeValues(): void {
    this.panelOpenState = true;
    this.isTrader$ = this.store.pipe(select(isTraderSelector));
    this.tradersList$ = this.store.pipe(select(tradersListSelector));
    this.userId$ = this.store.pipe(select(currentUserIdSelector));
  }

  makeUserAsTrader() {
    this.userId$.pipe(take(1)).subscribe((id) => {
      if (id != null) {
        this.store.dispatch(makeTraderAction({ userId: id }));
      }
    });
  }
  subscribeTrader(traderId: string, wallet: string) {
    this.userId$.pipe(take(1)).subscribe((id) => {
      console.log('id: ', id);
      if (id != null) {
        this.store.dispatch(
          subscribeTraderAction({ userId: id, traderId, walletSize: wallet })
        );
      }
    });
  }
}
