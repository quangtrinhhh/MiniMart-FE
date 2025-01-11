import Link from "next/link";
import { BsTelephone } from "react-icons/bs";
import { CiLocationOn, CiMail } from "react-icons/ci";

const ContactInfo: React.FC = () => {
  return (
    <div className="contact-group mb-2">
      <div className="flex justify-start gap-1 mb-3">
        <CiLocationOn size={20} />
        <div className="info">
          <p className="text-sm tracking-tighter leading-5 ">Địa chỉ</p>

          <span className="font-semibold text-sm inline leading-5">
            70 Lu Gia, District 11, Ho Chi Minh City
          </span>
        </div>
      </div>
      <div className="xl:flex flex justify-between">
        <div className="flex justify-start gap-1 mb-3">
          <BsTelephone size={20} />
          <div className="info">
            <p className="text-sm tracking-tighter leading-5">Hotline</p>
            <Link
              className="font-semibold text-sm inline leading-5"
              href="tel:19006750"
              title="19006750"
            >
              19006750
            </Link>
          </div>
        </div>

        <div className="flex justify-start gap-1 mb-3">
          <CiMail size={20} />
          <div className="info">
            <p className="text-sm tracking-tighter leading-5">Email</p>
            <a
              className="font-semibold text-sm inline leading-5"
              href="tel:19006750"
              title="19006750"
            >
              quangcute504@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
