import Image from "next/image";
import Collenction from "./Collenction";

const SectionCollectionList: React.FC = ({}) => {
  return (
    <div className="w-full h-[200px] max-h-[350px] max-md:h-[300px]  relative mt-5">
      {/* Ảnh nền */}
      <div className="">
        <Image
          src="/asset/coll_bg.jpg"
          alt="Collection background"
          layout="fill"
          objectFit="cover"
          className="absolute top-0 left-0"
        />
      </div>

      <div className="relative z-10 top-1/2 -translate-y-1/2 ">
        <div className="max-w-7xl mx-auto p-3 w-full h-full grid grid-cols-6 max-md:grid-cols-3 gap-5 max-md:my-5">
          <Collenction />
          <Collenction />
          <Collenction />
          <Collenction />
          <Collenction />
          <Collenction />
        </div>
      </div>
    </div>
  );
};

export default SectionCollectionList;
