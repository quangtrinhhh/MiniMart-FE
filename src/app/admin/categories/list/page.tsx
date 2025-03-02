import { getCategories } from "@/app/api/categories/category.api";
import TableProductList from "@/components/layouts/table/TableProductList";
import AddButton from "@/components/ui/AddButton";
import EntriesSelector from "@/components/ui/EntriesSelector";
import SearchInput from "@/components/ui/SearchInput";
import { NextPage } from "next";
import { GoChevronRight } from "react-icons/go";

const Page: NextPage = async ({}) => {
  const res = await getCategories(1, 10);
  const { result, totalItems, totalPages } = res.data;

  return (
    <div>
      <div className="p-[30px] ">
        <div className="flex items-center flex-wrap justify-between gap20 mb-27">
          <h3 className="text-2xl text-black font-bold">Categries List</h3>
          <ul className="text-sm flex items-center flex-wrap justify-start gap10">
            <li>
              <a href="index.html">
                <div className="text-tiny">Dashboard</div>
              </a>
            </li>
            <li>
              <GoChevronRight />
            </li>
            <li>
              <a href="#">
                <div className="text-tiny">Categries</div>
              </a>
            </li>
            <li>
              <GoChevronRight />
            </li>
            <li>
              <div className="text-tiny">Categries List</div>
            </li>
          </ul>
        </div>
        {/*  */}
        <div className="bg-white rounded-md  p-5 mt-5">
          <div className="flex gap-5 ">
            <EntriesSelector />
            {/*  */}
            <SearchInput />
            {/*  */}
            <AddButton />
          </div>

          <TableProductList
            data={result}
            totalItemsProps={totalItems}
            totalPagesProps={totalPages}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
