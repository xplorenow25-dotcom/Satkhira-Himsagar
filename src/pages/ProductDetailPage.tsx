import React, { useEffect, useState } from 'react';
import { ArrowLeft, Check, MapPin, Minus, Package, Truck, Plus } from 'lucide-react';
import { PRODUCTS } from '../config/store';
import { useCart } from '../context/CartContext';
import { Product } from '../types';
import { formatBDT } from '../utils/whatsapp';
import { ProductCard } from '../components/ProductCard';
import { ResilientImage } from '../components/ResilientImage';
import { PremiumBagIcon } from '../components/PremiumBagIcon';

interface ProductDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
  onQuickView: (product: Product) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  slug,
  onNavigate,
  onQuickView,
}) => {
  const product = PRODUCTS.find((p) => p.slug === slug);
  const { addItem } = useCart();

  const [selectedVariantId, setSelectedVariantId] = useState(
    product?.category === 'mangoes'
      ? product?.variants[0]?.id || ''
      : product?.variants[1]?.id || product?.variants[0]?.id || ''
  );
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedVariantId(
        product.category === 'mangoes'
          ? product.variants[0]?.id || ''
          : product.variants[1]?.id || product.variants[0]?.id || ''
      );
      setQuantity(1);
      setJustAdded(false);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 text-center">
        <h1 className="font-serif text-3xl text-[#252820] mb-3">Product Not Found</h1>
        <p className="text-sm text-[#76563C] mb-6">
          This harvest item may have moved or is no longer listed.
        </p>
        <button
          type="button"
          onClick={() => onNavigate('/shop')}
          className="min-h-[44px] px-6 py-2.5 bg-[#183D2B] text-[#F8F6EF] text-sm font-medium rounded-full hover:bg-[#122F21] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183D2B]"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const selectedVariant =
    product.variants.find((v) => v.id === selectedVariantId) || product.variants[0];
  const isOutOfStock = product.availability === 'Out of Stock';

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id)
    .sort((a, b) => (a.category === product.category ? -1 : 1) - (b.category === product.category ? -1 : 1))
    .slice(0, 4);

  const handleAddToCart = () => {
    if (isOutOfStock || !selectedVariant) return;
    addItem(
      product.id,
      selectedVariant.id,
      product.variants.length === 1 ? undefined : quantity,
      true
    );
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1600);
  };

  const handleBuyNow = () => {
    if (isOutOfStock || !selectedVariant) return;
    addItem(
      product.id,
      selectedVariant.id,
      product.variants.length === 1 ? undefined : quantity,
      false
    );
    onNavigate('/checkout');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      <button
        type="button"
        onClick={() => onNavigate(product.category === 'mangoes' ? '/mangoes' : '/honey')}
        className="inline-flex items-center gap-2 min-h-[40px] px-1 text-sm text-[#76563C] hover:text-[#183D2B] transition-colors mb-6 cursor-pointer rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183D2B]"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to {product.category === 'mangoes' ? 'Mangoes' : 'Honey'}</span>
      </button>

      {/* Main Contiguous Product Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Gallery */}
        <div className="lg:col-span-7 space-y-6">
          <div className="aspect-[4/3] w-full rounded-3xl overflow-hidden ring-1 ring-inset ring-[#252820]/8 bg-[#EFECE1]">
            <ResilientImage
              src={product.image}
              alt={product.imageAlt}
              fallbackLabel={product.name}
              priority
              className="w-full h-full object-cover"
            />
          </div>

          <div className="grid grid-cols-3 divide-x divide-[#E2DDD0] border-y border-[#E2DDD0] py-4">
            <div className="pr-3 sm:pr-5">
              <p className="text-[11px] uppercase tracking-[0.1em] text-[#76563C] mb-1">
                Origin
              </p>
              <p className="text-xs sm:text-sm font-medium text-[#252820]">
                {product.origin}
              </p>
            </div>
            <div className="px-3 sm:px-5">
              <p className="text-[11px] uppercase tracking-[0.1em] text-[#76563C] mb-1">
                Harvest Window
              </p>
              <p className="text-xs sm:text-sm font-medium text-[#252820]">
                {product.harvestSeason}
              </p>
            </div>
            <div className="pl-3 sm:pl-5">
              <p className="text-[11px] uppercase tracking-[0.1em] text-[#76563C] mb-1">
                Purity
              </p>
              <p className="text-xs sm:text-sm font-medium text-[#252820]">
                {product.category === 'mangoes' ? 'Tree-Ripened Natural' : 'Raw & Unheated'}
              </p>
            </div>
          </div>
        </div>

        {/* Right Sticky Purchase Module */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 bg-[#FDFCF8] border border-[#E2DDD0] rounded-3xl p-6 sm:p-8 space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#76563C] mb-2">
              <span className="uppercase tracking-wider font-medium">
                {product.categoryLabel}
              </span>
              <span aria-hidden="true">·</span>
              <span className="text-[#183D2B] font-medium">{product.availability}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl tracking-[-0.015em] text-[#252820] mb-3">
              {product.name}
            </h1>

            <div className="flex flex-wrap items-baseline gap-2.5">
              <span className="text-3xl font-semibold text-[#183D2B] tabular-nums">
                {selectedVariant
                  ? formatBDT(
                      selectedVariant.price * (product.variants.length === 1 ? 1 : quantity)
                    )
                  : '—'}
              </span>
              {product.unitLabel && (
                <span className="text-sm text-[#76563C]">/ {product.unitLabel}</span>
              )}
              {selectedVariant?.compareAtPrice !== undefined &&
                selectedVariant.compareAtPrice > selectedVariant.price && (
                  <span className="text-lg text-[#76563C]/70 line-through tabular-nums">
                    {formatBDT(
                      selectedVariant.compareAtPrice *
                        (product.variants.length === 1 ? 1 : quantity)
                    )}
                  </span>
                )}
              {product.variants.length > 1 && quantity > 1 && selectedVariant && (
                <span className="text-xs text-[#76563C] tabular-nums">
                  ({formatBDT(selectedVariant.price)} each)
                </span>
              )}
            </div>
          </div>

          <p className="text-sm sm:text-base text-[#252820]/80 leading-relaxed">
            {product.description}
          </p>

          {/* Variant & Quantity Controls for Multi-Size Items (Honey) */}
          {product.variants.length > 1 && (
            <>
              <div>
                <span className="block text-xs uppercase tracking-wider text-[#76563C] mb-2.5">
                  Select Jar Size
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {product.variants.map((variant) => {
                    const active = variant.id === selectedVariant?.id;
                    return (
                      <button
                        key={variant.id}
                        type="button"
                        onClick={() => setSelectedVariantId(variant.id)}
                        className={`min-h-[54px] px-2.5 py-2 rounded-2xl border text-center transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183D2B] ${
                          active
                            ? 'bg-[#183D2B] text-[#F8F6EF] border-[#183D2B]'
                            : 'bg-[#F8F6EF] text-[#252820] border-[#E2DDD0] hover:border-[#76563C]'
                        }`}
                      >
                        <span className="block text-sm font-medium whitespace-nowrap">
                          {variant.label}
                        </span>
                        <span
                          className={`block text-xs mt-0.5 tabular-nums ${
                            active ? 'text-[#E6AC38]' : 'text-[#76563C]'
                          }`}
                        >
                          {formatBDT(variant.price)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs uppercase tracking-wider text-[#76563C]">
                  Quantity
                </span>
                <div className="inline-flex items-center border border-[#E2DDD0] rounded-full bg-[#F8F6EF] overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="w-11 h-11 flex items-center justify-center text-[#252820] hover:bg-[#EFECE1] transition-colors cursor-pointer focus-visible:outline-none focus-visible:bg-[#EFECE1]"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center text-sm font-semibold tabular-nums">
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
            </>
          )}

          {/* Primary Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              disabled={isOutOfStock}
              onClick={handleAddToCart}
              className={`min-h-[48px] inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium rounded-full border transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183D2B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FDFCF8] ${
                justAdded
                  ? 'bg-[#E6AC38] text-[#252820] border-[#E6AC38]'
                  : 'bg-[#F8F6EF] text-[#183D2B] border-[#183D2B]/40 hover:bg-[#EFECE1]'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Cart</span>
                </>
              ) : (
                <>
                  <PremiumBagIcon className="w-4 h-4" strokeWidth={1.85} />
                  <span>Add to Cart</span>
                </>
              )}
            </button>

            <button
              type="button"
              disabled={isOutOfStock}
              onClick={handleBuyNow}
              className="min-h-[48px] inline-flex items-center justify-center px-5 py-3 bg-[#183D2B] text-[#F8F6EF] text-sm font-medium rounded-full hover:bg-[#122F21] active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183D2B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FDFCF8]"
            >
              Buy Now
            </button>
          </div>

          {/* Origin, Packaging & Delivery Info */}
          <div className="pt-4 border-t border-[#E2DDD0] space-y-3.5 text-sm">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#76563C] shrink-0 mt-0.5" />
              <div>
                <span className="font-medium text-[#252820]">Origin: </span>
                <span className="text-[#252820]/75">{product.origin}</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Package className="w-4 h-4 text-[#76563C] shrink-0 mt-0.5" />
              <div>
                <span className="font-medium text-[#252820]">Packaging: </span>
                <span className="text-[#252820]/75">{product.packaging}</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Truck className="w-4 h-4 text-[#76563C] shrink-0 mt-0.5" />
              <div>
                <span className="font-medium text-[#252820]">Delivery: </span>
                <span className="text-[#252820]/75">{product.deliveryNote}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <section className="mt-20 pt-14 border-t border-[#E2DDD0]">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.14em] text-[#76563C] mb-1.5">
            From the Same Harvest
          </p>
          <h2 className="font-serif text-3xl text-[#252820]">You May Also Enjoy</h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-3.5 gap-y-8 sm:gap-x-6 sm:gap-y-10">
          {relatedProducts.map((item) => (
            <ProductCard
              key={item.id}
              product={item}
              onSelectProduct={(s) => onNavigate(`/product/${s}`)}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
