"use client";
import { useState } from "react";

const Sidebar: React.FC = () => {
  const [showAllColors, setShowAllColors] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(false);

  const colors = ["Trắng", "Đen", "Nâu", "Xanh", "Hồng", "Tím", "Vàng"];
  const productTypes = [
    "Chất tẩy sửa",
    "Đồ dùng học tập",
    "Khác",
    "Làm thơm",
    "Nhập khẩu",
  ];
  const prices = [
    "Giá dưới 1.000.000₫",
    "1.000.000₫ - 2.000.000₫",
    "2.000.000₫ - 3.000.000₫",
    "3.000.000₫ - 5.000.000₫",
    "5.000.000₫ - 7.000.000₫",
    "7.000.000₫ - 10.000.000₫",
    "Giá trên 10.000.000₫",
  ];

  return (
    <aside className="bg-white rounded-sm p-5  overflow-auto h-full">
      {/* Màu sắc */}
      <div className="mb-5">
        <h2 className="text-lg font-semibold border-b pb-2">Màu sắc</h2>
        <ul className="mt-2">
          {(showAllColors ? colors : colors.slice(0, 3)).map((color, index) => (
            <li
              key={index}
              className="flex items-center gap-2 cursor-pointer hover:text-orange-500"
            >
              <input
                type="checkbox"
                className="w-4 h-4"
                aria-label={`Lọc màu ${color}`}
              />
              <span>{color}</span>
            </li>
          ))}
          <li
            onClick={() => setShowAllColors(!showAllColors)}
            className="text-orange-500 font-semibold cursor-pointer mt-2"
          >
            {showAllColors ? "Thu gọn" : "Xem thêm"}
          </li>
        </ul>
      </div>

      {/* Tags */}
      <div className="mb-5">
        <h2 className="text-lg font-semibold border-b pb-2">Tags</h2>
        <ul className="mt-2">
          {["EGA", "EGA GREEN", "Khác"].map((tag, index) => (
            <li
              key={index}
              className="flex items-center gap-2 cursor-pointer hover:text-orange-500"
            >
              <input
                type="checkbox"
                className="w-4 h-4"
                aria-label={`Lọc tag ${tag}`}
              />
              <span>{tag}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Loại sản phẩm */}
      <div className="mb-5">
        <h2 className="text-lg font-semibold border-b pb-2">Loại sản phẩm</h2>
        <ul className="mt-2">
          {(showAllProducts ? productTypes : productTypes.slice(0, 3)).map(
            (type, index) => (
              <li
                key={index}
                className="flex items-center gap-2 cursor-pointer hover:text-orange-500"
              >
                <input
                  type="checkbox"
                  className="w-4 h-4"
                  aria-label={`Lọc theo loại ${type}`}
                />
                <span>{type}</span>
              </li>
            )
          )}
          <li
            onClick={() => setShowAllProducts(!showAllProducts)}
            className="text-orange-500 font-semibold cursor-pointer mt-2"
          >
            {showAllProducts ? "Thu gọn" : "Xem thêm"}
          </li>
        </ul>
      </div>

      {/* Giá */}
      <div>
        <h2 className="text-lg font-semibold border-b pb-2">Giá</h2>
        <ul className="mt-2">
          {prices.map((price, index) => (
            <li
              key={index}
              className="flex items-center gap-2 cursor-pointer hover:text-orange-500"
            >
              <input
                type="checkbox"
                className="w-4 h-4"
                aria-label={`Lọc theo giá ${price}`}
              />
              <span>{price}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
