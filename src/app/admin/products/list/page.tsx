import BreadcrumbAdmin from "@/components/layouts/admin/breadcrumb..admin";
import AddButton from "@/components/ui/AddButton";
import EntriesSelector from "@/components/ui/EntriesSelector";
import SearchInput from "@/components/ui/SearchInput";
const ListProductPage: React.FC = ({}) => {
  return (
    <div className="p-[30px] ">
      <div className="flex items-center flex-wrap justify-between gap20 mb-27">
        <h3 className="text-2xl text-black font-bold">Product List</h3>
        <BreadcrumbAdmin />
      </div>

      <div className="bg-white rounded-md  p-5 mt-5">
        <div className="flex gap-5 ">
          <EntriesSelector />
          {/*  */}
          <SearchInput />
          {/*  */}
          <AddButton />
        </div>

        {/* <TableProductList /> */}
      </div>
    </div>
  );
};

export default ListProductPage;
