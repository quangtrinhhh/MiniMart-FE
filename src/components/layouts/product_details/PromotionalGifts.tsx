import { LiaGiftSolid } from "react-icons/lia";

const PromotionalGifts: React.FC = ({}) => {
  return (
    <div className="mt-5">
      <div className="border border-[#EBF4E5] rounded-md text-sm">
        <div className="flex items-center text-[#218410] bg-[#EBF4E5] gap-1 px-5 py-1.5">
          <LiaGiftSolid size={20} />
          <span>Quà tặng khuyến mãi</span>
        </div>
        <div className="promo-box__body px-5 bg-background p-3 flex lg:grid grid-cols-2 gap-1 flex-col">
          <div className="promo-box__body-item">
            1. Nhập mã EGANY thêm 5% đơn hàng
          </div>
          <div className="promo-box__body-item">
            2. Giảm giá 10% khi mua từ 5 sản phẩm
          </div>
          <div className="promo-box__body-item">
            3. Giảm giá 20% khi mua từ 10 sản phẩm
          </div>
          <div className="promo-box__body-item">
            4. Tặng phiếu mua hàng khi mua từ 500k
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionalGifts;
