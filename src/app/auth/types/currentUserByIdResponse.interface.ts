import { ExchangeApi } from './newApiKey.interface';
import { SubscribedOn } from './../../shared/types/currentUser.interface';
export interface CurrentUserByIdResponseInterface {
  _id: string;
  exchanges: ExchangeApi[];
  subscribedOn: SubscribedOn[];
  isActivated: boolean;
  traderFee: number;
  isTrader: boolean;
  email: string;
  id: string;
}
