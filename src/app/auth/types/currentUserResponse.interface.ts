import { ExchangeApi } from './newApiKey.interface';
import { SubscribedOn } from './../../shared/types/currentUser.interface';
export interface CurrentUserResponseInterface {
  email: string;
  id: string;
  isActivated: boolean;
  isTrader: boolean;
  traderFee: number;
  exchanges: ExchangeApi[];
  subscribedOn: SubscribedOn[];
}
