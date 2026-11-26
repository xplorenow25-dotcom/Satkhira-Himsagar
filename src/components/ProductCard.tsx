import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { formatBDT } from '../utils/whatsapp';
import { ResilientImage } from './ResilientImage';
import { PremiumBagIcon } from './PremiumBagIcon';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (slug: string) => void;
  onQuickView?: (product: Product) => void;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  priority = false,
}) => {
  const { addItem } = useCart();
  const [selectedVariantId, setSelectedVariantId] = useState(
    product.category === 'mangoes'
      ? product.variants[0]?.id
      : product.variants[1]?.id || product.variants[0]?.id
  );
  const [justAdded, setJustAdded] = useState(false);

  const selectedVariant =
    product.variants.find((v) => v.id === selectedVariantId) || product.variants[0];
  const isOutOfStock = product.availability === 'Out of Stock';
  const hasCompareAt =
    selectedVariant?.compareAtPrice !== undefined &&
    selectedVariant.compareAtPrice > selectedVariant.price;

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isOutOfStock || !selectedVariant) return;
    addItem(product.id, selectedVariant.id, undefined, true);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1400);
  };

  return (
    <article className="group flex flex-col">
      {/* Unboxed Editorial Product Frame */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#EFECE1] ring-1 ring-inset ring-[#252820]/8">
        <button
          type="button"
          onClick={() => onSelectProduct(product.slug)}
          aria-label={`View details for ${product.name}`}
          className="block w-full h-full text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183D2B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F8F6EF] rounded-2xl overflow-hidden"
        >
          <ResilientImage
            src={product.image}
            alt={product.imageAlt}
            fallbackLabel={product.name}
            priority={priority}
            className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          />
        </button>
      </div>

      {/* Product Typography & Controls */}
      <div className="flex flex-1 flex-col pt-3.5">
        <div className="flex items-center gap-1.5 text-[11px] tracking-[0.04em] text-[#76563C] mb-1">
          <span className="truncate">
            {product.bestseller
              ? 'Bestseller'
              : product.category === 'mangoes'
              ? 'Satkhira Orchard'
              : 'Raw Honey'}
          </span>
          <span aria-hidden="true">·</span>
          <span
            className={`shrink-0 font-medium ${
              isOutOfStock
                ? 'text-red-700'
                : product.availability === 'Limited Harvest'
                ? 'text-[#76563C]'
                : 'text-[#183D2B]'
            }`}
          >
            {product.availability}
          </span>
        </div>

        <h3 className="font-serif text-[17px] sm:text-[19px] tracking-[-0.01em] text-[#252820] leading-snug mb-1">
          <button
            type="button"
            onClick={() => onSelectProduct(product.slug)}
            className="text-left hover:text-[#183D2B] transition-colors cursor-pointer focus-visible:outline-none focus-visible:underline line-clamp-1"
          >
            {product.name}
          </button>
        </h3>

        <p className="hidden sm:line-clamp-2 text-xs text-[#252820]/68 leading-relaxed mb-3">
          {product.shortDescription}
        </p>

        <div className="mt-auto space-y-3 pt-1">
          {/* Segmented Jar Size Selector (for multi-variant products like Honey) */}
          {product.variants.length > 1 && (
            <div
              className="grid grid-cols-3 gap-1 p-0.5 bg-[#EFECE1]/90 rounded-full"
              role="group"
              aria-label={`Select size for ${product.name}`}
            >
              {product.variants.map((variant) => {
                const active = variant.id === selectedVariant?.id;
                return (
                  <button
                    key={variant.id}
                    type="button"
                    onClick={() => setSelectedVariantId(variant.id)}
                    className={`min-h-[34px] py-1 px-1.5 text-[11px] sm:text-xs font-medium rounded-full transition-all duration-150 whitespace-nowrap text-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183D2B] ${
                      active
                        ? 'bg-[#FDFCF8] text-[#183D2B] shadow-xs'
                        : 'text-[#252820]/70 hover:text-[#252820]'
                    }`}
                  >
                    {variant.label}
                  </button>
                );
              })}
            </div>
          )}

          {/* Price + Optional Crossed-Out Regular Price */}
          <div className="flex items-baseline justify-between gap-2">
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
              <div className="flex items-baseline gap-1">
                <span className="text-base sm:text-lg font-semibold text-[#183D2B] tabular-nums">
                  {selectedVariant ? formatBDT(selectedVariant.price) : '—'}
                </span>
                {product.unitLabel && (
                  <span className="text-xs text-[#76563C]">/ {product.unitLabel}</span>
                )}
              </div>

              {hasCompareAt && selectedVariant?.compareAtPrice && (
                <span className="text-xs sm:text-sm text-[#76563C]/70 line-through tabular-nums">
                  {formatBDT(selectedVariant.compareAtPrice)}
                </span>
              )}
            </div>
            {product.variants.length > 1 && (
              <span className="text-[11px] text-[#76563C] truncate">
                {selectedVariant?.label}
              </span>
            )}
          </div>

          {/* Pill Add to Cart CTA */}
          <button
            type="button"
            disabled={isOutOfStock}
            onClick={handleAdd}
            className={`w-full min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium rounded-full border transition-all duration-200 active:scale-[0.98] whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183D2B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F8F6EF] ${
              justAdded
                ? 'bg-[#E6AC38] text-[#252820] border-[#E6AC38]'
                : 'bg-transparent text-[#183D2B] border-[#183D2B]/35 hover:bg-[#183D2B] hover:text-[#F8F6EF] hover:border-[#183D2B]'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-4 h-4" strokeWidth={2} />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <PremiumBagIcon className="w-4 h-4" strokeWidth={1.8} />
                <span>{isOutOfStock ? 'Unavailable' : 'Add to Cart'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
