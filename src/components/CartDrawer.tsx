import React, { useEffect } from 'react';
import { ArrowRight, Minus, Plus, Trash2, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { PRODUCTS, STORE_CONFIG } from '../config/store';
import { useCart } from '../context/CartContext';
import { formatBDT } from '../utils/whatsapp';
import { ResilientImage } from './ResilientImage';
import { PremiumBagIcon } from './PremiumBagIcon';

interface CartDrawerProps {
  onNavigate: (route: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onNavigate }) => {
  const {
    items,
    isDrawerOpen,
    closeDrawer,
    removeItem,
    updateQuantity,
    changeVariant,
    subtotal,
    totalItems,
  } = useCart();

  useEffect(() => {
    if (!isDrawerOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDrawer();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isDrawerOpen, closeDrawer]);

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-50 flex justify-end bg-[#252820]/45 backdrop-blur-[3px]"
          onClick={closeDrawer}
          role="dialog"
          aria-modal="true"
          aria-label="Shopping Bag"
        >
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-md bg-[#F8F6EF]/95 backdrop-blur-xl h-full flex flex-col border-l border-[#E2DDD0] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2DDD0]">
              <div className="flex items-center gap-2.5">
                <PremiumBagIcon className="w-5 h-5 text-[#183D2B]" filled={totalItems > 0} strokeWidth={1.8} />
                <h2 className="font-serif text-xl text-[#252820]">
                  Your Bag <span className="text-sm font-sans text-[#76563C] tabular-nums">({totalItems})</span>
                </h2>
              </div>
              <button
                type="button"
                onClick={closeDrawer}
                aria-label="Close bag"
                className="w-10 h-10 flex items-center justify-center rounded-full text-[#252820] hover:bg-[#EFECE1] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183D2B]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <PremiumBagIcon className="w-12 h-12 text-[#76563C]/50 mb-4" strokeWidth={1.35} />
                  <p className="font-serif text-xl text-[#252820] mb-2">Your basket is empty</p>
                  <p className="text-sm text-[#252820]/70 max-w-xs mb-6">
                    Explore fresh seasonal mangoes from Satkhira and authentic raw floral honey.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      closeDrawer();
                      onNavigate('/shop');
                    }}
                    className="min-h-[44px] px-6 py-2.5 bg-[#183D2B] text-[#F8F6EF] text-sm font-medium rounded-full hover:bg-[#122F21] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183D2B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F8F6EF]"
                  >
                    Browse Harvest
                  </button>
                </div>
              ) : (
                <>
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
                        className="flex gap-4 pb-5 border-b border-[#E2DDD0] last:border-b-0"
                      >
                        <button
                          type="button"
                          onClick={() => {
                            closeDrawer();
                            onNavigate(`/product/${product.slug}`);
                          }}
                          className="w-20 h-20 rounded-xl overflow-hidden bg-[#EFECE1] shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183D2B]"
                        >
                          <ResilientImage
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </button>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                closeDrawer();
                                onNavigate(`/product/${product.slug}`);
                              }}
                              className="font-serif text-base text-[#252820] hover:text-[#183D2B] text-left truncate cursor-pointer focus-visible:outline-none focus-visible:underline"
                            >
                              {product.name}
                            </button>
                            <button
                              type="button"
                              onClick={() => removeItem(item.productId, item.variantId)}
                              aria-label={`Remove ${product.name}`}
                              className="w-9 h-9 -mt-1.5 -mr-1.5 inline-flex items-center justify-center rounded-full text-[#76563C] hover:text-red-700 hover:bg-red-50 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183D2B]"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="mt-1 flex items-center gap-2">
                            {product.variants.length > 1 ? (
                              <select
                                value={item.variantId}
                                onChange={(e) =>
                                  changeVariant(item.productId, item.variantId, e.target.value)
                                }
                                aria-label={`Change size for ${product.name}`}
                                className="text-xs bg-[#FDFCF8] border border-[#E2DDD0] rounded-full px-3 py-1.5 text-[#252820] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183D2B]/35 focus-visible:border-[#183D2B]"
                              >
                                {product.variants.map((v) => (
                                  <option key={v.id} value={v.id}>
                                    {v.label} ({formatBDT(v.price)})
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
                          </div>

                          <div className="mt-3 flex items-center justify-between">
                            <div className="inline-flex items-center border border-[#E2DDD0] rounded-full bg-[#FDFCF8] overflow-hidden">
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
                                className="w-9 h-9 flex items-center justify-center text-[#252820] hover:bg-[#EFECE1] disabled:opacity-35 disabled:cursor-not-allowed cursor-pointer focus-visible:outline-none focus-visible:bg-[#EFECE1]"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="px-2.5 text-center text-xs font-medium tabular-nums whitespace-nowrap">
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
                                className="w-9 h-9 flex items-center justify-center text-[#252820] hover:bg-[#EFECE1] cursor-pointer focus-visible:outline-none focus-visible:bg-[#EFECE1]"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <span className="text-sm font-semibold text-[#183D2B] tabular-nums">
                              {formatBDT(variant.price * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {items.some((i) => {
                    const p = PRODUCTS.find((pr) => pr.id === i.productId);
                    return p?.minOrderQuantity && p.minOrderQuantity > 1;
                  }) && (
                    <p className="text-xs text-[#76563C] bg-[#EFECE1]/70 border border-[#E2DDD0] rounded-2xl p-3.5 leading-relaxed">
                      Fresh Satkhira mangoes are packed in minimum 10 KG orchard boxes (adjust in 10 KG steps: 10, 20, 30, 40 KG).
                    </p>
                  )}
                </>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-[#E2DDD0] bg-[#FDFCF8] px-6 py-5 space-y-4">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#76563C]">Subtotal</span>
                    <span className="font-semibold text-[#252820] tabular-nums">
                      {formatBDT(subtotal)}
                    </span>
                  </div>
                  <p className="text-xs text-[#76563C]">
                    {STORE_CONFIG.delivery.note}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      closeDrawer();
                      onNavigate('/checkout');
                    }}
                    className="w-full min-h-[46px] inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#183D2B] text-[#F8F6EF] text-sm font-medium rounded-full hover:bg-[#122F21] active:scale-[0.99] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183D2B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FDFCF8]"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      closeDrawer();
                      onNavigate('/cart');
                    }}
                    className="w-full min-h-[42px] inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-[#183D2B] border border-[#E2DDD0] rounded-full hover:bg-[#EFECE1] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183D2B]"
                  >
                    View Full Cart
                  </button>
                </div>
              </div>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
