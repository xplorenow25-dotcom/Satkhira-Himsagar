import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { PRODUCTS } from '../config/store';
import { CartItem } from '../types';

const CART_STORAGE_KEY = 'mati_madhu_cart_v1';

interface CartContextValue {
  items: CartItem[];
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  addItem: (productId: string, variantId: string, quantity?: number, openCart?: boolean) => void;
  removeItem: (productId: string, variantId: string) => void;
  updateQuantity: (productId: string, variantId: string, quantity: number) => void;
  changeVariant: (productId: string, oldVariantId: string, newVariantId: string) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextValue | null>(null);

function normalizeQuantity(productId: string, rawQty: number): number {
  const product = PRODUCTS.find((p) => p.id === productId);
  const min = product?.minOrderQuantity ?? 1;
  const step = product?.quantityStep ?? 1;
  const floored = Math.max(min, Math.floor(rawQty));
  if (step <= 1) return floored;
  return Math.max(min, Math.round(floored / step) * step);
}

function loadStoredCart(): CartItem[] {
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((entry): entry is CartItem => {
        if (!entry || typeof entry !== 'object') return false;
        const product = PRODUCTS.find((p) => p.id === entry.productId);
        const variant = product?.variants.find((v) => v.id === entry.variantId);
        return Boolean(
          product && variant && typeof entry.quantity === 'number' && entry.quantity > 0
        );
      })
      .map((entry) => ({
        ...entry,
        quantity: normalizeQuantity(entry.productId, entry.quantity),
      }));
  } catch {
    return [];
  }
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => loadStoredCart());
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignore storage quota issues safely
    }
  }, [items]);

  const addItem = (
    productId: string,
    variantId: string,
    quantity?: number,
    openCart = true
  ) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    const step = product?.quantityStep ?? 1;
    const min = product?.minOrderQuantity ?? 1;
    const addAmount =
      typeof quantity === 'number' ? normalizeQuantity(productId, quantity) : min;

    setItems((prev) => {
      const existingIdx = prev.findIndex(
        (i) => i.productId === productId && i.variantId === variantId
      );
      if (existingIdx >= 0) {
        const updated = [...prev];
        const nextQty = updated[existingIdx].quantity + (typeof quantity === 'number' ? addAmount : step);
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantity: normalizeQuantity(productId, nextQty),
        };
        return updated;
      }
      return [...prev, { productId, variantId, quantity: addAmount }];
    });
    if (openCart) {
      setIsDrawerOpen(true);
    }
  };

  const removeItem = (productId: string, variantId: string) => {
    setItems((prev) =>
      prev.filter((i) => !(i.productId === productId && i.variantId === variantId))
    );
  };

  const updateQuantity = (productId: string, variantId: string, quantity: number) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    const min = product?.minOrderQuantity ?? 1;
    if (quantity < min) {
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.productId === productId && i.variantId === variantId
          ? { ...i, quantity: normalizeQuantity(productId, quantity) }
          : i
      )
    );
  };

  const changeVariant = (productId: string, oldVariantId: string, newVariantId: string) => {
    if (oldVariantId === newVariantId) return;
    setItems((prev) => {
      const target = prev.find(
        (i) => i.productId === productId && i.variantId === oldVariantId
      );
      if (!target) return prev;
      const alreadyHasNew = prev.find(
        (i) => i.productId === productId && i.variantId === newVariantId
      );
      if (alreadyHasNew) {
        return prev
          .filter((i) => !(i.productId === productId && i.variantId === oldVariantId))
          .map((i) =>
            i.productId === productId && i.variantId === newVariantId
              ? { ...i, quantity: i.quantity + target.quantity }
              : i
          );
      }
      return prev.map((i) =>
        i.productId === productId && i.variantId === oldVariantId
          ? { ...i, variantId: newVariantId }
          : i
      );
    });
  };

  const clearCart = () => {
    setItems([]);
  };

  // Count distinct line items or crates (each 10 KG mango batch = 1 crate count in bag badge, or total entries)
  const totalItems = useMemo(
    () =>
      items.reduce((sum, item) => {
        const product = PRODUCTS.find((p) => p.id === item.productId);
        const step = product?.quantityStep ?? 1;
        return sum + Math.max(1, Math.round(item.quantity / step));
      }, 0),
    [items]
  );

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => {
      const product = PRODUCTS.find((p) => p.id === item.productId);
      const variant = product?.variants.find((v) => v.id === item.variantId);
      if (!variant) return sum;
      return sum + variant.price * item.quantity;
    }, 0);
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        isDrawerOpen,
        openDrawer: () => setIsDrawerOpen(true),
        closeDrawer: () => setIsDrawerOpen(false),
        addItem,
        removeItem,
        updateQuantity,
        changeVariant,
        clearCart,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
