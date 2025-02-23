import AddButton from "@/components/ui/AddButton";
import EntriesSelector from "@/components/ui/EntriesSelector";
import SearchInput from "@/components/ui/SearchInput";
import TableProductList from "@/components/layouts/table/TableProductList";
import { GoChevronRight } from "react-icons/go";
const ListProductPage: React.FC = ({}) => {
  return (
    <div className="p-[30px] ">
      <div className="flex items-center flex-wrap justify-between gap20 mb-27">
        <h3 className="text-2xl text-black font-bold">Product List</h3>
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
              <div className="text-tiny">Products</div>
            </a>
          </li>
          <li>
            <GoChevronRight />
          </li>
          <li>
            <div className="text-tiny">Product List</div>
          </li>
        </ul>
      </div>

      <div className="bg-white rounded-md  p-5 mt-5">
        <div className="flex gap-5 ">
          <EntriesSelector />
          {/*  */}
          <SearchInput />
          {/*  */}
          <AddButton />
        </div>

        <TableProductList />
      </div>
    </div>
  );
};

export default ListProductPage;
