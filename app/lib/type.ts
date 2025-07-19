export interface Currency {
  name: string;
  symbol: string;
}

export interface CountryBase {
  cca3: string;
  name: { common: string };
  flags: { svg: string };
  population: number;
  region: string;
  subregion?: string;
  capital?: string[];
  tld?: string[];
  formattedPopulation?: string;
}

export interface CountryExtra {
  cca3: string;
  currencies?: Record<string, Currency>;
  languages?: Record<string, string>;
  borders?: string[];
}

export interface Country extends CountryBase, CountryExtra {}