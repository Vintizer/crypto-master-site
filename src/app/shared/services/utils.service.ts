import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UtilsService {
  constructor(private http: HttpClient) {}
  getCoinPrice(
    coin: string,
    baseCoin: string,
    marketType: 'Spot' | 'Futures'
  ): Observable<string> {
    const symbol = `${coin.toUpperCase()}${baseCoin.toUpperCase()}`;
    const baseUrl =
      marketType === 'Spot'
        ? 'api.binance.com/api/v3'
        : 'fapi.binance.com/fapi/v1';
    const url = `https://${baseUrl}/ticker/price?symbol=${symbol}`;
    return this.http
      .get<{ symbol: string; price: string }>(url)
      .pipe(map((val) => val.price));
  }
}
