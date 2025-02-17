import CopyButton from "./CopyButton";

const CardDiscountCode: React.FC = ({}) => {
  return (
    <div>
      <div className=" bg-white rounded-lg w-full  ">
        <div className=" p-3 w-full">
          <div className="p-3 border-dashed border-2 border-[#ebebeb] rounded-lg">
            <div className="grid grid-cols-2 justify-between items-center text-center gap-1 mb-1 ">
              <div className="font-semibold text-left text-[#016735] text-sm whitespace-nowrap text-ellipsis overflow-hidden">
                <span>Mã: EGA50THANG10</span>
              </div>
              <div className="text-sm text-right text-neutral-500">
                <span>HSD: 28/06/2024 </span>
              </div>
            </div>
            <div className="mb-2.5 text-xs">
              Giảm 15% cho đơn hàng giá trị tối thiểu 500k. Mã giảm tối đa 250K
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button className="text-xs font-semibold rounded-full py-2  border border-[#ff3c02] text-[#ff3c02] hover:bg-[#ff3c02] hover:text-white ">
                Điều kiện
              </button>
              <CopyButton
                value="EGA30THANG10"
                copiedText="Đã sao chép"
                isExpired={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDiscountCode;
