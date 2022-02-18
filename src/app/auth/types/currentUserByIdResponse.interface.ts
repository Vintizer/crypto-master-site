import { ExchangeApi } from './newApiKey.interface';
export interface CurrentUserByIdResponseInterface {
  _id: string;
  exchanges: ExchangeApi[];
  subscribedOn: string;
  isActivated: boolean;
  isTrader: boolean;
  email: string;
  id: string;
}
