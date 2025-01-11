import Image from "next/image";
import ContactInfo from "./ContactInfo";
import SocialIcons from "./SocialIcons";

const FooterLogo: React.FC = () => {
  return (
    <div className="footer-logo mb-3 block" title="logo EGA Mini Mart">
      <Image src="/asset/logo.png" alt="logo" width={100} height={200} />
      <div className="text-sm font-semibold mb-2 mt-2 leading-[21px] ">
        Siêu thị Mini EGA
      </div>
      <p className="mb-3 text-sm leading-5 tracking-tighter">
        Thương hiệu siêu thị uy tín và chất lượng, cam kết mang đến những trải
        nghiệm mua sắm tiện lợi, hiện đại và phong phú
      </p>
      <p className="mb-3 text-sm leading-5 tracking-tighter">
        Mã số thuế: 12345678999
      </p>
      <ContactInfo />
      <SocialIcons />
    </div>
  );
};
export default FooterLogo;
