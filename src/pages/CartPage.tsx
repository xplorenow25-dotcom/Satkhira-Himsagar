import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Minus, Plus, Trash2 } from 'lucide-react';
import { BANGLADESH_DISTRICTS, PRODUCTS, STORE_CONFIG } from '../config/store';
import { useCart } from '../context/CartContext';
import { calculateDeliveryCharge, formatBDT } from '../utils/whatsapp';
import { ResilientImage } from '../components/ResilientImage';
import { PremiumBagIcon } from '../components/PremiumBagIcon';

interface CartPageProps {
  onNavigate: (path: string) => void;
}

export const CartPage: React.FC<CartPageProps> = ({ onNavigate }) => {
  const { items, removeItem, updateQuantity, changeVariant, subtotal } = useCart();
  const [previewDistrict, setPreviewDistrict] = useState('Dhaka');

  const estimatedDelivery = calculateDeliveryCharge(previewDistrict, subtotal);
  const estimatedTotal = subtotal + estimatedDelivery;

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20 text-center">
        <PremiumBagIcon className="w-14 h-14 text-[#76563C]/50 mx-auto mb-4" strokeWidth={1.35} />
        <h1 className="font-serif text-3xl sm:text-4xl text-[#252820] mb-3">
          Your Shopping Cart is Empty
        </h1>
        <p className="text-base text-[#252820]/75 max-w-md mx-auto mb-8">
          Explore our tree-ripened Satkhira mangoes and authentic Sundarban &amp; floral honey to begin your order.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate('/mangoes')}
            className="min-h-[46px] px-6 py-3 bg-[#183D2B] text-[#F8F6EF] text-sm font-medium rounded-full hover:bg-[#122F21] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183D2B]"
          >
            Explore Mangoes
          </button>
          <button
            type="button"
            onClick={() => onNavigate('/honey')}
            className="min-h-[46px] px-6 py-3 border border-[#183D2B]/30 text-[#183D2B] text-sm font-medium rounded-full hover:bg-[#EFECE1] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183D2B]"
          >
            Discover Honey
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-14">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-[#76563C] mb-1.5">
            Review Your Harvest
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#252820]">
            Shopping Cart
          </h1>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('/shop')}
          className="inline-flex items-center gap-2 min-h-[40px] px-1 text-sm font-medium text-[#183D2B] hover:text-[#76563C] transition-colors cursor-pointer self-start sm:self-auto rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183D2B]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Continue Shopping</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-[#FDFCF8] border border-[#E2DDD0] rounded-3xl divide-y divide-[#E2DDD0]">
            {items.map((item) => {
              const product = PRODUCTS.find((p) => p.id === item.productId);
              const variant = product?.variants.find((v) => v.id === item.variantId);
              if (!product || !variant) return null;

              const minQty = product.minOrderQuantity ?? 1;
              const stepQty = product.quantityStep ?? 1;
              const isAtMin = item.quantity <= minQty;

              return (
                <div
                  key={`${item.productId}-${item.variantId}`}
                  className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-5"
                >
                  <button
                    type="button"
                    onClick={() => onNavigate(`/product/${product.slug}`)}
                    className="w-full sm:w-28 aspect-[4/3] sm:aspect-square rounded-2xl overflow-hidden bg-[#EFECE1] shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183D2B]"
                  >
                    <ResilientImage
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-wider text-[#76563C] mb-0.5">
                          {product.category === 'mangoes' ? 'Mangoes' : 'Honey'}
                        </p>
                        <button
                          type="button"
                          onClick={() => onNavigate(`/product/${product.slug}`)}
                          className="font-serif text-xl text-[#252820] hover:text-[#183D2B] text-left cursor-pointer focus-visible:outline-none focus-visible:underline"
                        >
                          {product.name}
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.productId, item.variantId)}
                        aria-label={`Remove ${product.name}`}
                        className="w-10 h-10 -mr-2 inline-flex items-center justify-center rounded-full text-[#76563C] hover:text-red-700 hover:bg-red-50 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183D2B]"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex flex-wrap items-center gap-3">
                        {product.variants.length > 1 ? (
                          <select
                            value={item.variantId}
                            onChange={(e) =>
                              changeVariant(item.productId, item.variantId, e.target.value)
                            }
                            aria-label={`Select size for ${product.name}`}
                            className="min-h-[40px] text-sm bg-[#F8F6EF] border border-[#E2DDD0] rounded-full px-3.5 py-2 text-[#252820] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183D2B]/35 focus-visible:border-[#183D2B]"
                          >
                            {product.variants.map((v) => (
                              <option key={v.id} value={v.id}>
                                {v.label} — {formatBDT(v.price)}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <span className="text-xs text-[#76563C] tabular-nums">
                            {formatBDT(variant.price)}
                            {product.unitLabel ? ` / ${product.unitLabel}` : ''} · Min. {minQty}{' '}
                            {product.unitLabel || ''}
                          </span>
                        )}

                        <div className="inline-flex items-center border border-[#E2DDD0] rounded-full bg-[#F8F6EF] overflow-hidden">
                          <button
                            type="button"
                            disabled={isAtMin}
                            onClick={() =>
                              updateQuantity(
                                item.productId,
                                item.variantId,
                                item.quantity - stepQty
                              )
                            }
                            aria-label="Decrease quantity"
                            className="w-10 h-10 flex items-center justify-center text-[#252820] hover:bg-[#EFECE1] disabled:opacity-35 disabled:cursor-not-allowed cursor-pointer focus-visible:outline-none focus-visible:bg-[#EFECE1]"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-3 text-center text-sm font-medium tabular-nums whitespace-nowrap">
                            {item.quantity}
                            {product.unitLabel ? ` ${product.unitLabel}` : ''}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.productId,
                                item.variantId,
                                item.quantity + stepQty
                              )
                            }
                            aria-label="Increase quantity"
                            className="w-10 h-10 flex items-center justify-center text-[#252820] hover:bg-[#EFECE1] cursor-pointer focus-visible:outline-none focus-visible:bg-[#EFECE1]"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="block text-xs text-[#76563C] tabular-nums">
                          {formatBDT(variant.price)} × {item.quantity}
                          {product.unitLabel ? ` ${product.unitLabel}` : ''}
                        </span>
                        <span className="text-lg font-semibold text-[#183D2B] tabular-nums">
                          {formatBDT(variant.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {items.some((i) => {
            const p = PRODUCTS.find((pr) => pr.id === i.productId);
            return p?.minOrderQuantity && p.minOrderQuantity > 1;
          }) && (
            <p className="text-xs sm:text-sm text-[#76563C] bg-[#EFECE1]/70 border border-[#E2DDD0] rounded-2xl p-4 leading-relaxed">
              Fresh Satkhira mangoes are packed in minimum 10 KG orchard boxes (adjust quantities in 10 KG steps: 10, 20, 30, 40 KG).
            </p>
          )}
        </div>

        {/* Summary Card */}
        <aside className="lg:col-span-4 bg-[#FDFCF8] border border-[#E2DDD0] rounded-3xl p-6 space-y-5 lg:sticky lg:top-24">
          <h2 className="font-serif text-2xl text-[#252820]">Order Summary</h2>

          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-[#76563C]">Subtotal</span>
              <span className="font-semibold text-[#252820] tabular-nums">
                {formatBDT(subtotal)}
              </span>
            </div>

            <div className="pt-2 border-t border-[#E2DDD0]">
              <label
                htmlFor="estimate-district"
                className="block text-xs uppercase tracking-wider text-[#76563C] mb-1.5"
              >
                Estimate Delivery by District
              </label>
              <select
                id="estimate-district"
                value={previewDistrict}
                onChange={(e) => setPreviewDistrict(e.target.value)}
                className="w-full min-h-[42px] text-sm bg-[#F8F6EF] border border-[#E2DDD0] rounded-xl px-3.5 py-2 text-[#252820] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183D2B]/35 focus-visible:border-[#183D2B]"
              >
                {BANGLADESH_DISTRICTS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[#76563C]">Estimated Delivery</span>
              <span className="font-semibold text-[#252820] tabular-nums">
                {estimatedDelivery === 0 ? '৳0 (Free)' : formatBDT(estimatedDelivery)}
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-[#E2DDD0] flex items-center justify-between">
            <span className="font-medium text-[#252820]">Estimated Total</span>
            <span className="text-2xl font-semibold text-[#183D2B] tabular-nums">
              {formatBDT(estimatedTotal)}
            </span>
          </div>

          <p className="text-xs text-[#76563C] leading-relaxed">
            {STORE_CONFIG.delivery.note}
          </p>

          <button
            type="button"
            onClick={() => onNavigate('/checkout')}
            className="w-full min-h-[48px] inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#183D2B] text-[#F8F6EF] text-sm font-medium rounded-full hover:bg-[#122F21] active:scale-[0.99] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183D2B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FDFCF8]"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </aside>
      </div>
    </div>
  );
};
