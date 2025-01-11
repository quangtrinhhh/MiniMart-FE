import Image from "next/image";
import Link from "next/link";

const SocialIcons: React.FC = () => {
  return (
    <div className="social-icons">
      <p className="text-sm tracking-tighter leading-5 mb-2 font-semibold">
        Mạng xã hội
      </p>
      <div className="flex gap-3">
        <div className="facebook  border border-[#EBEBEB] rounded-sm flex items-center justify-center w-[2.3rem] h-[2.3rem] hover:bg-[#EBEBEB]">
          <Link href="/" target="_blank" aria-label="Facebook" title="Facebook">
            <Image
              src="/asset/facebook.png"
              alt="logo"
              width={20}
              height={20}
            />
          </Link>
        </div>

        <div className="youtube border border-[#EBEBEB] rounded-sm flex items-center justify-center w-[2.3rem] h-[2.3rem] hover:bg-[#EBEBEB]">
          <Link href="/" target="_blank" aria-label="Facebook" title="Facebook">
            <Image src="/asset/youtube.png" alt="logo" width={20} height={20} />
          </Link>
        </div>

        <div className="tiktok border border-[#EBEBEB] rounded-sm flex items-center justify-center w-[2.3rem] h-[2.3rem] hover:bg-[#EBEBEB]">
          <Link href="/" target="_blank" aria-label="Facebook" title="Facebook">
            <Image src="/asset/tiktok.png" alt="logo" width={20} height={20} />
          </Link>
        </div>

        <div className="instgram border border-[#EBEBEB] rounded-sm flex items-center justify-center w-[2.3rem] h-[2.3rem] hover:bg-[#EBEBEB]">
          <Link href="/" target="_blank" aria-label="Facebook" title="Facebook">
            <Image src="/asset/zalo.png" alt="logo" width={20} height={20} />
          </Link>
        </div>

        <div className="instgram border border-[#EBEBEB] rounded-sm flex items-center justify-center w-[2.3rem] h-[2.3rem] hover:bg-[#EBEBEB]">
          <Link href="/" target="_blank" aria-label="Facebook" title="Facebook">
            <Image
              src="/asset/facebook.png"
              alt="logo"
              width={20}
              height={20}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SocialIcons;
