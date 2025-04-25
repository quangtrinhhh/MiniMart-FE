// components/ui/Sidebar.tsx
import React from "react";
import Image from "next/image";

interface SidebarProps {
  newsData: Array<{
    image: string;
    title: string;
    link: string;
  }>;
}

const SidebarNews: React.FC<SidebarProps> = ({ newsData }) => {
  return (
    <div className="w-[20%] p-4 bg-white shadow-lg rounded-lg max-h-[400px]    h-auto">
      <div className="flex flex-col mb-8">
        <h2 className="text-xl font-semibold mb-4">Danh mục</h2>
        <ul className="space-y-4">
          <li className="text-lg font-medium hover:text-blue-600 cursor-pointer">
            Mẹo hay
          </li>
          <li className="text-lg font-medium hover:text-blue-600 cursor-pointer">
            Tin nổi bật
          </li>
          <li className="text-lg font-medium hover:text-blue-600 cursor-pointer">
            Tin công nghệ
          </li>
        </ul>
      </div>

      {/* Tin tức nổi bật */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Tin tức nổi bật</h3>
        <div className="flex flex-col gap-4">
          {newsData.slice(0, 3).map((news, index) => (
            <div className="flex gap-2 w-full max-w-[200px]" key={index}>
              <Image
                src={news.image}
                alt={news.title}
                width={50}
                height={30}
                className="object-cover rounded-md mb-2"
              />
              <h4 className="text-sm font-medium truncate">{news.title}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SidebarNews;
