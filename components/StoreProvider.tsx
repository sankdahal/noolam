'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Product } from '@/lib/catalog';

export interface CartItem {
  id: string;
  name: string;
  slug: string;
  silkType: string;
  color: string;
  price: number;
  image: string;
  quantity: number;
  customNote?: string;
}

interface ToastMessage {
  id: string;
  message: string;
}

interface StoreContextValue {
  cart: CartItem[];
  wishlist: string[];
  isCartOpen: boolean;
  isWishlistOpen: boolean;
  isSearchOpen: boolean;
  isStoreModalOpen: boolean;
  setCartOpen: (open: boolean) => void;
  setWishlistOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  setStoreModalOpen: (open: boolean) => void;
  addToCart: (product: Product, quantity?: number, customNote?: string) => void;
  addCustomWeaveToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string, productName?: string) => void;
  isWishlisted: (productId: string) => boolean;
  cartCount: number;
  cartSubtotal: number;
  toasts: ToastMessage[];
  dismissToast: (id: string) => void;
  notify: (message: string) => void;
}

const StoreContext = createContext<StoreContextValue | undefined>(undefined);

const CART_STORAGE_KEY = 'noolam_cart_v1';
const WISHLIST_STORAGE_KEY = 'noolam_wishlist_v1';

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  const [isCartOpen, setCartOpen] = useState(false);
  const [isWishlistOpen, setWishlistOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [isStoreModalOpen, setStoreModalOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    let active = true;
    Promise.resolve().then(() => {
      if (!active) return;
      try {
        const savedCart = localStorage.getItem(CART_STORAGE_KEY);
        const savedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
        if (savedCart) setCart(JSON.parse(savedCart));
        if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
      } catch {
        // Ignore storage errors
      } finally {
        setHydrated(true);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // Ignore storage errors
    }
  }, [cart, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch {
      // Ignore storage errors
    }
  }, [wishlist, hydrated]);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const notify = useCallback(
    (message: string) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      setToasts((prev) => [...prev.slice(-2), { id, message }]);
      setTimeout(() => {
        dismissToast(id);
      }, 3200);
    },
    [dismissToast]
  );

  const addToCart = useCallback(
    (product: Product, quantity = 1, customNote?: string) => {
      setCart((prev) => {
        const existingIndex = prev.findIndex(
          (item) => item.id === product.id && item.customNote === customNote
        );
        if (existingIndex > -1) {
          const updated = [...prev];
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + quantity,
          };
          return updated;
        }
        return [
          ...prev,
          {
            id: product.id,
            name: product.name,
            slug: product.slug,
            silkType: product.silkType,
            color: product.color,
            price: product.price,
            image: product.images[0],
            quantity,
            customNote,
          },
        ];
      });
      notify(`Added "${product.name}" to your bag`);
    },
    [notify]
  );

  const addCustomWeaveToCart = useCallback(
    (item: Omit<CartItem, 'quantity'>) => {
      setCart((prev) => {
        const existingIndex = prev.findIndex((i) => i.id === item.id);
        if (existingIndex > -1) {
          const updated = [...prev];
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + 1,
          };
          return updated;
        }
        return [...prev, { ...item, quantity: 1 }];
      });
      notify(`Added bespoke weave "${item.name}" to your bag`);
    },
    [notify]
  );

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((item) => item.id !== id));
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const toggleWishlist = useCallback(
    (productId: string, productName?: string) => {
      setWishlist((prev) => {
        const exists = prev.includes(productId);
        if (exists) {
          notify(productName ? `Removed "${productName}" from wishlist` : 'Removed from wishlist');
          return prev.filter((id) => id !== productId);
        }
        notify(productName ? `Saved "${productName}" to wishlist` : 'Saved to wishlist');
        return [...prev, productId];
      });
    },
    [notify]
  );

  const isWishlisted = useCallback(
    (productId: string) => wishlist.includes(productId),
    [wishlist]
  );

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        isCartOpen,
        isWishlistOpen,
        isSearchOpen,
        isStoreModalOpen,
        setCartOpen,
        setWishlistOpen,
        setSearchOpen,
        setStoreModalOpen,
        addToCart,
        addCustomWeaveToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isWishlisted,
        cartCount,
        cartSubtotal,
        toasts,
        dismissToast,
        notify,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return ctx;
}
