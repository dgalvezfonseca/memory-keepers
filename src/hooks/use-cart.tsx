import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartItem } from "@/types/catalog";

const STORAGE_KEY = "mikuva.cart.v1";
const MAX_CART_ITEMS = 100;
const MAX_ITEM_QUANTITY = 10_000;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isStoredCartItem(value: unknown): value is CartItem {
  if (!isRecord(value) || !isRecord(value["config"])) return false;
  const config = value["config"];
  return (
    typeof value["id"] === "string" &&
    value["id"].length <= 500 &&
    typeof value["productSlug"] === "string" &&
    /^[a-z0-9-]{1,160}$/.test(value["productSlug"]) &&
    typeof value["name"] === "string" &&
    value["name"].length <= 200 &&
    typeof value["image"] === "string" &&
    value["image"].length <= 2_048 &&
    Number.isSafeInteger(value["unitPrice"]) &&
    (value["unitPrice"] as number) >= 0 &&
    Number.isInteger(value["quantity"]) &&
    (value["quantity"] as number) >= 1 &&
    (value["quantity"] as number) <= MAX_ITEM_QUANTITY &&
    typeof config["summary"] === "string" &&
    config["summary"].length <= 500 &&
    (config["variantCode"] === undefined ||
      (typeof config["variantCode"] === "string" &&
        /^[a-z0-9:-]{1,96}$/.test(config["variantCode"])))
  );
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotal: number;
  addItem: (item: Omit<CartItem, "id"> & { id?: string }) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setItems(parsed.slice(0, MAX_CART_ITEMS).filter(isStoredCartItem));
        }
      }
    } catch {
      /* almacenamiento no disponible */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* almacenamiento no disponible */
    }
  }, [items, hydrated]);

  const addItem = useCallback<CartContextValue["addItem"]>((item) => {
    setItems((current) => {
      const id = item.id ?? `${item.productSlug}-${item.config.summary}`;
      const existing = current.find((i) => i.id === id);
      if (existing) {
        return current.map((i) =>
          i.id === id
            ? { ...i, quantity: Math.min(MAX_ITEM_QUANTITY, i.quantity + item.quantity) }
            : i,
        );
      }
      if (current.length >= MAX_CART_ITEMS) return current;
      return [
        ...current,
        {
          ...item,
          id,
          quantity: Math.min(MAX_ITEM_QUANTITY, Math.max(1, Math.trunc(item.quantity))),
        },
      ];
    });
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    const boundedQuantity = Number.isFinite(quantity)
      ? Math.min(MAX_ITEM_QUANTITY, Math.max(1, Math.trunc(quantity)))
      : 1;
    setItems((current) =>
      current.map((i) => (i.id === id ? { ...i, quantity: boundedQuantity } : i)),
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((current) => current.filter((i) => i.id !== id));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(() => {
    return {
      items,
      count: items.reduce((sum, i) => sum + i.quantity, 0),
      subtotal: items.reduce((sum, i) => sum + i.quantity * i.unitPrice, 0),
      addItem,
      updateQuantity,
      removeItem,
      clear,
    };
  }, [items, addItem, updateQuantity, removeItem, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
}
