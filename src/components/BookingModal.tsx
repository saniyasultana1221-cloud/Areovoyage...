import React, { useState } from 'react';
import { 
  X, Check, Plane, Calendar, ShieldCheck, Download, Sparkles, 
  User, Mail, CreditCard, Lock, ArrowRight, Copy, CheckCircle2, 
  AlertCircle, Loader2, HelpCircle, ShoppingCart
} from 'lucide-react';
import { Destination, PackageTour, Currency } from '../types';
import { formatPrice } from '../utils/currency';
import { triggerConfetti } from '../utils/confetti';
import { saveReservation, ReservationRecord } from '../services/supabaseService';
import { processStripePayment, PaymentCardDetails } from '../services/stripeService';
import { CosmicStarfield } from './CosmicStarfield';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency: Currency;
  initialDestination?: Destination | null;
  initialPackage?: PackageTour | null;
  customPlanData?: any | null;
  appliedPromoCode?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  currency,
  initialDestination,
  initialPackage,
  customPlanData,
  appliedPromoCode = 'VOYAGE20',
}) => {
  // Wizard Steps: 1. 'details' -> 2. 'payment' -> 3. 'confirmed'
  const [step, setStep] = useState<'details' | 'payment' | 'confirmed'>('details');

  // Step 1: Booking Preferences & Form Data
  const [formData, setFormData] = useState({
    fullName: 'Lady Eleanor Vance',
    email: 'eleanor.vance@executive.com',
    checkInDate: '2026-09-15',
    checkOutDate: '2026-09-22',
    guests: customPlanData?.travelers || 2,
    specialRequests: 'Upper-deck suite preference and private tarmac transfer.',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Step 2: Stripe Credit Card Details
  const [cardData, setCardData] = useState<PaymentCardDetails>({
    cardholderName: 'Lady Eleanor Vance',
    cardNumber: '4242 4242 4242 4242',
    expMonth: '12',
    expYear: '2028',
    cvc: '888',
  });

  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [confirmedReservation, setConfirmedReservation] = useState<ReservationRecord | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);

  // Promo Code State
  const [promoCodeInput, setPromoCodeInput] = useState(appliedPromoCode || 'VOYAGE20');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(appliedPromoCode || null);
  const [discountPercent, setDiscountPercent] = useState<number>(appliedPromoCode === 'VOYAGE20' ? 20 : 15);

  if (!isOpen) return null;

  // Compute Base & Final Prices
  const basePriceUSD = initialDestination
    ? initialDestination.pricePerDayUSD * initialDestination.durationDays * formData.guests
    : initialPackage
    ? initialPackage.salePriceUSD * formData.guests
    : customPlanData
    ? customPlanData.estimatedTotalUSD || 3200
    : 3200;

  const finalPriceUSD = appliedPromo
    ? Math.round(basePriceUSD * (1 - discountPercent / 100))
    : basePriceUSD;

  const destinationTitle = initialDestination
    ? initialDestination.name
    : initialPackage
    ? initialPackage.title
    : customPlanData
    ? `${customPlanData.destination?.name || 'Custom Expedition'} (${customPlanData.durationDays || 5} Days)`
    : 'AEROVOYAGE Bespoke Expedition';

  // Step 1: Real-time Form Validation
  const validateStep1 = (): boolean => {
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim()) errors.fullName = 'Full name is required';
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!formData.checkInDate) errors.checkInDate = 'Check-in date is required';
    if (!formData.checkOutDate) errors.checkOutDate = 'Check-out date is required';
    if (formData.checkInDate && formData.checkOutDate && formData.checkInDate >= formData.checkOutDate) {
      errors.checkOutDate = 'Check-out date must be after check-in date';
    }
    if (formData.guests < 1) errors.guests = 'At least 1 guest is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) {
      setStep('payment');
    }
  };

  // Step 2: Stripe Sandbox Payment Execution & Supabase DB Write
  const handleExecutePayment = async (paymentMethodType: 'card' | 'online_wallet' = 'card') => {
    setIsProcessingPayment(true);
    setPaymentError(null);

    try {
      // 1. Authorize Stripe Sandbox Payment
      const paymentResult = await processStripePayment(cardData, finalPriceUSD, currency.code);

      if (!paymentResult.success) {
        setPaymentError(paymentResult.error || 'Payment authorization was declined. Check test credentials.');
        setIsProcessingPayment(false);
        return;
      }

      // 2. Persist Reservation to Supabase `reservations` table (with local fallback)
      const reservationPayload: ReservationRecord = {
        user_email: formData.email,
        full_name: formData.fullName,
        destination: destinationTitle,
        dates: {
          checkIn: formData.checkInDate,
          checkOut: formData.checkOutDate,
        },
        guest_count: formData.guests,
        special_requests: formData.specialRequests,
        amount_paid: finalPriceUSD,
        currency: currency.code,
        stripe_payment_intent_id: paymentResult.paymentIntentId || 'pi_test_manual',
        status: 'paid',
      };

      const dbResult = await saveReservation(reservationPayload);
      setConfirmedReservation(dbResult.data);
      setStep('confirmed');
      triggerConfetti();
    } catch (err: any) {
      setPaymentError(err.message || 'An unexpected error occurred during database checkout.');
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const handleCopyReference = () => {
    if (confirmedReservation?.id) {
      navigator.clipboard.writeText(confirmedReservation.id);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2500);
    }
  };

  const handleDownloadReceipt = () => {
    if (!confirmedReservation) return;
    const content = `=====================================================
AEROVOYAGE SPATIAL EXPEDITIONS - OFFICIAL RECEIPT
=====================================================
Booking Reference ID: ${confirmedReservation.id}
Status: PAID (Stripe Test Intent: ${confirmedReservation.stripe_payment_intent_id})
Date Generated: ${new Date().toLocaleString()}

TRAVELER DETAILS:
-----------------------------------------------------
Primary Guest: ${confirmedReservation.full_name}
Contact Email: ${confirmedReservation.user_email}
Guest Count: ${confirmedReservation.guest_count} Traveler(s)

ITINERARY DETAILS:
-----------------------------------------------------
Destination: ${confirmedReservation.destination}
Check-in Date: ${confirmedReservation.dates.checkIn}
Check-out Date: ${confirmedReservation.dates.checkOut}
Special Requests: ${confirmedReservation.special_requests || 'Standard VIP Escort'}

FINANCIAL SUMMARY:
-----------------------------------------------------
Total Paid: ${formatPrice(confirmedReservation.amount_paid, currency)}
Payment Method: Stripe Elements (Test Sandbox)
Escrow Verification: 100% Protected
=====================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Aerovoyage_Receipt_${confirmedReservation.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 select-none">
      
      {/* ========================================================================= */}
      {/* MODERN GLASSMORPHIC MODAL WINDOW CONTAINER */}
      {/* ========================================================================= */}
      <div 
        className="relative space-cosmos-backdrop rounded-[36px] max-w-2xl w-full overflow-hidden shadow-2xl border border-white/20 animate-in fade-in zoom-in-95 duration-200 text-white"
        style={{
          boxShadow: '0 30px 90px rgba(0, 0, 0, 0.95), inset 0 1px 1.5px rgba(255, 255, 255, 0.35)',
        }}
      >
        {/* Background Starfield */}
        <CosmicStarfield density={50} speed={0.1} />
        
        {/* Top Header Bar */}
        <div className="p-6 sm:p-7 bg-black/40 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 shadow-md">
              <Plane className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-black text-xl font-display text-white">
                {step === 'details' && 'Reserve Bespoke Access'}
                {step === 'payment' && 'Stripe Test Checkout'}
                {step === 'confirmed' && 'Reservation Confirmed'}
              </h3>
              <span className="text-xs font-black uppercase tracking-wider text-amber-400">
                {step === 'details' && 'Step 1 of 2: Itinerary & Guest Info'}
                {step === 'payment' && 'Step 2 of 2: Secure Sandbox Payment'}
                {step === 'confirmed' && 'Database Record Verified'}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white border border-white/15 transition shadow-sm"
            title="Close Checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ========================================================================= */}
        {/* STEP 1: GUEST DETAILS & TRAVEL DATES FORM */}
        {/* ========================================================================= */}
        {step === 'details' && (
          <form onSubmit={handleProceedToPayment} className="p-6 sm:p-8 space-y-6">
            
            {/* Itinerary Banner */}
            <div className="p-5 rounded-2xl bg-white/[0.05] border border-white/15 flex items-center justify-between">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-amber-400 block">
                  Target Destination
                </span>
                <h4 className="font-black text-base text-white mt-0.5">{destinationTitle}</h4>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-300 block font-medium">Estimated Rate</span>
                <span className="font-mono font-black text-lg sm:text-xl text-amber-300">
                  {formatPrice(finalPriceUSD, currency)}
                </span>
              </div>
            </div>

            {/* Inputs Grid */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-xs sm:text-sm font-bold text-slate-200 flex items-center gap-1.5">
                    <User className="w-4 h-4 text-amber-400" />
                    <span>Full Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-white/10 text-white text-sm font-semibold px-4 py-3 rounded-2xl border border-white/15 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    placeholder="e.g. Lady Eleanor Vance"
                  />
                  {formErrors.fullName && (
                    <span className="text-xs text-rose-400">{formErrors.fullName}</span>
                  )}
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="text-xs sm:text-sm font-bold text-slate-200 flex items-center gap-1.5">
                    <Mail className="w-4 h-4 text-amber-400" />
                    <span>Email Address *</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/10 text-white text-sm font-semibold px-4 py-3 rounded-2xl border border-white/15 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    placeholder="e.g. traveler@luxury.com"
                  />
                  {formErrors.email && (
                    <span className="text-xs text-rose-400">{formErrors.email}</span>
                  )}
                </div>
              </div>

              {/* Travel Dates & Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                {/* Check-In */}
                <div className="space-y-1.5">
                  <label className="text-xs sm:text-sm font-bold text-slate-200 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-amber-400" />
                    <span>Check-In *</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.checkInDate}
                    onChange={(e) => setFormData({ ...formData, checkInDate: e.target.value })}
                    className="w-full bg-white/10 text-white text-sm font-semibold px-3 py-3 rounded-2xl border border-white/15 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>

                {/* Check-Out */}
                <div className="space-y-1.5">
                  <label className="text-xs sm:text-sm font-bold text-slate-200 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-amber-400" />
                    <span>Check-Out *</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.checkOutDate}
                    onChange={(e) => setFormData({ ...formData, checkOutDate: e.target.value })}
                    className="w-full bg-white/10 text-white text-sm font-semibold px-3 py-3 rounded-2xl border border-white/15 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                  {formErrors.checkOutDate && (
                    <span className="text-xs text-rose-400 block">{formErrors.checkOutDate}</span>
                  )}
                </div>

                {/* Guests */}
                <div className="space-y-1.5">
                  <label className="text-xs sm:text-sm font-bold text-slate-200">Guests</label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value, 10) })}
                    className="w-full bg-slate-900 text-white text-sm font-semibold px-3 py-3 rounded-2xl border border-white/15 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10].map((n) => (
                      <option key={n} value={n} className="bg-slate-900 text-white">
                        {n} {n === 1 ? 'Traveler' : 'Travelers'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Special Requests */}
              <div className="space-y-1.5">
                <label className="text-xs sm:text-sm font-bold text-slate-200">Special Requests / Concierge Preferences</label>
                <textarea
                  rows={2}
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  placeholder="Upper-deck suite preference, private tarmac transfer, dietary requirements..."
                  className="w-full bg-white/10 text-white text-sm font-normal px-4 py-2.5 rounded-2xl border border-white/15 focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
                />
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 flex items-center justify-between border-t border-white/10">
              <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Zero obligation hold • 100% Escrow</span>
              </div>

              <button
                type="submit"
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-xl transition transform hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
              >
                <span>Continue to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </form>
        )}

        {/* ========================================================================= */}
        {/* STEP 2: DUAL-COLUMN STRIPE PAYMENT CHECKOUT (MATCHING USER REFERENCE) */}
        {/* ========================================================================= */}
        {step === 'payment' && (
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Dual Column Layout Card */}
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/15 flex flex-col md:flex-row bg-[#111624]">
              
              {/* Left Column: Price Badge & Cart Icon (Inspired by User Mockup) */}
              <div 
                className="md:w-5/12 p-6 sm:p-8 flex flex-col justify-between items-center text-center relative overflow-hidden"
                style={{
                  background: 'linear-gradient(145deg, #4A1E35 0%, #2D1424 100%)',
                }}
              >
                {/* Shopping Cart Icon in White Pill */}
                <div className="w-16 h-16 rounded-3xl bg-white/95 text-[#4A1E35] flex items-center justify-center shadow-xl">
                  <ShoppingCart className="w-8 h-8" />
                </div>

                {/* Prominent Price Total */}
                <div className="my-6">
                  <div className="text-4xl sm:text-5xl font-black font-mono text-white tracking-tight">
                    {formatPrice(finalPriceUSD, currency)}
                  </div>
                  <span className="text-xs text-white/80 font-bold uppercase tracking-wider block mt-1.5">
                    Total Sandbox Charge
                  </span>
                </div>

                {/* Help Indicator */}
                <div className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center text-white/80 hover:text-white transition cursor-pointer" title="Stripe Sandbox Test Mode Active">
                  <HelpCircle className="w-5 h-5" />
                </div>
              </div>

              {/* Right Column: Credit Card Details Form */}
              <div className="md:w-7/12 p-6 sm:p-8 space-y-4 bg-[#141A29]">
                <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                  <h4 className="text-lg font-bold text-white font-display">Credit Card Details</h4>
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
                    TEST MODE
                  </span>
                </div>

                {/* Error Banner */}
                {paymentError && (
                  <div className="p-3.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs sm:text-sm flex items-start gap-2 animate-in fade-in">
                    <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                    <span>{paymentError}</span>
                  </div>
                )}

                {/* Cardholder Name */}
                <div className="space-y-1">
                  <div className="relative">
                    <input
                      type="text"
                      value={cardData.cardholderName}
                      onChange={(e) => setCardData({ ...cardData, cardholderName: e.target.value })}
                      placeholder="Name on Card"
                      className="w-full bg-white/[0.07] text-white text-sm font-semibold px-4 py-3 pr-10 rounded-xl border border-[#D9777F]/60 focus:border-amber-400 focus:outline-none"
                    />
                    <User className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
                  </div>
                </div>

                {/* Card Number */}
                <div className="space-y-1">
                  <div className="relative">
                    <input
                      type="text"
                      value={cardData.cardNumber}
                      onChange={(e) => setCardData({ ...cardData, cardNumber: e.target.value })}
                      placeholder="Card number"
                      className="w-full bg-white/[0.07] text-white text-sm font-mono font-bold px-4 py-3 pr-10 rounded-xl border border-[#D9777F]/60 focus:border-amber-400 focus:outline-none"
                    />
                    <CreditCard className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
                  </div>
                  <span className="text-xs text-slate-300 block">
                    Use <strong className="text-amber-400 font-mono">4242 4242 4242 4242</strong> for instant test approval.
                  </span>
                </div>

                {/* Expiration & CSV Grid */}
                <div className="grid grid-cols-2 gap-3">
                  
                  {/* MM / YYYY */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <select
                        value={cardData.expMonth}
                        onChange={(e) => setCardData({ ...cardData, expMonth: e.target.value })}
                        className="w-1/2 bg-slate-900 text-white text-sm font-semibold px-2.5 py-3 rounded-xl border border-[#D9777F]/60 focus:outline-none"
                      >
                        {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')).map((m) => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>
                      <span className="text-slate-400">/</span>
                      <select
                        value={cardData.expYear}
                        onChange={(e) => setCardData({ ...cardData, expYear: e.target.value })}
                        className="w-1/2 bg-slate-900 text-white text-sm font-semibold px-2.5 py-3 rounded-xl border border-[#D9777F]/60 focus:outline-none"
                      >
                        {[2026, 2027, 2028, 2029, 2030].map((y) => (
                          <option key={y} value={String(y)}>{y}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* CSV / CVC */}
                  <div className="space-y-1">
                    <input
                      type="text"
                      maxLength={4}
                      value={cardData.cvc}
                      onChange={(e) => setCardData({ ...cardData, cvc: e.target.value })}
                      placeholder="CSV / CVC"
                      className="w-full bg-white/[0.07] text-white text-sm font-mono font-bold px-4 py-3 rounded-xl border border-[#D9777F]/60 focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>
                <span className="text-xs text-slate-400 block italic">
                  3 or 4 digits found on the signature strip
                </span>

                {/* Primary Pay Button */}
                <button
                  type="button"
                  disabled={isProcessingPayment}
                  onClick={() => handleExecutePayment('card')}
                  className="w-full py-3.5 rounded-xl bg-[#D9777F] hover:bg-[#E0858D] text-white font-black text-sm shadow-lg transition flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {isProcessingPayment ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Authorizing with Stripe Sandbox...</span>
                    </>
                  ) : (
                    <span>Pay with Credit Card ({formatPrice(finalPriceUSD, currency)})</span>
                  )}
                </button>

                {/* Divider */}
                <div className="text-center text-slate-400 text-xs py-0.5 font-bold uppercase">or</div>

                {/* Secondary Online Payment Button */}
                <button
                  type="button"
                  disabled={isProcessingPayment}
                  onClick={() => handleExecutePayment('online_wallet')}
                  className="w-full py-3.5 rounded-xl bg-[#5E2B47] hover:bg-[#6D3253] text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  <Lock className="w-4 h-4 text-amber-300" />
                  <span>Proceed with Online Payment</span>
                </button>

              </div>
            </div>

            {/* Back Button */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setStep('details')}
                className="text-xs sm:text-sm text-slate-300 hover:text-white transition flex items-center gap-1 font-semibold"
              >
                ← Back to Guest Details
              </button>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Supabase Table `reservations` Ready</span>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 3: POST-BOOKING CONFIRMATION SCREEN */}
        {/* ========================================================================= */}
        {step === 'confirmed' && confirmedReservation && (
          <div className="p-6 sm:p-8 space-y-6 text-center animate-in fade-in zoom-in-95 duration-300">
            
            {/* Success Icon */}
            <div className="w-18 h-18 rounded-3xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 mx-auto shadow-[0_0_30px_rgba(16,185,129,0.3)]">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-2xl sm:text-3xl font-black text-white font-display">
                Access Reserved & Payment Verified!
              </h3>
              <p className="text-sm text-slate-200 font-normal">
                Your reservation has been securely committed to the database and authorized via Stripe.
              </p>
            </div>

            {/* Transaction Receipt Card */}
            <div className="p-6 rounded-3xl bg-white/[0.05] border border-white/15 text-left space-y-4">
              
              {/* Reference ID Strip */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3.5">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                    Booking Reference ID
                  </span>
                  <span className="font-mono font-black text-lg sm:text-xl text-amber-400">
                    {confirmedReservation.id}
                  </span>
                </div>

                <button
                  onClick={handleCopyReference}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs sm:text-sm font-semibold text-white transition cursor-pointer"
                >
                  {copiedRef ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedRef ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>

              {/* Summary Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 text-xs sm:text-sm">
                <div>
                  <span className="text-xs text-slate-400 block">Guest Name</span>
                  <strong className="text-white truncate block text-sm">{confirmedReservation.full_name}</strong>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">Destination</span>
                  <strong className="text-white truncate block text-sm">{confirmedReservation.destination}</strong>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">Payment Status</span>
                  <span className="font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20 inline-block text-xs">
                    ● PAID
                  </span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">Dates</span>
                  <span className="text-slate-200 font-medium">{confirmedReservation.dates.checkIn} to {confirmedReservation.dates.checkOut}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">Total Paid</span>
                  <span className="font-mono text-white font-bold text-sm">{formatPrice(confirmedReservation.amount_paid, currency)}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">Stripe Intent</span>
                  <span className="font-mono text-xs text-slate-400 truncate block">{confirmedReservation.stripe_payment_intent_id}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3.5 pt-2">
              <button
                onClick={handleDownloadReceipt}
                className="w-full sm:w-1/2 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4 text-amber-400" />
                <span>Download Boarding Receipt</span>
              </button>

              <button
                onClick={onClose}
                className="w-full sm:w-1/2 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-xl transition cursor-pointer"
              >
                Return to 3D Orbit
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
