"use client";
import { useState, useEffect } from "react";

interface SidebarProps {
  onFilterChange: (filters: {
    colors: string[];
    productTypes: string[];
    tags: string[];
    priceRanges: string[];
  }) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onFilterChange }) => {
  const [showAllColors, setShowAllColors] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(false);

  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);

  const colors = ["Trắng", "Đen", "Nâu", "Xanh", "Hồng", "Tím", "Vàng"];
  const productTypes = [
    "Chất tẩy sửa",
    "Đồ dùng học tập",
    "Khác",
    "Làm thơm",
    "Nhập khẩu",
  ];
  const tags = ["EGA", "EGA GREEN", "Khác"];
  const prices = [
    "0-1000000",
    "1000000-2000000",
    "2000000-3000000",
    "3000000-5000000",
    "5000000-7000000",
    "7000000-10000000",
    "10000000-999999999",
  ];

  const toggleItem = (
    item: string,
    list: string[],
    setter: (newList: string[]) => void
  ) => {
    if (list.includes(item)) {
      setter(list.filter((i) => i !== item));
    } else {
      setter([...list, item]);
    }
  };

  useEffect(() => {
    onFilterChange({
      colors: selectedColors,
      productTypes: selectedTypes,
      tags: selectedTags,
      priceRanges: selectedPrices,
    });
  }, [
    selectedColors,
    selectedTypes,
    selectedTags,
    selectedPrices,
    onFilterChange,
  ]);

  return (
    <aside className="bg-white rounded-sm p-5 overflow-auto h-full">
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
                checked={selectedColors.includes(color)}
                onChange={() =>
                  toggleItem(color, selectedColors, setSelectedColors)
                }
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
          {tags.map((tag, index) => (
            <li
              key={index}
              className="flex items-center gap-2 cursor-pointer hover:text-orange-500"
            >
              <input
                type="checkbox"
                className="w-4 h-4"
                checked={selectedTags.includes(tag)}
                onChange={() => toggleItem(tag, selectedTags, setSelectedTags)}
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
                  checked={selectedTypes.includes(type)}
                  onChange={() =>
                    toggleItem(type, selectedTypes, setSelectedTypes)
                  }
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
                checked={selectedPrices.includes(price)}
                onChange={() =>
                  toggleItem(price, selectedPrices, setSelectedPrices)
                }
              />
              <span>
                {index === 0
                  ? "Giá dưới 1.000.000₫"
                  : index === prices.length - 1
                  ? "Giá trên 10.000.000₫"
                  : `Từ ${Number(price.split("-")[0]).toLocaleString(
                      "vi-VN"
                    )}₫ - ${Number(price.split("-")[1]).toLocaleString(
                      "vi-VN"
                    )}₫`}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
