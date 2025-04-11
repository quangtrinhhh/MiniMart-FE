import Image from "next/image";
import Collenction from "./Collenction";
import { useQuery } from "@tanstack/react-query";
import { getAllParentCategories } from "@/app/api/categories/category.api";
import Link from "next/link";

const SectionCollectionList: React.FC = ({}) => {
  const { data } = useQuery({
    queryKey: ["category"],
    queryFn: () => getAllParentCategories(),
  });
  const categoryList = data?.data.result;
  console.log("categoryList: ", categoryList);

  return (
    <div className="w-full h-[200px] max-h-[350px] max-md:h-[300px]  relative mt-5">
      {/* Ảnh nền */}
      <div className="">
        <Image
          src="/asset/coll_bg.jpg"
          alt="Collection background"
          fill
          className="absolute top-0 left-0 object-cover"
        />
      </div>

      <div className="relative z-10 top-1/2 -translate-y-1/2 ">
        <div className="max-w-7xl mx-auto p-3 w-full h-full grid grid-cols-6 max-md:grid-cols-3 gap-5 max-md:my-5">
          {categoryList?.map((category, index) => (
            <Link href={`/collections/${category.slug}`} key={index}>
              <Collenction
                key={index}
                image={category.image}
                name={category.name}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionCollectionList;
