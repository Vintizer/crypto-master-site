import { ExchangeApi } from './../../auth/types/newApiKey.interface';
export interface CurrentUserInterface {
  email: string;
  id: string;
  isActivated: boolean;
  exchanges: ExchangeApi[];
  subscribedOn: string;
  accessToken: string;
  isTrader: boolean;
  // refreshToken: string;
}
