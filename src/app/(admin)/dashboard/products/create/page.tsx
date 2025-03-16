import BreadcrumbAdmin from "@/components/layouts/admin/breadcrumb..admin";
// import ImageUploader from "@/components/ui/ImageUploader";
import ProductForm from "@/components/ui/ProductForm";

const CreatePage: React.FC = ({}) => {
  return (
    <div className="p-[30px]">
      <div className="flex items-center flex-wrap justify-between gap20 mb-27">
        <h3 className="text-2xl text-black font-bold">Tạo mới</h3>
        <BreadcrumbAdmin />
      </div>

      <div className=" mt-5">
        <ProductForm />
      </div>
    </div>
  );
};

export default CreatePage;
