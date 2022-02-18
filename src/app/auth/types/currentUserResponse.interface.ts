import { ExchangeApi } from './newApiKey.interface';
export interface CurrentUserResponseInterface {
  email: string;
  id: string;
  isActivated: boolean;
  isTrader: boolean;
  exchanges: ExchangeApi[];
  subscribedOn: string;
}
