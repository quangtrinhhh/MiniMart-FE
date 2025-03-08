"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { CartItem, Product, Variant } from "@/types/backend";

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, variant?: Variant, quantity?: number) => void;
  removeFromCart: (id: number, variantId?: number) => void;
  updateQuantity: (id: number, variantId?: number, quantity?: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // 🛒 Load giỏ hàng từ localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // 💾 Lưu giỏ hàng vào localStorage mỗi khi thay đổi
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // 🛍 Thêm sản phẩm vào giỏ hàng
  const addToCart = (
    product: Product,
    variant?: Variant,
    quantity: number = 1
  ) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) =>
          Number(item.id) === Number(product.id) &&
          Number(item.variant?.id) === Number(variant?.id)
      );

      if (existingItemIndex !== -1) {
        return prevCart.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [
          ...prevCart,
          {
            id: Number(product.id), // ✅ Chuyển thành number
            name: product.name,
            image: product.assets.length > 0 ? product.assets[0] : null,
            price: Number(variant?.price ?? product.price), // ✅ Chuyển thành number
            quantity,
            variant: variant
              ? { ...variant, id: Number(variant.id) }
              : undefined, // ✅ Đảm bảo id của variant là number
          },
        ];
      }
    });
  };

  // 🔄 Cập nhật số lượng sản phẩm
  const updateQuantity = (
    id: number,
    variantId?: number,
    quantity: number = 1
  ) => {
    if (quantity < 1) return;
    setCart((prevCart) =>
      prevCart.map((item) =>
        Number(item.id) === id && Number(item.variant?.id) === variantId
          ? { ...item, quantity }
          : item
      )
    );
  };

  // ❌ Xóa sản phẩm khỏi giỏ hàng
  const removeFromCart = (id: number, variantId?: number) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) =>
          !(Number(item.id) === id && Number(item.variant?.id) === variantId)
      )
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook để sử dụng giỏ hàng
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart phải được sử dụng trong CartProvider");
  }
  return context;
};
