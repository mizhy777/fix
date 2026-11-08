'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { productBySlug, type Product } from './products';

export type CartItem = { slug: string; qty: number };

type CartContextValue = {
  items: CartItem[];
  ready: boolean;
  count: number;
  total: number;
  detailed: { item: CartItem; product: Product }[];
  add: (slug: string, qty?: number) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
};

const STORAGE_KEY = 'fixmobil-cotizacion-v1';

const CartContext = createContext<CartContextValue | null>(null);

function readStorage(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (item): item is CartItem =>
          !!item &&
          typeof item.slug === 'string' &&
          typeof item.qty === 'number' &&
          productBySlug.has(item.slug),
      )
      .map((item) => ({ slug: item.slug, qty: Math.min(5, Math.max(1, item.qty)) }));
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setItems(readStorage());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* almacenamiento no disponible */
    }
  }, [items, ready]);

  const add = useCallback((slug: string, qty = 1) => {
    if (!productBySlug.has(slug)) return;
    setItems((current) => {
      const existing = current.find((item) => item.slug === slug);
      if (existing) {
        return current.map((item) =>
          item.slug === slug ? { ...item, qty: Math.min(5, item.qty + qty) } : item,
        );
      }
      return [...current, { slug, qty: Math.min(5, Math.max(1, qty)) }];
    });
  }, []);

  const remove = useCallback((slug: string) => {
    setItems((current) => current.filter((item) => item.slug !== slug));
  }, []);

  const setQty = useCallback((slug: string, qty: number) => {
    if (qty <= 0) {
      setItems((current) => current.filter((item) => item.slug !== slug));
      return;
    }
    setItems((current) =>
      current.map((item) =>
        item.slug === slug ? { ...item, qty: Math.min(5, qty) } : item,
      ),
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const detailed = useMemo(
    () =>
      items
        .map((item) => {
          const product = productBySlug.get(item.slug);
          return product ? { item, product } : null;
        })
        .filter((entry): entry is { item: CartItem; product: Product } => !!entry),
    [items],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      ready,
      count: items.reduce((sum, item) => sum + item.qty, 0),
      total: detailed.reduce(
        (sum, { item, product }) => sum + product.price * item.qty,
        0,
      ),
      detailed,
      add,
      remove,
      setQty,
      clear,
    }),
    [items, ready, detailed, add, remove, setQty, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart debe usarse dentro de CartProvider');
  return context;
}
