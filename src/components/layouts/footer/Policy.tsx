import Link from "next/link";

const Policy: React.FC = () => {
  return (
    <div className="footer-col">
      <h5 className="text-sm font-semibold mb-2 flex items-center justify-between">
        Chính sách
      </h5>
      <ul className="list-menu text-sm space-y-4  list-disc pl-5 ">
        <li className="li_menu">
          <Link
            className="inline leading-5 tracking-tighter hover:text-[#ff9d02] "
            href="/lien-he"
            title="Liên hệ"
          >
            Chính sách bảo hành
          </Link>
        </li>

        <li className="li_menu">
          <Link
            href="/"
            className="inline leading-5 tracking-tighter hover:text-[#ff9d02] "
            title="Hệ thống cửa hàng"
          >
            Chính sách đổi trả
          </Link>
        </li>

        <li className="li_menu">
          <Link
            href="/"
            className="inline leading-5 tracking-tighter hover:text-[#ff9d02] "
            title="Câu hỏi thường gặp"
          >
            Chính sách bảo mật
          </Link>
        </li>

        <li className="li_menu">
          <Link
            href="/"
            className="inline leading-5 tracking-tighter hover:text-[#ff9d02] "
            title="Chương trình cộng tác viên"
          >
            Điều khoản dịch vụ
          </Link>
        </li>
      </ul>

      <div className="mt-5">
        <h5 className="text-sm font-semibold mb-2 flex items-center justify-between">
          Tổng đài hỗ trợ
        </h5>
        <ul className="list-menu text-sm space-y-4  list-disc pl-5 ">
          <li className="li_menu">
            <Link
              className="inline leading-5 tracking-tighter hover:text-[#ff9d02] "
              href="/lien-he"
              title="Liên hệ"
            >
              Gọi mua hàng: 19006750 (8h-20h)
            </Link>
          </li>

          <li className="li_menu">
            <Link
              href="/"
              className="inline leading-5 tracking-tighter hover:text-[#ff9d02] "
              title="Hệ thống cửa hàng"
            >
              Gọi bảo hành: 19006750 (8h-20h)
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Policy;
