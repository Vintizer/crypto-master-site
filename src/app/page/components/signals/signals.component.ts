import { map, Observable, take } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';

import { getTradersAction } from '../../../auth/store/actions/getTraders.action';
import { makeTraderAction } from '../../../auth/store/actions/makeTrader.action';
import { subscribeTraderAction } from '../../../auth/store/actions/subscribeTrader.action';
import { unSubscribeTraderAction } from '../../../auth/store/actions/unSubscribeTrader.action';
import { updateFeeAction } from '../../../auth/store/actions/updateFee.action';
import {
  currentUserIdSelector,
  currentUserSelector,
  isTraderSelector,
  subscribedSelector,
  traderFeeSelector,
  tradersListSelector,
} from '../../../auth/store/selectors';
import {
  CurrentUserInterface,
  SubscribedOn,
} from '../../../shared/types/currentUser.interface';
import { PreparedTrader, Trader } from '../../../shared/types/trader.interface';
import { newSignalAction } from './../../../auth/store/actions/newSignal.action';
import { apiKeysSelector } from './../../../auth/store/selectors';
import { ExchangeApi } from './../../../auth/types/newApiKey.interface';

@Component({
  selector: 'app-signals',
  templateUrl: './signals.component.html',
  styleUrls: ['./signals.component.scss'],
})
export class SignalsComponent implements OnInit {
  public form: FormGroup;
  public isTrader$: Observable<boolean | null>;
  public tradersList$: Observable<Trader[]>;
  public preparedTrader$: Observable<PreparedTrader[]>;
  public subscribed$: Observable<SubscribedOn[]>;
  public traderFee$: Observable<number>;
  public apiKeys$: Observable<ExchangeApi[]>;
  public userId$: Observable<string | null>;
  public panelOpenState: boolean;
  constructor(private formBuilder: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.initializeForm();
    this.initializeValues();
    this.fetchData();
  }

  initializeForm() {
    this.form = this.formBuilder.group({
      inCoin: [''],
      baseCoin: [''],
      buyPrice: ['', Validators.pattern('^[0-9.,]*$')],
      tpPrice: [''],
      slPrice: [''],
    });
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
    this.apiKeys$ = this.store.pipe(select(apiKeysSelector));
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
  onSubmit() {
    console.log('this.form.value: ', this.form.value);
    // TODO add for subscribe api keys
    this.store.dispatch(newSignalAction({ signal: this.form.value }));
  }
}
