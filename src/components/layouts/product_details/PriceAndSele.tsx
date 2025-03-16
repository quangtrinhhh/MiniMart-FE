import { formatCurrency } from "@/ulils/currency";

interface Props {
  price?: number;
  old_price?: number;
  discount?: number;
}

const PriceAndSele: React.FC<Props> = ({ price, old_price, discount }) => {
  return (
    <div>
      <div className="flex flex-wrap gap-1 items-baseline p-3">
        <span className="price text-3xl font-semibold text-red-600">
          {formatCurrency(price)}
        </span>
        <span className="text-[#929292] line-through text-base">
          {formatCurrency(old_price)}
        </span>
        {discount != 0 && (
          <div className="bg-red-600 px-4 py-1 text-white font-semibold rounded-full">
            <span>-{discount}%</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PriceAndSele;
