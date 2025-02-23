"use client";
import { useState } from "react";

const ProductVariants: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  // Dữ liệu biến thể sản phẩm
  const colors = ["Red", "Blue", "Green"];
  const sizes = ["S", "M", "L", "XL"];

  // Xử lý thay đổi lựa chọn màu sắc
  const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedColor(e.target.value);
  };

  // Xử lý thay đổi lựa chọn kích cỡ
  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSize(e.target.value);
  };

  // Xử lý thay đổi số lượng
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(e.target.value));
  };

  return (
    <div className="p-5 border rounded-lg">
      <h2 className="text-xl font-semibold mb-3">Product Name</h2>

      {/* Biến thể màu sắc */}
      <div className="mb-4">
        <label className="block text-sm font-bold text-[#111]">Color</label>
        <select
          value={selectedColor}
          onChange={handleColorChange}
          className="border rounded-lg px-4 py-2 outline-none w-full"
        >
          <option value="" disabled>
            Select color
          </option>
          {colors.map((color, index) => (
            <option key={index} value={color}>
              {color}
            </option>
          ))}
        </select>
      </div>

      {/* Biến thể kích cỡ */}
      <div className="mb-4">
        <label className="block text-sm font-bold text-[#111]">Size</label>
        <select
          value={selectedSize}
          onChange={handleSizeChange}
          className="border rounded-lg px-4 py-2 outline-none w-full"
        >
          <option value="" disabled>
            Select size
          </option>
          {sizes.map((size, index) => (
            <option key={index} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      {/* Số lượng */}
      <div className="mb-4">
        <label className="block text-sm font-bold text-[#111]">Quantity</label>
        <input
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
          min={1}
          className="border rounded-lg px-4 py-2 outline-none w-full"
        />
      </div>

      {/* Hiển thị lựa chọn */}
      <div>
        <p>
          Selected Color: <strong>{selectedColor}</strong>
        </p>
        <p>
          Selected Size: <strong>{selectedSize}</strong>
        </p>
        <p>
          Quantity: <strong>{quantity}</strong>
        </p>
      </div>
    </div>
  );
};

export default ProductVariants;
