import Image from "next/image";

const HeaderAdmin: React.FC = ({}) => {
  return (
    <div className=" bg-white pl-5 p-3 border-b flex justify-end">
      <div className="flex items-center gap-2">
        <div className="flex flex-col ">
          <span className="text-sm font-bold text-[#111]">Quang Trịnh</span>
          <span className="text-xs text-[#95989D]">Admin</span>
        </div>
        <div className="border-2 border-green-500 hover:border-green-600 hover:shadow-green-600 hover:shadow-2xl w-10 h-10 rounded-full flex items-center justify-center">
          <Image
            src="/asset/logo.png"
            alt="Logo"
            width={100}
            height={100}
            className="p-1"
          />
        </div>
      </div>
    </div>
  );
};

export default HeaderAdmin;
