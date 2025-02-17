import Image from "next/image";
import { FaPlayCircle } from "react-icons/fa";

interface CardShortVideoProps {
  urlImage: string;
  title: string;
}
const CardShortVideo: React.FC<CardShortVideoProps> = ({ urlImage, title }) => {
  return (
    <div className="group">
      <div className="relative  ">
        <div className="w-full h-auto overflow-hidden rounded-lg">
          <Image src={urlImage} alt="" width={300} height={100} />
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-35 group-hover:opacity-100 transition-opacity duration-300 text-white">
          <FaPlayCircle size={40} />
        </div>
      </div>
      <div className="mt-3 text-center text-sm line-clamp-2 group-hover:text-[#ff9d02]">
        {title}
      </div>
    </div>
  );
};

export default CardShortVideo;
