import Link from "next/link";
import { BsTelephone } from "react-icons/bs";
import { IoStorefrontOutline } from "react-icons/io5";

const FoorterSidebar: React.FC = ({}) => {
  return (
    <div className="border-t border-neutral-200 flex">
      <div className="w-1/2">
        <Link
          href="/"
          className="header-icon-group flex gap-2 items-center  hover:bg-neutral-200 transition-all duration-150 px-2 py-4 store-group"
        >
          <div className="border p-1 rounded-lg">
            <IoStorefrontOutline size={20} />
          </div>
          <span className="text-xs">Hệ thống cửa hàng</span>
        </Link>
      </div>
      <div className="w-1/2">
        <Link
          href="/"
          className="header-icon-group flex gap-2 items-center  hover:bg-neutral-200 transition-all duration-150 px-2 py-4 store-group"
        >
          <div className="border p-1 rounded-lg">
            <BsTelephone size={20} />
          </div>
          <span className="text-xs">
            Hotline: <span className="font-semibold">1697534999</span>
          </span>
        </Link>
      </div>
    </div>
  );
};

export default FoorterSidebar;
