export interface StockDataModel {
  symbol: string;
  fromDate: number;
  toDate: number;
}

export interface GeneralStockFetchState {
  data: GeneralStockState;
  isLoading: boolean;
  isSuccess: boolean;
}

export interface GeneralStockState {
  country: string;
  currency: string;
  exchange: string;
  finnhubIndustry: string;
  ipo: string;
  logo: string;
  marketCapitalization: number;
  name: string;
  phone: string;
  shareOutstanding: number;
  ticker: string;
  weburl: string;
}

export interface HistoricStockFetchState {
  data: HistoricStockState;
  isLoading: boolean;
  isSuccess: boolean;
}

export interface HistoricStockState {
  c: Array<number>;
  h: Array<number>;
  l: Array<number>;
  o: Array<number>;
  s: string;
  t: Array<number>;
  v: Array<number>;
}
