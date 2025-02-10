const ProductVariants: React.FC = ({}) => {
  return (
    <div className="flex gap-5 mt-5 text-sm">
      <div className="text-neutral-500 ">Dung tích:</div>
      <div className="flex gap-5">
        <div className="box border px-4 py-2 cursor-pointer border-black">
          2.2L
        </div>
        <div className="box border px-4 py-2 cursor-pointer">3L</div>
      </div>
    </div>
  );
};

export default ProductVariants;
