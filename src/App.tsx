/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { CartProvider } from './context/CartContext';
import { Product } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { FrostedBottomDock } from './components/FrostedBottomDock';
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import {
  AboutPage,
  ContactPage,
  DeliveryInfoPage,
  FaqPage,
  RefundPolicyPage,
} from './pages/InfoPages';

function parseHashRoute(): string {
  const raw = window.location.hash.replace(/^#/, '');
  if (!raw || raw === '') return '/';
  return raw.startsWith('/') ? raw : `/${raw}`;
}

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => parseHashRoute());
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(parseHashRoute());
      setSearchOpen(false);
      window.scrollTo({ top: 0, behavior: 'auto' });
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path: string) => {
    const normalized = path.startsWith('/') ? path : `/${path}`;
    setSearchOpen(false);
    if (normalized === currentPath) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    window.location.hash = normalized === '/' ? '/' : normalized;
    setCurrentPath(normalized);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const renderPage = () => {
    if (currentPath === '/') {
      return (
        <HomePage
          onNavigate={navigate}
          onQuickView={(product) => setQuickViewProduct(product)}
        />
      );
    }
    if (currentPath === '/shop') {
      return (
        <CatalogPage
          initialFilter="all"
          onNavigate={navigate}
          onQuickView={(product) => setQuickViewProduct(product)}
        />
      );
    }
    if (currentPath === '/mangoes') {
      return (
        <CatalogPage
          initialFilter="mangoes"
          onNavigate={navigate}
          onQuickView={(product) => setQuickViewProduct(product)}
        />
      );
    }
    if (currentPath === '/honey') {
      return (
        <CatalogPage
          initialFilter="honey"
          onNavigate={navigate}
          onQuickView={(product) => setQuickViewProduct(product)}
        />
      );
    }
    if (currentPath.startsWith('/product/')) {
      const slug = currentPath.replace('/product/', '').split('/')[0];
      return (
        <ProductDetailPage
          slug={slug}
          onNavigate={navigate}
          onQuickView={(product) => setQuickViewProduct(product)}
        />
      );
    }
    if (currentPath === '/cart') {
      return <CartPage onNavigate={navigate} />;
    }
    if (currentPath === '/checkout') {
      return <CheckoutPage onNavigate={navigate} />;
    }
    if (currentPath === '/about') {
      return <AboutPage onNavigate={navigate} />;
    }
    if (currentPath === '/contact') {
      return <ContactPage />;
    }
    if (currentPath === '/faq') {
      return <FaqPage />;
    }
    if (currentPath === '/delivery') {
      return <DeliveryInfoPage onNavigate={navigate} />;
    }
    if (currentPath === '/refund-policy') {
      return <RefundPolicyPage />;
    }

    return (
      <HomePage
        onNavigate={navigate}
        onQuickView={(product) => setQuickViewProduct(product)}
      />
    );
  };

  return (
    <MotionConfig reducedMotion="user">
      <CartProvider>
        <div className="min-h-screen flex flex-col bg-[#F8F6EF] text-[#252820]">
          <Header
            currentPath={currentPath}
            onNavigate={navigate}
            searchOpen={searchOpen}
            onSetSearchOpen={setSearchOpen}
          />

          <main className="flex-1">{renderPage()}</main>

          <Footer onNavigate={navigate} />

          <CartDrawer onNavigate={navigate} />

          <QuickViewModal
            product={quickViewProduct}
            onClose={() => setQuickViewProduct(null)}
            onViewFullPage={(slug) => navigate(`/product/${slug}`)}
          />

          <FloatingWhatsApp />

          <FrostedBottomDock
            currentPath={currentPath}
            onNavigate={navigate}
          />
        </div>
      </CartProvider>
    </MotionConfig>
  );
}
