import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Search, X } from 'lucide-react';
import { PRODUCTS, STORE_CONFIG } from '../config/store';
import { useCart } from '../context/CartContext';
import { formatBDT } from '../utils/whatsapp';
import { ResilientImage } from './ResilientImage';
import { PremiumBagIcon } from './PremiumBagIcon';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  searchOpen: boolean;
  onSetSearchOpen: (open: boolean) => void;
}

const PRIMARY_NAV = [
  { label: 'Home', path: '/' },
  { label: 'Shop', path: '/shop' },
  { label: 'Mangoes', path: '/mangoes' },
  { label: 'Honey', path: '/honey' },
  { label: 'Our Story', path: '/about' },
];

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  onNavigate,
  searchOpen,
  onSetSearchOpen,
}) => {
  const { totalItems, openDrawer } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) {
      window.setTimeout(() => searchInputRef.current?.focus(), 60);
    }
  }, [searchOpen]);

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const handleNav = (path: string) => {
    onSetSearchOpen(false);
    onNavigate(path);
  };

  return (
    <>
      <div className="bg-[#183D2B] text-[#F8F6EF]/95 text-[11px] sm:text-xs tracking-[0.04em] py-2 px-4 text-center">
        {STORE_CONFIG.announcementText}
      </div>

      <header className="sticky top-0 z-40 bg-[#F8F6EF]/88 backdrop-blur-xl backdrop-saturate-150 border-b border-[#E2DDD0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-4 md:gap-8">
          {/* Zone 1: Brand Wordmark */}
          <button
            type="button"
            onClick={() => handleNav('/')}
            className="font-serif text-xl sm:text-2xl tracking-[-0.02em] text-[#183D2B] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183D2B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F8F6EF] rounded-md px-1 -ml-1"
          >
            {STORE_CONFIG.brandName}
          </button>

          {/* Zone 2: Primary Navigation (Desktop) */}
          <nav
            aria-label="Main navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-[#252820]"
          >
            {PRIMARY_NAV.map((item) => {
              const isActive =
                item.path === '/'
                  ? currentPath === '/'
                  : currentPath.startsWith(item.path);
              return (
                <button
                  key={item.path}
                  type="button"
                  onClick={() => handleNav(item.path)}
                  className={`py-1.5 border-b-2 transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183D2B] focus-visible:ring-offset-4 focus-visible:ring-offset-[#F8F6EF] rounded-sm ${
                    isActive
                      ? 'border-[#183D2B] text-[#183D2B]'
                      : 'border-transparent text-[#252820]/75 hover:text-[#183D2B] hover:border-[#E6AC38]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Search & Premium Checkout Bag Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => onSetSearchOpen(!searchOpen)}
              aria-label={searchOpen ? 'Close search' : 'Search products'}
              aria-expanded={searchOpen}
              className="w-11 h-11 inline-flex items-center justify-center rounded-full text-[#252820] hover:bg-[#EFECE1] transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183D2B]"
            >
              {searchOpen ? (
                <X className="w-[18px] h-[18px]" strokeWidth={1.85} />
              ) : (
                <Search className="w-[18px] h-[18px]" strokeWidth={1.85} />
              )}
            </button>

            <button
              type="button"
              onClick={openDrawer}
              aria-label={`Open shopping bag with ${totalItems} items`}
              className="inline-flex items-center gap-2 min-h-[42px] px-3.5 py-2 rounded-full bg-[#183D2B] text-[#F8F6EF] text-sm font-medium hover:bg-[#122F21] active:scale-[0.98] transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183D2B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F8F6EF]"
            >
              <PremiumBagIcon
                className="w-[18px] h-[18px]"
                filled={totalItems > 0}
                strokeWidth={1.85}
              />
              <span className="hidden sm:inline">Bag</span>
              <span className="tabular-nums font-semibold text-[#E6AC38]">{totalItems}</span>
            </button>
          </div>
        </div>

        {/* Live Search Panel */}
        {searchOpen && (
          <div className="border-t border-[#E2DDD0] bg-[#FDFCF8]/95 backdrop-blur-xl px-4 sm:px-6 py-4">
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                <Search className="w-4 h-4 text-[#76563C] absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  ref={searchInputRef}
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Himsagar, Langra, Sundarban honey, Mustard honey..."
                  aria-label="Search store products"
                  className="w-full pl-11 pr-4 py-3 text-sm bg-[#F8F6EF] border border-[#E2DDD0] rounded-full text-[#252820] placeholder:text-[#76563C]/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183D2B]/30 focus-visible:border-[#183D2B]"
                />
              </div>

              {searchQuery.trim() && (
                <div className="mt-3 divide-y divide-[#E2DDD0] border border-[#E2DDD0] rounded-2xl bg-[#F8F6EF] overflow-hidden shadow-sm">
                  {searchResults.length === 0 ? (
                    <p className="p-4 text-sm text-[#76563C]">
                      No products found for “{searchQuery}”. Try searching for Mango or Honey.
                    </p>
                  ) : (
                    searchResults.map((product) => (
                      <button
                        key={product.id}
                        type="button"
                        onClick={() => {
                          setSearchQuery('');
                          handleNav(`/product/${product.slug}`);
                        }}
                        className="w-full flex items-center gap-3.5 p-3 text-left hover:bg-[#EFECE1] transition-colors cursor-pointer focus-visible:outline-none focus-visible:bg-[#EFECE1]"
                      >
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#EFECE1] shrink-0">
                          <ResilientImage
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-serif text-base text-[#252820] truncate">
                            {product.name}
                          </p>
                          <p className="text-xs text-[#76563C]">
                            {product.category === 'mangoes' ? 'Mangoes' : 'Honey'} ·{' '}
                            <span className="tabular-nums font-medium text-[#183D2B]">
                              {formatBDT(product.variants[0].price)}
                              {product.unitLabel ? ` / ${product.unitLabel}` : ''}
                            </span>
                          </p>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
};
