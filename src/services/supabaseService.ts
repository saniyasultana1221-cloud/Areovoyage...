/**
 * Supabase Database Persistence Service for AEROVOYAGE
 * Table: `reservations`
 * Fields: id, user_email, full_name, destination, dates, guest_count,
 *         special_requests, amount_paid, currency, stripe_payment_intent_id,
 *         status, created_at
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';

export interface ReservationRecord {
  id?: string;
  user_email: string;
  full_name: string;
  destination: string;
  dates: {
    checkIn: string;
    checkOut: string;
  };
  guest_count: number;
  special_requests?: string;
  amount_paid: number;
  currency: string;
  stripe_payment_intent_id: string;
  status: 'paid' | 'pending' | 'canceled';
  created_at?: string;
}

// Environment variable placeholders
const SUPABASE_URL = (import.meta as any).env?.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const SUPABASE_ANON_KEY = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key';

let supabaseClient: SupabaseClient | null = null;

function getSupabaseClient(): SupabaseClient | null {
  if (
    SUPABASE_URL &&
    SUPABASE_ANON_KEY &&
    !SUPABASE_URL.includes('placeholder') &&
    !SUPABASE_ANON_KEY.includes('placeholder')
  ) {
    if (!supabaseClient) {
      supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }
    return supabaseClient;
  }
  return null;
}

/**
 * Save reservation record to Supabase with local fallback persistence
 */
export async function saveReservation(data: ReservationRecord): Promise<{ success: boolean; data: ReservationRecord; id: string; source: 'supabase' | 'local_fallback' }> {
  const generatedId = `AV-${Date.now().toString().slice(-6)}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
  const now = new Date().toISOString();

  const record: ReservationRecord = {
    ...data,
    id: data.id || generatedId,
    created_at: data.created_at || now,
    status: data.status || 'paid',
  };

  const client = getSupabaseClient();

  if (client) {
    try {
      const { data: dbData, error } = await client
        .from('reservations')
        .insert([
          {
            id: record.id,
            user_email: record.user_email,
            full_name: record.full_name,
            destination: record.destination,
            dates: record.dates,
            guest_count: record.guest_count,
            special_requests: record.special_requests,
            amount_paid: record.amount_paid,
            currency: record.currency,
            stripe_payment_intent_id: record.stripe_payment_intent_id,
            status: record.status,
            created_at: record.created_at,
          },
        ])
        .select()
        .single();

      if (error) {
        console.warn('Supabase insert warning, saving to local fallback storage:', error.message);
      } else if (dbData) {
        return { success: true, data: dbData as ReservationRecord, id: record.id || generatedId, source: 'supabase' };
      }
    } catch (err) {
      console.warn('Supabase connection error, defaulting to local fallback storage:', err);
    }
  }

  // Graceful Local Fallback Storage (works 100% out of the box without setup)
  try {
    const existing = JSON.parse(localStorage.getItem('aerovoyage_reservations') || '[]');
    existing.unshift(record);
    localStorage.setItem('aerovoyage_reservations', JSON.stringify(existing));
  } catch (err) {
    console.error('LocalStorage write error:', err);
  }

  // Simulate network roundtrip latency
  await new Promise((resolve) => setTimeout(resolve, 600));

  return {
    success: true,
    data: record,
    id: record.id!,
    source: 'local_fallback',
  };
}

/**
 * Retrieve recent reservations for the user
 */
export async function getRecentReservations(userEmail?: string): Promise<ReservationRecord[]> {
  const client = getSupabaseClient();
  if (client && userEmail) {
    try {
      const { data, error } = await client
        .from('reservations')
        .select('*')
        .eq('user_email', userEmail)
        .order('created_at', { ascending: false });
      if (!error && data) return data as ReservationRecord[];
    } catch (e) {
      console.warn('Supabase query error:', e);
    }
  }

  try {
    const local = JSON.parse(localStorage.getItem('aerovoyage_reservations') || '[]');
    if (userEmail) {
      return local.filter((r: ReservationRecord) => r.user_email.toLowerCase() === userEmail.toLowerCase());
    }
    return local;
  } catch {
    return [];
  }
}
