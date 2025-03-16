interface Props {
  sold: number;
  stock: number;
}

const ProductSoldIndicator: React.FC<Props> = ({ sold, stock }) => {
  const percentage = stock > 0 ? ((sold / stock) * 100).toFixed(2) : 0;
  return (
    <div>
      <div className="w-full">
        <span className="text-sm mb-1 hover:text-[#ff9d02]">
          Đã bán {sold || 0} sản phẩm
        </span>
        <div className="w-full bg-neutral-100 rounded-sm h-1">
          <div
            className="bg-[#ee1926] rounded-sm h-1"
            style={{
              width: `${percentage}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProductSoldIndicator;
