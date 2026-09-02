import { Currency } from '../types';

export const CURRENCIES: Currency[] = [
  { code: 'USD', symbol: '$', rateToUSD: 1.0, name: 'US Dollar' },
  { code: 'EUR', symbol: '€', rateToUSD: 0.92, name: 'Euro' },
  { code: 'GBP', symbol: '£', rateToUSD: 0.79, name: 'British Pound' },
  { code: 'INR', symbol: '₹', rateToUSD: 83.5, name: 'Indian Rupee' },
  { code: 'JPY', symbol: '¥', rateToUSD: 154.0, name: 'Japanese Yen' },
  { code: 'AUD', symbol: 'A$', rateToUSD: 1.52, name: 'Australian Dollar' },
  { code: 'CAD', symbol: 'C$', rateToUSD: 1.38, name: 'Canadian Dollar' },
];

export function formatPrice(amountUSD: number, currency: Currency): string {
  const converted = amountUSD * currency.rateToUSD;
  if (currency.code === 'JPY' || currency.code === 'INR') {
    return `${currency.symbol}${Math.round(converted).toLocaleString()}`;
  }
  return `${currency.symbol}${Math.round(converted).toLocaleString()}`;
}
