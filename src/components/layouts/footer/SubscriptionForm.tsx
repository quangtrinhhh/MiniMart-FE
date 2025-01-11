import Image from "next/image";

const SubscriptionForm: React.FC = () => {
  return (
    <div className="footer-col">
      <div className="email-subscribe flex flex-col gap-2 ">
        <p className="text-sm tracking-tighter leading-5 font-semibold">
          Đăng ký nhận ưu đãi
        </p>
        <p className="text-sm tracking-tighter leading-5 mb-1">
          Bạn muốn nhận khuyến mãi đặc biệt? Đăng kí tham gia ngay cộng động hơn
          68.000+ người theo dõi của chúng tôi để cập nhật khuyến mãi ngay lập
          tức
        </p>
        <form className=" flex gap-1 items-center w-full">
          <div className="flex gap-1 w-full">
            <input
              type="email"
              name="EMAIL"
              id="email"
              className="p-3 text-sm  rounded-full leading-3 w-full border border-[#EBEBEB] focus:border-[#016735] focus:outline-none"
              placeholder="Email của bạn..."
            />
            <button
              type="submit"
              className="border border-transparent text-center transition-transform p-3 bg-[#016735] text-white rounded-full shrink-0"
            >
              Đăng ký
            </button>
          </div>
        </form>
      </div>
      <div className="trust-badges mt-6">
        <p className="font-semibold mb-3">PHƯƠNG THỨC THANH TOÁN</p>
        <a href="/" title="PHƯƠNG THỨC THANH TOÁN" target="_blank">
          <Image
            src="/asset/footer-trustbadge.png"
            alt="PHƯƠNG THỨC THANH TOÁN"
            width={246}
            height={53}
          ></Image>
        </a>
      </div>
    </div>
  );
};

export default SubscriptionForm;
