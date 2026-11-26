import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Leaf,
  MessageCircle,
  PackageCheck,
  Search,
  ShieldCheck,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { HERO_IMAGE, PRODUCTS, STORE_CONFIG } from '../config/store';
import { Product } from '../types';
import { formatBDT } from '../utils/whatsapp';
import { ProductCard } from '../components/ProductCard';
import { ProductGridSkeleton } from '../components/ProductCardSkeleton';
import { ResilientImage } from '../components/ResilientImage';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onQuickView: (product: Product) => void;
}

interface OfferSlide {
  id: string;
  kicker: string;
  headline: string;
  description: string;
  ctaLabel: string;
  ctaAction: 'mangoes' | 'honey' | 'shop';
  image: string;
  imageAlt: string;
}

const OFFER_SLIDES: OfferSlide[] = [
  {
    id: 'mango-harvest',
    kicker: 'Satkhira Orchard · Season Open',
    headline: 'From Our Garden to Your Home.',
    description:
      'Tree-ripened Himsagar, Langra, Amrapali, and Gobindobhog mangoes picked naturally without chemicals.',
    ctaLabel: 'Explore Mangoes',
    ctaAction: 'mangoes',
    image: HERO_IMAGE,
    imageAlt: 'Freshly harvested golden Satkhira mangoes in a bamboo basket',
  },
  {
    id: 'sundarban-honey',
    kicker: 'Raw & Unheated · Small Batch',
    headline: 'Authentic Sundarban & Floral Honey.',
    description:
      'Wild mangrove, mustard, litchi, and sunflower honeys sourced from trusted local hands in sealed glass jars.',
    ctaLabel: 'Discover Honey',
    ctaAction: 'honey',
    image: '/src/assets/images/honey_sundarban_1795593017730.jpg',
    imageAlt: 'Raw dark amber Sundarban honey in a glass jar with wooden dipper',
  },
  {
    id: 'nationwide-delivery',
    kicker: 'Nationwide Bangladesh Dispatch',
    headline: `Free Delivery Over ${formatBDT(STORE_CONFIG.delivery.freeDeliveryAbove)}.`,
    description:
      'Order directly via WhatsApp Business with Cash on Delivery and transparent courier tracking.',
    ctaLabel: 'Shop All Harvest',
    ctaAction: 'shop',
    image: '/src/assets/images/mango_langra_1795593015652.jpg',
    imageAlt: 'Sliced golden Satkhira Langra mangoes on ceramic plate',
  },
];

type CategoryFilterKey = 'all' | 'mangoes' | 'honey';

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onQuickView }) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState<CategoryFilterKey>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isCatalogLoading, setIsCatalogLoading] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % OFFER_SLIDES.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const minDelay = new Promise<void>((resolve) => {
      window.setTimeout(resolve, 260);
    });

    const initialPreload = Promise.race([
      Promise.all(
        PRODUCTS.slice(0, 4).map(
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

    Promise.all([minDelay, initialPreload]).then(() => {
      if (!cancelled) {
        setIsInitialLoading(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (isInitialLoading) return;
    setIsCatalogLoading(true);
    const timer = window.setTimeout(() => {
      setIsCatalogLoading(false);
    }, 200);
    return () => window.clearTimeout(timer);
  }, [activeFilter, sortBy, isInitialLoading]);

  const currentSlide = OFFER_SLIDES[slideIndex];

  const topSellingProducts = useMemo(
    () => PRODUCTS.filter((p) => p.bestseller),
    []
  );

  const catalogProducts = useMemo(() => {
    let list =
      activeFilter === 'all'
        ? PRODUCTS
        : PRODUCTS.filter((p) => p.category === activeFilter);

    const q = searchTerm.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'price-asc') {
      list = [...list].sort((a, b) => a.variants[0].price - b.variants[0].price);
    } else if (sortBy === 'price-desc') {
      list = [...list].sort((a, b) => b.variants[0].price - a.variants[0].price);
    }
    return list;
  }, [activeFilter, searchTerm, sortBy]);

  const handleSlideCta = (action: OfferSlide['ctaAction']) => {
    if (action === 'mangoes') {
      onNavigate('/mangoes');
    } else if (action === 'honey') {
      onNavigate('/honey');
    } else {
      onNavigate('/shop');
    }
  };

  const quickCategories = [
    {
      label: 'All Harvest',
      image: HERO_IMAGE,
      onClick: () => {
        setActiveFilter('all');
        document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
      },
      isActive: activeFilter === 'all',
    },
    {
      label: 'Himsagar',
      image: '/src/assets/images/mango_himsagar_1795593015552.jpg',
      onClick: () => onNavigate('/product/himsagar-mango'),
      isActive: false,
    },
    {
      label: 'Langra',
      image: '/src/assets/images/mango_langra_1795593015652.jpg',
      onClick: () => onNavigate('/product/langra-mango'),
      isActive: false,
    },
    {
      label: 'Amrapali',
      image: '/src/assets/images/mango_amrapali_1795593016883.jpg',
      onClick: () => onNavigate('/product/amrapali-mango'),
      isActive: false,
    },
    {
      label: 'Sundarban Honey',
      image: '/src/assets/images/honey_sundarban_1795593017730.jpg',
      onClick: () => onNavigate('/product/original-sundarban-honey'),
      isActive: false,
    },
    {
      label: 'Mustard Honey',
      image: '/src/assets/images/honey_mustard_1795593017999.jpg',
      onClick: () => onNavigate('/product/mustard-flower-honey'),
      isActive: false,
    },
    {
      label: 'Litchi Honey',
      image: '/src/assets/images/honey_litchi_1795593018729.jpg',
      onClick: () => onNavigate('/product/litchi-flower-honey'),
      isActive: false,
    },
  ];

  return (
    <div className="space-y-12 md:space-y-16">
      {/* 1. FULL-BLEED CINEMATIC OFFER BANNER */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 md:pt-6">
        <div className="relative rounded-3xl overflow-hidden bg-[#132E20] min-h-[290px] sm:min-h-[340px] lg:min-h-[370px] flex items-end sm:items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              initial={{ opacity: 0.35 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0.35 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <ResilientImage
                src={currentSlide.image}
                alt={currentSlide.imageAlt}
                priority
                className="w-full h-full object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#0D2318]/92 via-[#0D2318]/70 to-[#0D2318]/25 sm:bg-gradient-to-r sm:from-[#0D2318]/94 sm:via-[#0D2318]/72 sm:to-[#0D2318]/15"
              />
            </motion.div>
          </AnimatePresence>

          <div className="relative z-10 w-full p-6 pb-14 sm:p-10 lg:p-12 max-w-xl text-[#F8F6EF]">
            <p className="text-[11px] uppercase tracking-[0.16em] text-[#E6AC38] font-medium mb-2">
              {currentSlide.kicker}
            </p>
            <h1 className="font-serif text-[clamp(1.8rem,3.4vw,2.85rem)] leading-[1.08] tracking-[-0.015em] text-[#F8F6EF] text-balance mb-3">
              {currentSlide.headline}
            </h1>
            <p className="text-sm sm:text-base text-[#F8F6EF]/88 leading-relaxed mb-6">
              {currentSlide.description}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => handleSlideCta(currentSlide.ctaAction)}
                className="min-h-[44px] inline-flex items-center gap-2 px-5 py-2.5 bg-[#E6AC38] text-[#252820] text-sm font-semibold rounded-full hover:bg-[#d89e2c] active:scale-[0.98] transition-all whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E6AC38] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D2318]"
              >
                <span>{currentSlide.ctaLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('/shop')}
                className="min-h-[44px] inline-flex items-center px-5 py-2.5 bg-[#F8F6EF]/12 backdrop-blur-md border border-white/30 text-[#F8F6EF] text-sm font-medium rounded-full hover:bg-[#F8F6EF]/20 transition-all whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Shop All
              </button>
            </div>
          </div>

          {/* Frosted Glass Slide Controls */}
          <div className="absolute bottom-4 left-6 sm:left-10 lg:left-12 flex items-center gap-2 z-20">
            {OFFER_SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => setSlideIndex(idx)}
                aria-label={`View offer slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                  idx === slideIndex
                    ? 'w-7 bg-[#E6AC38]'
                    : 'w-2 bg-white/45 hover:bg-white/80'
                }`}
              />
            ))}
          </div>

          <div className="hidden sm:flex items-center gap-2 absolute bottom-4 right-5 z-20">
            <button
              type="button"
              onClick={() =>
                setSlideIndex((prev) => (prev - 1 + OFFER_SLIDES.length) % OFFER_SLIDES.length)
              }
              aria-label="Previous offer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white hover:bg-[#E6AC38] hover:text-[#252820] hover:border-[#E6AC38] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setSlideIndex((prev) => (prev + 1) % OFFER_SLIDES.length)}
              aria-label="Next offer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white hover:bg-[#E6AC38] hover:text-[#252820] hover:border-[#E6AC38] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. FEATURED CATEGORIES STRIP */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-baseline justify-between mb-5">
          <h2 className="font-serif text-2xl sm:text-3xl tracking-[-0.015em] text-[#252820]">
            Featured Categories
          </h2>
        </div>

        <div className="flex items-start justify-start md:justify-between gap-4 overflow-x-auto pb-2 snap-x">
          {quickCategories.map((cat) => (
            <button
              key={cat.label}
              type="button"
              onClick={cat.onClick}
              className="group snap-start flex flex-col items-center w-22 sm:w-26 shrink-0 text-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183D2B] rounded-2xl p-1"
            >
              <div
                className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-[#EFECE1] transition-all duration-200 ${
                  cat.isActive
                    ? 'ring-2 ring-[#183D2B] ring-offset-2 ring-offset-[#F8F6EF]'
                    : 'ring-1 ring-[#252820]/8 group-hover:ring-[#76563C]/40 group-hover:-translate-y-0.5'
                }`}
              >
                <ResilientImage
                  src={cat.image}
                  alt={cat.label}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <span className="mt-2.5 text-xs sm:text-[13px] font-medium text-[#252820] group-hover:text-[#183D2B] leading-tight">
                {cat.label}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* 3. TOP SELLING PRODUCTS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between gap-4 pb-4 mb-6 border-b border-[#E2DDD0]">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl tracking-[-0.015em] text-[#252820]">
              Top Selling Products
            </h2>
            <p className="text-xs sm:text-sm text-[#76563C] mt-0.5">
              Most requested mangoes and raw honey from Satkhira
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('/shop')}
            className="inline-flex items-center gap-1.5 min-h-[40px] px-1 text-xs sm:text-sm font-medium text-[#183D2B] hover:text-[#76563C] whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183D2B] rounded"
          >
            <span>See All</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {isInitialLoading ? (
          <ProductGridSkeleton count={4} variantMode="mixed" />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.22 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-x-3.5 gap-y-8 sm:gap-x-6 sm:gap-y-10"
          >
            {topSellingProducts.map((product, index) => (
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
      </section>

      {/* 4. ALL HARVEST CATALOG */}
      <section id="catalog-section" className="max-w-6xl mx-auto px-4 sm:px-6 scroll-mt-20">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 mb-7 border-b border-[#E2DDD0]">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl tracking-[-0.015em] text-[#252820]">
              All Harvest Products
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="inline-flex items-center gap-1 p-1 bg-[#EFECE1] rounded-full self-start">
              {(
                [
                  { id: 'all', label: 'All (8)' },
                  { id: 'mangoes', label: 'Mangoes (4)' },
                  { id: 'honey', label: 'Honey (4)' },
                ] as { id: CategoryFilterKey; label: string }[]
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveFilter(tab.id)}
                  className={`min-h-[36px] px-4 py-1.5 text-xs sm:text-sm font-medium rounded-full transition-all whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183D2B] ${
                    activeFilter === tab.id
                      ? 'bg-[#FDFCF8] text-[#183D2B] shadow-xs'
                      : 'text-[#252820]/75 hover:text-[#252820]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="w-4 h-4 text-[#76563C] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search items..."
                  aria-label="Search store products"
                  className="w-full sm:w-44 pl-9 pr-3 py-2 min-h-[42px] text-xs sm:text-sm bg-[#FDFCF8] border border-[#E2DDD0] rounded-full text-[#252820] placeholder:text-[#76563C]/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183D2B]/30 focus-visible:border-[#183D2B]"
                />
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                aria-label="Sort products"
                className="min-h-[42px] text-xs sm:text-sm bg-[#FDFCF8] border border-[#E2DDD0] rounded-full px-3.5 py-2 text-[#252820] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183D2B]/30 focus-visible:border-[#183D2B]"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low–High</option>
                <option value="price-desc">Price: High–Low</option>
              </select>
            </div>
          </div>
        </div>

        {isInitialLoading || isCatalogLoading ? (
          <ProductGridSkeleton
            count={activeFilter === 'all' ? 8 : 4}
            variantMode={
              activeFilter === 'honey'
                ? 'all'
                : activeFilter === 'mangoes'
                ? 'none'
                : 'mixed'
            }
          />
        ) : catalogProducts.length === 0 ? (
          <div className="py-12 text-center border border-[#E2DDD0] rounded-2xl">
            <p className="font-serif text-xl text-[#252820] mb-1.5">
              No products matched your search
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveFilter('all');
                setSearchTerm('');
              }}
              className="mt-2 min-h-[42px] px-5 py-2 bg-[#183D2B] text-[#F8F6EF] text-sm font-medium rounded-full cursor-pointer"
            >
              Show All Harvest
            </button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.22 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-x-3.5 gap-y-8 sm:gap-x-6 sm:gap-y-10"
          >
            {catalogProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={(slug) => onNavigate(`/product/${slug}`)}
                onQuickView={onQuickView}
              />
            ))}
          </motion.div>
        )}
      </section>

      {/* 5. EDITORIAL HAIRLINE ASSURANCE BAR (NO BOXITIS) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 py-8 border-y border-[#E2DDD0]">
          {[
            {
              icon: Leaf,
              title: 'Own Garden, Satkhira',
              desc: 'Hand-picked tree-mature mangoes',
            },
            {
              icon: ShieldCheck,
              title: 'No Carbide or Syrup',
              desc: 'Naturally ripened & raw unheated honey',
            },
            {
              icon: PackageCheck,
              title: 'Safe Parcel Packing',
              desc: 'Breathable crates & cushioned jars',
            },
            {
              icon: MessageCircle,
              title: 'WhatsApp Ordering',
              desc: 'Confirmed personally before dispatch',
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex items-start gap-3">
                <Icon className="w-5 h-5 text-[#183D2B] shrink-0 mt-0.5" strokeWidth={1.6} />
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-[#252820]">
                    {item.title}
                  </p>
                  <p className="text-[11px] sm:text-xs text-[#76563C] mt-0.5 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
