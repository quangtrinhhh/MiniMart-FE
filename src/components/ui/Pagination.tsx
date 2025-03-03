"use client";
import { useState, useEffect } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

interface IProps {
  totalPagesProps?: number;
  totalItemsProps?: number;
  setCurrent?: (value: number) => void;
}

const Pagination: React.FC<IProps> = ({
  totalPagesProps = 1,
  totalItemsProps = 0,
  setCurrent,
}) => {
  const totalPages = Number.isNaN(totalPagesProps)
    ? 1
    : Math.max(totalPagesProps, 1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrent?.(currentPage);
  }, [currentPage, setCurrent]);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 3) {
      return [1, 2, 3, "ellipsis-right", totalPages];
    }
    if (currentPage >= totalPages - 2) {
      return [1, "ellipsis-left", totalPages - 2, totalPages - 1, totalPages];
    }
    return [
      1,
      "ellipsis-left",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "ellipsis-right",
      totalPages,
    ];
  };

  return (
    <div className="mt-5 border-t">
      <div className="mt-3 flex justify-between items-center">
        <div className="text-[#95989D] text-xs">
          Showing {totalItemsProps} entries
        </div>
        <ul className="flex items-center gap-2">
          <li
            onClick={handlePrevPage}
            className={`border rounded-full p-2 duration-300 font-bold ${
              currentPage === 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-[#2275fc] hover:text-white cursor-pointer"
            } flex justify-center items-center`}
          >
            <IoChevronBack size={20} />
          </li>

          {getPageNumbers().map((pageNumber) =>
            pageNumber === "ellipsis-left" ||
            pageNumber === "ellipsis-right" ? (
              <li key={pageNumber} className="px-3">
                ...
              </li>
            ) : (
              <li
                key={`page-${pageNumber}`}
                onClick={() => handlePageClick(Number(pageNumber))}
                className={`w-10 h-10 flex justify-center items-center duration-300 font-bold cursor-pointer rounded-full ${
                  pageNumber === currentPage
                    ? "bg-[#2275fc] text-white"
                    : "hover:bg-[#2275fc] hover:text-white"
                }`}
              >
                {pageNumber}
              </li>
            )
          )}

          <li
            onClick={handleNextPage}
            className={`border rounded-full p-2 duration-300 font-bold ${
              currentPage === totalPages
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-[#2275fc] hover:text-white cursor-pointer"
            } flex justify-center items-center`}
          >
            <IoChevronForward size={20} />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Pagination;
