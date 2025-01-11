import Image from "next/image";

const Collenction: React.FC = ({}) => {
  return (
    <div className="text-center flex flex-col items-center gap-1 lg:gap-3 p-2 xl:p-2.5 group hover:brightness-[0.98] cursor-pointer ">
      <div className=" w-[5.2rem] h-[5.2rem] max-md:w-16 max-md:h-16 flex items-center justify-center rounded-full overflow-hidden group-hover:scale-110 duration-200">
        <Image src="/asset/coll_3.png" width={120} height={120} alt="" />
      </div>
      <span className="text-sm font-semibold lg:text-base line-clamp-2 text-white text-center">
        Đồ dùng nhà bếp
      </span>
    </div>
  );
};

export default Collenction;
