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
      return prevCart
        .map((item) => {
          // Kiểm tra nếu sản phẩm và biến thể giống nhau
          const isSameProduct = Number(item.id) === Number(product.id);
          const isSameVariant =
            (item.variant?.id ?? null) === (variant?.id ?? null);

          if (isSameProduct && isSameVariant) {
            // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng
            return { ...item, quantity: item.quantity + quantity };
          }
          return item;
        })
        .concat(
          // Nếu không tìm thấy sản phẩm, thêm mới vào giỏ hàng
          prevCart.some(
            (item) =>
              Number(item.id) === Number(product.id) &&
              (item.variant?.id ?? null) === (variant?.id ?? null)
          )
            ? []
            : [
                {
                  id: Number(product.id),
                  name: product.name,
                  image: product.assets.length > 0 ? product.assets[0] : null,
                  price: Number(variant?.price ?? product.price),
                  quantity,
                  variant: variant
                    ? { ...variant, id: Number(variant.id) }
                    : undefined,
                },
              ]
        );
    });
  };

  // 🔄 Cập nhật số lượng sản phẩm
  const updateQuantity = (
    id: number,
    variantId?: number,
    quantity: number = 1
  ) => {
    if (quantity < 1) return; // Không cho phép số lượng nhỏ hơn 1

    setCart((prevCart) =>
      prevCart.map((item) => {
        const isSameProduct = Number(item.id) === id;
        const isSameVariant = item.variant?.id
          ? Number(item.variant.id) === Number(variantId) // Nếu có biến thể, so sánh ID
          : !variantId; // Nếu không có biến thể, đảm bảo variantId là undefined hoặc null

        if (isSameProduct && isSameVariant) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  // ❌ Xóa sản phẩm khỏi giỏ hàng
  const removeFromCart = (id: number, variantId?: number) => {
    setCart((prevCart) =>
      prevCart.filter((item) => {
        const isSameProduct = Number(item.id) === id;
        const isSameVariant =
          item.variant && variantId !== undefined
            ? Number(item.variant.id) === variantId
            : item.variant === undefined; // Nếu không có biến thể, kiểm tra item.variant === undefined
        return !(isSameProduct && isSameVariant);
      })
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
