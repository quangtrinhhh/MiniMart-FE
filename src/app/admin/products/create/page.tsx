import ImageUploader from "@/components/ui/ImageUploader";
import ProductForm from "@/components/ui/ProductForm";
import { GoChevronRight } from "react-icons/go";

const CreatePage: React.FC = ({}) => {
  return (
    <div className="p-[30px]">
      <div className="flex items-center flex-wrap justify-between gap20 mb-27">
        <h3 className="text-2xl text-black font-bold">create Product</h3>
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
            <div className="text-tiny">Create product</div>
          </li>
        </ul>
      </div>

      <div className="flex gap-5">
        <ProductForm />
        {/*  */}
        <div className="bg-white rounded-md flex-1 flex flex-col gap-5 p-5 mt-5">
          <fieldset name="description">
            <div className="text-[#111] font-bold ">
              Description
              <span className="text-red-600 ml-1">*</span>
            </div>
            <textarea
              name="description"
              placeholder="Description"
              id="description"
              className="border w-full rounded-lg p-3 font-normal h-[150px] outline-none"
            ></textarea>
            <span className="text-[#95989D] text-xs">
              Do not exceed 100 characters when entering the product name.
            </span>
          </fieldset>
          <ImageUploader />
          <div className="flex  gap-3">
            <button className="btn-custome">Add product</button>
            <button className="btn-custome">Save product</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
