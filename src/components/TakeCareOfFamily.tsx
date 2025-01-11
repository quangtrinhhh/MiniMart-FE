"use client";
import { useState } from "react";
import Product from "./Product";
import TitleHeading from "./TitleHeading";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

// Định nghĩa kiểu dữ liệu cho sản phẩm
interface ProductType {
  name: string;
  price: string;
  oldPrice: string;
  discount: string;
  stock: number;
  sold: number;
  stockPercent: number;
  images: string[];
}

// Định nghĩa kiểu cho các loại sản phẩm
const productData: Record<
  "Nước giặt quần áo" | "Nước lau sàn" | "Xịt phòng, sáp thơm",
  ProductType[]
> = {
  "Nước giặt quần áo": [
    {
      name: "Nước giặt OMO Matic",
      price: "350.000Đ",
      oldPrice: "400.000Đ",
      discount: "-10%",
      stock: 20,
      sold: 15,
      stockPercent: 75,
      images: [
        "/asset/frame-102-1.jpg", // Ảnh đầu tiên
        "/asset/frame-101.jpg", // Ảnh thứ hai (hover)
      ],
    },
    {
      name: "Nước giặt OMO Matic",
      price: "350.000Đ",
      oldPrice: "400.000Đ",
      discount: "-10%",
      stock: 20,
      sold: 15,
      stockPercent: 75,
      images: [
        "/asset/frame-102-1.jpg", // Ảnh đầu tiên
        "/asset/frame-101.jpg", // Ảnh thứ hai (hover)
      ],
    },
    {
      name: "Nước giặt OMO Matic",
      price: "350.000Đ",
      oldPrice: "400.000Đ",
      discount: "-10%",
      stock: 20,
      sold: 15,
      stockPercent: 75,
      images: [
        "/asset/frame-102-1.jpg", // Ảnh đầu tiên
        "/asset/frame-101.jpg", // Ảnh thứ hai (hover)
      ],
    },
    {
      name: "Nước giặt OMO Matic",
      price: "350.000Đ",
      oldPrice: "400.000Đ",
      discount: "-10%",
      stock: 20,
      sold: 15,
      stockPercent: 75,
      images: [
        "/asset/frame-102-1.jpg", // Ảnh đầu tiên
        "/asset/frame-101.jpg", // Ảnh thứ hai (hover)
      ],
    },
    {
      name: "Nước giặt OMO Matic",
      price: "350.000Đ",
      oldPrice: "400.000Đ",
      discount: "-10%",
      stock: 20,
      sold: 15,
      stockPercent: 75,
      images: [
        "/asset/frame-102-1.jpg", // Ảnh đầu tiên
        "/asset/frame-101.jpg", // Ảnh thứ hai (hover)
      ],
    },
    {
      name: "Nước giặt OMO Matic",
      price: "350.000Đ",
      oldPrice: "400.000Đ",
      discount: "-10%",
      stock: 20,
      sold: 15,
      stockPercent: 75,
      images: [
        "/asset/frame-102-1.jpg", // Ảnh đầu tiên
        "/asset/frame-101.jpg", // Ảnh thứ hai (hover)
      ],
    },
  ],
  "Nước lau sàn": [
    {
      name: "Nước lau sàn Sunlight",
      price: "300.000Đ",
      oldPrice: "350.000Đ",
      discount: "-15%",
      stock: 10,
      sold: 5,
      stockPercent: 50,
      images: [
        "/asset/frame-102-1.jpg", // Ảnh đầu tiên
        "/asset/frame-101.jpg", // Ảnh thứ hai (hover)
      ],
    },
  ],
  "Xịt phòng, sáp thơm": [
    {
      name: "Xịt phòng Glade hương Lavender",
      price: "250.000Đ",
      oldPrice: "300.000Đ",
      discount: "-16%",
      stock: 8,
      sold: 20,
      stockPercent: 80,
      images: [
        "/asset/frame-102-1.jpg", // Ảnh đầu tiên
        "/asset/frame-101.jpg", // Ảnh thứ hai (hover)
      ],
    },
  ],
};

const TakeCareOfFamily: React.FC = () => {
  const [selectedTab, setSelectedTab] =
    useState<keyof typeof productData>("Nước giặt quần áo");

  return (
    <div className="mt-10">
      <TitleHeading titleHeading="Chăm sóc gia đình" />
      <div className="">
        <ul className="flex flex-wrap gap-5 text-center justify-center mt-5 cursor-pointer text-sm">
          {Object.keys(productData).map((tab) => (
            <li
              key={tab}
              className={`py-2 px-5 font-semibold ${
                selectedTab === tab
                  ? "bg-[#ff3c02] text-white"
                  : "bg-white text-[#ff3c02] hover:text-black"
              }`}
              onClick={() => setSelectedTab(tab as keyof typeof productData)}
            >
              {tab}
            </li>
          ))}
        </ul>
        <div className="grid grid-cols-6 mt-5 gap-[0.8px] max-lg:grid-cols-3 max-md:grid-cols-2 ma">
          {productData[selectedTab].map((product, index) => (
            <Product
              key={index}
              name={product.name}
              price={product.price}
              oldPrice={product.oldPrice}
              discount={product.discount}
              stock={product.stock}
              sold={product.sold}
              stockPercent={product.stockPercent}
              images={product.images}
            />
          ))}
        </div>
      </div>
      <Link
        href="/"
        className="bg-white w-full text-center py-2 mt-5 rounded-md flex justify-center items-center gap-1 text-[#016735]"
      >
        Xem tất cả
        <IoIosArrowForward size={15} />
      </Link>
    </div>
  );
};

export default TakeCareOfFamily;
