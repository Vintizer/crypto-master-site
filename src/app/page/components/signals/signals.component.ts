import { Order, OrdersStat } from './../../../shared/types/ordersStat';
import { getTraderOrdersAction } from './../../../auth/store/actions/getTraderOrders.action';
import { getUserOrdersAction } from './../../../auth/store/actions/getUserOrders.action';
import { map, Observable, take, filter, of, Subscription } from 'rxjs';
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
  userOrdersSelector,
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
import {
  apiKeysSelector,
  traderOrdersSelector,
} from './../../../auth/store/selectors';
import { ExchangeApi } from './../../../auth/types/newApiKey.interface';
import { UtilsService } from './../../../shared/services/utils.service';

@Component({
  selector: 'app-signals',
  templateUrl: './signals.component.html',
  styleUrls: ['./signals.component.scss'],
})
export class SignalsComponent implements OnInit {
  public form: FormGroup;
  public isTrader$: Observable<boolean | null>;
  public tradersList$: Observable<Trader[]>;
  public traderOrders$: Observable<OrdersStat>;
  public traderOrders: OrdersStat;
  public userOrders$: Observable<OrdersStat>;
  public userOrders: OrdersStat;
  public preparedTrader$: Observable<PreparedTrader[]>;
  public subscribed$: Observable<SubscribedOn[]>;
  public traderFee$: Observable<number>;
  public price$: Observable<string>;
  public apiKeys$: Observable<ExchangeApi[]>;
  public userId$: Observable<string | null>;
  public panelOpenState: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private utilsService: UtilsService
  ) {
    this.traderOrders$ = of({ filledOrders: [], openOrders: [] });
  }

  ngOnInit(): void {
    this.initializeForm();
    this.initializeValues();
    this.fetchData();
    this.subscribe();
  }
  subscribe() {
    this.traderOrders$.subscribe((d) => (this.traderOrders = d));
    this.userOrders$.subscribe((d) => (this.userOrders = d));
  }
  initializeForm() {
    this.form = this.formBuilder.group({
      coin: ['', Validators.required],
      baseCoin: ['', Validators.required],
      buyPrice: ['', [Validators.required, Validators.pattern('^[0-9.]*$')]],
      tpPrice: ['', [Validators.required, Validators.pattern('^[0-9.]*$')]],
      slPrice: ['', [Validators.required, Validators.pattern('^[0-9.]*$')]],
      marketType: ['Spot'],
      signalType: ['Long', Validators.required],
    });
  }

  fetchData() {
    this.userId$.pipe(take(1)).subscribe((id) => {
      if (id != null) {
        this.store.dispatch(getTradersAction({ userId: id }));
        this.store.dispatch(getTraderOrdersAction({ traderId: id }));
        this.store.dispatch(getUserOrdersAction({ userId: id }));
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
    this.traderOrders$ = this.store.pipe(select(traderOrdersSelector));
    this.userOrders$ = this.store.pipe(select(userOrdersSelector));
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
  subscribeTrader(traderId: string, wallet: string, apiName: string) {
    if (wallet != null && wallet !== '') {
      this.userId$.pipe(take(1)).subscribe((id) => {
        if (id != null) {
          this.store.dispatch(
            subscribeTraderAction({
              userId: id,
              traderId,
              walletSize: wallet,
              apiName,
            })
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
    this.userId$.pipe(take(1)).subscribe((id) => {
      if (id != null) {
        this.store.dispatch(
          newSignalAction({
            signal: { ...this.form.value, traderId: id },
          })
        );
      }
    });
  }
  async onCoinChange() {
    const { coin, baseCoin } = this.form.value;
    if (coin != '' && baseCoin != '') {
      this.price$ = await this.utilsService.getCoinPrice(coin, baseCoin);
    } else {
      this.price$ = of('');
    }
  }
  async clickPrice() {
    this.price$.pipe(take(1)).subscribe((pr) => {
      this.form.patchValue({ buyPrice: pr });
    });
  }
  clickTpPrice(perc: number) {
    this.form.patchValue({
      tpPrice: Number(this.form.value.buyPrice) * (1 + perc / 100),
    });
  }
  clickSlPrice(perc: number) {
    this.form.patchValue({
      slPrice: Number(this.form.value.buyPrice) * (1 - perc / 100),
    });
  }
  get f() {
    return this.form.controls;
  }
  getApiName(traderId: string): Observable<string> {
    return this.subscribed$.pipe(
      take(1),
      map((subscribed) => {
        return (
          subscribed.find((subscribe) => subscribe.traderId === traderId)
            ?.apiName || ''
        );
      })
    );
  }
  isShowUserOrders(): Observable<boolean> {
    return this.userOrders$.pipe(
      take(1),
      map(
        (orders) =>
          orders.filledOrders.length > 0 || orders.openOrders.length > 0
      )
    );
  }
  isShowTraderOrders(): Observable<boolean> {
    return this.traderOrders$.pipe(
      take(1),
      map(
        (orders) =>
          orders.filledOrders.length > 0 || orders.openOrders.length > 0
      )
    );
  }
  countProfit(order: Order) {
    const { orderType, amount, priceExec, takePrice = 0 } = order;
    let val = 0;
    if (orderType === 'long') {
      val = (takePrice - priceExec) * amount;
    } else {
      val = (-takePrice + priceExec) * amount;
    }
    const perc = (val / priceExec / amount) * 100;
    return { val: val.toFixed(6), perc: perc.toFixed(2) };
  }
  setSignalType() {
    if (this.form.value.marketType === 'Spot') {
      this.form.patchValue({ signalType: 'Long' });
    }
  }
}
