import { Observable, take, map } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import {
  isTraderSelector,
  currentUserIdSelector,
  tradersListSelector,
  subscribedSelector,
} from '../../../auth/store/selectors';
import { makeTraderAction } from './../../../auth/store/actions/makeTrader.action';
import { getTradersAction } from './../../../auth/store/actions/getTraders.action';
import {
  CurrentUserInterface,
  SubscribedOn,
} from './../../../shared/types/currentUser.interface';
import {
  Trader,
  PreparedTrader,
} from './../../../shared/types/trader.interface';
import { subscribeTraderAction } from './../../../auth/store/actions/subscribeTrader.action';
import { switchMap } from 'rxjs/operators';
import {
  currentUserSelector,
  traderFeeSelector,
} from './../../../auth/store/selectors';
import { unSubscribeTraderAction } from './../../../auth/store/actions/unSubscribeTrader.action';
import { updateFeeAction } from './../../../auth/store/actions/updateFee.action';

@Component({
  selector: 'app-signals',
  templateUrl: './signals.component.html',
  styleUrls: ['./signals.component.scss'],
})
export class SignalsComponent implements OnInit {
  public isTrader$: Observable<boolean | null>;
  public tradersList$: Observable<Trader[]>;
  public preparedTrader$: Observable<PreparedTrader[]>;
  public subscribed$: Observable<SubscribedOn[]>;
  public traderFee$: Observable<number>;
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
      if (id != null) {
        this.store.dispatch(getTradersAction({ userId: id }));
      }
    });
    this.preparedTrader$ = this.subscribed$.pipe(
      switchMap((subscribed) =>
        this.tradersList$.pipe(
          map((traderList) => {
            const prepTraders: PreparedTrader[] = [];
            traderList.forEach((trd) => {
              const pTr: PreparedTrader = {
                name: trd.name,
                id: trd.id,
                isSubscribed: false,
                walletSize: null,
              };
              const subsTrader = subscribed.find(
                (sTr) => sTr.traderId === trd.id
              );
              if (subsTrader) {
                pTr.isSubscribed = true;
                pTr.walletSize = subsTrader.walletSize;
              }
              prepTraders.push(pTr);
            });
            return prepTraders;
          })
        )
      )
    );
  }

  initializeValues(): void {
    this.panelOpenState = true;
    this.isTrader$ = this.store.pipe(select(isTraderSelector));
    this.tradersList$ = this.store.pipe(select(tradersListSelector));
    this.subscribed$ = this.store.pipe(select(subscribedSelector));
    this.traderFee$ = this.store.pipe(select(traderFeeSelector));
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
    if (wallet != null && wallet !== '') {
      this.userId$.pipe(take(1)).subscribe((id) => {
        if (id != null) {
          this.store.dispatch(
            subscribeTraderAction({ userId: id, traderId, walletSize: wallet })
          );
        }
      });
    }
  }
  unSubscribeTrader(traderId: string) {
    this.userId$.pipe(take(1)).subscribe((id) => {
      if (id != null) {
        this.store.dispatch(unSubscribeTraderAction({ userId: id, traderId }));
      }
    });
  }
  updateFee(fee: string) {
    const feeVal = Number(fee);
    if (!isNaN(feeVal)) {
      this.userId$.pipe(take(1)).subscribe((id) => {
        this.traderFee$.pipe(take(1)).subscribe((feeStore) => {
          if (id != null && feeStore !== feeVal) {
            this.store.dispatch(updateFeeAction({ userId: id, fee: feeVal }));
          }
        });
      });
    }
  }
}
