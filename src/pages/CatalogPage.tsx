import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { PRODUCTS } from '../config/store';
import { Product, ProductCategory } from '../types';
import { ProductCard } from '../components/ProductCard';
import { ProductGridSkeleton } from '../components/ProductCardSkeleton';

interface CatalogPageProps {
  initialFilter?: 'all' | ProductCategory;
  onNavigate: (path: string) => void;
  onQuickView: (product: Product) => void;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({
  initialFilter = 'all',
  onNavigate,
  onQuickView,
}) => {
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const pageMeta = {
    all: {
      kicker: 'MATI & MADHU Harvest',
      title: 'Shop All Products',
      subtitle:
        'Browse our complete collection of fresh seasonal mangoes from our Satkhira garden and raw authentic Bangladeshi honey.',
    },
    mangoes: {
      kicker: 'Own Family Orchard · Satkhira',
      title: 'Seasonal Satkhira Mangoes',
      subtitle:
        'Picked naturally mature on the tree without chemical ripening. Choose your preferred weight box below.',
    },
    honey: {
      kicker: 'Trusted Local Sources',
      title: 'Authentic Floral Honey',
      subtitle:
        'Raw, unheated wild Sundarban and seasonal blossom honeys packed cleanly in sealed glass jars.',
    },
  }[initialFilter];

  const filteredProducts = useMemo(() => {
    let list = PRODUCTS.filter((p) =>
      initialFilter === 'all' ? true : p.category === initialFilter
    );
    if (inStockOnly) {
      list = list.filter((p) => p.availability === 'In Stock');
    }
    if (sortBy === 'price-asc') {
      list = [...list].sort((a, b) => a.variants[0].price - b.variants[0].price);
    } else if (sortBy === 'price-desc') {
      list = [...list].sort((a, b) => b.variants[0].price - a.variants[0].price);
    }
    return list;
  }, [initialFilter, inStockOnly, sortBy]);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);

    const minDelay = new Promise<void>((resolve) => {
      window.setTimeout(resolve, 260);
    });

    const imageLoads = Promise.race([
      Promise.all(
        filteredProducts.map(
          (product) =>
            new Promise<void>((resolve) => {
              const img = new Image();
              img.src = product.image;
              if (img.complete) {
                resolve();
              } else {
                img.onload = () => resolve();
                img.onerror = () => resolve();
              }
            })
        )
      ),
      new Promise<void>((resolve) => {
        window.setTimeout(resolve, 480);
      }),
    ]);

    Promise.all([minDelay, imageLoads]).then(() => {
      if (!cancelled) {
        setIsLoading(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [initialFilter, inStockOnly, sortBy, filteredProducts]);

  const skeletonVariantMode =
    initialFilter === 'honey' ? 'all' : initialFilter === 'mangoes' ? 'none' : 'mixed';
  const skeletonCount = initialFilter === 'all' ? 8 : 4;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-14">
      <div className="max-w-2xl mb-10">
        <p className="text-xs uppercase tracking-[0.14em] text-[#76563C] mb-2">
          {pageMeta.kicker}
        </p>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#252820] mb-3">
          {pageMeta.title}
        </h1>
        <p className="text-base text-[#252820]/80 leading-relaxed">
          {pageMeta.subtitle}
        </p>
      </div>

      {/* Filter & Sort Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#E2DDD0]">
        <div className="inline-flex items-center gap-1 p-1 bg-[#EFECE1] rounded-full self-start">
          {[
            { label: 'All Products', path: '/shop', key: 'all' },
            { label: 'Mangoes', path: '/mangoes', key: 'mangoes' },
            { label: 'Honey', path: '/honey', key: 'honey' },
          ].map((tab) => {
            const active = initialFilter === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => onNavigate(tab.path)}
                className={`min-h-[36px] px-4 py-1.5 text-xs sm:text-sm font-medium rounded-full transition-all whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183D2B] ${
                  active
                    ? 'bg-[#FDFCF8] text-[#183D2B] shadow-xs'
                    : 'text-[#252820]/75 hover:text-[#252820]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <label className="inline-flex items-center gap-2 text-sm text-[#252820] cursor-pointer">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="w-4 h-4 accent-[#183D2B] rounded"
            />
            <span>In stock only</span>
          </label>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            aria-label="Sort products"
            className="min-h-[42px] text-sm bg-[#FDFCF8] border border-[#E2DDD0] rounded-full px-4 py-2 text-[#252820] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183D2B]/30 focus-visible:border-[#183D2B]"
          >
            <option value="featured">Sort: Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <ProductGridSkeleton
          count={filteredProducts.length > 0 ? filteredProducts.length : skeletonCount}
          variantMode={skeletonVariantMode}
        />
      ) : filteredProducts.length === 0 ? (
        <div className="py-16 text-center bg-[#FDFCF8] border border-[#E2DDD0] rounded-2xl">
          <p className="font-serif text-2xl text-[#252820] mb-2">No matching items</p>
          <p className="text-sm text-[#76563C] mb-5">
            Try clearing your availability filter to see all seasonal harvests.
          </p>
          <button
            type="button"
            onClick={() => setInStockOnly(false)}
            className="min-h-[42px] px-5 py-2 bg-[#183D2B] text-[#F8F6EF] text-sm font-medium rounded-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183D2B]"
          >
            Show All Items
          </button>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.22 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-x-3.5 gap-y-8 sm:gap-x-6 sm:gap-y-10"
        >
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              priority={index < 4}
              onSelectProduct={(slug) => onNavigate(`/product/${slug}`)}
              onQuickView={onQuickView}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
};
