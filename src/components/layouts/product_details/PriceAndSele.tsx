import { formatCurrency } from "@/ulils/currency";

interface Props {
  price?: number;
  old_price?: number;
  discount?: number;
}

const PriceDisplay: React.FC<Props> = ({ price, old_price, discount }) => {
  const validPrice = typeof price === "number" && price > 0;
  const validOldPrice = typeof old_price === "number" && old_price > price!;
  const calculatedDiscount =
    validOldPrice && validPrice
      ? Math.round(((old_price! - price!) / old_price!) * 100)
      : 0;

  const finalDiscount = discount ?? calculatedDiscount;

  if (!validPrice) {
    return <span className="text-gray-500 text-base">Liên hệ</span>;
  }

  return (
    <div className="flex flex-wrap gap-2 items-baseline p-3">
      <span className="text-3xl font-semibold text-red-600">
        {formatCurrency(price)}
      </span>

      {validOldPrice && (
        <span className="text-[#929292] line-through text-base">
          {formatCurrency(old_price)}
        </span>
      )}

      {finalDiscount > 0 && validOldPrice && (
        <div className="bg-red-600 px-3 py-1 text-white text-sm font-semibold rounded-full">
          -{finalDiscount}%
        </div>
      )}
    </div>
  );
};

export default PriceDisplay;
