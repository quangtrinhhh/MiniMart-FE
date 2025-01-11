import Link from "next/link";

const CustomerSupport: React.FC = () => {
  return (
    <div className="footer-col">
      <h5 className="text-sm font-semibold mb-2 flex items-center justify-between">
        Hỗ trợ khách hàng
      </h5>
      <ul className="list-menu text-sm space-y-4  list-disc pl-5 ">
        <li className="li_menu">
          <Link
            className="inline leading-5 tracking-tighter hover:text-[#ff9d02] "
            href="/lien-he"
            title="Liên hệ"
          >
            Liên hệ
          </Link>
        </li>

        <li className="li_menu">
          <Link
            href="/"
            className="inline leading-5 tracking-tighter hover:text-[#ff9d02] "
            title="Hệ thống cửa hàng"
          >
            Hệ thống cửa hàng
          </Link>
        </li>

        <li className="li_menu">
          <Link
            href="/"
            className="inline leading-5 tracking-tighter hover:text-[#ff9d02] "
            title="Câu hỏi thường gặp"
          >
            Câu hỏi thường gặp
          </Link>
        </li>

        <li className="li_menu">
          <Link
            href="/"
            className="inline leading-5 tracking-tighter hover:text-[#ff9d02] "
            title="Chương trình cộng tác viên"
          >
            Chương trình cộng tác viên
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default CustomerSupport;
