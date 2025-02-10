import CountdownTimer from "./CountdownTimer";

const PricePromotionProductDetails: React.FC = ({}) => {
  return (
    <div className="flex flex-col border border-red-600 rounded-md overflow-hidden mt-2">
      <div className="flex justify-between items-center bg-red-600 px-3 py-2 text-white">
        <div className="block w-full">
          <span>Vừa mở bán</span>
          <div className="w-full bg-neutral-100 rounded-sm h-1">
            <div
              className="stock-percent bg-yellow-300 rounded-sm h-1"
              style={{ width: `20%` }}
            ></div>
          </div>
        </div>
        <div className="w-full flex justify-end">
          <CountdownTimer expiryDate="2025-01-20T23:59:59" />
        </div>
      </div>
      <div className="flex flex-wrap gap-1 items-baseline p-3">
        <span className="price text-3xl font-semibold text-red-400">
          10.000₫
        </span>
        <span className="text-[#929292] line-through text-base">10.000₫</span>
      </div>
    </div>
  );
};

export default PricePromotionProductDetails;
