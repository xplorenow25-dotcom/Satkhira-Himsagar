import React, { useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  Copy,
  ExternalLink,
} from 'lucide-react';
import { PremiumBagIcon } from '../components/PremiumBagIcon';
import { WhatsAppIcon } from '../components/SocialIcons';
import { BANGLADESH_DISTRICTS, PRODUCTS, STORE_CONFIG } from '../config/store';
import { useCart } from '../context/CartContext';
import { CheckoutFormData, PaymentMethod } from '../types';
import {
  buildWhatsAppChatUrl,
  buildWhatsAppOrderMessage,
  calculateDeliveryCharge,
  formatBDT,
  isValidBangladeshPhone,
} from '../utils/whatsapp';

interface CheckoutPageProps {
  onNavigate: (path: string) => void;
}

type CheckoutStage = 'form' | 'whatsapp-ready' | 'confirmed';

interface FormErrors {
  fullName?: string;
  mobileNumber?: string;
  district?: string;
  upazila?: string;
  fullAddress?: string;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onNavigate }) => {
  const { items, subtotal, clearCart } = useCart();

  const [form, setForm] = useState<CheckoutFormData>({
    fullName: '',
    mobileNumber: '',
    district: '',
    upazila: '',
    fullAddress: '',
    instructions: '',
    paymentMethod: 'Cash on Delivery',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [stage, setStage] = useState<CheckoutStage>('form');
  const [generatedMessage, setGeneratedMessage] = useState('');
  const [whatsappUrl, setWhatsappUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [confirmedSnapshot, setConfirmedSnapshot] = useState<{
    customerName: string;
    total: number;
  } | null>(null);

  const hiddenLaunchLinkRef = useRef<HTMLAnchorElement>(null);

  const deliveryCharge = useMemo(
    () => calculateDeliveryCharge(form.district, subtotal),
    [form.district, subtotal]
  );
  const total = subtotal + deliveryCharge;

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};
    if (!form.fullName.trim() || form.fullName.trim().length < 2) {
      nextErrors.fullName = 'Please enter your full name.';
    }
    if (!form.mobileNumber.trim()) {
      nextErrors.mobileNumber = 'Please enter your Bangladeshi mobile number.';
    } else if (!isValidBangladeshPhone(form.mobileNumber)) {
      nextErrors.mobileNumber =
        'Enter a valid 11-digit BD number (e.g., 01712345678).';
    }
    if (!form.district) {
      nextErrors.district = 'Please select your delivery district.';
    }
    if (!form.upazila.trim()) {
      nextErrors.upazila = 'Please enter your Upazila or Thana.';
    }
    if (!form.fullAddress.trim() || form.fullAddress.trim().length < 6) {
      nextErrors.fullAddress = 'Please enter your house, road, or village address.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || items.length === 0) return;

    const message = buildWhatsAppOrderMessage(form, items, subtotal, deliveryCharge);
    const url = buildWhatsAppChatUrl(message);

    setGeneratedMessage(message);
    setWhatsappUrl(url);
    setStage('whatsapp-ready');

    // Open WhatsApp using a standard anchor click (safe for iOS, Android, & iframe environments)
    window.setTimeout(() => {
      hiddenLaunchLinkRef.current?.click();
    }, 50);
  };

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(generatedMessage);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard may be restricted in some environments
    }
  };

  const handleConfirmSent = () => {
    setConfirmedSnapshot({
      customerName: form.fullName.trim(),
      total,
    });
    clearCart();
    setStage('confirmed');
  };

  // Post-confirmation completed state
  if (stage === 'confirmed' && confirmedSnapshot) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 md:py-24 text-center">
        <div className="bg-[#FDFCF8] border border-[#E2DDD0] rounded-2xl p-8 sm:p-12 space-y-5">
          <CheckCircle2 className="w-14 h-14 text-[#183D2B] mx-auto" strokeWidth={1.5} />
          <p className="text-xs uppercase tracking-[0.14em] text-[#76563C]">
            Order Sent via WhatsApp
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#252820]">
            Thank You, {confirmedSnapshot.customerName}.
          </h1>
          <p className="text-base text-[#252820]/80 leading-relaxed">
            Your cart has been cleared. We will review your WhatsApp message ({formatBDT(confirmedSnapshot.total)}) and reply shortly to confirm stock and delivery details.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('/')}
              className="min-h-[46px] px-6 py-3 bg-[#183D2B] text-[#F8F6EF] text-sm font-medium rounded-full hover:bg-[#122F21] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183D2B]"
            >
              Return Home
            </button>
            <button
              type="button"
              onClick={() => onNavigate('/shop')}
              className="min-h-[46px] px-6 py-3 border border-[#E2DDD0] text-[#252820] text-sm font-medium rounded-full hover:bg-[#EFECE1] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183D2B]"
            >
              Browse More Harvest
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Empty cart guard (only if user hasn't entered whatsapp-ready stage)
  if (items.length === 0 && stage === 'form') {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20 text-center">
        <PremiumBagIcon className="w-14 h-14 text-[#76563C]/50 mx-auto mb-4" strokeWidth={1.35} />
        <h1 className="font-serif text-3xl text-[#252820] mb-3">
          No Items Ready for Checkout
        </h1>
        <p className="text-base text-[#252820]/75 mb-7">
          Please add mangoes or honey to your cart before completing checkout.
        </p>
        <button
          type="button"
          onClick={() => onNavigate('/shop')}
          className="min-h-[46px] px-6 py-3 bg-[#183D2B] text-[#F8F6EF] text-sm font-medium rounded-full hover:bg-[#122F21] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183D2B]"
        >
          Shop Now
        </button>
      </div>
    );
  }

  // WhatsApp Ready Confirmation Stage (cart is NOT cleared yet!)
  if (stage === 'whatsapp-ready') {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="bg-[#FDFCF8] border border-[#E2DDD0] rounded-3xl p-6 sm:p-10 space-y-6">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.14em] text-[#76563C]">
              Final Step · Confirm on WhatsApp
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#252820]">
              Your WhatsApp order is ready.
            </h1>
            <p className="text-base text-[#252820]/85 leading-relaxed">
              Your WhatsApp order is ready. Please send the message to confirm your order. We will contact you shortly.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#F8F6EF] border border-[#E2DDD0]">
            <div className="flex items-center justify-between gap-3 mb-2">
              <span className="text-xs uppercase tracking-wider text-[#76563C] font-medium">
                Prepared WhatsApp Message
              </span>
              <button
                type="button"
                onClick={handleCopyMessage}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium text-[#183D2B] hover:bg-[#EFECE1] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183D2B]"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Text'}</span>
              </button>
            </div>
            <pre className="whitespace-pre-wrap font-sans text-xs sm:text-sm text-[#252820] leading-relaxed">
              {generatedMessage}
            </pre>
          </div>

          <div className="space-y-3 pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full min-h-[50px] inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#183D2B] text-[#F8F6EF] text-sm sm:text-base font-medium rounded-full hover:bg-[#122F21] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183D2B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FDFCF8]"
            >
              <WhatsAppIcon colored className="w-5 h-5" />
              <span>Open WhatsApp &amp; Send Order</span>
              <ExternalLink className="w-4 h-4 opacity-75" />
            </a>

            <div className="p-4 rounded-2xl bg-[#EFECE1]/70 border border-[#E2DDD0] space-y-3">
              <p className="text-xs sm:text-sm text-[#252820]/85 leading-relaxed">
                Your cart items are kept safe until you send the message. Once you have sent the WhatsApp message, tap below to finish and clear your cart:
              </p>
              <div className="flex flex-col sm:flex-row gap-2.5">
                <button
                  type="button"
                  onClick={handleConfirmSent}
                  className="flex-1 min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#E6AC38] text-[#252820] text-sm font-semibold rounded-full hover:bg-[#d89e2c] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183D2B]"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>I Have Sent My Order on WhatsApp</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStage('form')}
                  className="min-h-[44px] px-5 py-2.5 border border-[#E2DDD0] bg-[#FDFCF8] text-[#252820] text-sm font-medium rounded-full hover:bg-[#EFECE1] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183D2B]"
                >
                  Edit Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-14">
      {/* Hidden anchor used to launch WhatsApp cleanly */}
      <a
        ref={hiddenLaunchLinkRef}
        href={whatsappUrl || '#'}
        target="_blank"
        rel="noopener noreferrer"
        className="hidden"
        aria-hidden="true"
      >
        Launch WhatsApp
      </a>

      <button
        type="button"
        onClick={() => onNavigate('/cart')}
        className="inline-flex items-center gap-2 min-h-[40px] px-1 text-sm text-[#76563C] hover:text-[#183D2B] transition-colors mb-6 cursor-pointer rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183D2B]"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Cart</span>
      </button>

      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.14em] text-[#76563C] mb-1.5">
          Direct WhatsApp Order · Bangladesh
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#252820]">
          Checkout
        </h1>
      </div>

      <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Customer Details Form */}
        <div className="lg:col-span-7 bg-[#FDFCF8] border border-[#E2DDD0] rounded-3xl p-6 sm:p-8 space-y-6">
          <h2 className="font-serif text-2xl text-[#252820]">
            Delivery Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2">
              <label htmlFor="fullName" className="block text-sm font-medium text-[#252820] mb-1.5">
                Full Name <span className="text-red-700">*</span>
              </label>
              <input
                id="fullName"
                type="text"
                required
                value={form.fullName}
                onChange={(e) => {
                  setForm({ ...form, fullName: e.target.value });
                  if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                }}
                placeholder="e.g., Tanvir Ahmed"
                className="w-full min-h-[44px] px-3.5 py-2.5 text-sm bg-[#F8F6EF] border border-[#E2DDD0] rounded-xl text-[#252820] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183D2B]/35 focus-visible:border-[#183D2B]"
              />
              {errors.fullName && (
                <p className="mt-1 text-xs text-red-700">{errors.fullName}</p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="mobileNumber" className="block text-sm font-medium text-[#252820] mb-1.5">
                Mobile Number <span className="text-red-700">*</span>
              </label>
              <input
                id="mobileNumber"
                type="tel"
                required
                value={form.mobileNumber}
                onChange={(e) => {
                  setForm({ ...form, mobileNumber: e.target.value });
                  if (errors.mobileNumber) setErrors({ ...errors, mobileNumber: undefined });
                }}
                placeholder="e.g., 01712345678"
                className="w-full min-h-[44px] px-3.5 py-2.5 text-sm bg-[#F8F6EF] border border-[#E2DDD0] rounded-xl text-[#252820] tabular-nums focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183D2B]/35 focus-visible:border-[#183D2B]"
              />
              {errors.mobileNumber && (
                <p className="mt-1 text-xs text-red-700">{errors.mobileNumber}</p>
              )}
            </div>

            <div>
              <label htmlFor="district" className="block text-sm font-medium text-[#252820] mb-1.5">
                District <span className="text-red-700">*</span>
              </label>
              <select
                id="district"
                required
                value={form.district}
                onChange={(e) => {
                  setForm({ ...form, district: e.target.value });
                  if (errors.district) setErrors({ ...errors, district: undefined });
                }}
                className="w-full min-h-[44px] px-3.5 py-2.5 text-sm bg-[#F8F6EF] border border-[#E2DDD0] rounded-xl text-[#252820] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183D2B]/35 focus-visible:border-[#183D2B]"
              >
                <option value="">Select District</option>
                {BANGLADESH_DISTRICTS.map((dist) => (
                  <option key={dist} value={dist}>
                    {dist}
                  </option>
                ))}
              </select>
              {errors.district && (
                <p className="mt-1 text-xs text-red-700">{errors.district}</p>
              )}
            </div>

            <div>
              <label htmlFor="upazila" className="block text-sm font-medium text-[#252820] mb-1.5">
                Upazila / Thana <span className="text-red-700">*</span>
              </label>
              <input
                id="upazila"
                type="text"
                required
                value={form.upazila}
                onChange={(e) => {
                  setForm({ ...form, upazila: e.target.value });
                  if (errors.upazila) setErrors({ ...errors, upazila: undefined });
                }}
                placeholder="e.g., Satkhira Sadar, Dhanmondi"
                className="w-full min-h-[44px] px-3.5 py-2.5 text-sm bg-[#F8F6EF] border border-[#E2DDD0] rounded-xl text-[#252820] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183D2B]/35 focus-visible:border-[#183D2B]"
              />
              {errors.upazila && (
                <p className="mt-1 text-xs text-red-700">{errors.upazila}</p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="fullAddress" className="block text-sm font-medium text-[#252820] mb-1.5">
                Full Delivery Address <span className="text-red-700">*</span>
              </label>
              <textarea
                id="fullAddress"
                rows={3}
                required
                value={form.fullAddress}
                onChange={(e) => {
                  setForm({ ...form, fullAddress: e.target.value });
                  if (errors.fullAddress) setErrors({ ...errors, fullAddress: undefined });
                }}
                placeholder="House no., Road / Para / Village, Nearby Landmark"
                className="w-full px-3.5 py-2.5 text-sm bg-[#F8F6EF] border border-[#E2DDD0] rounded-xl text-[#252820] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183D2B]/35 focus-visible:border-[#183D2B]"
              />
              {errors.fullAddress && (
                <p className="mt-1 text-xs text-red-700">{errors.fullAddress}</p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="instructions" className="block text-sm font-medium text-[#252820] mb-1.5">
                Delivery Instructions <span className="text-[#76563C] font-normal">(Optional)</span>
              </label>
              <input
                id="instructions"
                type="text"
                value={form.instructions}
                onChange={(e) => setForm({ ...form, instructions: e.target.value })}
                placeholder="e.g., Call before arriving, prefer afternoon delivery"
                className="w-full min-h-[44px] px-3.5 py-2.5 text-sm bg-[#F8F6EF] border border-[#E2DDD0] rounded-xl text-[#252820] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183D2B]/35 focus-visible:border-[#183D2B]"
              />
            </div>
          </div>

          {/* Payment Method */}
          <div className="pt-4 border-t border-[#E2DDD0] space-y-3">
            <h3 className="font-serif text-xl text-[#252820]">Payment Method</h3>
            <div className="space-y-2.5">
              {(
                [
                  {
                    value: 'Cash on Delivery' as PaymentMethod,
                    title: 'Cash on Delivery',
                    desc: 'Pay in cash when your parcel arrives at your doorstep or courier point.',
                  },
                  ...(STORE_CONFIG.enableManualBkash
                    ? [
                        {
                          value: 'Manual bKash' as PaymentMethod,
                          title: 'Manual bKash Payment',
                          desc: STORE_CONFIG.bkashNote,
                        },
                      ]
                    : []),
                ]
              ).map((option) => {
                const selected = form.paymentMethod === option.value;
                return (
                  <label
                    key={option.value}
                    className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-colors ${
                      selected
                        ? 'bg-[#EFECE1]/75 border-[#183D2B]'
                        : 'bg-[#F8F6EF] border-[#E2DDD0] hover:border-[#76563C]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={option.value}
                      checked={selected}
                      onChange={() => setForm({ ...form, paymentMethod: option.value })}
                      className="mt-1 accent-[#183D2B]"
                    />
                    <div>
                      <span className="block text-sm font-medium text-[#252820]">
                        {option.title}
                      </span>
                      <span className="block text-xs text-[#76563C] mt-0.5 leading-relaxed">
                        {option.desc}
                      </span>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <aside className="lg:col-span-5 bg-[#FDFCF8] border border-[#E2DDD0] rounded-3xl p-6 sm:p-8 space-y-5 lg:sticky lg:top-24">
          <h2 className="font-serif text-2xl text-[#252820]">Order Summary</h2>

          <div className="divide-y divide-[#E2DDD0]">
            {items.map((item) => {
              const product = PRODUCTS.find((p) => p.id === item.productId);
              const variant = product?.variants.find((v) => v.id === item.variantId);
              if (!product || !variant) return null;

              return (
                <div
                  key={`${item.productId}-${item.variantId}`}
                  className="py-3.5 flex items-start justify-between gap-3 text-sm"
                >
                  <div>
                    <p className="font-medium text-[#252820]">{product.name}</p>
                    <p className="text-xs text-[#76563C] mt-0.5 tabular-nums">
                      {product.unitLabel === 'KG'
                        ? `${item.quantity} KG · ${formatBDT(variant.price)}/KG`
                        : `${variant.label} × ${item.quantity} (${formatBDT(variant.price)} each)`}
                    </p>
                  </div>
                  <span className="font-semibold text-[#252820] tabular-nums shrink-0">
                    {formatBDT(variant.price * item.quantity)}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-[#E2DDD0] space-y-2.5 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-[#76563C]">Subtotal</span>
              <span className="font-medium text-[#252820] tabular-nums">
                {formatBDT(subtotal)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#76563C]">
                Delivery Charge {form.district ? `(${form.district})` : '(Estimated)'}
              </span>
              <span className="font-medium text-[#252820] tabular-nums">
                {deliveryCharge === 0 ? '৳0 (Free)' : formatBDT(deliveryCharge)}
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-[#E2DDD0] flex items-center justify-between">
            <span className="text-base font-semibold text-[#252820]">Total</span>
            <span className="text-2xl font-semibold text-[#183D2B] tabular-nums">
              {formatBDT(total)}
            </span>
          </div>

          {items.some((i) => {
            const p = PRODUCTS.find((pr) => pr.id === i.productId);
            return p?.minOrderQuantity && p.minOrderQuantity > 1;
          }) && (
            <p className="text-xs text-[#76563C] bg-[#EFECE1]/70 border border-[#E2DDD0] rounded-xl p-3 leading-relaxed">
              Mango boxes ship in 10 KG minimum crates (10, 20, 30, 40 KG).
            </p>
          )}

          <p className="text-xs text-[#76563C] leading-relaxed">
            {STORE_CONFIG.delivery.note} No payment is collected on this website.
          </p>

          <button
            type="submit"
            className="w-full min-h-[52px] inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#183D2B] text-[#F8F6EF] text-sm font-semibold tracking-wide rounded-full hover:bg-[#122F21] transition-colors cursor-pointer"
          >
            <WhatsAppIcon colored className="w-5 h-5" />
            <span>PLACE ORDER ON WHATSAPP</span>
          </button>
        </aside>
      </form>
    </div>
  );
};
