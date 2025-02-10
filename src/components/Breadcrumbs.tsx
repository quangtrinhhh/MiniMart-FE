import Link from "next/link";

const Breadcrumbs: React.FC = ({}) => {
  return (
    <div>
      <div className=" bg-[#f2f6f3]">
        <ul className=" max-w-7xl mx-auto p-3 breadcrumb py-3 flex flex-wrap items-center text-xs md:text-sm">
          <li className="home">
            <Link className="link" href="/" title="Trang chủ">
              <span>Trang chủ</span>
            </Link>
            <span className="mx-1 md:mx-2 inline-block">&nbsp;/&nbsp;</span>
          </li>

          <li>
            <a className="changeurl link" href="/sua-cac-loai">
              <span>Sữa các loại</span>
            </a>
            <span className="mx-1 md:mx-2 inline-block">&nbsp;/&nbsp;</span>
          </li>

          <li>
            <span className="text-neutral-400">
              Nước xả vải Downy hương hoa Oải Hương nước Pháp
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Breadcrumbs;
