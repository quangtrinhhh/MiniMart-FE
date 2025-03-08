"use client";
import Heading from "./Heading";
import { useState } from "react";

interface IProps {
  description: string;
}

const ContentProduct: React.FC<IProps> = ({ description }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const MAX_LENGTH = 200; // Giới hạn ký tự hiển thị ban đầu

  const handleToggleContent = () => {
    setIsExpanded(!isExpanded);
  };

  // Chia đoạn văn theo \n
  const paragraphs = description
    .split("\n")
    .filter((line) => line.trim() !== "");

  return (
    <div className="content-product mb-5">
      <Heading />
      <div className="container lg:w-4/6 mx-auto mt-5">
        <div className="content">
          {/* In đậm dòng đầu tiên */}
          <p className="font-bold uppercase mb-4">{paragraphs[0]}</p>

          {isExpanded
            ? // Hiển thị toàn bộ nội dung với xuống dòng đúng
              paragraphs.slice(1).map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))
            : // Hiển thị đoạn đầu nếu nội dung dài
            paragraphs[1] && paragraphs[1].length > MAX_LENGTH
            ? `${paragraphs[1].slice(0, MAX_LENGTH)}...`
            : paragraphs[1] || ""}
        </div>

        {description.length > MAX_LENGTH && (
          <div className="flex justify-center mt-4">
            <button
              className="border border-orange-500 flex items-center text-orange-500 px-4 py-2 rounded-full hover:bg-orange-500 hover:text-white font-semibold"
              onClick={handleToggleContent}
            >
              {isExpanded ? "Thu gọn" : "Xem thêm"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentProduct;
