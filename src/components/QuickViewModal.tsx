import React, { useEffect, useState } from 'react';
import { ArrowRight, Minus, Plus, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { formatBDT } from '../utils/whatsapp';
import { ResilientImage } from './ResilientImage';
import { PremiumBagIcon } from './PremiumBagIcon';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onViewFullPage: (slug: string) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onViewFullPage,
}) => {
  const { addItem } = useCart();
  const [selectedVariantId, setSelectedVariantId] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product) {
      setSelectedVariantId(
        product.category === 'mangoes'
          ? product.variants[0]?.id || ''
          : product.variants[1]?.id || product.variants[0]?.id || ''
      );
      setQuantity(1);
    }
  }, [product]);

  useEffect(() => {
    if (!product) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [product, onClose]);

  const selectedVariant = product
    ? product.variants.find((v) => v.id === selectedVariantId) || product.variants[0]
    : undefined;
  const isOutOfStock = product?.availability === 'Out of Stock';

  const handleAddToCart = () => {
    if (!product || isOutOfStock || !selectedVariant) return;
    addItem(
      product.id,
      selectedVariant.id,
      product.variants.length === 1 ? undefined : quantity,
      true
    );
    onClose();
  };

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#252820]/55 backdrop-blur-[3px] p-4"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="quick-view-title"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 6 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-3xl bg-[#F8F6EF] border border-[#E2DDD0] rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close quick view"
              className="absolute top-4 right-4 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-[#F8F6EF]/90 backdrop-blur-md border border-[#E2DDD0] text-[#252820] hover:bg-[#183D2B] hover:text-[#F8F6EF] hover:border-[#183D2B] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183D2B]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="aspect-[4/3] md:aspect-auto md:h-full bg-[#EFECE1]">
                <ResilientImage
                  src={product.image}
                  alt={product.imageAlt}
                  fallbackLabel={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#76563C] mb-2">
                    <span className="uppercase tracking-wider font-medium">
                      {product.categoryLabel}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#183D2B] font-medium">{product.availability}</span>
                  </div>

                  <h2
                    id="quick-view-title"
                    className="font-serif text-2xl md:text-3xl text-[#252820] mb-3"
                  >
                    {product.name}
                  </h2>

                  <div className="flex flex-wrap items-baseline gap-2.5 mb-4">
                    <p className="text-2xl font-semibold text-[#183D2B] tabular-nums">
                      {selectedVariant
                        ? formatBDT(
                            selectedVariant.price * (product.variants.length === 1 ? 1 : quantity)
                          )
                        : '—'}
                      {product.unitLabel && (
                        <span className="text-sm font-normal text-[#76563C]">
                          {' '}
                          / {product.unitLabel}
                        </span>
                      )}
                    </p>
                    {selectedVariant?.compareAtPrice !== undefined &&
                      selectedVariant.compareAtPrice > selectedVariant.price && (
                        <span className="text-base text-[#76563C]/70 line-through tabular-nums">
                          {formatBDT(
                            selectedVariant.compareAtPrice *
                              (product.variants.length === 1 ? 1 : quantity)
                          )}
                        </span>
                      )}
                  </div>

                  <p className="text-sm text-[#252820]/80 leading-relaxed mb-5">
                    {product.description}
                  </p>

                  {product.variants.length > 1 && (
                    <div className="space-y-4 mb-6">
                      <div>
                        <span className="block text-xs uppercase tracking-wider text-[#76563C] mb-2">
                          Select Jar Size
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {product.variants.map((variant) => {
                            const active = variant.id === selectedVariant?.id;
                            return (
                              <button
                                key={variant.id}
                                type="button"
                                onClick={() => setSelectedVariantId(variant.id)}
                                className={`min-h-[38px] px-4 py-1.5 text-xs font-medium rounded-full border transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183D2B] ${
                                  active
                                    ? 'bg-[#183D2B] text-[#F8F6EF] border-[#183D2B]'
                                    : 'bg-[#FDFCF8] text-[#252820] border-[#E2DDD0] hover:border-[#76563C]'
                                }`}
                              >
                                {variant.label} — {formatBDT(variant.price)}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <span className="block text-xs uppercase tracking-wider text-[#76563C] mb-2">
                          Quantity
                        </span>
                        <div className="inline-flex items-center border border-[#E2DDD0] rounded-full bg-[#FDFCF8] overflow-hidden">
                          <button
                            type="button"
                            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                            aria-label="Decrease quantity"
                            className="w-11 h-11 flex items-center justify-center text-[#252820] hover:bg-[#EFECE1] transition-colors cursor-pointer focus-visible:outline-none focus-visible:bg-[#EFECE1]"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-10 text-center text-sm font-medium tabular-nums">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => setQuantity((q) => q + 1)}
                            aria-label="Increase quantity"
                            className="w-11 h-11 flex items-center justify-center text-[#252820] hover:bg-[#EFECE1] transition-colors cursor-pointer focus-visible:outline-none focus-visible:bg-[#EFECE1]"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-3 pt-4 border-t border-[#E2DDD0]">
                  <button
                    type="button"
                    disabled={isOutOfStock}
                    onClick={handleAddToCart}
                    className="w-full min-h-[46px] inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#183D2B] text-[#F8F6EF] text-sm font-medium rounded-full hover:bg-[#122F21] active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183D2B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F8F6EF]"
                  >
                    <PremiumBagIcon className="w-4 h-4" strokeWidth={1.85} />
                    <span>{isOutOfStock ? 'Currently Unavailable' : 'Add to Cart'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const slug = product.slug;
                      onClose();
                      onViewFullPage(slug);
                    }}
                    className="w-full min-h-[42px] inline-flex items-center justify-center gap-1.5 text-sm font-medium text-[#183D2B] hover:text-[#76563C] rounded-full transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183D2B]"
                  >
                    <span>View Full Product Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
