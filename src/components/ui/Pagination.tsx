"use client";
import { useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

interface IProps {
  totalPagesProps: number;
  totalItemsProps: number;
}

const Pagination: React.FC<IProps> = ({ totalPagesProps, totalItemsProps }) => {
  const [currentPage, setCurrentPage] = useState(2); // Trang hiện tại
  const totalPages = totalPagesProps; // Tổng số trang

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="mt-5 border-t">
      <div className="mt-3 flex justify-between items-center">
        <div className="text-[#95989D] text-xs">
          Showing {totalItemsProps} entries
        </div>
        <ul className="flex items-center gap-2">
          {/* Nút quay lại */}
          <li
            onClick={handlePrevPage}
            className="border rounded-full p-2 duration-300 font-bold hover:bg-[#2275fc] hover:text-white cursor-pointer flex justify-center items-center"
          >
            <IoChevronBack size={20} />
          </li>

          {/* Nút phân trang */}
          {[...Array(totalPages)].map((_, index) => {
            const pageNumber = index + 1;
            return (
              <li
                key={pageNumber}
                onClick={() => handlePageClick(pageNumber)}
                className={`w-10 h-10 flex justify-center items-center duration-300 font-bold cursor-pointer rounded-full ${
                  pageNumber === currentPage
                    ? "bg-[#2275fc] text-white"
                    : "hover:bg-[#2275fc] hover:text-white"
                }`}
              >
                {pageNumber}
              </li>
            );
          })}

          {/* Nút tiếp theo */}
          <li
            onClick={handleNextPage}
            className="border rounded-full p-2 duration-300 font-bold hover:bg-[#2275fc] hover:text-white cursor-pointer flex justify-center items-center"
          >
            <IoChevronForward size={20} />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Pagination;
