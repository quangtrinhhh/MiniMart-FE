import Link from "next/link";
import CountdownTimer from "./CountdownTimer";
import ProductSeles from "./ProductSeles";

const DiscountedProducts: React.FC = () => {
  return (
    <div>
      <div className="bg-[#ff3c02] lg:rounded-lg overflow-hidden">
        <div className="flex justify-between   items-center px-4 md:px-6 py-4 max-md:flex-col max-md:gap-4">
          <div className="flex items-center gap-2 md:gap-3">
            <h2 className="text-4xl text-white text-center lg:text-h1  font-bold flashsale-heading">
              <Link href="/" title="Chớp thời cơ. Giá như mơ!">
                Chớp thời cơ. Giá như mơ!
              </Link>
            </h2>
          </div>
          <CountdownTimer endTime="2026-01-04 22:13:59" />
        </div>
        <div className="p-1  ">
          <div className="">
            <ProductSeles />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscountedProducts;
