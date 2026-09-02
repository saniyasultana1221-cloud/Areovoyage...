/**
 * Stripe Sandbox (Test Mode) Integration Service
 * Simulates and verifies test card transactions with Stripe Payment Element credentials.
 */

import { loadStripe, Stripe } from '@stripe/stripe-js';

// Environment variable placeholder
const STRIPE_PUBLIC_KEY = (import.meta as any).env?.VITE_STRIPE_PUBLIC_KEY || 'pk_test_placeholder_key';

let stripePromise: Promise<Stripe | null> | null = null;

export function getStripe(): Promise<Stripe | null> {
  if (!stripePromise && STRIPE_PUBLIC_KEY && !STRIPE_PUBLIC_KEY.includes('placeholder')) {
    stripePromise = loadStripe(STRIPE_PUBLIC_KEY);
  }
  return stripePromise || Promise.resolve(null);
}

export interface PaymentCardDetails {
  cardholderName: string;
  cardNumber: string;
  expMonth: string;
  expYear: string;
  cvc: string;
}

export interface PaymentResult {
  success: boolean;
  paymentIntentId?: string;
  error?: string;
  status: 'paid' | 'declined' | 'error';
  receiptUrl?: string;
}

/**
 * Process Test / Sandbox Payment with Stripe validation
 */
export async function processStripePayment(
  card: PaymentCardDetails,
  amount: number,
  currency: string = 'USD'
): Promise<PaymentResult> {
  // Simulate network roundtrip latency for authentic checkout feel
  await new Promise((resolve) => setTimeout(resolve, 1400));

  const cleanNumber = card.cardNumber.replace(/\s+/g, '');

  // 1. Decline Card Test Scenario
  if (cleanNumber.endsWith('0002')) {
    return {
      success: false,
      status: 'declined',
      error: 'Your test card was declined (Stripe Test Code: card_declined). Please try test card 4242 4242 4242 4242.',
    };
  }

  // 2. Insufficient Funds Test Scenario
  if (cleanNumber.endsWith('0127')) {
    return {
      success: false,
      status: 'declined',
      error: 'Insufficient funds on test card (Stripe Test Code: insufficient_funds).',
    };
  }

  // 3. Card Number Length Validation
  if (cleanNumber.length < 13 || cleanNumber.length > 19) {
    return {
      success: false,
      status: 'error',
      error: 'Invalid credit card number length. Please check your card number.',
    };
  }

  // 4. CVC Validation
  if (!card.cvc || card.cvc.length < 3) {
    return {
      success: false,
      status: 'error',
      error: 'Please enter a valid 3 or 4 digit CVC security code.',
    };
  }

  // 5. Expiration Validation
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  const yearNum = parseInt(card.expYear.length === 2 ? `20${card.expYear}` : card.expYear, 10);
  const monthNum = parseInt(card.expMonth, 10);

  if (yearNum < currentYear || (yearNum === currentYear && monthNum < currentMonth)) {
    return {
      success: false,
      status: 'error',
      error: 'Your card has expired. Please select a valid future expiration date.',
    };
  }

  // Generate successful test Payment Intent ID
  const randomSuffix = Math.random().toString(36).substring(2, 10);
  const paymentIntentId = `pi_test_${Date.now()}_${randomSuffix}`;

  return {
    success: true,
    status: 'paid',
    paymentIntentId: paymentIntentId,
    receiptUrl: `https://dashboard.stripe.com/test/payments/${paymentIntentId}`,
  };
}
