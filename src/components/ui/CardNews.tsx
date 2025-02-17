import Image from "next/image";
import Link from "next/link";
import { IoCalendarOutline } from "react-icons/io5";

interface CardNewsProps {
  urlImage: string;
  title: string;
  description: string;
  link: string;
}

const CardNews: React.FC<CardNewsProps> = ({
  urlImage,
  title,
  description,
  link,
}) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-md w-full h-full bg-white flex flex-col">
      {/* Phần hình ảnh */}
      <div className="w-full">
        <Image
          src={urlImage}
          alt={title}
          width={331}
          height={186}
          className="object-cover w-full h-[186px]" // Đảm bảo hình ảnh có cùng kích thước
        />
      </div>

      {/* Phần nội dung */}
      <div className="flex-grow p-4 flex flex-col">
        {/* Tiêu đề với chiều cao cố định */}
        <h3 className="text-sm font-semibold mb-2 min-h-[3rem] line-clamp-2">
          {title}
        </h3>

        {/* Mô tả với chiều cao cố định */}
        <p className="text-sm text-gray-500 mb-4 flex-grow hidden md:line-clamp-3">
          {description}
        </p>

        {/* Phần thông tin và nút */}
        <div className="border-t border-gray-200 pt-3 mt-auto">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center text-gray-500 gap-2">
              <IoCalendarOutline size={15} />
              <span>05/06/2024</span>
            </div>
            <Link
              href={link}
              className="text-[#ff3c02] hover:bg-[#ff3c02] hover:text-white font-semibold border border-[#ff3c02] rounded-full py-2 px-3"
            >
              Xem chi tiết
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardNews;
