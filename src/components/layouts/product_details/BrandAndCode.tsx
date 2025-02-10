import Link from "next/link";

const BrandAndCode: React.FC = ({}) => {
  return (
    <div className="flex text-xs gap-3 mt-2 border-b pb-3">
      <div className="flex gap-1">
        <span>Thương hiệu:</span>
        <Link href="/" className="font-semibold underline hover:text-[#ff9d02]">
          Minimart
        </Link>
      </div>
      <div className="flex gap-1">
        <span>Mã sản phẩm:</span>
        <span>Đang cập nhật</span>
      </div>
    </div>
  );
};

export default BrandAndCode;
