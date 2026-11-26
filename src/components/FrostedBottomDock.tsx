import React, { useEffect, useState } from 'react';
import { Grid, Home, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useCart } from '../context/CartContext';
import { PremiumBagIcon } from './PremiumBagIcon';

interface FrostedBottomDockProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

const SHEET_LINKS = [
  { label: 'Seasonal Mangoes', path: '/mangoes' },
  { label: 'Authentic Honey', path: '/honey' },
  { label: 'Our Story', path: '/about' },
  { label: 'Delivery Information', path: '/delivery' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Return & Refund Policy', path: '/refund-policy' },
  { label: 'Contact Us', path: '/contact' },
];

export const FrostedBottomDock: React.FC<FrostedBottomDockProps> = ({
  currentPath,
  onNavigate,
}) => {
  const { totalItems, openDrawer } = useCart();
  const [moreOpen, setMoreOpen] = useState(false);

  useEffect(() => {
    setMoreOpen(false);
  }, [currentPath]);

  const isHome = currentPath === '/';
  const isShop =
    currentPath === '/shop' ||
    currentPath === '/mangoes' ||
    currentPath === '/honey' ||
    currentPath.startsWith('/product/');

  return (
    <>
      <AnimatePresence>
        {moreOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.16 }}
              className="md:hidden fixed inset-0 z-40 bg-[#252820]/25 backdrop-blur-[2px]"
              onClick={() => setMoreOpen(false)}
              aria-hidden="true"
            />

            <motion.div
              role="dialog"
              aria-label="Store Menu"
              initial={{ opacity: 0, y: 12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden fixed bottom-[86px] inset-x-4 max-w-sm mx-auto z-50 rounded-3xl bg-[#FDFCF8]/86 backdrop-blur-2xl backdrop-saturate-150 border border-white/80 ring-1 ring-[#183D2B]/12 shadow-[0_20px_50px_rgba(24,61,43,0.22)] p-4"
            >
              <div className="flex items-center justify-between px-2 pb-3 mb-2.5 border-b border-[#183D2B]/10">
                <span className="font-serif text-base text-[#183D2B]">Explore Store</span>
                <button
                  type="button"
                  onClick={() => setMoreOpen(false)}
                  aria-label="Close menu"
                  className="w-9 h-9 inline-flex items-center justify-center rounded-full bg-[#183D2B]/8 text-[#252820] hover:bg-[#183D2B]/15 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183D2B]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {SHEET_LINKS.map((link) => {
                  const active = currentPath === link.path;
                  return (
                    <button
                      key={link.path}
                      type="button"
                      onClick={() => {
                        setMoreOpen(false);
                        onNavigate(link.path);
                      }}
                      className={`min-h-[44px] px-3 py-2 rounded-2xl text-left text-xs font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183D2B] ${
                        active
                          ? 'bg-[#183D2B] text-[#F8F6EF]'
                          : 'bg-[#F8F6EF]/80 text-[#252820] hover:bg-[#EFECE1]'
                      }`}
                    >
                      {link.label}
                    </button>
                  );
                })}
                <button
                  type="button"
                  onClick={() => {
                    setMoreOpen(false);
                    onNavigate('/checkout');
                  }}
                  className="min-h-[44px] px-3 py-2 rounded-2xl text-left text-xs font-semibold bg-[#E6AC38] text-[#252820] hover:bg-[#d89e2c] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183D2B]"
                >
                  WhatsApp Checkout
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Apple-Style Frosted Glass Pill Bottom Dock */}
      <nav
        aria-label="Mobile quick navigation"
        className="md:hidden fixed bottom-3.5 inset-x-4 max-w-sm mx-auto z-40 h-[60px] px-1.5 rounded-full bg-[#FDFCF8]/78 backdrop-blur-2xl backdrop-saturate-150 border border-white/80 ring-1 ring-[#183D2B]/12 shadow-[0_12px_36px_rgba(24,61,43,0.18)] grid grid-cols-4 items-center gap-1"
      >
        <button
          type="button"
          onClick={() => {
            setMoreOpen(false);
            onNavigate('/');
          }}
          className={`h-[48px] flex flex-col items-center justify-center gap-0.5 rounded-full transition-all duration-150 active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183D2B] ${
            isHome
              ? 'bg-[#183D2B]/12 text-[#183D2B]'
              : 'text-[#252820]/70 hover:text-[#183D2B]'
          }`}
        >
          <Home className="w-[18px] h-[18px]" strokeWidth={isHome ? 2.1 : 1.75} />
          <span className="text-[10px] font-medium leading-none whitespace-nowrap">
            Home
          </span>
        </button>

        <button
          type="button"
          onClick={() => {
            setMoreOpen(false);
            onNavigate('/shop');
          }}
          className={`h-[48px] flex flex-col items-center justify-center gap-0.5 rounded-full transition-all duration-150 active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183D2B] ${
            isShop
              ? 'bg-[#183D2B]/12 text-[#183D2B]'
              : 'text-[#252820]/70 hover:text-[#183D2B]'
          }`}
        >
          <Grid className="w-[18px] h-[18px]" strokeWidth={isShop ? 2.1 : 1.75} />
          <span className="text-[10px] font-medium leading-none whitespace-nowrap">
            Shop
          </span>
        </button>

        <button
          type="button"
          onClick={() => {
            setMoreOpen(false);
            openDrawer();
          }}
          aria-label={`Open bag with ${totalItems} items`}
          className={`relative h-[48px] flex flex-col items-center justify-center gap-0.5 rounded-full transition-all duration-150 active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183D2B] ${
            currentPath === '/cart' || currentPath === '/checkout'
              ? 'bg-[#183D2B]/12 text-[#183D2B]'
              : 'text-[#252820]/70 hover:text-[#183D2B]'
          }`}
        >
          <div className="relative">
            <PremiumBagIcon
              className="w-[19px] h-[19px]"
              filled={totalItems > 0}
              strokeWidth={1.8}
            />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-2.5 min-w-[16px] h-4 px-1 rounded-full bg-[#183D2B] text-[#E6AC38] text-[10px] font-semibold flex items-center justify-center tabular-nums">
                {totalItems}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium leading-none whitespace-nowrap">
            Bag
          </span>
        </button>

        <button
          type="button"
          onClick={() => setMoreOpen((prev) => !prev)}
          aria-expanded={moreOpen}
          className={`h-[48px] flex flex-col items-center justify-center gap-0.5 rounded-full transition-all duration-150 active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183D2B] ${
            moreOpen
              ? 'bg-[#183D2B]/12 text-[#183D2B]'
              : 'text-[#252820]/70 hover:text-[#183D2B]'
          }`}
        >
          <Menu className="w-[18px] h-[18px]" strokeWidth={1.75} />
          <span className="text-[10px] font-medium leading-none whitespace-nowrap">
            Menu
          </span>
        </button>
      </nav>
    </>
  );
};
