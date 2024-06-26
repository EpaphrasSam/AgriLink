import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Product } from "@/types/ProductTypes";

type CartProduct = Product & { quantity: number };

interface CartState {
  cart: Record<string, CartProduct[]>;
  addToCart: (product: Product) => void;
  removeProduct: (productId: number, farm: string) => void;
  increaseQuantity: (productId: number, farm: string) => void;
  decreaseQuantity: (productId: number, farm: string) => void;
  clearCart: () => void;
}

interface CartState {
  cart: Record<string, CartProduct[]>;
  addToCart: (product: Product) => void;
  removeProduct: (productId: number, farm: string) => void;
  increaseQuantity: (productId: number, farm: string) => void;
  decreaseQuantity: (productId: number, farm: string) => void;
  clearCart: () => void;
  calculateSubtotal: (farm: string) => number;
  calculateTotal: () => number;
  calculateTotalItems: () => number;
}
const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: {},
      addToCart: (product: Product) => {
        set((state) => {
          const farmProducts = state.cart[product.farm] || [];
          const existingProduct = farmProducts.find((p) => p.id === product.id);

          if (existingProduct) {
            existingProduct.quantity += 1;
          } else {
            farmProducts.push({ ...product, quantity: 1 });
          }

          return { cart: { ...state.cart, [product.farm]: farmProducts } };
        });
      },
      removeProduct: (productId: number, farm: string) => {
        set((state) => {
          const farmProducts = state.cart[farm].filter(
            (p) => p.id !== productId
          );
          const newCart = { ...state.cart, [farm]: farmProducts };
          if (farmProducts.length === 0) delete newCart[farm];
          return { cart: newCart };
        });
      },
      increaseQuantity: (productId: number, farm: string) => {
        set((state) => {
          const farmProducts = state.cart[farm].map((p) =>
            p.id === productId ? { ...p, quantity: p.quantity + 1 } : p
          );
          return { cart: { ...state.cart, [farm]: farmProducts } };
        });
      },
      decreaseQuantity: (productId: number, farm: string) => {
        set((state) => {
          const farmProducts = state.cart[farm]
            .map((p) =>
              p.id === productId ? { ...p, quantity: p.quantity - 1 } : p
            )
            .filter((p) => p.quantity > 0);
          const newCart = { ...state.cart, [farm]: farmProducts };
          if (farmProducts.length === 0) delete newCart[farm];
          return { cart: newCart };
        });
      },
      clearCart: () => set({ cart: {} }),
      calculateSubtotal: (farm: string) => {
        const farmProducts = get().cart[farm] || [];
        const subtotal = farmProducts.reduce(
          (total, product) => total + product.price * product.quantity,
          0
        );
        return parseFloat(subtotal.toFixed(2));
      },

      calculateTotal: () => {
        const cart = get().cart;
        const total = Object.values(cart).reduce(
          (total, products) =>
            total +
            products.reduce(
              (subTotal, product) =>
                subTotal + product.price * product.quantity,
              0
            ),
          0
        );
        return parseFloat(total.toFixed(2));
      },
      calculateTotalItems: () => {
        const cart = get().cart;
        return Object.values(cart).reduce(
          (total, products) => total + products.length,
          0
        );
      },
    }),
    {
      name: "agrilink-cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCartStore;
