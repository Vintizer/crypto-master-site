import { ExchangeApi } from './../../auth/types/newApiKey.interface';
export interface SubscribedOn {
  traderId: string;
  walletSize: string;
  apiName: string;
}
export interface CurrentUserInterface {
  email: string;
  id: string;
  isActivated: boolean;
  exchanges: ExchangeApi[];
  subscribedOn: SubscribedOn[];
  accessToken: string;
  isTrader: boolean;
  traderFee: number;
  // refreshToken: string;
}
