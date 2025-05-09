"use client";
import { useState } from "react";
import TitleHeading from "./TitleHeading";
import CardNews from "../../ui/CardNews";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

interface NewsType {
  title: string;
  description: string;
  image: string;
  link: string;
}

const NewsData: Record<
  "Mẹo hay" | "Tin nổi bật" | "Tin công nghệ",
  NewsType[]
> = {
  "Mẹo hay": [
    {
      title: "5 mẹo nhỏ giúp bạn làm sạch nhà cửa hiệu quả",
      description:
        "Học cách làm sạch nhanh và hiệu quả với các mẹo đơn giản. Học cách làm sạch nhanh và hiệu quả với các mẹo đơn giản.Học cách làm sạch nhanh và hiệu quả với các mẹo đơn giản.",
      image: "/asset/frame-11-2.jpg",
      link: "/news/cleaning-tips",
    },
    {
      title: "Bí quyết tiết kiệm điện trong gia đình",
      description: "Giảm chi phí điện hàng tháng với các bước đơn giản.",
      image: "/asset/frame-11-2.jpg",
      link: "/news/save-energy",
    },
  ],
  "Tin nổi bật": [
    {
      title: "Công nghệ xanh đang thay đổi thế giới",
      description: "Khám phá cách công nghệ xanh góp phần bảo vệ môi trường.",
      image: "/asset/frame-11-2.jpg",
      link: "/news/green-tech",
    },
    {
      title: "Thị trường bất động sản năm 2025",
      description: "Phân tích xu hướng và cơ hội trong lĩnh vực bất động sản.",
      image: "/asset/frame-11-2.jpg",
      link: "/news/real-estate-trends",
    },
  ],
  "Tin công nghệ": [
    {
      title: "Sản phẩm công nghệ mới nhất năm 2025",
      description: "Tổng hợp các sản phẩm công nghệ đáng chú ý vừa ra mắt.",
      image: "/asset/frame-11-2.jpg",
      link: "/news/new-tech-products",
    },
    {
      title: "AI và tương lai của ngành giáo dục",
      description:
        "Trí tuệ nhân tạo đang thay đổi cách chúng ta học tập như thế nào.",
      image: "/asset/frame-11-2.jpg",
      link: "/news/ai-education",
    },
  ],
};

const SectionNews: React.FC = () => {
  const [selectedTab, setSelectedTab] =
    useState<keyof typeof NewsData>("Mẹo hay");

  return (
    <div className="mt-14">
      <TitleHeading titleHeading="Tin tức" />
      <ul className="flex flex-wrap gap-4 text-center justify-center mt-5 cursor-pointer text-sm">
        {Object.keys(NewsData).map((tab) => (
          <li
            key={tab}
            className={`py-2 px-5 font-semibold ${
              selectedTab === tab
                ? "bg-[#ff3c02] text-white"
                : "bg-white text-[#ff3c02] hover:text-black"
            }`}
            onClick={() => setSelectedTab(tab as keyof typeof NewsData)}
          >
            {tab}
          </li>
        ))}
      </ul>
      <div className="grid grid-cols-4 gap-3 mt-5 max-md:grid-cols-2 max-sm:grid-cols-1">
        {NewsData[selectedTab].map((news, index) => (
          <CardNews
            urlImage={news.image}
            link="/"
            description={news.description}
            title={news.title}
            key={index}
          />
        ))}
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

export default SectionNews;
