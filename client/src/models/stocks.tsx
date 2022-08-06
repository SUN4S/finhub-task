export interface StockDataModel {
  symbol: string;
  fromDate: number;
  toDate: number;
}

export interface GeneralStockFetchState {
  data: GeneralStockState;
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
