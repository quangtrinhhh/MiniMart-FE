import Link from "next/link";

const HeaderBottom: React.FC = () => {
  return (
    <div className="bg-[#016735] ">
      <div className="max-w-3xl mx-auto">
        <ul className="flex  items-center text-white justify-center text-sm font-semibold">
          <li className="hover:text-orange-500 py-3 px-[1rem]">
            <Link href="/gioi-thieu">Giới thiệu</Link>
          </li>

          {/*  */}

          <li className="hover:text-orange-500 py-3 px-[1rem]">
            <Link href="/tin-tuc">Tin tức</Link>
          </li>
          <li className="hover:text-orange-500 py-3 px-[1rem]">
            <Link href="/">Kiểm tra đơn hàng</Link>
          </li>
          <li className="hover:text-orange-500 py-3 px-[1rem]">
            <Link href="/lien-he">Liên hệ</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HeaderBottom;
