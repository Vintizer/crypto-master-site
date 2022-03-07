import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UtilsService {
  constructor(private http: HttpClient) {}
  getCoinPrice(coin: string, baseCoin: string): Observable<string> {
    const url = `https://api.binance.com/api/v3/ticker/price?symbol=${coin.toUpperCase()}${baseCoin.toUpperCase()}`;
    return this.http
      .get<{ symbol: string; price: string }>(url)
      .pipe(map((val) => val.price));
  }
}
