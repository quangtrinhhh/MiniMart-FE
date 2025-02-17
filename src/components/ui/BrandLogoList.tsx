import Image from "next/image";

const BrandLogoList: React.FC = ({}) => {
  const ListLogo = new Array(12).fill(null);
  return (
    <div className="mt-10">
      <div className="bg-white ">
        <div className=" overflow-auto flex flex-nowrap lg:grid lg:grid-cols-6 p-1 gap-1">
          {ListLogo.map((_, index) => (
            <div
              className=" w-auto lg:w-full flex-shrink-0 flex-grow-0 overflow-hidden hover:scale-110 duration-300"
              key={index}
            >
              <Image
                src={`/asset/brand_${index + 1}.png`}
                alt=""
                width={179}
                height={80}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandLogoList;
