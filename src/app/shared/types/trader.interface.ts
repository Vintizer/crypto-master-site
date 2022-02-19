export interface Trader {
  name: string;
  id: string;
  // percent: string
}

export interface PreparedTrader {
  name: string;
  isSubscribed: boolean;
  walletSize: string | null;
  id: string;
}
